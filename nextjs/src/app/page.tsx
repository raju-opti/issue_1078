import { getOptimizelyDecision } from '@/lib/optimizely';

export default async function Home() {
  // Perform Optimizely decision on each request
  const decision = await getOptimizelyDecision();

  return (
    <div className="font-sans min-h-screen p-8 flex items-center justify-center">
      <main className="max-w-2xl w-full">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Optimizely Feature Flag Result
          </h1>
          
          <div className="space-y-4">
            <div className="border-2 border-blue-200 dark:border-blue-700 rounded-lg p-4 bg-blue-50 dark:bg-blue-900/20">
              <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-2">
                Variation Key
              </h2>
              <p className="text-2xl font-mono text-blue-900 dark:text-blue-100">
                {decision.variationKey || 'null'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">Enabled</h3>
                <p className="text-lg font-mono text-gray-900 dark:text-gray-100">
                  {decision.enabled ? 'true' : 'false'}
                </p>
              </div>

              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">Rule Key</h3>
                <p className="text-lg font-mono text-gray-900 dark:text-gray-100">
                  {decision.ruleKey || 'null'}
                </p>
              </div>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Variables</h3>
              <pre className="text-sm bg-gray-100 dark:bg-gray-900 p-3 rounded overflow-x-auto">
                {JSON.stringify(decision.variables, null, 2)}
              </pre>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Reasons</h3>
              <div className="space-y-1">
                {decision.reasons.length > 0 ? (
                  decision.reasons.map((reason, index) => (
                    <p key={index} className="text-sm bg-gray-100 dark:bg-gray-900 p-2 rounded">
                      {reason}
                    </p>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400">No reasons provided</p>
                )}
              </div>
            </div>

            {decision.error && (
              <div className="border-2 border-red-200 dark:border-red-700 rounded-lg p-4 bg-red-50 dark:bg-red-900/20">
                <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">Error</h3>
                <p className="text-sm text-red-700 dark:text-red-300">{decision.error}</p>
              </div>
            )}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This page uses a server component that calls Optimizely on each request.
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              Refresh the page to make another decision call.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
