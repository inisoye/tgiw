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
      className={clsx('flex flex-wrap max-w-md gap-2 lg:max-w-none', {
        'justify-center lg:justify-start mt-4 mx-auto': !isJustifiedLeft,
        'justify-start mt-0': isJustifiedLeft,
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
