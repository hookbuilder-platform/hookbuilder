function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Hook<span className="text-primary-600">Builder</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            No-code platform for building, testing, and deploying DeFi automation strategies using Uniswap V4 Hooks
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="card">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Visual Builder</h3>
            <p className="text-gray-600">Drag-and-drop interface for creating complex DeFi strategies without coding</p>
          </div>

          <div className="card">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Uniswap V4 Hooks</h3>
            <p className="text-gray-600">First-class support for Uniswap V4 hooks with pre-built templates</p>
          </div>

          <div className="card">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Strategy Marketplace</h3>
            <p className="text-gray-600">Discover, share, and monetize proven DeFi automation strategies</p>
          </div>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-medium text-yellow-800">Development in Progress</p>
              <p className="text-sm text-yellow-700">POC Evidence: Repository initialized • v0.0.1 tag created • CI/CD configured</p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex gap-4">
            <button className="btn-primary">
              View Documentation
            </button>
            <button className="btn-secondary">
              Grant Applications
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App