import * as React from 'react';
import type { InfiniteData } from 'react-query';

import type { PaginatedResponse, Song } from '@/types';
import { SongCard } from '@/features/songs';

interface SongsListProps {
  songs: Song[] | undefined;
}

export const SongsList: React.FunctionComponent<SongsListProps> = ({
  songs,
}) => {
  return (
    <ul
      aria-label="songs"
      className="grid max-w-xs grid-cols-1 gap-8 mx-auto sm:mx-0 sm:max-w-none sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {songs?.map((song) => {
        return (
          <li key={song.id}>
            <SongCard song={song} />
          </li>
        );
      })}
    </ul>
  );
};
