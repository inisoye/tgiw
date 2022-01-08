import * as React from 'react';
import clsx from 'clsx';

interface LoaderProps {
  isFullHeight?: boolean;
  isInfiniteLoader?: boolean;
}

export const Loader: React.FunctionComponent<LoaderProps> = ({
  isFullHeight,
  isInfiniteLoader,
}) => {
  return (
    <>
      <div
        className={clsx(
          'flex items-center justify-center m-auto wrapper w-max h-max',
          {
            /* Screen minus header height on mobile */
            'h-[calc(100vh-71px)] md:h-full': isFullHeight,
            'py-10': isInfiniteLoader,
          }
        )}
      >
        <div className="text-gray-800 bg-gray-800 dot-flashing before:bg-gray-800 after:bg-gray-800 before:text-gray-800 after:text-gray-800">
          <p className="sr-only">Loading</p>
        </div>
      </div>

      <style jsx>{`
        .dot-flashing {
          position: relative;
          width: 9px;
          height: 9px;
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
          left: -15px;
          width: 9px;
          height: 9px;
          border-radius: 5px;
          animation: dotFlashing 1s infinite alternate;
          animation-delay: 0s;
        }

        .dot-flashing::after {
          left: 15px;
          width: 9px;
          height: 9px;
          border-radius: 5px;
          animation: dotFlashing 1s infinite alternate;
          animation-delay: 1s;
        }

        @keyframes dotFlashing {
          0% {
            background-color: #1f2937;
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
