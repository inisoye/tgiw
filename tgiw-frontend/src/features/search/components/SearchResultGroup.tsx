import * as React from 'react';

interface SearchResultGroupProps {
  title: string;
}

export const SearchResultGroup: React.FunctionComponent<
  SearchResultGroupProps
> = ({ title, children }) => {
  return (
    <div className="mt-8">
      <h2 className="mb-3 text-xl text-tgiwPurplish">{title}</h2>

      {children}
    </div>
  );
};
