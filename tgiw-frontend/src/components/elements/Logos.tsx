import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

import { useRouter } from 'next/router';

interface LogoProps {}

export const Logo: React.FunctionComponent<LogoProps> = () => {
  return (
    <>
      <Link href="/">
        <a className="hidden px-8 py-6 mx-auto leading-3 rounded-md bg-tgiwPurplish hover:bg-gray-900 md:block w-max hover:scale-[1.02] active:scale-[0.98] transition ease-in-out duration-300">
          <Image
            src="/logos/tgiwLogo.svg"
            alt="The Genre Isn't World Logo"
            height={46}
            width={126}
          />
        </a>
      </Link>

      <Link href="/">
        <a className="block px-8 py-6 mx-auto leading-3 transition duration-300 ease-in-out bg-tgiwPurplish hover:bg-gray-900 md:hidden">
          <div className="mx-auto w-max">
            <Image
              src="/logos/tgiwLogoHorizontal.svg"
              alt="The Genre Isn't World Logo"
              height={23}
              width={231}
            />
          </div>
        </a>
      </Link>
    </>
  );
};

interface SecondaryLogoProps {
  isCentered?: boolean;
}

export const SecondaryLogo: React.FunctionComponent<SecondaryLogoProps> = ({
  isCentered,
}) => {
  const router = useRouter();

  return (
    <div
      className={clsx(
        'flex flex-row-reverse items-center  w-full transition duration-500 ease-in-out border-b-8  border-opacity-[0.4] ',
        {
          'justify-center border-b-transparent': isCentered,
          'justify-center md:justify-between border-b-gray-600 bg-tgiwPurplish':
            !isCentered,
        }
      )}
    >
      <Link href="/">
        <a className="px-8 py-6 leading-3 transition duration-500 ease-in-out bg-opacity-50 justify-self-center md:px-14">
          <div className="mx-auto w-max ">
            <Image
              src="/logos/tgiwLogoHorizontal.svg"
              alt="The Genre Isn't World Logo"
              height={23}
              width={231}
            />
          </div>
        </a>
      </Link>

      <button
        onClick={() => router.back()}
        className={clsx(
          'h-[71px]  px-8 md:px-14 text-white hover:bg-tgiwYellow hover:text-tgiwPurplish transition ease-in-out duration-500',
          { hidden: isCentered, 'hidden md:inline-block': !isCentered }
        )}
      >
        Go back
      </button>
    </div>
  );
};

interface PlayFulFooterLogoProps {}

export const PlayFulFooterLogo: React.FunctionComponent<
  PlayFulFooterLogoProps
> = () => {
  return (
    <>
      <div className="fixed bottom-0 w-screen pt-5 pb-4 text-white bg-tgiwPurplish">
        <div className="w-full h-5 px-2 playful-logo"></div>
      </div>

      <style jsx>{`
        .playful-logo {
          background: url('/logos/tgiwLogoPlayful.svg') repeat-x;
        }
      `}</style>
    </>
  );
};
