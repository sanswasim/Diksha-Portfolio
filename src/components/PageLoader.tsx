import React from 'react';

export const PageLoader: React.FC = () => (
  <div className="min-h-[60vh] flex items-center justify-center" role="status" aria-live="polite">
    <div className="flex flex-col items-center gap-3">
      <div className="w-9 h-9 rounded-full border-2 border-white/15 border-t-[#86bc25] animate-spin" />
      <span className="text-xs font-medium text-[#9ca3af]">Loading section…</span>
    </div>
  </div>
);
