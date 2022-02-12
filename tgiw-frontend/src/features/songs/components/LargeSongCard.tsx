import * as React from 'react';

import {
  ArtistLinks,
  LargeSongCardActionButtons,
  LargeSongCardImage,
  TrackProgressMeter,
} from '@/features/songs';
import type { Artist } from '@/types';

interface LargeSongCardProps {
  imageUrl: string;
  name: string | undefined;
  artists: Artist[] | undefined;
  duration: number;
  toggle: () => void;
  isPlaying: boolean;
  spotifyUrl: string | undefined;
  trackProgressPercentage: number;
  color: string | undefined;
}

export const LargeSongCard: React.FunctionComponent<LargeSongCardProps> = ({
  imageUrl,
  name,
  artists,
  duration,
  toggle,
  isPlaying,
  spotifyUrl,
  trackProgressPercentage,
  color,
}) => {
  return (
    <>
      <section className="card-background w-full rounded-md p-6">
        <div className="mx-auto rounded-md bg-black bg-opacity-5 p-4 text-center lg:flex lg:justify-between lg:space-x-6 lg:text-left">
          <LargeSongCardImage imageUrl={imageUrl} name={name as string} />

          <div className="lg:w-[60%] lg:max-w-[60%] lg:text-right">
            <h1 className="mx-10 mt-10 break-words text-4xl text-tgiwPurplish lg:mx-0 lg:mt-0 lg:text-5xl">
              {name}
            </h1>

            <ArtistLinks artists={artists} isJustifiedRight />

            <LargeSongCardActionButtons
              duration={duration}
              toggle={toggle}
              isPlaying={isPlaying}
              spotifyUrl={spotifyUrl}
            />
          </div>
        </div>

        <TrackProgressMeter trackProgressPercentage={trackProgressPercentage} />
      </section>

      <style jsx>{`
        .card-background {
          background-color: ${color};
        }
      `}</style>
    </>
  );
};
