import { TestTube, ArrowLeft, Sparkles, Target, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReportViewer from '../components/ReportViewer/ReportViewer';
import { testPlanReport } from '../data/sampleReports';

export default function TestPlanGenerator() {
  const handleDownload = () => {
    const blob = new Blob([testPlanReport.content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'test-plan.md';
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
          <div className="bg-orange-100 p-3 rounded-lg">
            <TestTube className="h-8 w-8 text-orange-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Test Plan Generator</h1>
            <p className="text-gray-600">Generate comprehensive test plans based on code changes</p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-6">
            <div className="flex items-start space-x-3">
              <Sparkles className="h-5 w-5 text-orange-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-orange-900 mb-2">Bob Mode: Code Mode</h3>
                <p className="text-sm text-orange-800">
                  Bob analyzes changed files and generates comprehensive test plans including unit tests, 
                  integration tests, edge cases, and test data requirements with specific test scenarios.
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
                    <span className="text-orange-600 mr-2">•</span>
                    <span>Changed files in feature branch</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span>Feature description</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span>Existing test coverage</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">Output</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span>Unit test cases with assertions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span>Integration test scenarios</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span>Edge cases and error scenarios</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span>Performance and security tests</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* How It Speeds Up Development */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">How It Speeds Up Development</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
                <Target className="h-6 w-6 text-orange-600 mb-2" />
                <h4 className="font-semibold text-gray-900 mb-1">Complete Coverage</h4>
                <p className="text-sm text-gray-700">
                  Identifies all test cases, including edge cases you might miss
                </p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
                <TestTube className="h-6 w-6 text-orange-600 mb-2" />
                <h4 className="font-semibold text-gray-900 mb-1">Ready-to-Implement</h4>
                <p className="text-sm text-gray-700">
                  Test cases with specific assertions and expected outcomes
                </p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
                <Shield className="h-6 w-6 text-orange-600 mb-2" />
                <h4 className="font-semibold text-gray-900 mb-1">Higher Quality</h4>
                <p className="text-sm text-gray-700">
                  Comprehensive testing reduces bugs in production
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
                    Generated by: {testPlanReport.generatedBy}
                  </p>
                  <p className="text-xs text-gray-600">
                    Branch: {testPlanReport.metadata?.branch} • 
                    Files analyzed: {testPlanReport.metadata?.filesAnalyzed}
                  </p>
                </div>
              </div>
            </div>
            <ReportViewer
              content={testPlanReport.content}
              title={testPlanReport.title}
              onDownload={handleDownload}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
