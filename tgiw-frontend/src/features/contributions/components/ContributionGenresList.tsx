import * as React from 'react';

interface ContributorGenresListProps {
  genreNames: string[] | undefined;
}

export const ContributorGenresList: React.FunctionComponent<
  ContributorGenresListProps
> = ({ genreNames }) => {
  return (
    <div className="relative -top-20 ml-auto mr-8 w-4/6 bg-white p-8">
      {genreNames?.length ? (
        <>
          <h2 className="border-b-2 border-b-gray-900 pb-4 text-xl text-gray-900">
            Associated Genres
          </h2>

          <ul className="divide-y-2 divide-gray-900 border-b-2 border-b-gray-900">
            {genreNames?.map(g => {
              return (
                <li key={g} className="py-4 capitalize text-gray-900">
                  {g}
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <p className="text-center text-lg text-red-700">No genres found</p>
      )}
    </div>
  );
};
