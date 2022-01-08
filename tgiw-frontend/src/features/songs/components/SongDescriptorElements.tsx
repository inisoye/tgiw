import * as React from 'react';

interface SmallSongDescriptorProps {
  heading: string;
  children: React.ReactNode;
}

export const SmallSongDescriptor: React.FunctionComponent<
  SmallSongDescriptorProps
> = ({ heading, children }) => {
  return (
    <section>
      <h2 className="text-lg">{heading}</h2>
      <p className="mt-2 text-gray-800 text-opacity-60">{children}</p>
    </section>
  );
};
