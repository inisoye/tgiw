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
      <label
        htmlFor="contr-search-input"
        className="mt-8 inline-block w-full px-8 text-center text-sm"
      >
        Find the genres of songs that have not been added to TGIW
      </label>

      <div className="input-wrapper sticky top-0 z-10 mt-2 flex items-center bg-white px-8 text-gray-800 transition duration-700 ease-in-out focus-within:bg-opacity-95 md:px-14">
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
              className="search-path stroke-gray-400 transition duration-700 ease-in-out"
            />
          </svg>
        </span>

        <input
          id="contr-search-input"
          type="text"
          autoFocus
          placeholder="Search for any song"
          value={filter}
          onChange={event => {
            handleFilterChange(event);
            debouncedRefetch();
          }}
          className="w-full bg-transparent stroke-gray-400 py-5 pl-4 pr-5 text-center font-heading text-xl placeholder:text-gray-400 focus:outline-none"
        />

        {isLoading && (
          <div className="pr-5">
            <Loader />
          </div>
        )}

        {isClearButtonDisplayed && (
          <button className="close-button" onClick={() => setFilter('')}>
            <svg
              width={19}
              height={19}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m2 2 15 15M2 17 17 2 2 17Z"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="close-path stroke-gray-400 transition duration-700 ease-in-out"
              />
            </svg>
          </button>
        )}
      </div>

      <style jsx>{`
        .input-wrapper:focus-within .search-path,
        .close-button:hover .close-path {
          /* Tailwind's neutral-800 */
          stroke: #262626;
        }
      `}</style>
    </>
  );
};
