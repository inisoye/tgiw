import * as React from 'react';

export const useDialogControl = (initialState = false) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(initialState);
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return {
    isDialogOpen,
    openDialog,
    closeDialog,
  };
};
