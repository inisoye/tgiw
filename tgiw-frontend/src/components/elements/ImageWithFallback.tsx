import * as React from 'react';
import Img from 'react-cool-img';

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
    <Img
      {...rest}
      src={imgSrc}
      style={{ objectFit }}
      error={fallbackSrc}
      alt={alt}
      placeholder="/images/staticLightBg.jpg"
    />
  );
};
