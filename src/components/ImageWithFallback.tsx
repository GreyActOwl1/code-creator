import React, { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fallbackSrc: string;
  className?: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ src, alt, fallbackSrc, className }) => {
  const [imgSrc, setImgSrc] = useState(src);

  const onError = () => {
    setImgSrc(fallbackSrc);
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={onError}
      className={className}
    />
  );
};

export default ImageWithFallback;
