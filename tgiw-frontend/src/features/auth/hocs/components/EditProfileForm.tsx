import * as React from 'react';

import { Loader } from '@/components/elements';
import { Input, Label } from '@/components/form';

interface EditProfileFormProps {
  handleSubmit: (event: React.FormEvent<EventTarget>) => void;
  isLoading: boolean;
  initialEmail: string | null;
}

const HEADING = 'Edit profile';
const SUBHEADING = 'Change your email or password.';

export const EditProfileForm: React.FunctionComponent<EditProfileFormProps> = ({
  handleSubmit,
  isLoading,
  initialEmail,
}) => {
  return (
    <div className="min-h-[calc(100vh-120px)] w-full overflow-auto bg-gray-900 sm:flex sm:items-center sm:justify-center md:space-x-20">
      <div className="relative bottom-24 hidden text-white md:block">
        <h1 className="px-4 text-5xl">{HEADING}</h1>

        <p className="mt-6 ml-auto inline-block px-4">
          <span className="text-white text-opacity-50">{SUBHEADING}</span>
        </p>
      </div>

      <form
        className="h-[calc(100vh-120px)] w-full overflow-auto bg-white px-6 py-12 sm:mt-10 sm:mb-16 sm:h-max sm:max-h-[70%]  sm:max-w-sm sm:rounded"
        onSubmit={handleSubmit}
      >
        <div className="md:hidden">
          <h1 className="px-4 text-4xl text-tgiwPurplish">{HEADING}</h1>

          <p className="mt-4 ml-auto inline-block px-4 text-sm">
            <span>{SUBHEADING}</span>
          </p>
        </div>

        <div className="mt-6 px-4">
          <Label htmlFor="email" text="Email" />

          <Input
            id="email"
            type="email"
            name="email"
            defaultValue={initialEmail as string}
            placeholder="Email"
            required
          />
        </div>

        <div className="mt-6 px-4">
          <Label htmlFor="password" text="Password" />

          <Input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>

        <div className="mt-12 flex w-full px-4">
          <button
            type="submit"
            className="flex min-h-[3.125rem] w-full items-center justify-between  rounded-md bg-tgiwYellow p-3 px-4 text-left text-tgiwPurplish transition duration-500 ease-in-out hover:bg-tgiwOrange disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
            disabled={isLoading}
          >
            <span>Save changes</span>

            {isLoading && (
              <div className="pr-4">
                <Loader isAlignedRight isSmall />
              </div>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
