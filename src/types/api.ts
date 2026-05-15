// API Types for BobFlow Live Analysis

export type WorkflowId = 
  | 'repo-onboarding'
  | 'architecture-map'
  | 'doc-gap-finder'
  | 'test-plan-generator'
  | 'risk-review'
  | 'pr-pack-generator';

export interface WorkflowRequest {
  workflowId: WorkflowId;
  repoUrl: string;
  branch?: string;
  changedFiles?: string[];
  options?: {
    focusAreas?: string[];
    outputFormat?: 'markdown' | 'json';
    [key: string]: any;
  };
}

export interface WorkflowResponse {
  ok: boolean;
  workflowId: WorkflowId;
  generatedBy: string;
  timestamp: string;
  content: string;
  metadata: {
    repository: string;
    branch: string;
    mode: 'live' | 'demo';
    filesAnalyzed?: number;
    duration?: number;
    [key: string]: any;
  };
  error?: string;
}

export interface ApiError {
  ok: false;
  error: string;
  code?: string;
  details?: any;
}

export type ApiResponse = WorkflowResponse | ApiError;

// Type guard for checking if response is an error
export function isApiError(response: ApiResponse): response is ApiError {
  return !response.ok && 'error' in response;
}

// Made with Bob