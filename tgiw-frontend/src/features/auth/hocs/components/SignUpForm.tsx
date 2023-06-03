import * as React from 'react';
import Link from 'next/link';

import { Loader } from '@/components/elements';
import { Input, Label } from '@/components/form';

interface SignUpFormProps {
  handleSubmit: (event: React.FormEvent<EventTarget>) => void;
  isLoading: boolean;
}

const HEADING = 'Sign up';

export const SignUpForm: React.FunctionComponent<SignUpFormProps> = ({
  handleSubmit,
  isLoading,
}) => {
  return (
    <div className="min-h-[calc(100vh-120px)] w-full overflow-auto bg-gray-900 sm:flex sm:items-center sm:justify-center md:space-x-20">
      <div className="relative bottom-24 hidden text-white md:block">
        <h1 className="px-4 text-5xl">{HEADING}</h1>

        <p className="mt-6 ml-auto inline-block px-4">
          <span className="text-white text-opacity-50">Already a member? </span>

          <Link href="/log-in">
            <a className="text-blue-400 underline decoration-2 transition duration-500 ease-in-out hover:text-blue-600">
              Log in
            </a>
          </Link>
        </p>
      </div>

      <form
        className="h-[calc(100vh-120px)] w-full overflow-auto bg-white px-6 py-12 sm:mt-10 sm:mb-16 sm:h-max sm:max-h-[70%]  sm:max-w-sm sm:rounded"
        onSubmit={handleSubmit}
      >
        <div className="md:hidden">
          <h1 className="px-4 text-4xl text-tgiwPurplish">{HEADING}</h1>

          <p className="mt-4 ml-auto inline-block px-4 text-sm">
            <span>Already a member? </span>

            <Link href="/log-in">
              <a className="text-blue-600 underline decoration-2 transition duration-500 ease-in-out hover:text-blue-900">
                Log in
              </a>
            </Link>
          </p>
        </div>

        <div className="mt-8 px-4 md:mt-0">
          <Label htmlFor="userName" text="Username" />

          <Input
            id="userName"
            type="text"
            name="userName"
            placeholder="A unique name that'll be your ID on this app"
            autoFocus
            required
          />
        </div>

        <div className="mt-6 px-4">
          <Label htmlFor="email" text="Email" />

          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mt-6 px-4">
          <Label htmlFor="password" text="Password" />

          <Input
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="mt-12 flex w-full px-4">
          <button
            type="submit"
            className="flex min-h-[3.125rem] w-full items-center justify-between  rounded-md bg-tgiwYellow p-3 px-4 text-left text-tgiwPurplish transition duration-500 ease-in-out hover:bg-tgiwOrange disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
            disabled={isLoading}
          >
            <span>Sign up</span>

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
