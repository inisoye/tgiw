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
