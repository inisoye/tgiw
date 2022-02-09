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
  const { src, fallbackSrc, alt, ...rest } = props;
  const [imgSrc, setImgSrc] = React.useState(src || fallbackSrc);

  return (
    <Img
      {...rest}
      src={imgSrc}
      alt={alt}
      placeholder="/images/staticLightBg.jpg"
      onError={() => setImgSrc(fallbackSrc)}
    />
  );
};
