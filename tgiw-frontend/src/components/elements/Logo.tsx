import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {}

export const Logo: React.FunctionComponent<LogoProps> = () => {
  return (
    <>
      <Link href="/">
        <a className="hidden px-8 py-6 mx-auto leading-3 rounded-md bg-slate-800 md:block w-max">
          <Image
            src="/logos/tgiwLogo.svg"
            alt="The Genre Isn't World Logo"
            height={46}
            width={126}
          />
        </a>
      </Link>

      <Link href="/">
        <a className="block px-8 py-6 mx-auto leading-3 bg-slate-800 md:hidden">
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
