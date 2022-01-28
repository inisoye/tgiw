import * as React from 'react';
import Image from 'next/image';

interface ImageWithFallbackProps {
  src: string;
  fallbackSrc: string;
  alt: string;

  // All other props
  [rest: string]: any;
}

export const ImageWithFallback: React.FunctionComponent<
  ImageWithFallbackProps
> = (props) => {
  const { src, fallbackSrc, alt, ...rest } = props;
  const [imgSrc, setImgSrc] = React.useState(src || fallbackSrc);

  return (
    <Image
      {...rest}
      src={imgSrc}
      alt={alt}
      placeholder="blur"
      blurDataURL="/images/staticLightBg.jpg"
      onError={() => setImgSrc(fallbackSrc)}
    />
  );
};
