import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { useLogOut, useUser } from '@/features/auth';
import { useDialogControl } from '@/hooks';
import { Dialog } from '@/components/elements';
import { useAuth } from '@/lib/authentication';
import { Avatar } from './Avatar';

interface MobileNavProps {}

const menuLinks = [
  { link: '/songs', text: 'All Songs' },
  { link: '/search', text: 'Search' },
  { link: '/genre-finder', text: 'Genre Finder' },
];

export const MobileNav: React.FunctionComponent<MobileNavProps> = () => {
  const { isDialogOpen, closeDialog, openDialog } = useDialogControl();
  const { user } = useAuth();
  const { data } = useUser(user?.uid);
  const { mutate: postLogOut } = useLogOut();

  // dbUser refers to data for user stored on app database i.e not on Firebase's servers
  const dbUser = data?.dbUser;

  return (
    <>
      <button
        className="fixed bottom-0 z-[2] mt-auto w-screen border-t border-gray-100 bg-white py-4 font-heading text-lg md:hidden"
        onClick={openDialog}
      >
        Open menu
      </button>

      <Dialog
        isDialogOpen={isDialogOpen}
        closeDialog={closeDialog}
        isMobileMenu
        ariaLabel="Menu"
      >
        <div className="wrap flex items-center justify-between gap-4 overflow-auto bg-gray-900 pl-6 leading-3 transition duration-300 ease-in-out md:hidden">
          <div className="w-max shrink-0">
            <Image
              src="/logos/tgiwLogoHorizontal.svg"
              alt="The Genre Isn't World Logo"
              height={23}
              width={231}
            />
          </div>

          <button
            className="bg-tgiwPurplish p-4 px-6 py-8 text-right text-white"
            onClick={closeDialog}
          >
            Close menu
          </button>
        </div>

        {!!user && (
          <div className="flex w-full items-center space-x-4 bg-gray-100 px-6 py-3 text-left transition duration-500 ease-in-out focus:bg-gray-300 focus:outline-none ">
            <Avatar dbUser={dbUser} />

            <span className="inline-block w-[calc(100%_-_3rem)] truncate text-tgiwPurplish text-opacity-90">
              {dbUser?.userName}
            </span>
          </div>
        )}

        <nav className=" my-12 h-[calc(100%-7.9rem)] w-full px-2">
          <ul className="space-y-3 px-4 font-heading text-lg">
            {menuLinks.map(({ link, text }) => (
              <li key={link} className="relative" onClick={closeDialog}>
                <Link href={link}>
                  <a className="block w-full rounded-md bg-tgiwBlue-light bg-opacity-25 p-4 transition duration-500 ease-in-out hover:bg-opacity-50">
                    {text}
                  </a>
                </Link>
              </li>
            ))}
          </ul>

          <div className="my-12 max-w-[200px] px-4">
            {!user ? (
              <div className="space-y-3">
                <div onClick={closeDialog}>
                  <Link href="/log-in">
                    <a className="block w-full rounded-md bg-tgiwYellow px-4 py-2 transition duration-500 ease-in-out">
                      Log in
                    </a>
                  </Link>
                </div>

                <div onClick={closeDialog}>
                  <Link href="/sign-up">
                    <a className="block w-full rounded-md bg-tgiwOrange px-4 py-2 transition duration-500 ease-in-out">
                      Sign up
                    </a>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div onClick={closeDialog}>
                  <Link href="/edit-profile">
                    <a className="block w-full rounded-md bg-tgiwBlue-light bg-opacity-60 px-4 py-2 transition duration-500 ease-in-out">
                      Edit profile
                    </a>
                  </Link>
                </div>

                <button
                  onClick={() => {
                    postLogOut();
                    closeDialog();
                  }}
                  className="block w-full rounded-md bg-red-200 px-4 py-2 text-left text-red-700 transition duration-500 ease-in-out"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        </nav>
      </Dialog>
    </>
  );
};
