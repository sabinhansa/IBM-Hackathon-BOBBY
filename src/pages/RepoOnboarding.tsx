import { BookOpen, ArrowLeft, Sparkles, Clock, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReportViewer from '../components/ReportViewer/ReportViewer';
import { repoOnboardingReport } from '../data/sampleReports';

export default function RepoOnboarding() {
  const handleDownload = () => {
    const blob = new Blob([repoOnboardingReport.content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'onboarding-guide.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Link>

      <div className="bg-white rounded-lg shadow-md p-8 mb-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="bg-blue-100 p-3 rounded-lg">
            <BookOpen className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Repo Onboarding</h1>
            <p className="text-gray-600">Generate plain-language onboarding guides for unfamiliar repositories</p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <div className="flex items-start space-x-3">
              <Sparkles className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Bob Mode: Ask Mode</h3>
                <p className="text-sm text-blue-800">
                  Bob analyzes repository structure and generates comprehensive onboarding documentation 
                  covering project purpose, key directories, important files, and first contribution steps.
                </p>
              </div>
            </div>
          </div>

          {/* What This Workflow Does */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">What This Workflow Does</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">Input</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Repository URL or local path</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Branch name (default: main)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Optional: Focus areas (frontend, backend, etc.)</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">Output</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Project overview and purpose</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Directory structure explanation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Development setup instructions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>First contribution guide</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* How It Speeds Up Development */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">How It Speeds Up Development</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                <Clock className="h-6 w-6 text-blue-600 mb-2" />
                <h4 className="font-semibold text-gray-900 mb-1">75% Time Saved</h4>
                <p className="text-sm text-gray-700">
                  Reduces onboarding from 2-4 hours to 30 minutes
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                <FileText className="h-6 w-6 text-blue-600 mb-2" />
                <h4 className="font-semibold text-gray-900 mb-1">Instant Context</h4>
                <p className="text-sm text-gray-700">
                  Understand project structure without exploring files
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                <Sparkles className="h-6 w-6 text-blue-600 mb-2" />
                <h4 className="font-semibold text-gray-900 mb-1">Day 1 Contributions</h4>
                <p className="text-sm text-gray-700">
                  Start contributing immediately with clear guidance
                </p>
              </div>
            </div>
          </div>

          {/* Sample Output */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Sample Generated Output</h2>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Generated by: {repoOnboardingReport.generatedBy}
                  </p>
                  <p className="text-xs text-gray-600">
                    Repository: {repoOnboardingReport.metadata?.repository} • 
                    Files analyzed: {repoOnboardingReport.metadata?.filesAnalyzed}
                  </p>
                </div>
              </div>
            </div>
            <ReportViewer
              content={repoOnboardingReport.content}
              title={repoOnboardingReport.title}
              onDownload={handleDownload}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
