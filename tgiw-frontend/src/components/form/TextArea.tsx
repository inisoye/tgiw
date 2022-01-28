import * as React from 'react';

interface TextAreaProps {
  id: string;
  name: string;
  placeholder: string;
  autoFocus?: boolean;
  required?: boolean;
}

export const TextArea: React.FunctionComponent<TextAreaProps> = ({
  id,
  name,
  placeholder,
  autoFocus,
  required,
}) => {
  return (
    <textarea
      id={id}
      name={name}
      placeholder={placeholder}
      autoFocus={autoFocus}
      required={required}
      className="block w-full p-3 sm:text-sm px-4 mt-1 transition duration-700 ease-in-out bg-gray-100 rounded-md min-h-[120px] placeholder:text-opacity-40 max-h-80 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-b-transparent placeholder:text-gray-400 input-wrapper"
    />
  );
};
