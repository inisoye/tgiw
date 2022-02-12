import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';

import { getInitials } from '@/utils';
import type { DbUser } from '@/types';

interface AvatarProps {
  dbUser: DbUser | undefined;
}

export const Avatar: React.FunctionComponent<AvatarProps> = ({ dbUser }) => {
  return (
    <AvatarPrimitive.Root
      aria-hidden
      className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-teal-600 text-sm text-white"
    >
      <AvatarPrimitive.Fallback>
        {!!dbUser && getInitials(dbUser?.userName)}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
};
