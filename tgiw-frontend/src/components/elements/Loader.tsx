import * as React from 'react';
import clsx from 'clsx';

import { VisuallyHidden } from '.';

interface LoaderProps {
  isFullHeight?: boolean;
  isInfiniteLoader?: boolean;
  isAlignedRight?: boolean;
  isSmall?: boolean;
}

export const Loader: React.FunctionComponent<LoaderProps> = ({
  isFullHeight,
  isInfiniteLoader,
  isAlignedRight,
  isSmall,
}) => {
  const size = `${isSmall ? '6' : '8'}px`;

  return (
    <>
      <div
        className={clsx(
          'wrapper m-auto flex h-max w-max items-center justify-center',
          {
            /* Screen minus header height on mobile */
            'h-[calc(100vh-71px)] min-h-[calc(100vh-71px)] md:h-full':
              isFullHeight,
            'py-10': isInfiniteLoader,
            'mr-0': isAlignedRight,
          },
        )}
      >
        <div className="dot-flashing bg-tgiwPurplish text-tgiwPurplish before:bg-tgiwPurplish before:text-tgiwPurplish after:bg-tgiwPurplish after:text-tgiwPurplish">
          <VisuallyHidden>Loading</VisuallyHidden>
        </div>
      </div>

      <style jsx>{`
        .dot-flashing {
          position: relative;
          width: ${size};
          height: ${size};
          border-radius: 5px;
          animation: dotFlashing 1s infinite linear alternate;
          animation-delay: 0.5s;
        }

        .dot-flashing::before,
        .dot-flashing::after {
          content: '';
          display: inline-block;
          position: absolute;
          top: 0;
        }

        .dot-flashing::before {
          left: ${isSmall ? '-10' : '-13'}px;
          width: ${size};
          height: ${size};
          border-radius: 5px;
          animation: dotFlashing 1s infinite alternate;
          animation-delay: 0s;
        }

        .dot-flashing::after {
          left: ${isSmall ? '10' : '13'}px;
          width: ${size};
          height: ${size};
          border-radius: 5px;
          animation: dotFlashing 1s infinite alternate;
          animation-delay: 1s;
        }

        @keyframes dotFlashing {
          0% {
            background-color: #111827;
          }
          50%,
          100% {
            background-color: #d1d5db;
          }
        }
      `}</style>
    </>
  );
};
