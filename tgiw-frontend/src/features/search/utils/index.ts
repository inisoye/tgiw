import uniqBy from 'lodash.uniqby';

import type { Song } from '@/types';

export const pickPropertyFromSongs = (
  songs: Song[] | undefined,
  property: 'genres' | 'artists'
) => uniqBy(songs?.map((s) => s[property]).flat(), 'id');
