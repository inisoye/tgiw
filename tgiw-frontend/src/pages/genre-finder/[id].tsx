import * as React from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

interface GenreFinderSongProps {}

const GenreFinderSong: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <div>GenreFinderSong: {id}</div>;
};

export default GenreFinderSong;
