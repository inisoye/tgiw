import * as React from 'react';

import { Dialog, Loader } from '@/components/elements';
import { Label, TextArea } from '@/components/form';

interface ContributionFormDialogProps {
  songName: string;
  isDialogOpen: boolean;
  closeDialog: () => void;
  handleSubmit: (event: React.FormEvent<EventTarget>) => void;
  isContributionLoading: boolean;
}

export const ContributionFormDialog: React.FunctionComponent<
  ContributionFormDialogProps
> = ({
  songName,
  isDialogOpen,
  closeDialog,
  handleSubmit,
  isContributionLoading,
}) => {
  return (
    <Dialog isDialogOpen={isDialogOpen} closeDialog={closeDialog}>
      <h1 className="p-4 pb-0 text-2xl">Add a note to your contribution</h1>

      <form className="mt-8" onSubmit={handleSubmit}>
        <div className="px-4">
          <Label
            htmlFor="contributor-note"
            text={`What special story do you have about "${songName}"?`}
          />

          <TextArea
            id="contributor-note"
            name="contributorNote"
            placeholder="This is a song I discovered on my first day in Ogbomoso..."
            autoFocus
            required
          />
        </div>

        <div className="flex w-full mt-16">
          <button
            type="button"
            className="w-1/2 p-4 px-8 text-left text-white text-opacity-50 transition duration-500 ease-in-out bg-tgiwPurplish hover:bg-opacity-95"
            onClick={closeDialog}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="w-1/2 p-4 px-8 text-right transition duration-500 ease-in-out bg-tgiwYellow hover:bg-tgiwOrange disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isContributionLoading}
          >
            {isContributionLoading ? (
              <div className="pr-5">
                <Loader isAlignedRight />
              </div>
            ) : (
              'Submit'
            )}
          </button>
        </div>
      </form>
    </Dialog>
  );
};
