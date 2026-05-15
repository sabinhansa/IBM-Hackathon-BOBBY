import { Sparkles, Zap } from 'lucide-react';
import WorkflowCard from '../components/WorkflowCard/WorkflowCard';
import { workflows } from '../data/workflows';

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Sparkles className="h-4 w-4" />
          <span>IBM Bob Hackathon Project</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Transform Repositories into
          <span className="text-primary-600"> Actionable Workspaces</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
          BobFlow orchestrates IBM Bob's multi-modal capabilities to accelerate repository onboarding, 
          architecture understanding, testing, and documentation—turning hours of exploration into minutes of productivity.
        </p>
        <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <Zap className="h-4 w-4 text-yellow-500" />
            <span>75% faster onboarding</span>
          </div>
          <span>•</span>
          <div className="flex items-center space-x-2">
            <Sparkles className="h-4 w-4 text-primary-500" />
            <span>5 Bob modes demonstrated</span>
          </div>
          <span>•</span>
          <div className="flex items-center space-x-2">
            <span>7 workflow types</span>
          </div>
        </div>
      </div>

      {/* Workflows Grid */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Workflows</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workflows.map((workflow) => (
            <WorkflowCard key={workflow.id} workflow={workflow} />
          ))}
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-gradient-to-r from-primary-50 to-purple-50 rounded-xl p-8 border border-primary-100">
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          How BobFlow Works
        </h3>
        <div className="grid md:grid-cols-3 gap-6 text-sm">
          <div>
            <div className="font-semibold text-gray-900 mb-2">1. Select Workflow</div>
            <p className="text-gray-600">
              Choose from 7 specialized workflows, each designed to solve a specific development challenge.
            </p>
          </div>
          <div>
            <div className="font-semibold text-gray-900 mb-2">2. Bob Analyzes</div>
            <p className="text-gray-600">
              IBM Bob uses the appropriate mode (Ask, Plan, Code, or Review) to analyze your repository.
            </p>
          </div>
          <div>
            <div className="font-semibold text-gray-900 mb-2">3. Get Results</div>
            <p className="text-gray-600">
              Receive actionable documentation, test plans, risk assessments, or PR packages instantly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
