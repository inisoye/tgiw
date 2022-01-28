import * as React from 'react';
import debounceFn from 'debounce-fn';

import type { Artist, Genre } from '@/types';
import {
  pickPropertyFromSongs,
  SearchInput,
  SearchResultGroup,
  SearchResultSongs,
  SearchSuggestions,
  useSearchResults,
} from '@/features/search';
import { ArtistLinks, SongGenreChips } from '@/features/songs';
import Link from 'next/link';

interface SearchProps {}

export const Search: React.FunctionComponent<SearchProps> = () => {
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

  const artists = React.useMemo(
    () => pickPropertyFromSongs(songs, 'artists'),
    [songs]
  );

  const genres = React.useMemo(
    () => pickPropertyFromSongs(songs, 'genres'),
    [songs]
  );

  const areSuggestionsDisplayed = !filter;
  const isErrorMessageDisplayed =
    !!filter && !songs?.length && !isRefetching && !isLoading;
  const areSongResultsDisplayed = !!filter && !!songs?.length;
  const areArtistResultsDisplayed = !!filter && !!artists?.length;
  const areGenreResultsDisplayed = !!filter && !!genres?.length;

  const suggestions = [
    { id: 1, item: 'Afrobeat' },
    { id: 2, item: 'Ethiopia' },
    { id: 3, item: 'Orchestra Baobab' },
    { id: 4, item: 'Lezontaba' },
    { id: 5, item: 'Samba' },
  ];

  return (
    <div className="max-w-6xl p-8 pb-24 md:px-16">
      <SearchInput
        filter={filter}
        setFilter={setFilter}
        handleFilterChange={handleFilterChange}
        debouncedRefetch={debouncedRefetch}
        isLoading={isRefetching && !!filter}
      />

      {isErrorMessageDisplayed && (
        <p className="mt-8">
          Unfortunately, nothing on TGIW matches
          <span className="text-tgiwOrange"> &quot;{filter}&quot;</span>. Try
          using the{' '}
          <Link href="/genre-finder">
            <a className="text-blue-600 underline transition duration-500 ease-in-out hover:text-blue-900 underline-offset-2 decoration-2">
              Genre Finder
            </a>
          </Link>{' '}
          instead
        </p>
      )}

      {(areSuggestionsDisplayed || isErrorMessageDisplayed) && (
        <SearchSuggestions suggestions={suggestions} setFilter={setFilter} />
      )}

      {areSongResultsDisplayed && (
        <div className="space-y-12">
          <SearchResultGroup title="Songs">
            <SearchResultSongs songs={songs} />
          </SearchResultGroup>

          {areArtistResultsDisplayed && (
            <SearchResultGroup title="Artists">
              <ArtistLinks artists={artists?.slice(0, 8) as Artist[]} />
            </SearchResultGroup>
          )}

          {areGenreResultsDisplayed && (
            <SearchResultGroup title="Genres">
              <SongGenreChips
                genres={genres?.slice(0, 12) as Genre[]}
                isJustifiedLeft
                isBaseTextSize
              />
            </SearchResultGroup>
          )}
        </div>
      )}
    </div>
  );
};
