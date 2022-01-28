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
  defaultValue
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
      className="block w-full p-3 px-4 mt-1 transition duration-700 ease-in-out bg-gray-100 rounded-md sm:text-sm focus:bg-white placeholder:text-opacity-40 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-b-transparent placeholder:text-gray-400"
    />
  );
};
