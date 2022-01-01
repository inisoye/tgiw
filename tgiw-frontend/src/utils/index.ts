import tinycolor from 'tinycolor2';

import { ImageObject, FormattedArtist } from '@/types';

export const filterImageSizes = (
  imagesArray: ImageObject[] | undefined,
  selectedSize: number
) =>
  imagesArray?.find(
    ({ height, width }) => height === selectedSize && width === selectedSize
  );

export const pickArtistsNames = (artistsObjects: FormattedArtist[]) =>
  artistsObjects.map(({ name }) => name).join(', ');

export const formatBgColor = (color: string) => {
  if (tinycolor(color).getBrightness() < 150) {
    if (tinycolor(color).getBrightness() > 100) {
      return tinycolor(color).brighten(20).toString();
    }

    if (tinycolor(color).getBrightness() < 30) {
      return tinycolor(color).brighten(70).toString();
    }

    return tinycolor(color).brighten(50).toString();
  }

  return color;
};
