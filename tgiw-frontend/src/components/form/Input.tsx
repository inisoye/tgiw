import * as React from 'react';

interface InputProps {
  id: string;
  type: string;
  name: string;
  placeholder: string;
  autoFocus?: boolean;
  required?: boolean;
  defaultValue?: string;
}

export const Input: React.FunctionComponent<InputProps> = ({
  id,
  type,
  name,
  placeholder,
  autoFocus,
  required,
  defaultValue,
}) => {
  return (
    <input
      id={id}
      type={type}
      name={name}
      placeholder={placeholder}
      autoFocus={autoFocus}
      required={required}
      defaultValue={defaultValue}
      className="mt-1 block w-full rounded-md bg-gray-100 p-3 px-4 transition duration-700 ease-in-out placeholder:text-gray-400 placeholder:text-opacity-40 focus:border-b-transparent focus:bg-white sm:text-sm"
    />
  );
};
