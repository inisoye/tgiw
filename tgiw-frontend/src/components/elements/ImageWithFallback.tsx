import * as React from 'react';
import Img from 'react-cool-img';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';

interface ImageWithFallbackProps {
  src: string;
  fallbackSrc: string;
  alt: string;

  [rest: string]: any; // All other props
}

export const ImageWithFallback: React.FunctionComponent<
  ImageWithFallbackProps
> = props => {
  const { src, fallbackSrc, alt, objectFit, ...rest } = props;
  const [imgSrc, setImgSrc] = React.useState(src || fallbackSrc);

  return (
    <AspectRatio.Root ratio={1 / 1}>
      <Img
        {...rest}
        src={imgSrc}
        style={{ objectFit }}
        error={fallbackSrc}
        alt={alt}
        width="100%"
        height="100%"
        placeholder="/images/staticLightBg.jpg"
      />
    </AspectRatio.Root>
  );
};
