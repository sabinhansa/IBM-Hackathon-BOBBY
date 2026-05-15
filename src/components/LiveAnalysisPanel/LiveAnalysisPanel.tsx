import { useState } from 'react';
import { Play, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { runWorkflow, isValidRepoUrl, parseRepoUrl } from '../../utils/api';
import type { WorkflowId } from '../../types/api';

interface LiveAnalysisPanelProps {
  workflowId: WorkflowId;
  onSuccess: (content: string, metadata: any) => void;
}

export default function LiveAnalysisPanel({ workflowId, onSuccess }: LiveAnalysisPanelProps) {
  const [repoUrl, setRepoUrl] = useState('');
  const [branch, setBranch] = useState('main');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Validate repository URL
    if (!isValidRepoUrl(repoUrl)) {
      setError('Invalid repository URL. Please use a GitHub, GitLab, or Bitbucket URL.');
      return;
    }

    const repoInfo = parseRepoUrl(repoUrl);
    if (!repoInfo) {
      setError('Could not parse repository URL.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await runWorkflow({
        workflowId,
        repoUrl,
        branch: branch || 'main',
      });

      setSuccess(true);
      onSuccess(response.content, response.metadata);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to run workflow';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border-2 border-blue-200">
      <div className="flex items-center space-x-3 mb-4">
        <div className="bg-blue-600 p-2 rounded-lg">
          <Play className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Live Analysis</h3>
          <p className="text-sm text-gray-600">Run this workflow on any repository</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="repoUrl" className="block text-sm font-medium text-gray-700 mb-1">
            Repository URL
          </label>
          <input
            type="text"
            id="repoUrl"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="https://github.com/owner/repository"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
            required
          />
          <p className="mt-1 text-xs text-gray-500">
            Supports GitHub, GitLab, and Bitbucket repositories
          </p>
        </div>

        <div>
          <label htmlFor="branch" className="block text-sm font-medium text-gray-700 mb-1">
            Branch
          </label>
          <input
            type="text"
            id="branch"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            placeholder="main"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-900">Analysis Failed</p>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start space-x-3">
            <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-green-900">Analysis Complete!</p>
              <p className="text-sm text-green-700 mt-1">
                Scroll down to view the generated report.
              </p>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || !repoUrl}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Analyzing Repository...</span>
            </>
          ) : (
            <>
              <Play className="h-5 w-5" />
              <span>Run Analysis</span>
            </>
          )}
        </button>
      </form>

      <div className="mt-4 pt-4 border-t border-blue-200">
        <p className="text-xs text-gray-600">
          <strong>Note:</strong> Live analysis requires a configured IBM Bob API key on the server.
          If you see errors, the API integration may not be fully configured yet.
        </p>
      </div>
    </div>
  );
}

// Made with Bob