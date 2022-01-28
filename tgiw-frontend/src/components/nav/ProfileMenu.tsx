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
    <div className="w-full px-4 mt-auto">
      <DropdownMenuPrimitive.Root>
        <DropdownMenuPrimitive.Trigger className="flex items-center w-[9.625rem] px-4 py-2 space-x-4 text-left transition duration-500 ease-in-out bg-gray-200 rounded-md mt-5 active:scale-90 hover:bg-gray-300 focus:outline-none focus:bg-gray-300 ">
          <Avatar dbUser={dbUser} />

          <span className="w-[calc(100%_-_3rem)] inline-block truncate text-tgiwPurplish text-opacity-90">
            {dbUser?.userName}
          </span>
        </DropdownMenuPrimitive.Trigger>

        <DropdownMenuPrimitive.Content className="bg-gray-200 w-[9.625rem] -translate-y-2 rounded-md">
          <DropdownMenuPrimitive.Item className="w-full px-4 py-2 text-sm transition duration-500 ease-in-out rounded-md cursor-pointer text-tgiwPurplish text-opacity-90 focus:outline-none focus:bg-gray-300">
            <Link href="/edit-profile">
              <a className="inline-block w-full h-full">Edit Profile</a>
            </Link>
          </DropdownMenuPrimitive.Item>

          <DropdownMenuPrimitive.Item
            onClick={() => postLogOut()}
            className="w-full px-4 py-2 text-sm transition duration-500 ease-in-out rounded-md cursor-pointer text-tgiwPurplish text-opacity-90 focus:outline-none focus:bg-red-100 focus:text-red-700"
          >
            Log Out
          </DropdownMenuPrimitive.Item>
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Root>
    </div>
  );
};
