import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/style.css';
import images from './Images.ts';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import ShowMoreButton from '../../../public/images/showMore.png';

const PhotoGallery = () => {
  const [isMoreView, setIsMoreView] = useState(false);
  const smallItemStyles: React.CSSProperties = {
    cursor: 'pointer',
    objectFit: 'cover',
    width: 'min(32vw, 190px)',
    height: 'min(32vw, 190px)',
  };

  return (
    <>
      <Gallery
        options={{
          zoom: false,
          counter: true,
          arrowKeys: false,
          loop: true,
          close: true,
          preload: [1, 1],
          arrowPrev: false,
          arrowNext: false,
          trapFocus: true,
          imageClickAction: 'close',
        }}
      >
        <ImageWrapper
          $isMoreView={isMoreView}
          style={{
            display: 'grid',
            maxWidth: '582px',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridGap: '6px',
            pointerEvents: 'auto',
            overflow: 'hidden',
          }}
        >
          {images.map((image, index) => {
            return (
              <Item
                key={index}
                cropped
                original={image.source}
                thumbnail={image.thumbnail}
                width={image.width}
                height={image.height}
              >
                {({ ref, open }) => (
                  <img
                    loading="lazy"
                    style={smallItemStyles}
                    alt={image.alt}
                    src={image.thumbnail}
                    ref={ref}
                    onClick={open}
                  />
                )}
              </Item>
            );
          })}
        </ImageWrapper>
      </Gallery>
      {!isMoreView && (
        <MoreButton onClick={() => setIsMoreView(true)}>
          사진 더보기 <img src={ShowMoreButton} />
        </MoreButton>
      )}
    </>
  );
};

export default PhotoGallery;

const ImageWrapper = styled.div<{ $isMoreView: boolean }>`
  height: ${(props) =>
    props.$isMoreView ? '100%' : 'calc((32vw * 6) + 30px)'};
  max-height: ${(props) => (props.$isMoreView ? '2348px' : '1170px')};
`;

const MoreButton = styled.button`
  font-family: Pretendard;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #809e83;
  padding: 30px 0 0;
  width: 50%;
  cursor: pointer;
  font-size: 20px;
  font-weight: 600;
  gap: 6px;

  @media only screen and (max-width: 400px) {
    font-size: 19px;
    gap: 5px;
  }

  & > img {
    width: 90px;
    height: 85px;

    @media only screen and (max-width: 380px) {
      width: 80px;
      height: 75px;
    }
  }
`;
