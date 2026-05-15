export interface Workflow {
  id: string;
  title: string;
  description: string;
  icon: string;
  path: string;
  bobMode: string;
  color: string;
}

export interface WorkflowCardProps {
  workflow: Workflow;
}

// Made with Bob
