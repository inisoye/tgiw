import * as React from 'react';

import { Genre } from '@/types';
import { GenreChip } from '@/components/elements';

interface ArtistGenreChipsProps {
  genres: Genre[] | undefined;
}

export const ArtistGenreChips: React.FunctionComponent<
  ArtistGenreChipsProps
> = ({ genres }) => {
  return (
    <>
      {!!genres?.length && (
        <section className="pb-8 lg:top-10 lg:sticky lg:pr-9 lg:pb-0 ">
          <h2 className="text-xl">Genres</h2>

          <ul className="flex flex-wrap gap-2 mt-4">
            {genres?.map(({ color, id, name }) => {
              return (
                <li key={id}>
                  <GenreChip id={id} name={name} color={color} hasPrefetch />
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </>
  );
};
