import * as React from 'react';
import Link from 'next/link';

import type { Song } from '@/types';
import { pickArtistsNames } from '@/utils';
import { ImageWithFallback } from '@/components/elements';

interface SongCardProps {
  song: Song;
}

export const SongCard: React.FunctionComponent<SongCardProps> = ({ song }) => {
  const { name, artists, images, yearReleased, id, color } = song;

  const imageUrl = images?.[0]?.url as string;
  const artistsNames = pickArtistsNames(artists);

  return (
    <>
      <Link href={`/songs/${id}`}>
        <a>
          <div className="p-4 text-center transition duration-300 ease-in-out rounded-md shadow-lg card-background hover:filter-none hover:scale-[1.02] active:scale-[0.98] hover:shadow-none">
            <div className="overflow-hidden rounded-md">
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
            <p className="max-w-full mt-4 text-lg text-gray-800 truncate font-heading">
              {name}
            </p>
            <div className="flex items-center justify-center mt-1 space-x-2 text-sm text-gray-800 text-opacity-70">
              <p className="truncate max-w-[80%]">{artistsNames}</p>
              <div>&#8226;</div>
              <p>{yearReleased}</p>
            </div>
          </div>
        </a>
      </Link>

      <style jsx>{`
        .card-background {
          background-color: ${color};
        }
      `}</style>
    </>
  );
};
