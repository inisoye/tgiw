import * as React from 'react';
import clsx from 'clsx';

import type { Genre } from '@/types';
import { GenreChip } from '@/components/elements';

interface SongGenreChipsProps {
  genres: Genre[];
  isJustifiedLeft?: boolean;
  isBaseTextSize?: boolean;
}

export const SongGenreChips: React.FunctionComponent<SongGenreChipsProps> = ({
  genres,
  isJustifiedLeft,
  isBaseTextSize,
}) => {
  return (
    <ul
      className={clsx('flex max-w-md flex-wrap gap-2 lg:max-w-none', {
        'mx-auto mt-4 justify-center lg:justify-start': !isJustifiedLeft,
        'mt-0 justify-start': isJustifiedLeft,
      })}
    >
      {genres?.map(({ color, id, name }) => {
        return (
          <li key={id}>
            <GenreChip
              id={id}
              name={name}
              color={color}
              isBaseTextSize={isBaseTextSize}
              hasPrefetch
            />
          </li>
        );
      })}
    </ul>
  );
};
