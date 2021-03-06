import * as React from 'react';
import Link from 'next/link';
import { useQueryClient } from 'react-query';

import { ImageWithFallback } from '@/components/elements';
import { Song } from '@/types';
import { pickArtistsNames } from '@/utils';
import { prefetchSongDetails } from '@/features/contributions';

interface SearchResultSongsProps {
  songs: Song[] | undefined;
}

export const SearchResultSongs: React.FunctionComponent<
  SearchResultSongsProps
> = ({ songs }) => {
  const queryClient = useQueryClient();

  return (
    <ul className="mt-4 space-y-6 px-8 md:mx-auto md:grid md:max-w-[1328px] md:grid-cols-2 md:gap-6 md:space-y-0 md:px-14 lg:grid-cols-3">
      {songs?.map(({ name, artists, images, id, color, spotifyId }) => {
        const imageUrl = images?.[1]?.url as string;
        const artistsNames = pickArtistsNames(artists);

        return (
          <li
            key={spotifyId}
            onMouseEnter={async () =>
              prefetchSongDetails(queryClient, spotifyId)
            }
          >
            <SearchResultSongCard
              name={name}
              imageUrl={imageUrl}
              artistsNames={artistsNames}
              color={color}
              spotifyId={spotifyId}
            />
          </li>
        );
      })}
    </ul>
  );
};

interface SearchResultSongCardProps {
  imageUrl: string;
  name: string;
  artistsNames: string;
  color: string;
  spotifyId: string;
}

export const SearchResultSongCard: React.FunctionComponent<
  SearchResultSongCardProps
> = ({ imageUrl, name, artistsNames, spotifyId }) => {
  return (
    <Link href={`/genre-finder/${spotifyId}`}>
      <a className="block w-full rounded-md bg-black bg-opacity-40 p-3 transition duration-300 ease-in-out hover:bg-tgiwPurplish md:inline-block lg:hover:scale-[1.02] lg:active:scale-[0.98]">
        <div className="flex items-center space-x-4">
          <div className="w-16 shrink-0 overflow-hidden rounded-md">
            <ImageWithFallback
              key={spotifyId}
              src={imageUrl}
              fallbackSrc="/images/song.jpg"
              alt={name}
              width="100%"
              height="100%"
              objectFit="cover"
              className="relative h-full w-full"
            />
          </div>

          <div className="w-[calc(100%_-_5.5rem)]">
            <p className="w-[100%] truncate">{name}</p>
            <p className="w-[100%] truncate text-sm text-white text-opacity-50">
              {artistsNames}
            </p>
          </div>
        </div>
      </a>
    </Link>
  );
};
