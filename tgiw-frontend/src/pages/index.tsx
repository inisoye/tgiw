import * as React from 'react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient } from 'react-query';
import nookies from 'nookies';

import { MainLayout } from '@/components/layout';
import { useAuth } from '@/lib/authentication';
import { get10Songs, SongCard, use10Songs } from '@/features/songs';
import { NextPageWithLayout } from '@/types';
import { firebaseAdmin } from '@/lib/firebaseAdmin';
import { getFlag, useFlags } from '@/features/genres';

const HOMEPAGE_COUNTRIES = [
  'Nigeria',
  'Colombia',
  'Sweden',
  'Peru',
  'Mexico',
  'Japan',
  'South Africa',
  'United States',
  'Brazil',
  'Ecuador',
  'Cuba',
  'Angola',
  'Senegal',
  'Mali',
  'Cape Verde',
  'France',
  'Spain',
  'Australia',
  'Ethiopia',
  'Taiwan',
  'China',
  'Italy',
  'Egypt',
  'Democratic Republic of the Congo',
];

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    await firebaseAdmin.auth().verifyIdToken(cookies.token);

    return {
      redirect: {
        permanent: false,
        destination: '/songs',
      },
    };
  } catch (err) {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery('10songs', get10Songs);

    const flagQueries = HOMEPAGE_COUNTRIES.map(country =>
      queryClient.prefetchQuery(['flag', country], () => getFlag(country)),
    );

    await Promise.all(flagQueries);

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  }
};

const Home: NextPageWithLayout = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { data: songs } = use10Songs();

  const flagsResponse = useFlags(HOMEPAGE_COUNTRIES);
  const flags = flagsResponse.map(r => r.data);

  if (user) {
    router.replace('/songs');
  }

  return (
    <>
      <Head>
        <title>The Genre isn&apos;t World</title>
        <meta
          name="description"
          content="Extend your music taste with songs from a diverse catalogue spanning numerous genres."
        />
      </Head>

      <section className="mx-auto w-full rounded bg-[#A3BBCE] p-6 sm:max-w-xl lg:max-w-full">
        <div className="mx-auto overflow-hidden rounded-lg bg-tgiwBlue-light py-6 text-center lg:flex lg:items-start lg:justify-between lg:space-x-6 lg:text-left">
          <div className="px-6">
            <h1 className="mx-auto max-w-sm text-3xl sm:text-4xl lg:mx-0">
              Curated tunes from all over the globe
            </h1>

            <p className="mx-auto mt-4 max-w-md text-tgiwPurplish text-opacity-60 lg:mx-0">
              Extend your music taste with songs from a diverse catalogue
              spanning numerous genres.
            </p>

            <Link href="/sign-up">
              <a className="mt-8 inline-block rounded-md bg-tgiwPurplish px-4 py-2 text-sm text-white transition duration-500 ease-in-out hover:scale-105 active:scale-[0.95]">
                Get started
              </a>
            </Link>
          </div>

          <div className="relative max-h-60 overflow-hidden rounded-l-md lg:max-w-[40%]">
            <div className="absolute z-[1] h-full w-full bg-gradient-to-b from-transparent to-tgiwBlue-light lg:bg-gradient-to-l"></div>

            <ul className="justify-left card-home relative -left-4 mt-12 flex w-[140%] flex-wrap gap-3 lg:mt-0 lg:items-start">
              {HOMEPAGE_COUNTRIES.map((country, index) => (
                <li
                  key={country}
                  className="rounded bg-gray-200 bg-opacity-40 py-1.5 px-2"
                >
                  {country} {flags[index]}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="mx-auto mt-12 flex w-full flex-col items-center gap-4 rounded-md bg-tgiwOrange bg-opacity-30 p-6 py-4 sm:max-w-xl lg:max-w-full lg:flex-row lg:justify-between">
        <p className="max-w-sm text-center lg:text-left">
          Find the genre of any digital track in the world. Well, kinda.
        </p>

        <Link href="/genre-finder">
          <a className="inline-block rounded-md bg-tgiwOrange px-4  py-2 text-sm text-white transition duration-500 ease-in-out hover:scale-105 active:scale-[0.95]">
            Try without signing in
          </a>
        </Link>
      </div>

      <section className="mt-12">
        <h1 className="text-center text-lg text-tgiwPurplish text-opacity-40 lg:text-left">
          Recently Added
        </h1>

        <ul
          aria-label="songs"
          className="mx-auto mt-2 grid grid-cols-2 gap-4 sm:max-w-xl sm:gap-8 md:grid-cols-2 lg:max-w-4xl lg:grid-cols-3 xl:mx-0 xl:max-w-none xl:grid-cols-4"
        >
          {songs?.map(song => {
            return (
              <li key={song.id}>
                <SongCard song={song} />
              </li>
            );
          })}
        </ul>
      </section>

      <div className="mx-auto my-12 mb-14 flex w-full flex-col items-center gap-4 rounded-md bg-tgiwYellow bg-opacity-30 p-6 py-4 sm:max-w-xl md:mb-8 lg:max-w-full lg:flex-row lg:justify-between">
        <p className="max-w-sm text-center lg:text-left">
          {"You'll need an account to view more songs, song details or genres."}
        </p>

        <Link href="/sign-up">
          <a className="inline-block rounded-md bg-tgiwYellow px-4 py-2 text-sm transition duration-500 ease-in-out hover:scale-105 active:scale-[0.95] ">
            Create account
          </a>
        </Link>
      </div>

      <style jsx>{`
        .card-home {
          animation: scroll 20s linear 1s infinite;
          animation-fill-mode: alternate;
        }

        @keyframes scroll {
          0% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(-100px, 0, 0);
          }

          100% {
            transform: translate3d(0, 0, 0);
          }
        }
      `}</style>
    </>
  );
};

Home.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

export default Home;
