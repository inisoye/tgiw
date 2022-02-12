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
    <div className="w-full min-h-[calc(100vh-120px)] overflow-auto bg-gray-900 sm:justify-center sm:items-center sm:flex md:space-x-20">
      <div className="relative hidden text-white md:block bottom-24">
        <h1 className="px-4 text-5xl">{HEADING}</h1>

        <p className="inline-block px-4 mt-6 ml-auto">
          <span className="text-white text-opacity-50">{SUBHEADING}</span>
        </p>
      </div>

      <form
        className="w-full h-[calc(100vh-120px)] px-6 py-12 bg-white sm:h-max sm:max-w-sm sm:max-h-[70%] overflow-auto sm:rounded  sm:mt-10 sm:mb-16"
        onSubmit={handleSubmit}
      >
        <div className="md:hidden">
          <h1 className="px-4 text-4xl text-tgiwPurplish">{HEADING}</h1>

          <p className="inline-block px-4 mt-4 ml-auto text-sm">
            <span>{SUBHEADING}</span>
          </p>
        </div>

        <div className="px-4 mt-6">
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

        <div className="px-4 mt-6">
          <Label htmlFor="password" text="Password" />

          <Input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>

        <div className="flex w-full px-4 mt-12">
          <button
            type="submit"
            className="w-full sm:text-sm rounded-md flex justify-between  items-center min-h-[3.125rem] p-3 px-4 text-left transition duration-500 ease-in-out bg-tgiwYellow text-tgiwPurplish hover:bg-tgiwOrange disabled:cursor-not-allowed disabled:opacity-60"
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
