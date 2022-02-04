import * as React from 'react';
import { DialogContent, DialogOverlay } from '@reach/dialog';
import '@reach/dialog/styles.css';
import clsx from 'clsx';

interface DialogProps {
  isDialogOpen: boolean;
  closeDialog: () => void;
  isCenterFullHeight?: boolean;
  isMobileMenu?: boolean;
  ariaLabel: string;
}

export const Dialog: React.FunctionComponent<DialogProps> = ({
  isDialogOpen,
  closeDialog,
  isCenterFullHeight,
  children,
  isMobileMenu,
  ariaLabel,
}) => {
  return (
    <DialogOverlay
      style={{ backgroundColor: 'hsla(0, 0%, 0%, 0.8)', zIndex: 3 }}
      isOpen={isDialogOpen}
      onDismiss={closeDialog}
    >
      <div
        className={clsx(
          'overflow-auto w-screen mx-auto bg-white text-tgiwPurplish',
          {
            'h-screen max-h-screen rounded-none': isCenterFullHeight,
            'max-h-[84%] h-max max-w-3xl mx-auto': !isMobileMenu,
            'md:hidden max-w-none h-full': isMobileMenu,
          }
        )}
      >
        <DialogContent
          aria-label={ariaLabel}
          /**
           * Reach UI doesn't work very well with Styled JSX or Tailwind.
           * Override defaults inline and style containing div instead.
           */
          style={{
            margin: 0,
            padding: 0,
            height: '100%',
            width: '100%',
            backgroundColor: 'transparent',
            zIndex: 4,
          }}
        >
          {children}
        </DialogContent>
      </div>
    </DialogOverlay>
  );
};
