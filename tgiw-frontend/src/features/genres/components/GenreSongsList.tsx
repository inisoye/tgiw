import * as React from 'react';
import clsx from 'clsx';

import { Song } from '@/types';
import { SearchResultSongCard } from '@/features/search';
import { prefetchSong } from '@/features/songs';
import { useQueryClient } from 'react-query';

interface GenreSongsListProps {
  countries: string[] | undefined;
  songs: Song[] | undefined;
}

export const GenreSongsList: React.FunctionComponent<GenreSongsListProps> = ({
  countries,
  songs,
}) => {
  const queryClient = useQueryClient();

  return (
    <section
      className={clsx('pt-6 lg:pt-0 flex-shrink-0', {
        'lg:border-l-2 lg:border-gray-100 lg:pl-9 lg:w-3/5':
          !!countries?.length,
        'lg:w-full': !countries?.length,
      })}
    >
      <h2 className="text-xl">Associated Songs</h2>

      <ul className="w-full mt-4 space-y-3 overflow-auto lg:overflow-visible">
        {songs?.map(({ name: songName, images, id, color }) => {
          const imageUrl = images?.[1]?.url as string;

          return (
            <li
              key={id}
              // onMouseEnter={async () => prefetchSong(queryClient, id)}
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
