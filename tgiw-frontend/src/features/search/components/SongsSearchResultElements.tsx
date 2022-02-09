import * as React from 'react';
import Link from 'next/link';
import { useQueryClient } from 'react-query';

import { ImageWithFallback } from '@/components/elements';
import { Song } from '@/types';
import { pickArtistsNames } from '@/utils';
import { prefetchSong } from '@/features/songs';

interface SearchResultSongsProps {
  songs: Song[] | undefined;
}

export const SearchResultSongs: React.FunctionComponent<
  SearchResultSongsProps
> = ({ songs }) => {
  const queryClient = useQueryClient();

  return (
    <ul className="space-y-3 overflow-auto lg:overflow-visible max-h-[22.3rem] lg:grid lg:grid-cols-2 lg:space-y-0 lg:gap-3 lg:max-h-[16.5rem]">
      {songs?.slice(0, 4).map(({ name, artists, images, id, color }) => {
        const imageUrl = images?.[1]?.url as string;
        const artistsNames = pickArtistsNames(artists);

        return (
          <li
            key={id}
            // onMouseEnter={async () => prefetchSong(queryClient, id)}
          >
            <SearchResultSongCard
              id={id}
              name={name}
              imageUrl={imageUrl}
              artistsNames={artistsNames}
              color={color}
            />
          </li>
        );
      })}
    </ul>
  );
};

interface SearchResultSongCardProps {
  id: string;
  imageUrl: string;
  name: string;
  artistsNames?: string;
  color: string;
}

export const SearchResultSongCard: React.FunctionComponent<
  SearchResultSongCardProps
> = ({ id, imageUrl, name, artistsNames, color }) => {
  return (
    <Link href={`/songs/${id}`}>
      <a className="block w-full p-2 rounded-md md:inline-block song-background lg:hover:scale-[1.02] lg:active:scale-[0.98] transition duration-300 ease-in-out">
        <div className="flex items-center space-x-4">
          <div className="w-12 overflow-hidden rounded-md shrink-0">
            <ImageWithFallback
              key={id}
              src={imageUrl}
              fallbackSrc="/images/song.jpg"
              alt={name}
              width="100%"
              height="100%"
              objectFit="cover"
              className="relative w-full h-full"
            />
          </div>

          <div className="w-[calc(100%_-_5.5rem)]">
            <p className="w-[100%] truncate">{name}</p>
            {artistsNames && (
              <p className="w-[100%] truncate text-sm text-tgiwPurplish text-opacity-50">
                {artistsNames}
              </p>
            )}
          </div>
        </div>

        <style jsx>{`
          .song-background {
            background-color: ${color};
          }
        `}</style>
      </a>
    </Link>
  );
};
