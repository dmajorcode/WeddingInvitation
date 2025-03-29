import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/style.css";
import images from "./Images.ts";
import { useRef, useState } from "react";
import styled from "styled-components";
import ShowMoreButton from "/images/showMore.png";

const PhotoGallery = () => {
  const [isMoreView, setIsMoreView] = useState(false);
  const smallItemStyles: React.CSSProperties = {
    cursor: "pointer",
    objectFit: "cover",
    width: "min(32vw, 190px)",
    height: "min(32vw, 190px)",
  };

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
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
          imageClickAction: "close",
        }}
      >
        <ImageWrapper
          $isMoreView={isMoreView}
          style={{
            display: "grid",
            maxWidth: "582px",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridGap: "6px",
            pointerEvents: "auto",
            overflow: "hidden",
            opacity: isMoreView ? 1 : 1,
            transition: "opacity 0.3s ease",
          }}
        >
          {images.map((image, index) => (
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
          ))}
        </ImageWrapper>

        {/* 기존 사진 위쪽 그라데이션 */}
        {!isMoreView && (
          <div
            style={{
              position: "absolute",
              bottom: "50px",
              left: 0,
              right: 0,
              height: "80px",
              background:
                "linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%)",
              zIndex: 2, // 기존보다 한 단계 높게
            }}
          />
        )}
      </Gallery>

      {/* isMoreView가 false일 때만 보이도록 설정 */}
      {!isMoreView && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "100px", // 원하는 높이로 조정 가능
            background:
              "linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent)",
            transition: "opacity 0.3s ease",
          }}
        />
      )}

      {/* 더보기 버튼 */}
      {!isMoreView && (
        <MoreButton
          onClick={() => setIsMoreView(true)}
          style={{
            position: "absolute",
            bottom: "0px",
            left: 0,
            width: "100%",
            backgroundColor: "#fff",
            padding: "15px 0",
            border: "none",
            display: "block",
            textAlign: "center",
            fontWeight: "bold",
            cursor: "pointer",
            zIndex: 3, // 버튼이 사진 위쪽에 보이도록
          }}
        >
          사진 더보기
        </MoreButton>
      )}
    </div>
  );
};

export default PhotoGallery;

const ImageWrapper = styled.div<{ $isMoreView: boolean }>`
  height: ${(props) =>
    props.$isMoreView ? "100%" : "calc((32vw * 6) + 30px)"};
  max-height: ${(props) => (props.$isMoreView ? "2348px" : "1170px")};
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
