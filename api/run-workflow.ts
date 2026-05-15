import type { VercelRequest, VercelResponse } from '@vercel/node';

// Types
interface WorkflowRequest {
  workflowId: string;
  repoUrl: string;
  branch?: string;
  changedFiles?: string[];
  options?: Record<string, any>;
}

interface WorkflowResponse {
  ok: boolean;
  workflowId: string;
  generatedBy: string;
  timestamp: string;
  content: string;
  metadata: {
    repository: string;
    branch: string;
    mode: 'live';
    filesAnalyzed?: number;
    duration?: number;
  };
  error?: string;
}

interface RepoContext {
  summary: string;
  filesAnalyzed: number;
}

// Workflow prompt templates
const WORKFLOW_PROMPTS: Record<string, { mode: string; prompt: (repo: string, branch: string) => string }> = {
  'repo-onboarding': {
    mode: 'ask',
    prompt: (repo, branch) => `Analyze the repository at ${repo} (branch: ${branch}) and create a plain-language onboarding guide covering:

1. **Project Purpose**: What does this project do? What problem does it solve?
2. **Key Directories**: What are the main directories and what role does each play?
3. **Important Files**: Which files are critical to understand (config, entry points, tests)?
4. **Development Workflow**: How do developers work with this codebase? What commands are used?
5. **First Contribution Steps**: What should a new developer do to make their first contribution?

Format the output as a well-structured markdown document suitable for a README.md or ONBOARDING.md file.
Include code examples where helpful.
Make it friendly and accessible to developers unfamiliar with the project.`
  },
  'architecture-map': {
    mode: 'plan',
    prompt: (repo, branch) => `Analyze the repository at ${repo} (branch: ${branch}) and create a comprehensive architecture map:

1. **System Overview**: High-level architecture and design patterns
2. **Component Relationships**: How different parts of the system interact
3. **Data Flow**: How data moves through the system
4. **Key Dependencies**: External libraries and services
5. **Architecture Diagram**: Text-based or mermaid diagram of the architecture

Format as markdown with clear sections and diagrams where appropriate.`
  },
  'doc-gap-finder': {
    mode: 'ask',
    prompt: (repo, branch) => `Analyze the repository at ${repo} (branch: ${branch}) and identify documentation gaps:

1. **Missing Documentation**: Files or modules without adequate documentation
2. **Incomplete Documentation**: Areas where documentation exists but is insufficient
3. **Outdated Documentation**: Documentation that doesn't match current code
4. **Priority Recommendations**: Which gaps should be addressed first

Format as markdown with specific file locations and actionable recommendations.`
  },
  'test-plan-generator': {
    mode: 'code',
    prompt: (repo, branch) => `Analyze the repository at ${repo} (branch: ${branch}) and generate a comprehensive test plan:

1. **Test Coverage Analysis**: Current test coverage and gaps
2. **Test Strategy**: Unit, integration, and e2e testing approach
3. **Test Cases**: Specific test cases that should be implemented
4. **Testing Tools**: Recommended testing frameworks and tools
5. **Implementation Priority**: Which tests to write first

Format as markdown with code examples for test cases.`
  },
  'risk-review': {
    mode: 'review',
    prompt: (repo, branch) => `Analyze the repository at ${repo} (branch: ${branch}) and identify risks:

1. **Security Risks**: Potential security vulnerabilities
2. **Code Quality Issues**: Maintainability and technical debt
3. **Performance Concerns**: Potential performance bottlenecks
4. **Dependency Risks**: Outdated or vulnerable dependencies
5. **Mitigation Strategies**: How to address identified risks

Format as markdown with severity levels (critical, high, medium, low) and specific locations.`
  },
  'pr-pack-generator': {
    mode: 'code',
    prompt: (repo, branch) => `Analyze the repository at ${repo} (branch: ${branch}) and generate a PR documentation package:

1. **PR Title**: Clear, descriptive title
2. **Description**: What changes were made and why
3. **Testing**: How the changes were tested
4. **Screenshots**: Descriptions of what screenshots should show
5. **Checklist**: Pre-merge checklist items
6. **Breaking Changes**: Any breaking changes and migration guide

Format as markdown suitable for a GitHub PR description.`
  }
};

function normalizeBranch(branch: string): string {
  return branch.trim() || 'main';
}

function parseGitHubRepo(repoUrl: string): { owner: string; repo: string } | null {
  try {
    const url = new URL(repoUrl);
    if (url.hostname !== 'github.com') {
      return null;
    }

    const [owner, rawRepo] = url.pathname.split('/').filter(Boolean);
    if (!owner || !rawRepo) {
      return null;
    }

    return {
      owner,
      repo: rawRepo.replace(/\.git$/, ''),
    };
  } catch {
    return null;
  }
}

function shouldIncludeFile(path: string): boolean {
  const lower = path.toLowerCase();
  const allowedExtensions = [
    '.md',
    '.json',
    '.ts',
    '.tsx',
    '.js',
    '.jsx',
    '.py',
    '.go',
    '.java',
    '.cs',
    '.rb',
    '.php',
    '.yml',
    '.yaml',
    '.toml',
    '.rs',
    '.swift',
  ];

  if (
    lower.includes('/node_modules/') ||
    lower.includes('/dist/') ||
    lower.includes('/build/') ||
    lower.includes('/.git/') ||
    lower.includes('/coverage/') ||
    lower.endsWith('package-lock.json')
  ) {
    return false;
  }

  return allowedExtensions.some((extension) => lower.endsWith(extension));
}

function prioritizeFile(path: string): number {
  const lower = path.toLowerCase();

  if (lower === 'readme.md') return 0;
  if (lower === 'package.json') return 1;
  if (lower.includes('src/app.') || lower.includes('src/main.')) return 2;
  if (lower.includes('api/') || lower.includes('server/')) return 3;
  if (lower.includes('routes') || lower.includes('pages')) return 4;
  if (lower.endsWith('.md')) return 5;
  return 10;
}

async function fetchText(url: string): Promise<string | null> {
  const response = await fetch(url, {
    headers: {
      Accept: 'text/plain, application/json',
      'User-Agent': 'BobFlow-Hackathon-Demo',
    },
  });

  if (!response.ok) {
    return null;
  }

  return response.text();
}

async function fetchGitHubContext(repoUrl: string, branch: string): Promise<RepoContext> {
  const repoInfo = parseGitHubRepo(repoUrl);
  if (!repoInfo) {
    return {
      summary: `Repository URL: ${repoUrl}\nAutomatic file fetching is currently available for public GitHub repositories only.`,
      filesAnalyzed: 0,
    };
  }

  const treeUrl = `https://api.github.com/repos/${repoInfo.owner}/${repoInfo.repo}/git/trees/${encodeURIComponent(branch)}?recursive=1`;
  const treeResponse = await fetch(treeUrl, {
    headers: {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'BobFlow-Hackathon-Demo',
    },
  });

  if (!treeResponse.ok) {
    throw new Error(`Could not read GitHub repository tree (${treeResponse.status}). Make sure the repo is public and the branch exists.`);
  }

  const treeData = await treeResponse.json();
  const files = (treeData.tree || [])
    .filter((item: any) => item.type === 'blob' && typeof item.path === 'string')
    .map((item: any) => item.path as string)
    .filter(shouldIncludeFile)
    .sort((a: string, b: string) => prioritizeFile(a) - prioritizeFile(b) || a.localeCompare(b))
    .slice(0, 24);

  const chunks: string[] = [
    `Repository: ${repoUrl}`,
    `Branch: ${branch}`,
    `Selected files: ${files.join(', ') || 'none'}`,
  ];

  let filesAnalyzed = 0;
  for (const filePath of files) {
    const rawUrl = `https://raw.githubusercontent.com/${repoInfo.owner}/${repoInfo.repo}/${encodeURIComponent(branch)}/${filePath
      .split('/')
      .map(encodeURIComponent)
      .join('/')}`;
    const content = await fetchText(rawUrl);

    if (!content) {
      continue;
    }

    filesAnalyzed += 1;
    chunks.push(`\n--- FILE: ${filePath} ---\n${content.slice(0, 6000)}`);
  }

  return {
    summary: chunks.join('\n'),
    filesAnalyzed,
  };
}

function buildBobPrompt(
  workflowMode: string,
  prompt: string,
  repoContext: RepoContext
): string {
  return `You are IBM Bob running in ${workflowMode} mode for BobFlow, a hackathon demo.

Use the repository context below to produce the requested workflow output.
Return only a polished markdown report. Do not mention missing API keys, implementation details, or that you are an API.

REQUEST:
${prompt}

REPOSITORY CONTEXT:
${repoContext.summary}`;
}

function buildCandidateEndpoints(baseEndpoint: string): string[] {
  const trimmed = baseEndpoint.replace(/\/+$/, '');
  const endpoints = new Set<string>();

  endpoints.add(trimmed);

  if (!trimmed.endsWith('/chat/completions')) {
    endpoints.add(`${trimmed}/chat/completions`);
  }

  if (!trimmed.endsWith('/inference')) {
    endpoints.add(`${trimmed}/inference`);
  }

  if (!trimmed.endsWith('/chat')) {
    endpoints.add(`${trimmed}/chat`);
  }

  return Array.from(endpoints);
}

function extractBobContent(data: any): string {
  const candidates = [
    data?.content,
    data?.response,
    data?.output,
    data?.text,
    data?.message,
    data?.result?.content,
    data?.result?.response,
    data?.choices?.[0]?.message?.content,
    data?.choices?.[0]?.text,
    data?.data?.content,
    data?.data?.response,
  ];

  const content = candidates.find((value) => typeof value === 'string' && value.trim().length > 0);
  if (!content) {
    throw new Error('Bob API returned a response, but no text content field was recognized.');
  }

  return content;
}

async function callBobAPI(
  workflowMode: string,
  prompt: string,
  repoUrl: string,
  branch: string
): Promise<{ content: string; filesAnalyzed: number }> {
  const apiKey = process.env.BOB_API_KEY;
  const apiEndpoint = process.env.BOB_API_ENDPOINT || 'https://api.bob.ibm.com/v1';
  const model = process.env.BOB_API_MODEL || 'bob';
  const teamId = process.env.BOB_TEAM_ID || process.env.BOB_API_TEAM_ID;

  if (!apiKey) {
    throw new Error('BOB_API_KEY environment variable is not configured. Please set it in your deployment platform or .env file.');
  }

  const repoContext = await fetchGitHubContext(repoUrl, branch);
  const bobPrompt = buildBobPrompt(workflowMode, prompt, repoContext);
  const endpoints = buildCandidateEndpoints(apiEndpoint);
  const requestBodies = [
    {
      model,
      mode: workflowMode,
      messages: [{ role: 'user', content: bobPrompt }],
      temperature: 0.2,
    },
    {
      model,
      chat_mode: workflowMode,
      prompt: bobPrompt,
      temperature: 0.2,
    },
    {
      mode: workflowMode,
      input: bobPrompt,
    },
  ];

  const headers: Record<string, string> = {
    Authorization: `Bearer ${apiKey}`,
    'X-API-Key': apiKey,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  if (teamId) {
    headers['X-Bob-Team-Id'] = teamId;
    headers['X-Team-Id'] = teamId;
  }

  const errors: string[] = [];

  for (const endpoint of endpoints) {
    for (const body of requestBodies) {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      });

      const rawText = await response.text();
      let data: any = rawText;

      try {
        data = rawText ? JSON.parse(rawText) : {};
      } catch {
        data = rawText;
      }

      if (!response.ok) {
        const message =
          typeof data === 'string'
            ? data.slice(0, 240)
            : data?.error?.message || data?.message || response.statusText;
        errors.push(`${endpoint} -> ${response.status}: ${message}`);
        continue;
      }

      const content = typeof data === 'string' ? data : extractBobContent(data);
      return {
        content,
        filesAnalyzed: repoContext.filesAnalyzed,
      };
    }
  }

  throw new Error(
    `Bob API request failed. Set BOB_API_ENDPOINT to the exact IBM Bob inference endpoint if your account uses a custom URL. Last attempts: ${errors
      .slice(-3)
      .join(' | ')}`
  );
}

/*
  The adapter above keeps BOB_API_KEY server-side and supports common inference
  response shapes. If IBM Bob gives you an exact endpoint/schema, set:
  - BOB_API_ENDPOINT
  - BOB_API_MODEL if required
  - BOB_TEAM_ID if you created a general API key that requires a team header
*/

/**
 * Vercel Serverless Function Handler
 * POST /api/run-workflow
 */
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  // Only allow POST requests
  if (req.method !== 'POST') {
    res.status(405).json({
      ok: false,
      error: 'Method not allowed. Use POST.'
    });
    return;
  }

  const startTime = Date.now();

  try {
    // Parse and validate request body
    const body = req.body as WorkflowRequest;
    const { workflowId, repoUrl, branch = 'main' } = body;

    // Validate required fields
    if (!workflowId) {
      res.status(400).json({
        ok: false,
        error: 'Missing required field: workflowId'
      });
      return;
    }

    if (!repoUrl) {
      res.status(400).json({
        ok: false,
        error: 'Missing required field: repoUrl'
      });
      return;
    }

    // Validate workflow ID
    const workflowConfig = WORKFLOW_PROMPTS[workflowId];
    if (!workflowConfig) {
      res.status(400).json({
        ok: false,
        error: `Invalid workflowId: ${workflowId}. Valid options: ${Object.keys(WORKFLOW_PROMPTS).join(', ')}`
      });
      return;
    }

    // Validate repository URL format
    const repoUrlPattern = /^https?:\/\/(github\.com|gitlab\.com|bitbucket\.org)\/.+\/.+$/;
    if (!repoUrlPattern.test(repoUrl)) {
      res.status(400).json({
        ok: false,
        error: 'Invalid repository URL format. Expected: https://github.com/owner/repo'
      });
      return;
    }

    // Generate prompt for this workflow
    const normalizedBranch = normalizeBranch(branch);
    const prompt = workflowConfig.prompt(repoUrl, normalizedBranch);

    // Call Bob API
    let content: string;
    let filesAnalyzed = 0;
    try {
      const result = await callBobAPI(workflowConfig.mode, prompt, repoUrl, normalizedBranch);
      content = result.content;
      filesAnalyzed = result.filesAnalyzed;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      res.status(503).json({
        ok: false,
        error: `Failed to generate workflow analysis: ${errorMessage}`,
        code: 'BOB_API_ERROR'
      });
      return;
    }

    // Calculate duration
    const duration = Date.now() - startTime;

    // Build successful response
    const response: WorkflowResponse = {
      ok: true,
      workflowId,
      generatedBy: 'IBM Bob',
      timestamp: new Date().toISOString(),
      content,
      metadata: {
        repository: repoUrl,
        branch: normalizedBranch,
        mode: 'live',
        filesAnalyzed,
        duration
      }
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Workflow API error:', error);
    
    res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : 'Internal server error',
      code: 'INTERNAL_ERROR'
    });
  }
}

// Made with Bob
