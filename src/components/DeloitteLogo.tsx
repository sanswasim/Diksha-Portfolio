import React from 'react';

interface DeloitteLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const DeloitteLogo: React.FC<DeloitteLogoProps> = ({ className = '', size = 'md' }) => {
  const sizeMap = {
    sm: { height: 18, dotSize: 4.5, fontSize: 'text-lg', dotMargin: 'ml-0.5' },
    md: { height: 24, dotSize: 6, fontSize: 'text-2xl', dotMargin: 'ml-1' },
    lg: { height: 32, dotSize: 8, fontSize: 'text-3xl', dotMargin: 'ml-1.5' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex items-baseline select-none ${className}`} aria-label="Deloitte">
      {/* Official Geometric Deloitte Wordmark */}
      <span
        className={`font-black tracking-[-0.05em] text-white ${currentSize.fontSize} leading-none font-sans`}
        style={{ letterSpacing: '-0.045em' }}
      >
        Deloitte
      </span>
      {/* Signature Deloitte Green Dot */}
      <span
        className={`inline-block rounded-full bg-[#86bc25] shadow-[0_0_10px_rgba(134,188,37,0.85)] ${currentSize.dotMargin} self-baseline`}
        style={{
          width: `${currentSize.dotSize}px`,
          height: `${currentSize.dotSize}px`,
          transform: 'translateY(-1px)',
        }}
      />
    </div>
  );
};
