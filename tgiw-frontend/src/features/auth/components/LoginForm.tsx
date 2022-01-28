import Link from 'next/link';
import * as React from 'react';

import { Loader } from '@/components/elements';
import { Input, Label } from '@/components/form';

interface LoginFormProps {
  handleSubmit: (event: React.FormEvent<EventTarget>) => void;
  isLoading: boolean;
}

const HEADING = 'Log in';

export const LoginForm: React.FunctionComponent<LoginFormProps> = ({
  handleSubmit,
  isLoading,
}) => {
  return (
    <div className="w-full min-h-[calc(100vh-120px)] overflow-auto bg-gray-900 sm:justify-center sm:items-center sm:flex md:space-x-20">
      <div className="relative hidden text-white md:block bottom-24">
        <h1 className="px-4 text-5xl">{HEADING}</h1>

        <p className="inline-block px-4 mt-6 ml-auto">
          <span className="text-white text-opacity-50">Not a member? </span>

          <Link href="/sign-up">
            <a className="text-blue-400 underline transition duration-500 ease-in-out hover:text-blue-600 decoration-2">
              Sign up
            </a>
          </Link>
        </p>
      </div>

      <form
        className="w-full h-[calc(100vh-120px)] px-6 py-12 bg-white sm:h-max sm:max-w-sm sm:max-h-[70%] overflow-auto sm:rounded sm:mt-10 sm:mb-16"
        onSubmit={handleSubmit}
      >
        <div className="md:hidden">
          <h1 className="px-4 text-4xl text-tgiwPurplish">{HEADING}</h1>

          <p className="inline-block px-4 mt-4 ml-auto text-sm">
            <span>Not a member? </span>

            <Link href="/sign-up">
              <a className="text-blue-600 underline transition duration-500 ease-in-out hover:text-blue-900 decoration-2">
                Sign up
              </a>
            </Link>
          </p>
        </div>

        <div className="px-4 mt-8 md:mt-0">
          <Label htmlFor="email" text="Email" />

          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            autoFocus
            required
          />
        </div>

        <div className="px-4 mt-6">
          <Label htmlFor="password" text="Password" />

          <Input
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="flex w-full px-4 mt-12">
          <button
            type="submit"
            className="w-full sm:text-sm rounded-md flex justify-between items-center min-h-[3.125rem] p-3 px-4 transition duration-500 ease-in-out bg-tgiwYellow text-tgiwPurplish hover:bg-tgiwOrange disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isLoading}
          >
            <span>Log in</span>

            {isLoading && (
              <div className="pr-4">
                <Loader isAlignedRight />
              </div>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
