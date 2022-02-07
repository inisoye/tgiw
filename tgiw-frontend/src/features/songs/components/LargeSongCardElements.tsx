import * as React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { useQueryClient } from 'react-query';

import type { Artist } from '@/types';
import { ImageWithFallback, SpotifyLink } from '@/components/elements';
import { prefetchArtist } from '@/features/artists';

interface LargeSongCardImageProps {
  imageUrl: string;
  name: string;
}

export const LargeSongCardImage: React.FunctionComponent<
  LargeSongCardImageProps
> = ({ imageUrl, name }) => {
  return (
    <div className="w-1/2 min-w-[150px] max-w-[250px] overflow-hidden rounded-md mx-auto lg:mx-0">
      <ImageWithFallback
        src={imageUrl}
        fallbackSrc="/images/song.jpg"
        alt={name}
        width="100%"
        height="100%"
        layout="responsive"
        objectFit="contain"
      />
    </div>
  );
};

interface ArtistLinkProps {
  id: string;
  name: string;
  imageUrl: string;
}

export const ArtistLink: React.FunctionComponent<ArtistLinkProps> = ({
  id,
  name,
  imageUrl,
}) => {
  const queryClient = useQueryClient();

  return (
    <Link href={`/artists/${id}`}>
      <a
        className="flex items-center px-3 py-1.5 space-x-3 transition duration-500 ease-in-out bg-black rounded-md bg-opacity-10 hover:scale-105 active:scale-[0.95]"
        // onMouseEnter={async () => prefetchArtist(queryClient, id)}
      >
        <div className="w-8 h-8 overflow-hidden rounded-full shrink-0">
          <ImageWithFallback
            src={imageUrl}
            key={id}
            fallbackSrc="/images/artist.jpg"
            alt={name}
            width="100%"
            height="100%"
            layout="responsive"
            objectFit="contain"
          />
        </div>
        <span className="truncate text-tgiwPurplish shrink text-opacity-90">
          {name}
        </span>
      </a>
    </Link>
  );
};

interface ArtistLinksProps {
  artists: Artist[] | undefined;
  isJustifiedRight?: boolean;
}

export const ArtistLinks: React.FunctionComponent<ArtistLinksProps> = ({
  artists,
  isJustifiedRight,
}) => {
  return (
    <ul
      className={clsx(
        'flex flex-wrap gap-2 mx-auto lg:mx-0 lg:inline-flex lg:w-full',
        {
          'justify-center lg:justify-end mt-10': isJustifiedRight,
          'justify-start lg:justify-start': !isJustifiedRight,
        }
      )}
    >
      {artists?.map(({ id, name, images }) => {
        const imageUrl = images?.[2]?.url;

        return (
          <li key={id} className="w-max max-w-[90%] lg:inline">
            <ArtistLink id={id} name={name} imageUrl={imageUrl} />
          </li>
        );
      })}
    </ul>
  );
};

interface SnippetButtonProps {
  isLoading: boolean;
  toggle: () => void;
  isPlaying: boolean;
}

export const SnippetButton: React.FunctionComponent<SnippetButtonProps> = ({
  isLoading,
  toggle,
  isPlaying,
}) => {
  return (
    <button
      disabled={isLoading}
      onClick={toggle}
      className="inline-flex items-center p-2 px-3 space-x-2 text-sm transition duration-500 ease-in-out rounded-md bg-tgiwYellow hover:scale-105 active:scale-[0.95] disabled:opacity-50"
    >
      <span>Snippet {isLoading && 'Loading'}</span>
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
              className="fill-tgiwPurplish"
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
              className="fill-tgiwPurplish"
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

export const LargeSongCardActionButtons: React.FunctionComponent<
  LargeSongCardActionButtonsProps
> = ({ duration, toggle, isPlaying, spotifyUrl }) => {
  return (
    <ul className="inline-flex flex-wrap justify-center w-full gap-2 mt-10 lg:justify-end">
      <li className="inline w-max">
        <SnippetButton
          isLoading={!duration}
          toggle={toggle}
          isPlaying={isPlaying}
        />
      </li>

      <li className="inline w-max">
        <SpotifyLink spotifyUrl={spotifyUrl} />
      </li>
    </ul>
  );
};

interface TrackProgressMeterProps {
  trackProgressPercentage: number;
}

/* Progress meters left as div elements as to be used by sighted users only */
export const TrackProgressMeter: React.FunctionComponent<
  TrackProgressMeterProps
> = ({ trackProgressPercentage }) => {
  return (
    <>
      <div className="w-full h-3 mt-3 bg-black rounded-sm bg-opacity-5">
        <div className="h-full transition-all duration-200 ease-linear rounded-sm bg-tgiwPurplish meter-length"></div>
      </div>

      <style jsx>{`
        .meter-length {
          width: ${`${trackProgressPercentage}%`};
        }
      `}</style>
    </>
  );
};
