import * as React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import type { AxiosError } from 'axios';

import {
  ContributionArtistsList,
  ContributionFormDialog,
  ContributorGenresList,
  useContribution,
  useSongDetails,
} from '@/features/contributions';
import { ImageWithFallback, Loader } from '@/components/elements';
import { useDialogControl } from '@/hooks';
import {
  formatAxiosErrorMessage,
  launchNotification,
  pickArtistsNames,
} from '@/utils';
import { useAuth } from '@/lib/authentication';
import { FormattedArtist } from '@/types';

interface SongDetailsProps {}

export const SongDetails: React.FunctionComponent<SongDetailsProps> = () => {
  const { isDialogOpen, closeDialog, openDialog } = useDialogControl();
  const router = useRouter();
  const { id } = router.query;

  const {
    data: songDetails,
    isLoading,
    isError,
  } = useSongDetails(id as string);

  const { mutate: postContribution, isLoading: isContributionLoading } =
    useContribution();

  const { userRole } = useAuth();

  console.log(userRole);

  const { name, artists, genreNames, images } = songDetails || {};
  const imageUrl = images?.[0].url as string;

  const handleSubmit = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const { value: contributorNote } = form.elements.namedItem(
      'contributorNote'
    ) as HTMLTextAreaElement;

    if (songDetails) {
      const contribution = { ...songDetails, contributorNote };

      postContribution(contribution, {
        onSuccess: () => {
          launchNotification(
            'success',
            'Your contribution has been submitted successfully.'
          );
          closeDialog();
        },

        onError: (error) => {
          const errorMessage = formatAxiosErrorMessage(error as AxiosError);
          launchNotification('error', errorMessage);
        },
      });
    }
  };

  if (isLoading) {
    return <Loader isFullHeight />;
  }

  return (
    <div className="relative max-w-xl py-16 pb-24 mx-auto text-white">
      <Head>
        <title>{name}&apos;s Genres - The Genre isn&apos;t World</title>
        <meta
          name="description"
          content={`The genres associated with ${name} by ${pickArtistsNames(
            artists as FormattedArtist[]
          )}.`}
        />
      </Head>

      <ContributionFormDialog
        songName={name as string}
        isDialogOpen={isDialogOpen}
        closeDialog={closeDialog}
        handleSubmit={handleSubmit}
        isContributionLoading={isContributionLoading}
      />

      <div className="w-1/2 min-w-[150px] max-w-[200px] overflow-hidden rounded-2xl ml-8">
        <ImageWithFallback
          src={imageUrl}
          fallbackSrc="/images/song.jpg"
          alt={name as string}
          width="100%"
          height="100%"
          objectFit="cover"
          className="relative w-full h-full"
        />
      </div>

      <div className="relative p-8 pb-16 space-y-8 rounded-md bg-tgiwBlue-dark -top-10">
        <h1 className="max-w-md ml-auto text-5xl text-right break-words">
          {name}
        </h1>

        <ContributionArtistsList artists={artists} />
      </div>

      <ContributorGenresList genreNames={genreNames} />

      {userRole === 'contributor' && (
        <button
          onClick={openDialog}
          className="bottom-0 right-0 w-full px-4 py-6 transition-colors duration-300 rounded-md md:rounded-none md:fixed bg-tgiwYellow hover:bg-tgiwOrange text-tgiwPurplish mdrounded-md eas"
        >
          Contribute this song to TGIW
        </button>
      )}
    </div>
  );
};
