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
    <ul className="flex gap-1.5 flex-wrap justify-end">
      {artists?.map(({ spotifyId, name, images }) => {
        const imageUrl = images?.[2]?.url;

        return (
          <li
            key={spotifyId}
            className="w-max max-w-[90%] flex items-center px-3 py-1.5 space-x-3 transition duration-500 ease-in-out"
          >
            <div className="w-8 h-8 overflow-hidden rounded-full shrink-0">
              <ImageWithFallback
                src={imageUrl}
                key={spotifyId}
                fallbackSrc="/images/artist.jpg"
                alt={name}
                width="100%"
                height="100%"
                objectFit="cover"
                className="relative w-full h-full"
              />
            </div>
            <span className="text-white truncate shrink text-opacity-90">
              {name}
            </span>
          </li>
        );
      })}
    </ul>
  );
};
