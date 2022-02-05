import * as React from 'react';
import debounceFn from 'debounce-fn';

import {
  SearchInput,
  SearchResultSongs,
  useSearchResults,
} from '@/features/contributions';
import { Loader } from '@/components/elements';
import Head from 'next/head';

interface GenreFinderProps {}

export const GenreFinder: React.FunctionComponent<GenreFinderProps> = () => {
  const [filter, setFilter] = React.useState('');

  const {
    data: songs,
    isLoading,
    isRefetching,
    isError,
    refetch,
  } = useSearchResults(filter);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const debouncedRefetch = React.useMemo(
    () => debounceFn(refetch, { wait: 500 }),
    [refetch]
  );

  const isErrorMessageDisplayed = !songs?.length && !!filter && !isRefetching;
  const isResultsOrSuggestionsHeadingDisplayed =
    !!songs?.length && !isRefetching;

  if (isLoading) {
    return <Loader isFullHeight />;
  }

  return (
    <div className="pb-24 text-white isolate">
      <Head>
        <title>Find the genre for any song.</title>

        <meta
          name="description"
          content="Using our genre finder, you can search for any digitally released song and find the genres associated with its artists"
        />
      </Head>

      <h1 className="sr-only">Find genres of any song</h1>

      <SearchInput
        filter={filter}
        setFilter={setFilter}
        handleFilterChange={handleFilterChange}
        debouncedRefetch={debouncedRefetch}
        isLoading={isRefetching && !!filter}
      />

      {isResultsOrSuggestionsHeadingDisplayed && (
        <h2 className="mt-8 text-center text-white text-opacity-70 text-md">
          {!!filter ? `Results for "${filter}"` : 'Suggestions'}
        </h2>
      )}

      {isRefetching && (
        <p className="mt-8 text-center text-white text-opacity-70 text-md font-heading">
          Loading
        </p>
      )}

      {isErrorMessageDisplayed && (
        <p className="mt-16 text-3xl text-center capitalize font-heading">
          No Results
        </p>
      )}

      <SearchResultSongs songs={songs} />
    </div>
  );
};
