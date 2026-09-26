import React, { useState } from 'react';
import logoTransparent from '../assets/logo-transparent.png';
import logoOriginal from '../assets/logo.png';

interface LogoProps {
  className?: string;
  variant?: 'color' | 'white';
  showSlogan?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'color',
  showSlogan = true,
  size = 'md',
}) => {
  const [hasError, setHasError] = useState(false);
  const isWhite = variant === 'white';

  const imgSizeClass =
    size === 'sm'
      ? 'h-9 w-auto max-w-[42px]'
      : size === 'lg'
      ? 'h-16 sm:h-20 w-auto'
      : 'h-11 sm:h-13 w-auto';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official Company Logo Image (https://imgur.com/3tsMjKN.png preserved exactly) */}
      {!hasError ? (
        <div
          className={`relative shrink-0 flex items-center justify-center rounded-xl overflow-hidden transition-all ${
            isWhite
              ? 'bg-white p-1 ring-2 ring-white/30 shadow-md'
              : 'p-0.5'
          }`}
        >
          <img
            src={isWhite ? logoOriginal : logoTransparent}
            alt="Adinkra Frontiers Ltd official logo"
            className={`${imgSizeClass} object-contain transition-transform`}
            onError={() => setHasError(true)}
            loading="eager"
          />
        </div>
      ) : (
        <div className="relative shrink-0 p-1 bg-white rounded-lg">
          <img
            src="/logo.png"
            alt="Adinkra Frontiers Ltd official logo"
            className={`${imgSizeClass} object-contain`}
          />
        </div>
      )}

      {/* Brand Typography */}
      <div className="flex flex-col leading-tight">
        <div className="flex items-baseline gap-1.5">
          <span
            className="text-lg md:text-xl font-extrabold tracking-tight"
            style={{ color: isWhite ? '#FFFFFF' : '#0738A6' }}
          >
            ADINKRA
          </span>
          <span
            className="text-lg md:text-xl font-extrabold tracking-tight text-[#F5A300]"
          >
            FRONTIERS
          </span>
          <span
            className="text-xs font-bold tracking-wider"
            style={{ color: isWhite ? '#FFF8ED' : '#082B66' }}
          >
            LTD
          </span>
        </div>
        {showSlogan && (
          <span
            className="text-[10px] md:text-[11px] font-semibold tracking-wide uppercase line-clamp-1"
            style={{ color: isWhite ? 'rgba(255, 248, 237, 0.9)' : '#082B66' }}
          >
            Expanding the frontiers of poultry agribusiness
          </span>
        )}
      </div>
    </div>
  );
};
