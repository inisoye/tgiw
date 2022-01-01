import * as React from 'react';
import { SongCard } from '@/features/songs';

import { PaginatedResponse, Song } from '@/types';

interface SongsListProps {
  songs: PaginatedResponse<Song[]> | undefined;
}

export const SongsList: React.FunctionComponent<SongsListProps> = ({
  songs,
}) => {
  return (
    <ul
      aria-label="songs"
      className="grid grid-cols-2 gap-8 mt-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
      {songs?.data.map((song) => {
        return (
          <li key={song.id}>
            <SongCard song={song} />
          </li>
        );
      })}
    </ul>
  );
};
