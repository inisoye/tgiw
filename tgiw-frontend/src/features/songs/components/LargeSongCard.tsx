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
      <section className="w-full p-6 rounded-md card-background">
        <div className="p-4 mx-auto text-center bg-black rounded-md bg-opacity-5 lg:text-left lg:flex lg:justify-between lg:space-x-6">
          <LargeSongCardImage imageUrl={imageUrl} name={name as string} />

          <div className="lg:text-right lg:w-[60%] lg:max-w-[60%]">
            <h1 className="mx-10 mt-10 text-4xl break-words text-tgiwPurplish lg:mx-0 lg:mt-0 lg:text-5xl">
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
