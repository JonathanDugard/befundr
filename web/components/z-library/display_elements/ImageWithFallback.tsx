'use client';
import React, { useEffect, useState } from 'react';

type Props = {
  fallbackImageSrc: string;
  alt: string;
  src: string;
  width: number;
  height: number;
  classname: string;
};

const ImageWithFallback = (props: Props) => {
  const [imgSrc, setImgSrc] = useState(props.src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(props.src);
    setHasError(false);
  }, [props.src]);

  const handleError = () => {
    if (!hasError) {
      setImgSrc(props.fallbackImageSrc);
      setHasError(true);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={props.alt}
      width={props.width}
      height={props.height}
      className={props.classname}
      onError={handleError}
    />
  );
};

export default ImageWithFallback;
