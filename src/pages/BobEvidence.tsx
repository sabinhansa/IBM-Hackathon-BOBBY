import { FileText, ArrowLeft, ExternalLink, CheckCircle, Folder, Image } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BobEvidence() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Link>

      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center space-x-4 mb-6">
          <div className="bg-gray-100 p-3 rounded-lg">
            <FileText className="h-8 w-8 text-gray-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Bob Evidence Center</h1>
            <p className="text-gray-600">View exported Bob task sessions and workflow transparency</p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Bob Mode: All Modes</h3>
            <p className="text-sm text-gray-800">
              This page demonstrates transparency by showing actual Bob IDE task session exports, 
              proving meaningful IBM Bob usage throughout the development of BobFlow.
            </p>
          </div>

          {/* Bob Usage Evidence */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Bob Usage Evidence</h2>
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
              <p className="text-gray-700 mb-4">
                BobFlow itself was built using IBM Bob across multiple modes:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 border border-primary-200">
                  <h4 className="font-semibold text-primary-900 mb-2">Plan Mode</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Architecture design</li>
                    <li>• Workflow planning</li>
                    <li>• Roadmap creation</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4 border border-primary-200">
                  <h4 className="font-semibold text-primary-900 mb-2">Code Mode</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• React components</li>
                    <li>• TypeScript types</li>
                    <li>• Routing setup</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4 border border-primary-200">
                  <h4 className="font-semibold text-primary-900 mb-2">Ask Mode</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Documentation generation</li>
                    <li>• README creation</li>
                    <li>• Sample report content</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4 border border-primary-200">
                  <h4 className="font-semibold text-primary-900 mb-2">Review Mode</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Code quality checks</li>
                    <li>• Security review</li>
                    <li>• Best practices enforcement</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Bob Sessions Directory */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Task Session Exports</h2>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex items-start space-x-3 mb-4">
                <Folder className="h-5 w-5 text-gray-600 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900 mb-2">
                    <code className="bg-gray-200 px-2 py-1 rounded text-sm">/bob_sessions</code> Directory
                  </p>
                  <p className="text-sm text-gray-700 mb-3">
                    This directory contains exported Bob IDE task sessions that demonstrate the development process 
                    of BobFlow. Each session shows Bob's analysis, decision-making, and iterative refinement.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-gray-300">
                <h4 className="font-semibold text-gray-900 mb-3">What to Include:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span><strong>Task conversation history</strong> - Complete dialogue with Bob</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span><strong>Bob's analysis process</strong> - How Bob understood requirements</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span><strong>Code changes and iterations</strong> - Evolution of the solution</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span><strong>Problem-solving approaches</strong> - Bob's reasoning and decisions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span><strong>Tool usage examples</strong> - How Bob used different tools</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Screenshots */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Screenshots & Visual Evidence</h2>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex items-start space-x-3 mb-4">
                <Image className="h-5 w-5 text-gray-600 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-700 mb-3">
                    Include screenshots showing Bob in action during development:
                  </p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 border border-gray-300">
                  <h4 className="font-semibold text-gray-900 mb-2">Bob in Plan Mode</h4>
                  <p className="text-sm text-gray-600">
                    Screenshot of Bob designing architecture and planning workflows
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-300">
                  <h4 className="font-semibold text-gray-900 mb-2">Bob in Code Mode</h4>
                  <p className="text-sm text-gray-600">
                    Screenshot of Bob generating React components and TypeScript code
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-300">
                  <h4 className="font-semibold text-gray-900 mb-2">Bob in Review Mode</h4>
                  <p className="text-sm text-gray-600">
                    Screenshot of Bob performing code quality analysis
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-300">
                  <h4 className="font-semibold text-gray-900 mb-2">Bob Task Sessions</h4>
                  <p className="text-sm text-gray-600">
                    Screenshot of exported task session reports
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Judging Checklist */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Hackathon Judging Checklist</h2>
            <div className="bg-gradient-to-r from-primary-50 to-purple-50 rounded-lg p-6 border border-primary-200">
              <p className="text-sm text-gray-700 mb-4">
                Use this checklist to ensure all evidence is ready for hackathon submission:
              </p>
              
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">✅ Bob Usage Evidence</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-2">□</span>
                      <span>Exported task sessions in <code className="bg-gray-100 px-1 rounded">/bob_sessions</code></span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-2">□</span>
                      <span>Screenshots of Bob in different modes</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-2">□</span>
                      <span>Clear documentation of which Bob modes were used</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-2">□</span>
                      <span>Evidence of iterative development with Bob</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">✅ Workflow Demonstrations</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-2">□</span>
                      <span>All 6 workflows have sample outputs</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-2">□</span>
                      <span>Each workflow clearly shows Bob's contribution</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-2">□</span>
                      <span>Sample reports are realistic and valuable</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-2">□</span>
                      <span>Download functionality works for all reports</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">✅ Technical Quality</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-2">□</span>
                      <span>Application builds without errors</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-2">□</span>
                      <span>Deployed to GitHub Pages successfully</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-2">□</span>
                      <span>All pages load and function correctly</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-2">□</span>
                      <span>Responsive design works on mobile</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">✅ Documentation</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-2">□</span>
                      <span>README.md explains the project clearly</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-2">□</span>
                      <span>ROADMAP.md shows development strategy</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-2">□</span>
                      <span>BOB_HACKATHON_STRATEGY.md explains Bob usage</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-2">□</span>
                      <span>Setup instructions are clear and complete</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Integration Documentation */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Integration Documentation</h2>
            <div className="space-y-3">
              <a 
                href="https://github.com/IBM/bob" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-md transition-all"
              >
                <div>
                  <h4 className="font-semibold text-gray-900">IBM Bob Documentation</h4>
                  <p className="text-sm text-gray-600">Learn more about IBM Bob's capabilities</p>
                </div>
                <ExternalLink className="h-5 w-5 text-gray-400" />
              </a>
              
              <div className="p-4 bg-white border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Bob Shell Integration (Optional)</h4>
                <p className="text-sm text-gray-600">
                  While BobFlow demonstrates Bob's capabilities through static samples, 
                  the architecture supports optional local Bob Shell integration for live workflow execution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
