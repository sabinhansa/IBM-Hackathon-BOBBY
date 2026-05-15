import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Network, 
  FileSearch, 
  TestTube, 
  AlertTriangle, 
  GitPullRequest, 
  FileText,
  ArrowRight 
} from 'lucide-react';
import { WorkflowCardProps } from '../../types/workflow';

const iconMap = {
  BookOpen,
  Network,
  FileSearch,
  TestTube,
  AlertTriangle,
  GitPullRequest,
  FileText
};

const colorMap = {
  blue: 'bg-blue-100 text-blue-600',
  purple: 'bg-purple-100 text-purple-600',
  green: 'bg-green-100 text-green-600',
  orange: 'bg-orange-100 text-orange-600',
  red: 'bg-red-100 text-red-600',
  indigo: 'bg-indigo-100 text-indigo-600',
  gray: 'bg-gray-100 text-gray-600'
};

export default function WorkflowCard({ workflow }: WorkflowCardProps) {
  const Icon = iconMap[workflow.icon as keyof typeof iconMap];
  const colorClass = colorMap[workflow.color as keyof typeof colorMap];

  return (
    <Link 
      to={workflow.path}
      className="card group hover:scale-105 transition-transform"
    >
      <div className="flex items-start space-x-4">
        <div className={`p-3 rounded-lg ${colorClass}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
            {workflow.title}
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            {workflow.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
              {workflow.bobMode}
            </span>
            <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </div>
    </Link>
  );
}

// Made with Bob
