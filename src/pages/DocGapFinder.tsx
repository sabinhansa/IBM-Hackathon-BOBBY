import { FileSearch, ArrowLeft, Sparkles, AlertCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { docGapReport } from '../data/sampleReports';

export default function DocGapFinder() {
  const handleDownload = () => {
    const content = JSON.stringify(docGapReport, null, 2);
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'documentation-gaps.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Link>

      <div className="bg-white rounded-lg shadow-md p-8 mb-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="bg-green-100 p-3 rounded-lg">
            <FileSearch className="h-8 w-8 text-green-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Documentation Gap Finder</h1>
            <p className="text-gray-600">Identify missing or inadequate documentation across your codebase</p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <div className="flex items-start space-x-3">
              <Sparkles className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-green-900 mb-2">Bob Mode: Ask Mode + Review Mode</h3>
                <p className="text-sm text-green-800">
                  Bob reviews repository documentation and identifies gaps, prioritizing by impact and providing 
                  specific recommendations for improvement.
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
                    <span className="text-green-600 mr-2">•</span>
                    <span>Repository codebase</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Existing documentation files</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Code comments and JSDoc</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">Output</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Prioritized list of documentation gaps</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Specific locations needing docs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Actionable recommendations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Analysis Summary</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 text-center">
                <div className="text-2xl font-bold text-gray-900">{docGapReport.summary.totalGaps}</div>
                <div className="text-sm text-gray-600">Total Gaps</div>
              </div>
              <div className="bg-red-50 rounded-lg p-4 border border-red-200 text-center">
                <div className="text-2xl font-bold text-red-600">{docGapReport.summary.high}</div>
                <div className="text-sm text-gray-600">High Priority</div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200 text-center">
                <div className="text-2xl font-bold text-yellow-600">{docGapReport.summary.medium}</div>
                <div className="text-sm text-gray-600">Medium</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 text-center">
                <div className="text-2xl font-bold text-blue-600">{docGapReport.summary.low}</div>
                <div className="text-sm text-gray-600">Low</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 border border-green-200 text-center">
                <div className="text-2xl font-bold text-green-600">{docGapReport.metadata?.filesAnalyzed}</div>
                <div className="text-sm text-gray-600">Files Analyzed</div>
              </div>
            </div>
          </div>

          {/* Documentation Gaps */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Identified Documentation Gaps</h2>
              <button
                onClick={handleDownload}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm"
              >
                <FileSearch className="h-4 w-4" />
                <span>Download Report</span>
              </button>
            </div>
            
            <div className="space-y-4">
              {docGapReport.gaps.map((gap, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start space-x-3 flex-1">
                      <AlertCircle className={`h-5 w-5 mt-0.5 ${
                        gap.priority === 'high' ? 'text-red-600' :
                        gap.priority === 'medium' ? 'text-yellow-600' :
                        'text-blue-600'
                      }`} />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-gray-900">{gap.title}</h3>
                          <span className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(gap.priority)}`}>
                            {gap.priority.toUpperCase()}
                          </span>
                          <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                            {gap.category}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mb-3">{gap.description}</p>
                        <div className="bg-gray-50 rounded p-3 mb-3">
                          <p className="text-xs font-medium text-gray-600 mb-1">Location:</p>
                          <code className="text-xs text-gray-800">{gap.location}</code>
                        </div>
                        <div className="bg-green-50 rounded p-3 border border-green-200">
                          <div className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-xs font-medium text-green-900 mb-1">Recommendation:</p>
                              <p className="text-sm text-green-800">{gap.recommendation}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Generated By */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              Generated by {docGapReport.generatedBy} • 
              Repository: {docGapReport.metadata?.repository}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
