import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center">
      <div className="bg-secondary-light p-8 rounded-lg shadow-xl max-w-lg w-full mx-4">
        <h2 className="text-2xl font-serif font-bold text-primary mb-4">Something went wrong</h2>
        <p className="text-gray-300 mb-6">{error.message}</p>
        <button
          onClick={resetErrorBoundary}
          className="btn btn-primary w-full"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export function ErrorBoundary({ children }) {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Reset the state of your app here
        window.location.href = '/';
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}