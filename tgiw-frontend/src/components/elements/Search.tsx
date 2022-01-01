import * as React from 'react';

interface SearchProps {
  placeholder?: string;
}

export const Search: React.FunctionComponent<SearchProps> = ({
  placeholder = 'Search',
}) => {
  return (
    <div className="flex items-center px-4 space-x-2 bg-white rounded-md ring-2 ring-gray-100 text-gray-800 focus-within:ring-2 focus-within:border-transparent focus-within:ring-gray-800">
      <span>
        <svg
          width={20}
          height={20}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m19 19-6-6 6 6ZM15 8a7.002 7.002 0 0 1-9.679 6.467A7 7 0 1 1 15 8Z"
            strokeOpacity={0.5}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-gray-600"
          />
        </svg>
      </span>

      <input
        type="text"
        placeholder={placeholder}
        className="w-full p-3 rounded-md focus:outline-none placeholder:text-gray-600 stroke-gray-600 placeholder:text-opacity-60 md:text-sm"
      />
    </div>
  );
};
