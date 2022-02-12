import * as React from 'react';

interface GenreCountriesListProps {
  countries: string[] | undefined;
  flags: (string | undefined)[];
}

export const GenreCountriesList: React.FunctionComponent<
  GenreCountriesListProps
> = ({ countries, flags }) => {
  return (
    <>
      {!!countries?.length && (
        <section className="pb-8 lg:sticky lg:top-10 lg:pr-9 lg:pb-0 ">
          <h2 className="text-xl">Associated Countries</h2>

          <ul className="mt-4 flex flex-wrap gap-2">
            {countries?.map((country, index) => {
              return (
                <li key={country} className="bg-gray-200 py-1.5 px-2">
                  {country} {flags[index]}
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </>
  );
};
