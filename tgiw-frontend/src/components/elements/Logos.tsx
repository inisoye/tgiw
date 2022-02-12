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
        <a className="mx-auto hidden w-max rounded-md bg-tgiwPurplish px-8 py-6 leading-3 transition duration-300 ease-in-out hover:scale-[1.02] hover:bg-gray-900 active:scale-[0.98] md:block">
          <Image
            src="/logos/tgiwLogo.svg"
            alt="The Genre Isn't World Logo"
            height={46}
            width={126}
          />
        </a>
      </Link>

      <Link href="/">
        <a className="mx-auto block bg-gray-900 px-8 py-6 leading-3 transition duration-300 ease-in-out hover:bg-tgiwPurplish md:hidden">
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
        'flex w-full flex-row-reverse  items-center border-b-8 border-opacity-[0.4] transition duration-500  ease-in-out ',
        {
          'justify-center border-b-transparent': isCentered,
          'justify-center border-b-gray-600 bg-tgiwPurplish md:justify-between':
            !isCentered,
        },
      )}
    >
      <Link href="/">
        <a className="justify-self-center bg-opacity-50 px-8 py-6 leading-3 transition duration-500 ease-in-out md:px-14">
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
          'h-[71px]  px-8 text-white transition duration-500 ease-in-out hover:bg-tgiwYellow hover:text-tgiwPurplish md:px-14',
          { hidden: isCentered, 'hidden md:inline-block': !isCentered },
        )}
      >
        Go back
      </button>
    </div>
  );
};

interface PlayfulFooterLogoProps {}

export const PlayfulFooterLogo: React.FunctionComponent<
  PlayfulFooterLogoProps
> = () => {
  return (
    <>
      <div className="fixed bottom-0 w-screen bg-tgiwPurplish pt-5 pb-4 text-white">
        <div className="playful-logo h-5 w-full px-2"></div>
      </div>

      <style jsx>{`
        .playful-logo {
          background: url('/logos/tgiwLogoPlayful.svg') repeat-x;
        }
      `}</style>
    </>
  );
};
