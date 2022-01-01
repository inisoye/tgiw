import * as React from 'react';

interface SnippetButtonProps {
  toggle: () => void;
  isPlaying: boolean;
}

export const SnippetButton: React.FunctionComponent<SnippetButtonProps> = ({
  toggle,
  isPlaying,
}) => {
  return (
    <button
      onClick={toggle}
      className="inline-flex items-center p-2 px-3 space-x-2 text-sm transition duration-500 ease-in-out rounded-md bg-tgiwYellow hover:bg-opacity-70 active:scale-90"
    >
      <span>
        <span className="sr-only">{!isPlaying ? 'Play ' : 'Pause '}</span>
        Snippet
      </span>
      <span>
        {!isPlaying ? (
          <svg
            width={16}
            height={16}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8 16A8 8 0 1 0 8-.001 8 8 0 0 0 8 16ZM7.555 5.168A1 1 0 0 0 6 6v4a1 1 0 0 0 1.555.832l3-2a.999.999 0 0 0 0-1.664l-3-2Z"
              className="fill-slate-800"
            />
          </svg>
        ) : (
          <svg
            width={16}
            height={16}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16 8A8 8 0 1 1-.001 8 8 8 0 0 1 16 8ZM5 6a1 1 0 0 1 2 0v4a1 1 0 1 1-2 0V6Zm5-1a1 1 0 0 0-1 1v4a1 1 0 1 0 2 0V6a1 1 0 0 0-1-1Z"
              className="fill-slate-800"
            />
          </svg>
        )}
      </span>
    </button>
  );
};
