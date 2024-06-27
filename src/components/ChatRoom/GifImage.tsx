import React from 'react';

interface GifImageProps {
  src: string;
  alt: string;
}

const GifImage: React.FC<GifImageProps> = ({ src, alt }) => {
  return (
    <img
      src={src}
      alt={alt}
      style={{ maxWidth: '40px', height: 'auto' }}
    />
  );
};

export default GifImage;
