import * as React from 'react';
import Image from 'next/image';

import { SpotifyLink } from '@/components/elements';

interface LargeSongCardImageProps {
  imageUrl: string;
  name: string | undefined;
}

export const LargeSongCardImage: React.FunctionComponent<LargeSongCardImageProps> =
  ({ imageUrl, name }) => {
    return (
      <div className="w-1/2 min-w-[150px] max-w-[250px] overflow-hidden rounded-md mx-auto md:mx-0">
        <Image
          src={imageUrl}
          alt={name}
          width="100%"
          height="100%"
          layout="responsive"
          objectFit="contain"
        />
      </div>
    );
  };

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

interface LargeSongCardActionButtonsProps {
  duration: number;
  toggle: () => void;
  isPlaying: boolean;
  spotifyUrl: string | undefined;
}

export const LargeSongCardActionButtons: React.FunctionComponent<LargeSongCardActionButtonsProps> =
  ({ duration, toggle, isPlaying, spotifyUrl }) => {
    return (
      <ul className="inline-flex flex-wrap justify-center w-full gap-2 mt-6 md:justify-end">
        {!!duration && (
          <li className="inline w-max">
            <SnippetButton toggle={toggle} isPlaying={isPlaying} />
          </li>
        )}
        <li className="inline w-max">
          <SpotifyLink spotifyUrl={spotifyUrl} />
        </li>
      </ul>
    );
  };

interface TrackProgressMeterProps {
  duration: number;
  trackProgressPercentage: number;
}

/* Progress meters left as div elements as to be used by sighted users only */
export const TrackProgressMeter: React.FunctionComponent<TrackProgressMeterProps> =
  ({ duration, trackProgressPercentage }) => {
    return (
      <>
        {!!duration && (
          <div className="w-full h-3 mt-3 bg-black rounded-sm bg-opacity-5">
            <div
              style={{ width: `${trackProgressPercentage}%` }}
              className="h-full transition-all duration-200 ease-linear rounded-sm bg-slate-800"
            ></div>
          </div>
        )}
      </>
    );
  };
