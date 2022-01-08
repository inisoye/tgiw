import * as React from 'react';
import { useQueryClient } from 'react-query';

import type { Song } from '@/types';
import { prefetchSong } from '../api';
import { SongCard } from '@/features/songs';

interface SongsListProps {
  songs: Song[] | undefined;
}

export const SongsList: React.FunctionComponent<SongsListProps> = ({
  songs,
}) => {
  const queryClient = useQueryClient();

  return (
    <ul
      aria-label="songs"
      className="grid max-w-xs grid-cols-1 gap-8 mx-auto sm:max-w-xl sm:grid-cols-2 md:grid-cols-2 lg:max-w-4xl xl:mx-0 xl:max-w-none lg:grid-cols-3 xl:grid-cols-4"
    >
      {songs?.map((song) => {
        return (
          <li
            key={song.id}
            onMouseEnter={async () => prefetchSong(queryClient, song.id)}
          >
            <SongCard song={song} />
          </li>
        );
      })}
    </ul>
  );
};
