import * as React from 'react';

import { ImageWithFallback, SpotifyLink } from '@/components/elements';

interface ArtistDetailsProps {
  imageUrl: string;
  name: string | undefined;
  spotifyUrl: string | undefined;
  color: string | undefined;
}

export const ArtistDetails: React.FunctionComponent<ArtistDetailsProps> = ({
  imageUrl,
  name,
  spotifyUrl,
  color,
}) => {
  return (
    <>
      <div className="relative h-96 w-full overflow-hidden rounded-md lg:h-[40rem]">
        <ImageWithFallback
          src={imageUrl}
          fallbackSrc="/images/artist.jpg"
          alt={name as string}
          layout="fill"
          objectFit="cover"
          className="relative h-full w-full"
        />
      </div>

      <div className="artist-background relative bottom-12 mx-4 flex items-center justify-between gap-4 rounded-md bg-tgiwBlue-light px-4 py-6 lg:mx-9 lg:gap-9 lg:px-9">
        <h1 className="max-w-[70%] break-words text-4xl lg:text-5xl">{name}</h1>

        <SpotifyLink spotifyUrl={spotifyUrl} />
      </div>

      <style jsx>{`
        .artist-background {
          background-color: ${color};
        }
      `}</style>
    </>
  );
};
