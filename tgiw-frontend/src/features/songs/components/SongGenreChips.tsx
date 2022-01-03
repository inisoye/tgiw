import Link from 'next/link';
import * as React from 'react';

import type { Genre } from '@/types';
import { darkenBgColor } from '@/utils';

interface SongGenreChipProps {
  id: string;
  name: string;
  formattedColor: string;
}

export const SongGenreChip: React.FunctionComponent<SongGenreChipProps> = ({
  id,
  name,
  formattedColor,
}) => {
  return (
    <>
      <Link href={`/genres/${id}`}>
        <a className="chip inline-block py-1.5 px-2 text-sm text-white capitalize rounded-md opacity-80 hover:scale-105 active:scale-[0.95] transition ease-in-out duration-300">
          {name}
        </a>
      </Link>

      <style jsx>{`
        .chip {
          background-color: ${formattedColor};
        }
      `}</style>
    </>
  );
};

interface SongGenreChipsProps {
  genres: Genre[];
}

export const SongGenreChips: React.FunctionComponent<SongGenreChipsProps> = ({
  genres,
}) => {
  return (
    <ul className="flex flex-wrap gap-3 mt-4 md:gap-2">
      {genres?.map(({ color, id, name }) => {
        const formattedColor = darkenBgColor(color);

        return (
          <li key={id}>
            <SongGenreChip
              id={id}
              name={name}
              formattedColor={formattedColor}
            />
          </li>
        );
      })}
    </ul>
  );
};
