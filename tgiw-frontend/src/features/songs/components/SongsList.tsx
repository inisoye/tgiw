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
      className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
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
