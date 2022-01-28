import { Injectable } from '@nestjs/common';
import Vibrant = require('node-vibrant');
import chroma = require('chroma-js');

@Injectable()
export class HelpersService {
  // https://stackoverflow.com/a/67239246
  paginateResponse<DataType>(
    data: DataType,
    page: number,
    take: number,
    fullDataLength: number,
  ) {
    const totalPages = Math.ceil(fullDataLength / take);
    const nextPage = page + 1 > totalPages ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;

    return {
      data,
      count: fullDataLength,
      currentPage: page,
      nextPage,
      prevPage,
      totalPages,
    };
  }

  darkenColor = (color: string) => {
    if (!color) {
      return;
    }

    if (chroma(color).luminance() > 0.7) {
      return chroma(color).darken(2).hex();
    }

    if (chroma(color).luminance() > 0.5) {
      return chroma(color).darken().hex();
    }

    return color;
  };

  brightenColor = (color: string) => {
    if (!color) {
      return;
    }

    if (chroma(color).luminance() < 0.1) {
      return chroma(color).brighten(3).hex();
    }

    if (chroma(color).luminance() < 0.35) {
      return chroma(color).brighten(2).hex();
    }

    if (chroma(color).luminance() < 0.45) {
      return chroma(color).brighten().hex();
    }

    return color;
  };

  generateRandomColor = () => {
    return chroma.random().hex();
  };

  async getColorFromImage(images: SpotifyApi.ImageObject[]): Promise<string> {
    console.log(images.length);
    console.log(!images.length);

    if (!images.length) {
      return;
    }

    const largestImageUrl = images[0].url;

    const palette = await Vibrant.from(largestImageUrl).getPalette(
      (_, palette) => palette,
    );

    const paletteArray = Object.values(palette);
    const mostCommonColor = paletteArray.reduce((prev, current) =>
      prev.population > current.population ? prev : current,
    );

    return mostCommonColor.hex;
  }
}
