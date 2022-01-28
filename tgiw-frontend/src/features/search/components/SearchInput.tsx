import * as React from 'react';
import type { DebouncedFunction } from 'debounce-fn';
import type {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query';

import type { Song } from '@/types';
import { Loader } from '@/components/elements';

interface SearchInputProps {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  handleFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  debouncedRefetch: DebouncedFunction<
    [options?: (RefetchOptions & RefetchQueryFilters<unknown>) | undefined],
    Promise<QueryObserverResult<Song[], unknown>> | undefined
  >;
  isLoading: boolean;
}

export const SearchInput: React.FunctionComponent<SearchInputProps> = ({
  filter,
  setFilter,
  handleFilterChange,
  debouncedRefetch,
  isLoading,
}) => {
  const isClearButtonDisplayed = !isLoading && !!filter;

  return (
    <>
      <div className="flex items-center text-tgiwPurplish transition duration-700 ease-in-out border-b-2 border-b-gray-300 focus-within:border-b-gray-700 input-wrapper bg-gray-100 px-4 focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-b-transparent">
        <span>
          <svg
            width={19}
            height={19}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m17 17-5-5 5 5Zm-3.333-9.167A5.833 5.833 0 1 1 2 7.833a5.833 5.833 0 0 1 11.666 0Z"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition duration-700 ease-in-out stroke-gray-400 search-path"
            />
          </svg>
        </span>

        <input
          type="text"
          autoFocus
          placeholder="Genres, countries, songs, or artists"
          value={filter}
          onChange={(event) => {
            handleFilterChange(event);
            debouncedRefetch();
          }}
          className="w-full p-3 pl-4 pr-5 text-lg bg-transparent focus:outline-none placeholder:text-gray-400 stroke-gray-400 font-heading"
        />

        {isLoading && (
          <div className="pr-5">
            <Loader />
          </div>
        )}

        {isClearButtonDisplayed && (
          <button className="close-button" onClick={() => setFilter('')}>
            <svg
              width={17}
              height={17}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m2 2 13 13M2 15 15 2 2 15Z"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition duration-700 ease-in-out stroke-gray-400 close-path"
              />
            </svg>
          </button>
        )}
      </div>

      <style jsx>{`
        .input-wrapper:focus-within .search-path,
        .close-button:hover .close-path {
          /* Tailwind's tgiwPurplish */
          stroke: #1f2937;
        }
      `}</style>
    </>
  );
};
