import * as React from 'react';

interface VisuallyHiddenProps {
  [delegated: string]: any;
}

const hiddenStyles: React.CSSProperties = {
  display: 'inline-block',
  position: 'absolute',
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  height: 1,
  width: 1,
  margin: -1,
  padding: 0,
  border: 0,
};

export const VisuallyHidden: React.FunctionComponent<VisuallyHiddenProps> = ({
  children,
  ...delegated
}) => {
  const [forceShow, setForceShow] = React.useState(false);
  React.useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Alt') {
          setForceShow(true);
        }
      };

      const handleKeyUp = (event: KeyboardEvent) => {
        if (event.key === 'Alt') {
          setForceShow(false);
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
      };
    }
  }, []);

  if (forceShow) {
    return <>{children}</>;
  }

  return (
    <span style={hiddenStyles} {...delegated}>
      {children}
    </span>
  );
};
