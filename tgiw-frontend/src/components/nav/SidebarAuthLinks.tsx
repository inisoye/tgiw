import * as React from 'react';
import Link from 'next/link';

interface SidebarAuthLinksProps {}

export const SidebarAuthLinks: React.FunctionComponent<SidebarAuthLinksProps> =
  () => {
    return (
      <div className="px-4 mt-auto">
        <div>
          <Link href="/log-in">
            <a className="block w-full px-4 py-2 mt-20 transition duration-500 ease-in-out rounded-md active:scale-[0.98] bg-gray-200 bg-opacity-40 hover:bg-gray-300">
              Log in
            </a>
          </Link>
        </div>

        <div>
          <Link href="/sign-up">
            <a className="block w-full px-4 py-2 mt-4 transition duration-500 ease-in-out border-2 rounded-md active:scale-[0.98] border-gray-800 hover:border-transparent hover:bg-gray-800 hover:text-white">
              Sign up
            </a>
          </Link>
        </div>
      </div>
    );
  };
