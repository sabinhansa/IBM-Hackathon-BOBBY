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

/**
 * Bob API Adapter
 * 
 * TODO: Replace this stub with actual IBM Bob API integration
 * 
 * This function should:
 * 1. Authenticate with IBM Bob API using BOB_API_KEY
 * 2. Send the prompt to Bob in the appropriate mode
 * 3. Wait for Bob's response
 * 4. Return the generated content
 * 
 * Example integration (pseudocode):
 * 
 * const bobClient = new BobClient({
 *   apiKey: process.env.BOB_API_KEY,
 *   endpoint: process.env.BOB_API_ENDPOINT
 * });
 * 
 * const response = await bobClient.chat({
 *   mode: workflowMode,
 *   prompt: prompt,
 *   context: {
 *     repository: repoUrl,
 *     branch: branch
 *   }
 * });
 * 
 * return response.content;
 */
async function callBobAPI(
  workflowMode: string,
  prompt: string,
  repoUrl: string,
  branch: string
): Promise<string> {
  const apiKey = process.env.BOB_API_KEY;
  const apiEndpoint = process.env.BOB_API_ENDPOINT || 'https://api.bob.ibm.com/v1';

  if (!apiKey) {
    throw new Error('BOB_API_KEY environment variable is not configured. Please set it in your deployment platform or .env file.');
  }

  // TODO: Implement actual IBM Bob API call
  // This is a placeholder that returns an error message
  // Replace with real API integration when Bob API details are available
  
  throw new Error(
    'IBM Bob API integration not yet implemented. ' +
    'Please implement the callBobAPI function with actual Bob API calls. ' +
    'See TODO comments in api/run-workflow.ts for integration guidance.'
  );

  // Example of what the real implementation might look like:
  /*
  try {
    const response = await fetch(`${apiEndpoint}/chat`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        mode: workflowMode,
        prompt: prompt,
        context: {
          repository: repoUrl,
          branch: branch
        }
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Bob API error: ${error.message || response.statusText}`);
    }

    const data = await response.json();
    return data.content || data.response || '';
  } catch (error) {
    console.error('Bob API call failed:', error);
    throw error;
  }
  */
}

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
    const { workflowId, repoUrl, branch = 'main', changedFiles = [], options = {} } = body;

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
    const prompt = workflowConfig.prompt(repoUrl, branch);

    // Call Bob API
    let content: string;
    try {
      content = await callBobAPI(workflowConfig.mode, prompt, repoUrl, branch);
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
        branch,
        mode: 'live',
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