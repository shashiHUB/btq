import React from 'react';
import { Loader } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-secondary/80 backdrop-blur-sm flex items-center justify-center z-50">
      <Loader className="w-8 h-8 text-primary animate-spin" />
    </div>
  );
}