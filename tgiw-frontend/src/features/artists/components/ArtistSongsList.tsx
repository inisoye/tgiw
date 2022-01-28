import clsx from 'clsx';
import * as React from 'react';
import { useQueryClient } from 'react-query';

import { SearchResultSongCard } from '@/features/search';
import { prefetchSong } from '@/features/songs';
import { Genre, Song } from '@/types';

interface ArtistSongsListProps {
  songs: Song[] | undefined;
  genres: Genre[] | undefined;
}

export const ArtistSongsList: React.FunctionComponent<ArtistSongsListProps> = ({
  songs,
  genres,
}) => {
  const queryClient = useQueryClient();

  return (
    <section
      className={clsx('pt-6 lg:pt-0 flex-shrink-0', {
        'lg:border-l-2 lg:border-gray-100 lg:pl-9 lg:w-3/5': !!genres?.length,
        'lg:w-full': !genres?.length,
      })}
    >
      <h2 className="text-xl">Songs</h2>

      <ul className="w-full mt-4 space-y-3 overflow-auto lg:overflow-visible">
        {songs?.map(({ name: songName, images, id, color }) => {
          const imageUrl = images?.[1]?.url as string;

          return (
            <li
              key={id}
              onMouseEnter={async () => prefetchSong(queryClient, id)}
            >
              <SearchResultSongCard
                id={id}
                name={songName}
                imageUrl={imageUrl}
                color={color}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
};
