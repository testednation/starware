import React, { useState } from 'react';
import { Terminal } from 'lucide-react';

interface ResilientImageProps {
  src?: string;
  alt: string;
  className?: string;
  fallbackTitle: string;
  fallbackSubtitle?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = '',
  fallbackTitle,
  fallbackSubtitle,
}) => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        className={`flex flex-col justify-between p-6 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black border border-zinc-800/80 text-zinc-300 ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="flex items-center justify-between text-xs text-zinc-500 font-mono">
          <span>StarWare Visual Archive</span>
          <span>Offline-First System</span>
        </div>
        <div className="my-auto py-6">
          <Terminal className="w-7 h-7 text-[#F2B705] mb-3 opacity-80" />
          <p className="font-display text-lg font-semibold text-zinc-100 tracking-tight">
            {fallbackTitle}
          </p>
          {fallbackSubtitle && (
            <p className="text-xs text-zinc-400 mt-1">{fallbackSubtitle}</p>
          )}
        </div>
        <div className="text-xs text-zinc-500 font-mono">
          gitflic.ru/user/starware
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};
