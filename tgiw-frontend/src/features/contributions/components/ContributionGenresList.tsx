import * as React from 'react';

interface ContributorGenresListProps {
  genreNames: string[] | undefined;
}

export const ContributorGenresList: React.FunctionComponent<
  ContributorGenresListProps
> = ({ genreNames }) => {
  return (
    <div className="relative w-4/6 p-8 ml-auto mr-8 bg-white -top-20">
      {genreNames?.length ? (
        <>
          <h2 className="pb-4 text-xl text-gray-900 border-b-2 border-b-gray-900">
            Associated Genres
          </h2>

          <ul className="border-b-2 divide-y-2 divide-gray-900 border-b-gray-900">
            {genreNames?.map((g) => {
              return (
                <li key={g} className="py-4 text-gray-900 capitalize">
                  {g}
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <p className="text-lg text-center text-red-700">No genres found</p>
      )}
    </div>
  );
};
