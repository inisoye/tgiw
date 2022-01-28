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
        className="inline-block w-full px-8 mt-8 text-sm text-center"
      >
        Find the genres of songs that have not been added to TGIW
      </label>

      <div className="sticky top-0 z-10 flex items-center px-8 mt-2 text-gray-800 transition duration-700 ease-in-out bg-white focus-within:bg-opacity-95 input-wrapper md:px-14">
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
          id="contr-search-input"
          type="text"
          autoFocus
          placeholder="Search for any song"
          value={filter}
          onChange={(event) => {
            handleFilterChange(event);
            debouncedRefetch();
          }}
          className="w-full py-5 pl-4 pr-5 text-xl text-center bg-transparent focus:outline-none placeholder:text-gray-400 stroke-gray-400 font-heading"
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
                className="transition duration-700 ease-in-out stroke-gray-400 close-path"
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
