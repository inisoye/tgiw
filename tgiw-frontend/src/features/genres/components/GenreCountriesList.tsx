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
        <section className="pb-8 lg:top-10 lg:sticky lg:pr-9 lg:pb-0 ">
          <h2 className="text-xl">Associated Countries</h2>

          <ul className="flex flex-wrap gap-2 mt-4">
            {countries?.map((country, index) => {
              return (
                <li key={country} className="py-1.5 px-2 bg-gray-200">
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
