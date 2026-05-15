import { Workflow } from '../types/workflow';

export const workflows: Workflow[] = [
  {
    id: 'repo-onboarding',
    title: 'Repo Onboarding',
    description: 'Generate plain-language onboarding guides for unfamiliar repositories',
    icon: 'BookOpen',
    path: '/repo-onboarding',
    bobMode: 'Ask Mode',
    color: 'blue'
  },
  {
    id: 'architecture-map',
    title: 'Architecture Map',
    description: 'Visualize system architecture and component relationships',
    icon: 'Network',
    path: '/architecture-map',
    bobMode: 'Plan Mode',
    color: 'purple'
  },
  {
    id: 'doc-gap-finder',
    title: 'Documentation Gap Finder',
    description: 'Identify missing or inadequate documentation across your codebase',
    icon: 'FileSearch',
    path: '/doc-gap-finder',
    bobMode: 'Ask Mode',
    color: 'green'
  },
  {
    id: 'test-plan-generator',
    title: 'Test Plan Generator',
    description: 'Generate comprehensive test plans based on code changes',
    icon: 'TestTube',
    path: '/test-plan-generator',
    bobMode: 'Code Mode',
    color: 'orange'
  },
  {
    id: 'risk-review',
    title: 'Risk Review',
    description: 'Identify risky code areas and security concerns',
    icon: 'AlertTriangle',
    path: '/risk-review',
    bobMode: 'Review Mode',
    color: 'red'
  },
  {
    id: 'pr-pack-generator',
    title: 'PR Pack Generator',
    description: 'Generate complete PR documentation packages',
    icon: 'GitPullRequest',
    path: '/pr-pack-generator',
    bobMode: 'Code Mode',
    color: 'indigo'
  },
  {
    id: 'bob-evidence',
    title: 'Bob Evidence Center',
    description: 'View exported Bob task sessions and workflow transparency',
    icon: 'FileText',
    path: '/bob-evidence',
    bobMode: 'All Modes',
    color: 'gray'
  }
];

// Made with Bob
