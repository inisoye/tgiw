import * as React from 'react';
import type { AuthError } from 'firebase/auth';

import { LoginForm, useLogIn } from '@/features/auth';
import {
  formatFirebaseErrorMessage,
  getInputValueFromForm,
  launchNotification,
} from '@/utils';
import { PlayFulFooterLogo } from '@/components/elements';

interface LogInProps {}

export const LogIn: React.FunctionComponent<LogInProps> = () => {
  const { mutate: postLogIn, isLoading } = useLogIn();

  const handleSubmit = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const email = getInputValueFromForm(form, 'email');
    const password = getInputValueFromForm(form, 'password');

    const userDetails = { email, password };

    postLogIn(userDetails, {
      onSuccess: () => {
        form.reset();
        launchNotification(
          'success',
          'Login successful. Redirecting you to the homepage.'
        );
        window.location.href = '/';
      },

      onError: (error) => {
        const errorMessage = formatFirebaseErrorMessage(error as AuthError);
        launchNotification('error', errorMessage);
      },
    });
  };

  return (
    <>
      <LoginForm handleSubmit={handleSubmit} isLoading={isLoading} />

      <PlayFulFooterLogo />
    </>
  );
};