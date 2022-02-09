import * as React from 'react';
import Img from 'react-cool-img';

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
