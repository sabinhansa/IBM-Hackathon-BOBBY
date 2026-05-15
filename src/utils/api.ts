import type { WorkflowRequest, WorkflowResponse, ApiError, ApiResponse } from '../types/api';

/**
 * Get the API base URL
 * In production (Vercel), this will be the same origin
 * In development, it defaults to localhost:3000 or can be overridden
 */
function getApiBaseUrl(): string {
  // Check if we're in browser environment
  if (typeof window === 'undefined') {
    return '';
  }

  // Use environment variable if set
  const envBaseUrl = import.meta.env.VITE_API_BASE_URL;
  if (envBaseUrl) {
    return envBaseUrl;
  }

  // In production (deployed), use same origin
  if (import.meta.env.PROD) {
    return window.location.origin;
  }

  // In development, default to localhost:3000 for API
  // (Vite dev server runs on 5173, but API would be on different port)
  return 'http://localhost:3000';
}

/**
 * Check if live mode is enabled
 */
export function isLiveModeEnabled(): boolean {
  return true;
}

/**
 * Call the workflow API
 */
export async function runWorkflow(
  request: WorkflowRequest
): Promise<WorkflowResponse> {
  const apiBaseUrl = getApiBaseUrl();
  const url = `${apiBaseUrl}/api/run-workflow`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    const data: ApiResponse = await response.json();

    if (!response.ok || !data.ok) {
      const error = data as ApiError;
      throw new Error(error.error || `API request failed with status ${response.status}`);
    }

    return data as WorkflowResponse;
  } catch (error) {
    // Network error or JSON parse error
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to connect to API');
  }
}

/**
 * Validate repository URL format
 */
export function isValidRepoUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    const validHosts = ['github.com', 'gitlab.com', 'bitbucket.org'];
    
    if (!validHosts.includes(parsed.hostname)) {
      return false;
    }

    // Check for owner/repo pattern
    const pathParts = parsed.pathname.split('/').filter(Boolean);
    return pathParts.length >= 2;
  } catch {
    return false;
  }
}

/**
 * Extract repository info from URL
 */
export function parseRepoUrl(url: string): { owner: string; repo: string; host: string } | null {
  try {
    const parsed = new URL(url);
    const pathParts = parsed.pathname.split('/').filter(Boolean);
    
    if (pathParts.length < 2) {
      return null;
    }

    return {
      owner: pathParts[0],
      repo: pathParts[1].replace(/\.git$/, ''),
      host: parsed.hostname,
    };
  } catch {
    return null;
  }
}

// Made with Bob
