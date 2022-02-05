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

    const flagQueries = HOMEPAGE_COUNTRIES.map((country) =>
      queryClient.prefetchQuery(['flag', country], () => getFlag(country))
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
  const flags = flagsResponse.map((r) => r.data);

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

      <section className="sm:max-w-xl w-full mx-auto lg:max-w-full p-6 rounded bg-[#A3BBCE]">
        <div className="py-6 mx-auto overflow-hidden text-center rounded-lg bg-tgiwBlue-light lg:text-left lg:flex lg:justify-between lg:space-x-6 lg:items-start">
          <div className="px-6">
            <h1 className="max-w-sm mx-auto text-3xl lg:mx-0 sm:text-4xl">
              Curated tunes from all over the globe
            </h1>

            <p className="max-w-md mx-auto mt-4 text-tgiwPurplish text-opacity-60 lg:mx-0">
              Extend your music taste with songs from a diverse catalogue
              spanning numerous genres.
            </p>

            <Link href="/sign-up">
              <a className="inline-block text-sm px-4 py-2 mt-8 transition duration-500 ease-in-out rounded-md hover:scale-105 active:scale-[0.95] bg-tgiwPurplish text-white">
                Get started
              </a>
            </Link>
          </div>

          <div className="lg:max-w-[40%] max-h-60 overflow-hidden relative rounded-l-md">
            <div className="absolute z-[1] w-full h-full bg-gradient-to-b lg:bg-gradient-to-l from-transparent to-tgiwBlue-light"></div>

            <ul className="relative flex flex-wrap gap-3 mt-12 justify-left w-[140%] -left-4 lg:mt-0 lg:items-start card-home">
              {HOMEPAGE_COUNTRIES.map((country, index) => (
                <li
                  key={country}
                  className="py-1.5 px-2 bg-gray-200 bg-opacity-40 rounded"
                >
                  {country} {flags[index]}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="flex flex-col items-center w-full gap-4 p-6 py-4 mx-auto mt-12 rounded-md lg:justify-between bg-opacity-30 bg-tgiwOrange lg:flex-row sm:max-w-xl lg:max-w-full">
        <p className="max-w-sm text-center lg:text-left">
          Find the genre of any digital track in the world. Well, kinda.
        </p>

        <Link href="/genre-finder">
          <a className="inline-block text-sm px-4 py-2  transition duration-500 ease-in-out rounded-md hover:scale-105 active:scale-[0.95] bg-tgiwOrange text-white">
            Try without signing in
          </a>
        </Link>
      </div>

      <section className="mt-12">
        <h1 className="text-lg text-center lg:text-left text-tgiwPurplish text-opacity-40">
          Recently Added
        </h1>

        <ul
          aria-label="songs"
          className="grid grid-cols-2 gap-4 mx-auto mt-2 sm:gap-8 sm:max-w-xl md:grid-cols-2 lg:max-w-4xl xl:mx-0 xl:max-w-none lg:grid-cols-3 xl:grid-cols-4"
        >
          {songs?.map((song) => {
            return (
              <li key={song.id}>
                <SongCard song={song} />
              </li>
            );
          })}
        </ul>
      </section>

      <div className="flex flex-col items-center w-full gap-4 p-6 py-4 mx-auto my-12 rounded-md mb-14 md:mb-8 lg:justify-between bg-opacity-30 bg-tgiwYellow lg:flex-row sm:max-w-xl lg:max-w-full">
        <p className="max-w-sm text-center lg:text-left">
          {"You'll need an account to view more songs, song details or genres."}
        </p>

        <Link href="/sign-up">
          <a className="inline-block text-sm px-4 py-2 transition duration-500 ease-in-out rounded-md hover:scale-105 active:scale-[0.95] bg-tgiwYellow ">
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
