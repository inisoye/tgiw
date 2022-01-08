import Link from 'next/link';
import * as React from 'react';

import type { Genre } from '@/types';

interface SongGenreChipProps {
  id: string;
  name: string;
  color: string;
}

export const SongGenreChip: React.FunctionComponent<SongGenreChipProps> = ({
  id,
  name,
  color,
}) => {
  return (
    <>
      <Link href={`/genres/${id}`}>
        <a className="chip inline-block py-1.5 px-2 text-sm text-white capitalize rounded-md hover:scale-105 active:scale-[0.95] transition ease-in-out duration-300">
          {name}
        </a>
      </Link>

      <style jsx>{`
        .chip {
          background-color: ${color};
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
        return (
          <li key={id}>
            <SongGenreChip id={id} name={name} color={color} />
          </li>
        );
      })}
    </ul>
  );
};
