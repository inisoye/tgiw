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
        className="fixed bottom-0 z-[2] w-screen py-4 mt-auto text-lg bg-white border-t border-gray-100 font-heading md:hidden"
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
        <div className="flex items-center justify-between gap-4 pl-6 overflow-auto leading-3 transition duration-300 ease-in-out bg-gray-900 wrap md:hidden">
          <div className="w-max shrink-0">
            <Image
              src="/logos/tgiwLogoHorizontal.svg"
              alt="The Genre Isn't World Logo"
              height={23}
              width={231}
            />
          </div>

          <button
            className="p-4 px-6 py-8 text-right text-white bg-tgiwPurplish"
            onClick={closeDialog}
          >
            Close menu
          </button>
        </div>

        {!!user && (
          <div className="flex items-center w-full px-6 py-3 space-x-4 text-left transition duration-500 ease-in-out bg-gray-100 focus:outline-none focus:bg-gray-300 ">
            <Avatar dbUser={dbUser} />

            <span className="w-[calc(100%_-_3rem)] inline-block truncate text-tgiwPurplish text-opacity-90">
              {dbUser?.userName}
            </span>
          </div>
        )}

        <nav className=" w-full h-[calc(100%-7.9rem)] my-12 px-2">
          <ul className="px-4 space-y-3 text-lg font-heading">
            {menuLinks.map(({ link, text }) => (
              <li key={link} className="relative" onClick={closeDialog}>
                <Link href={link}>
                  <a className="block w-full p-4 transition duration-500 ease-in-out bg-opacity-25 rounded-md bg-tgiwBlue-light hover:bg-opacity-50">
                    {text}
                  </a>
                </Link>
              </li>
            ))}
          </ul>

          <div className="max-w-[200px] px-4 my-12">
            {!user ? (
              <div className="space-y-3">
                <div onClick={closeDialog}>
                  <Link href="/log-in">
                    <a className="block w-full px-4 py-2 transition duration-500 ease-in-out rounded-md bg-tgiwYellow">
                      Log in
                    </a>
                  </Link>
                </div>

                <div onClick={closeDialog}>
                  <Link href="/sign-up">
                    <a className="block w-full px-4 py-2 transition duration-500 ease-in-out rounded-md bg-tgiwOrange">
                      Sign up
                    </a>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div onClick={closeDialog}>
                  <Link href="/edit-profile">
                    <a className="block w-full px-4 py-2 transition duration-500 ease-in-out rounded-md bg-opacity-60 bg-tgiwBlue-light">
                      Edit profile
                    </a>
                  </Link>
                </div>

                <button
                  onClick={() => {
                    postLogOut();
                    closeDialog();
                  }}
                  className="block w-full px-4 py-2 text-left text-red-700 transition duration-500 ease-in-out bg-red-200 rounded-md"
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
