import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Health Check Endpoint
 * GET /api/health
 * 
 * Returns the health status of the API and whether Bob API is configured.
 * NEVER exposes the actual API key value.
 */
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  // Only allow GET requests
  if (req.method !== 'GET') {
    res.status(405).json({
      ok: false,
      error: 'Method not allowed. Use GET.'
    });
    return;
  }

  const apiKey = process.env.BOB_API_KEY;
  const apiEndpoint = process.env.BOB_API_ENDPOINT || 'https://api.bob.ibm.com/v1';
  const liveModeEnabled = true;

  // Check if API key is configured (but never expose its value!)
  const isApiKeyConfigured = !!apiKey && apiKey.length > 0 && apiKey !== 'your_bob_api_key_here';

  res.status(200).json({
    ok: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    config: {
      apiKeyConfigured: isApiKeyConfigured,
      apiEndpoint: apiEndpoint,
      liveModeEnabled: liveModeEnabled,
    },
    message: isApiKeyConfigured
      ? 'API is ready for live workflow analysis'
      : 'API key not configured. Set BOB_API_KEY environment variable to enable live mode.',
  });
}

// Made with Bob
