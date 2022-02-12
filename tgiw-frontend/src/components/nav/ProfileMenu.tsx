import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import Link from 'next/link';

import { Avatar } from './Avatar';
import type { DbUser } from '@/types';
import { useLogOut } from '@/features/auth';

interface ProfileMenuProps {
  dbUser: DbUser | undefined;
}

export const ProfileMenu: React.FunctionComponent<ProfileMenuProps> = ({
  dbUser,
}) => {
  const { mutate: postLogOut } = useLogOut();

  return (
    <div className="mt-auto w-full px-4">
      <DropdownMenuPrimitive.Root>
        <DropdownMenuPrimitive.Trigger className="mt-5 flex w-[9.625rem] items-center space-x-4 rounded-md bg-gray-200 px-4 py-2 text-left transition duration-500 ease-in-out hover:bg-gray-300 focus:bg-gray-300 focus:outline-none active:scale-90 ">
          <Avatar dbUser={dbUser} />

          <span className="inline-block w-[calc(100%_-_3rem)] truncate text-tgiwPurplish text-opacity-90">
            {dbUser?.userName}
          </span>
        </DropdownMenuPrimitive.Trigger>

        <DropdownMenuPrimitive.Content className="w-[9.625rem] -translate-y-2 rounded-md bg-gray-200">
          <DropdownMenuPrimitive.Item className="w-full cursor-pointer rounded-md px-4 py-2 text-sm text-tgiwPurplish text-opacity-90 transition duration-500 ease-in-out focus:bg-gray-300 focus:outline-none">
            <Link href="/edit-profile">
              <a className="inline-block h-full w-full">Edit Profile</a>
            </Link>
          </DropdownMenuPrimitive.Item>

          <DropdownMenuPrimitive.Item
            onClick={() => postLogOut()}
            className="w-full cursor-pointer rounded-md px-4 py-2 text-sm text-tgiwPurplish text-opacity-90 transition duration-500 ease-in-out focus:bg-red-100 focus:text-red-700 focus:outline-none"
          >
            Log Out
          </DropdownMenuPrimitive.Item>
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Root>
    </div>
  );
};
