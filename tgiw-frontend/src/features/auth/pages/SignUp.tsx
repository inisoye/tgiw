import * as React from 'react';
import type { AxiosError } from 'axios';

import {
  formatAxiosErrorMessage,
  getInputValueFromForm,
  launchNotification,
} from '@/utils';
import { SignUpForm, useCreateUser, useLogIn } from '@/features/auth';
import { PlayFulFooterLogo } from '@/components/elements';

interface SignUpProps {}

export const SignUp: React.FunctionComponent<SignUpProps> = () => {
  const { mutate: postUser, isLoading: isSignUpLoading } = useCreateUser();
  const { mutate: postLogIn, isLoading: isLogInLoading } = useLogIn();

  const handleSubmit = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const userName = getInputValueFromForm(form, 'userName');
    const email = getInputValueFromForm(form, 'email');
    const password = getInputValueFromForm(form, 'password');

    const newUser = { userName, email, password };

    postUser(newUser, {
      onSuccess: () => {
        form.reset();
        launchNotification(
          'success',
          'Your account has been successfully created'
        );

        /**
         * Log user in when account creation is successful.
         * Redirect to homepage when login in complete.
         * Additional step added to register Firebase details on client.
         * This is because account creation is done on the server.
         * Not with 'firebaseClient.auth().createUserWithEmailAndPassword(email, pass);'
         */
        postLogIn(
          { email, password },
          {
            onSuccess: () => {
              launchNotification('neutral', 'Redirecting you to the homepage.');
              window.location.href = '/';
            },
          }
        );
      },

      onError: (error) => {
        const errorMessage = formatAxiosErrorMessage(error as AxiosError);
        launchNotification('error', errorMessage);
      },
    });
  };
  return (
    <>
      <SignUpForm
        handleSubmit={handleSubmit}
        isLoading={isSignUpLoading || isLogInLoading}
      />

      <PlayFulFooterLogo />
    </>
  );
};
