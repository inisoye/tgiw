import * as React from 'react';
import { useQueryClient } from 'react-query';

import type { Song } from '@/types';
import { SongCard, prefetchSong } from '@/features/songs';

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
      className="grid grid-cols-2 gap-8 mx-auto mt-2 sm:max-w-xl md:grid-cols-2 lg:max-w-4xl xl:mx-0 xl:max-w-none lg:grid-cols-3 xl:grid-cols-4"
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
