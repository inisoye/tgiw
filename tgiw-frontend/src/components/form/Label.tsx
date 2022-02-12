import * as React from 'react';

interface LabelProps {
  htmlFor: string;
  text: string;
}

export const Label: React.FunctionComponent<LabelProps> = ({
  htmlFor,
  text,
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className="text-sm text-tgiwPurplish text-opacity-50"
    >
      {text}
    </label>
  );
};
