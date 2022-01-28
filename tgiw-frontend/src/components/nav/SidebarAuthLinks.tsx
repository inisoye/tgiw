import * as React from 'react';
import Link from 'next/link';

interface SidebarAuthLinksProps {}

export const SidebarAuthLinks: React.FunctionComponent<
  SidebarAuthLinksProps
> = () => {
  return (
    <div className="px-4 mt-auto">
      <div>
        <Link href="/log-in">
          <a className="block w-full px-4 py-2 mt-20 transition duration-500 ease-in-out rounded-md hover:scale-105 active:scale-[0.95] bg-gray-300 bg-opacity-50 hover:bg-gray-200">
            Log in
          </a>
        </Link>
      </div>

      <div>
        <Link href="/sign-up">
          <a className="block w-full px-4 py-2 mt-4 transition duration-500 ease-in-out rounded-md hover:scale-105 active:scale-[0.95] bg-tgiwPurplish text-white">
            Sign up
          </a>
        </Link>
      </div>
    </div>
  );
};
