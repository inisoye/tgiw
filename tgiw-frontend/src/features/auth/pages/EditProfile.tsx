import * as React from 'react';
import Head from 'next/head';
import type { AxiosError } from 'axios';
import type { User } from 'firebase/auth';

import { EditProfileForm, useUpdateUser, useLogIn } from '@/features/auth';
import {
  formatAxiosErrorMessage,
  getInputValueFromForm,
  launchNotification,
} from '@/utils';
import { PlayfulFooterLogo } from '@/components/elements';
import { useAuth } from '@/lib/authentication';

interface EditProfileProps {}

export const EditProfile: React.FunctionComponent<EditProfileProps> = () => {
  const { user } = useAuth();
  const { mutate: postUpdateUser, isLoading: isUpdateUserLoading } =
    useUpdateUser();
  const { mutate: postLogIn, isLoading: isLogInLoading } = useLogIn();

  const { email: initialEmail, uid } = user as User;

  const handleSubmit = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const email = getInputValueFromForm(form, 'email');
    const password = getInputValueFromForm(form, 'password');

    const userDetails = { email, password, id: uid };

    postUpdateUser(userDetails, {
      onSuccess: () => {
        form.reset();
        launchNotification(
          'success',
          'Update successful. Redirecting you to the homepage.',
        );

        /**
         * Log user in when update is successful.
         * Redirect to homepage when login in complete.
         * Additional step added to register Firebase details on client.
         * This is because updates are done on the server.
         */
        postLogIn(
          { email, password },
          {
            onSuccess: () => {
              window.location.href = '/';
            },
          },
        );
      },

      onError: error => {
        const errorMessage = formatAxiosErrorMessage(error as AxiosError);
        launchNotification('error', errorMessage);
      },
    });
  };

  return (
    <>
      <Head>
        <title>Log in - The Genre isn&apos;t World</title>
      </Head>

      <EditProfileForm
        handleSubmit={handleSubmit}
        isLoading={isUpdateUserLoading || isLogInLoading}
        initialEmail={initialEmail}
      />

      <PlayfulFooterLogo />
    </>
  );
};
