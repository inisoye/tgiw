import toast from 'react-hot-toast';
import type { AxiosError } from 'axios';
import type { AuthError } from 'firebase/auth';

import type { Artist, FormattedArtist, Notification } from '@/types';

export const pickArtistsNames = (
  artistsObjects: Artist[] | FormattedArtist[]
): string => artistsObjects.map(({ name }) => name).join(', ');

export const getInitials = (string: string) => {
  const names = string.split(' ');
  let initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }

  return initials;
};

export const getInputValueFromForm = (
  form: HTMLFormElement,
  valueName: string
) => {
  const { value } = form.elements.namedItem(valueName) as HTMLInputElement;
  return value;
};

/**
 * @param string Any camelCase or PascalCase string.
 * @returns A string with separated words PascalCase becomes Pascal Case, HODBank becomes HOD Bank etc.
 */
export const insertSpacesBeforeCapitalLetters = (string: string) => {
  string = string.replace(/([a-z])([A-Z])/g, '$1 $2');
  string = string.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');
  return string;
};

/**
 * @param string A string, usually completely in lowercase.
 * @returns The argument strign with its first letter capitalized.
 */
export const capitalizeFirstLetter = (string: string) => {
  const stringWithSpaces = insertSpacesBeforeCapitalLetters(
    string.toLowerCase()
  );

  return (
    (stringWithSpaces &&
      stringWithSpaces.charAt(0).toUpperCase() + stringWithSpaces.slice(1)) ||
    ''
  );
};

/**
 * @param error An axios error instance. Usually returned by React Query as a string or array of strings.
 * @returns The error message formatted for the UI. Contents of an array are merged into a single string.
 */
export const formatAxiosErrorMessage = (error: AxiosError) => {
  const errorMessage = error.response?.data.message;

  if (Array.isArray(errorMessage)) {
    const allMessages = errorMessage
      .map((m) => capitalizeFirstLetter(m))
      .join('. ');

    return `Error: ${allMessages}`;
  }

  return capitalizeFirstLetter(errorMessage);
};

const FORMATTED_FIREBASE_ERRORS: any = {
  'auth/invalid-user-token': 'Your session has expired. Please sign in again',
  'auth/user-token-expired': 'Your session has expired. Please sign in again',
  'auth/too-many-requests':
    'Your account has been temporarily locked. You will be able to sign in again after a while.',
};

export const formatFirebaseErrorMessage = (error: AuthError) => {
  const errorCode = error.code;
  const pretypedError = FORMATTED_FIREBASE_ERRORS[errorCode];

  if (!pretypedError) {
    const extractedErrorMessage = errorCode.slice(5).replace(/-/g, ' ');
    return capitalizeFirstLetter(extractedErrorMessage);
  }

  return pretypedError;
};

const getNotificationColor = (notificationType: Notification) => {
  switch (notificationType) {
    case 'success': {
      return '#065f46';
    }

    case 'error': {
      return '#b91c1c';
    }

    case 'neutral': {
      return '#1F2532';
    }

    default: {
      throw new Error(`Unsupported notification type: ${notificationType}`);
    }
  }
};

export const launchNotification = (type: Notification, text: string) => {
  toast(text, {
    style: {
      padding: '8px 20px',
      backgroundColor: getNotificationColor(type),
      color: '#ffffff',
      textAlign: 'center',
      overflowWrap: 'break-word',
      overflow: 'auto',
      bottom: '32px',
    },
  });
};
