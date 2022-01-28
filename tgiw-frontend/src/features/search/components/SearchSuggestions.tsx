import * as React from 'react';

interface SearchSuggestionsProps {
  suggestions: {
    id: number;
    item: string;
  }[];
  setFilter: (value: React.SetStateAction<string>) => void;
}

export const SearchSuggestions: React.FunctionComponent<
  SearchSuggestionsProps
> = ({ suggestions, setFilter }) => {
  return (
    <div className="mt-8">
      <h2 className="mb-2 text-xs text-tgiwPurplish uppercase text-opacity-40 font-regular">
        Suggestions
      </h2>

      <ul className="border-gray-100 divide-y-2 divide-gray-100 border-y-2">
        {suggestions.map(({ id, item }) => (
          <li key={id}>
            <button
              onClick={() => setFilter(item)}
              className="block w-full p-4 text-left transition-colors duration-500 ease-in-out hover:bg-gray-100"
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
