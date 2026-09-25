import React, { useState } from 'react';

interface CaseStudyImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
}

/** Reliable case-study hero image with frosted gradient fallback if load fails. */
export const CaseStudyImage: React.FC<CaseStudyImageProps> = ({
  src,
  alt,
  className = '',
  imgClassName = '',
}) => {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-[#05070c] ${className}`}>
      {/* Ambient fallback / loading plane — visible under image and if load fails */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(0,163,224,0.35),transparent_55%),radial-gradient(ellipse_at_80%_80%,rgba(134,188,37,0.22),transparent_50%),linear-gradient(145deg,#0a1220_0%,#000_100%)]"
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden
      />

      {!failed && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className={`relative z-[1] w-full h-full object-cover ${imgClassName}`}
        />
      )}

      {failed && (
        <div className="absolute inset-0 z-[1] flex items-end p-4">
          <span className="text-[11px] font-semibold tracking-wide text-white/80 frosted-glass-inset px-2.5 py-1 rounded-full">
            {alt}
          </span>
        </div>
      )}
    </div>
  );
};
