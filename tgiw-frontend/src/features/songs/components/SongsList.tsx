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
      className="mx-auto mt-2 grid grid-cols-2 gap-4 sm:max-w-xl sm:gap-8 md:grid-cols-2 lg:max-w-4xl lg:grid-cols-3 xl:mx-0 xl:max-w-none xl:grid-cols-4"
    >
      {songs?.map(song => {
        return (
          <li
            key={song.id}
            // onMouseEnter={async () => prefetchSong(queryClient, song.id)}
          >
            <SongCard song={song} />
          </li>
        );
      })}
    </ul>
  );
};
