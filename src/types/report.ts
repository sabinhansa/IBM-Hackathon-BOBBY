export interface Report {
  id: string;
  title: string;
  workflowId: string;
  generatedBy: string;
  timestamp: string;
  content: string;
  metadata?: {
    repository?: string;
    branch?: string;
    filesAnalyzed?: number;
    [key: string]: any;
  };
}

export interface RiskItem {
  severity: 'critical' | 'high' | 'medium' | 'low';
  category: string;
  title: string;
  description: string;
  location: string;
  recommendation: string;
}

export interface RiskReport {
  id: string;
  title: string;
  workflowId: string;
  generatedBy: string;
  timestamp: string;
  summary: {
    totalIssues: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  risks: RiskItem[];
  metadata?: {
    repository?: string;
    branch?: string;
    filesAnalyzed?: number;
  };
}

export interface DocGap {
  priority: 'high' | 'medium' | 'low';
  category: string;
  title: string;
  description: string;
  location: string;
  recommendation: string;
}

export interface DocGapReport {
  id: string;
  title: string;
  workflowId: string;
  generatedBy: string;
  timestamp: string;
  summary: {
    totalGaps: number;
    high: number;
    medium: number;
    low: number;
  };
  gaps: DocGap[];
  metadata?: {
    repository?: string;
    filesAnalyzed?: number;
  };
}

// Made with Bob