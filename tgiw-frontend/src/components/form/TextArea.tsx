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
      className="input-wrapper mt-1 block max-h-80 min-h-[120px] w-full rounded-md bg-gray-100 p-3 px-4 transition duration-700 ease-in-out placeholder:text-gray-400  placeholder:text-opacity-40 focus:border-b-transparent focus:bg-white"
    />
  );
};
