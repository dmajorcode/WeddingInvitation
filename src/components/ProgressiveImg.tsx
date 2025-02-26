import { useState, useEffect } from 'react';

const ProgressiveImg = ({ placeholderSrc, src, ...props }: any) => {
  const [imgSrc, setImgSrc] = useState(placeholderSrc || src);

  const customClass =
    placeholderSrc && imgSrc === placeholderSrc ? 'loading' : 'loaded';

  return (
    <img
      {...{ src: imgSrc, ...props }}
      alt={props.alt || ''}
      className={`image ${customClass}`}
      style={{ minHeight: '400px', width: '100%' }}
    />
  );
};
export default ProgressiveImg;
