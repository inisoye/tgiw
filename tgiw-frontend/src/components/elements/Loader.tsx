import * as React from 'react';
import clsx from 'clsx';

interface LoaderProps {
  isFullHeight?: boolean;
  isInfiniteLoader?: boolean;
  isAlignedRight?: boolean;
}

export const Loader: React.FunctionComponent<LoaderProps> = ({
  isFullHeight,
  isInfiniteLoader,
  isAlignedRight,
}) => {
  return (
    <>
      <div
        className={clsx(
          'flex items-center justify-center m-auto wrapper w-max h-max',
          {
            /* Screen minus header height on mobile */
            'h-[calc(100vh-71px)] md:h-full min-h-[calc(100vh-71px)]':
              isFullHeight,
            'py-10': isInfiniteLoader,
            'mr-0': isAlignedRight,
          }
        )}
      >
        <div className="text-tgiwPurplish bg-tgiwPurplish dot-flashing before:bg-tgiwPurplish after:bg-tgiwPurplish before:text-tgiwPurplish after:text-tgiwPurplish">
          <p className="sr-only">Loading</p>
        </div>
      </div>

      <style jsx>{`
        .dot-flashing {
          position: relative;
          width: 8px;
          height: 8px;
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
          left: -13px;
          width: 8px;
          height: 8px;
          border-radius: 5px;
          animation: dotFlashing 1s infinite alternate;
          animation-delay: 0s;
        }

        .dot-flashing::after {
          left: 13px;
          width: 8px;
          height: 8px;
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
