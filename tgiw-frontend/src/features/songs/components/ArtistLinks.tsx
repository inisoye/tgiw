import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { FormattedArtist } from '@/types';

interface ArtistLinkProps {
  id: string;
  name: string;
  imageUrl: string;
}

export const ArtistLink: React.FunctionComponent<ArtistLinkProps> = ({
  id,
  name,
  imageUrl,
}) => {
  return (
    <Link href={`/artists/${id}`}>
      <a className="flex items-center px-3 py-1.5 space-x-3 transition duration-500 ease-in-out bg-black rounded-md bg-opacity-10 hover:bg-opacity-5">
        <div className="w-8 h-8 overflow-hidden rounded-full shrink-0">
          <Image
            src={imageUrl}
            alt={name}
            width="100%"
            height="100%"
            layout="responsive"
            objectFit="contain"
          />
        </div>
        <span className="text-sm text-gray-800 truncate shrink text-opacity-90">
          {name}
        </span>
      </a>
    </Link>
  );
};

interface ArtistLinksProps {
  artists: FormattedArtist[] | undefined;
}

export const ArtistLinks: React.FunctionComponent<ArtistLinksProps> = ({
  artists,
}) => {
  return (
    <ul className="flex flex-wrap justify-center gap-2 mx-auto mt-6 md:mx-0 md:flex-row md:justify-end md:inline-flex md:w-full">
      {artists?.map(({ id, name, images }) => {
        const imageUrl = images?.[1].url;

        return (
          <li key={id} className="w-max max-w-[90%] md:inline">
            <ArtistLink id={id} name={name} imageUrl={imageUrl} />
          </li>
        );
      })}
    </ul>
  );
};

export default ArtistLinks;
