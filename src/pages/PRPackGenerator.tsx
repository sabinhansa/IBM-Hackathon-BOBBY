import { GitPullRequest, ArrowLeft, Sparkles, FileText, CheckSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReportViewer from '../components/ReportViewer/ReportViewer';
import { prPackReport } from '../data/sampleReports';

export default function PRPackGenerator() {
  const handleDownload = () => {
    const blob = new Blob([prPackReport.content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pr-package.md';
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
          <div className="bg-indigo-100 p-3 rounded-lg">
            <GitPullRequest className="h-8 w-8 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">PR Pack Generator</h1>
            <p className="text-gray-600">Generate complete PR documentation packages</p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-6">
            <div className="flex items-start space-x-3">
              <Sparkles className="h-5 w-5 text-indigo-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-indigo-900 mb-2">Bob Mode: Code Mode + Plan Mode</h3>
                <p className="text-sm text-indigo-800">
                  Bob generates complete PR documentation including title, description, changelog, testing evidence, 
                  reviewer checklist, and deployment notes—ready to submit without additional editing.
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
                    <span className="text-indigo-600 mr-2">•</span>
                    <span>Git diff between branches</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    <span>Commit messages</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    <span>Related issue numbers</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">Output</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    <span>PR title and description</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    <span>Changelog entry</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    <span>Testing evidence</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    <span>Reviewer checklist</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* How It Speeds Up Development */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">How It Speeds Up Development</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-4 border border-indigo-200">
                <FileText className="h-6 w-6 text-indigo-600 mb-2" />
                <h4 className="font-semibold text-gray-900 mb-1">Complete Documentation</h4>
                <p className="text-sm text-gray-700">
                  All PR documentation generated automatically
                </p>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-4 border border-indigo-200">
                <CheckSquare className="h-6 w-6 text-indigo-600 mb-2" />
                <h4 className="font-semibold text-gray-900 mb-1">Faster Reviews</h4>
                <p className="text-sm text-gray-700">
                  Clear context helps reviewers understand changes quickly
                </p>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-4 border border-indigo-200">
                <GitPullRequest className="h-6 w-6 text-indigo-600 mb-2" />
                <h4 className="font-semibold text-gray-900 mb-1">Professional Quality</h4>
                <p className="text-sm text-gray-700">
                  Consistent, high-quality PR descriptions every time
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
                    Generated by: {prPackReport.generatedBy}
                  </p>
                  <p className="text-xs text-gray-600">
                    Branch: {prPackReport.metadata?.branch} • 
                    Files analyzed: {prPackReport.metadata?.filesAnalyzed}
                  </p>
                </div>
              </div>
            </div>
            <ReportViewer
              content={prPackReport.content}
              title={prPackReport.title}
              onDownload={handleDownload}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
