import * as React from 'react';

import { FormattedArtist } from '@/types';
import { ImageWithFallback } from '@/components/elements';

interface ContributionArtistsListProps {
  artists: FormattedArtist[] | undefined;
}

export const ContributionArtistsList: React.FunctionComponent<
  ContributionArtistsListProps
> = ({ artists }) => {
  return (
    <ul className="flex flex-wrap justify-end gap-1.5">
      {artists?.map(({ spotifyId, name, images }) => {
        const imageUrl = images?.[2]?.url;

        return (
          <li
            key={spotifyId}
            className="flex w-max max-w-[90%] items-center space-x-3 px-3 py-1.5 transition duration-500 ease-in-out"
          >
            <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full">
              <ImageWithFallback
                src={imageUrl}
                key={spotifyId}
                fallbackSrc="/images/artist.jpg"
                alt={name}
                width="100%"
                height="100%"
                objectFit="cover"
                className="relative h-full w-full"
              />
            </div>
            <span className="shrink truncate text-white text-opacity-90">
              {name}
            </span>
          </li>
        );
      })}
    </ul>
  );
};
