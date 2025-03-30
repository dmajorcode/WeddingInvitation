import { useState, useRef } from "react";
import styled from "styled-components";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import images from "./Images.ts";

const PhotoGallery = () => {
  const [isMoreView, setIsMoreView] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);

  const smallItemStyles: React.CSSProperties = {
    cursor: "pointer",
    objectFit: "cover",
    width: "min(32vw, 190px)",
    height: "min(32vw, 190px)",
    borderRadius: "2%",
    transition: "all 0.3s ease",
  };

  const handleImageClick = (imageSource: string, index: number) => {
    setSelectedImage(imageSource);
    setCurrentIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!selectedImage) return;

    const touchEndX = e.touches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      // Minimum swipe distance
      if (diff > 0) {
        // Swipe left - next image
        const nextIndex = (currentIndex + 1) % images.length;
        setCurrentIndex(nextIndex);
        setSelectedImage(images[nextIndex].source);
      } else {
        // Swipe right - previous image
        const prevIndex = (currentIndex - 1 + images.length) % images.length;
        setCurrentIndex(prevIndex);
        setSelectedImage(images[prevIndex].source);
      }
    }
  };

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        paddingLeft: "20px",
        paddingRight: "20px",
        touchAction: "none",
        userSelect: "none",
        WebkitTouchCallout: "none",
        WebkitUserSelect: "none",
        WebkitTapHighlightColor: "transparent",
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
          paddingLeft: "20px",
          paddingRight: "20px",
          boxSizing: "border-box",
        }}
      >
        {images.map((image, index) => (
          <div key={index} className="image-container">
            <img
              loading="lazy"
              style={smallItemStyles}
              alt={image.alt}
              src={image.thumbnail}
              onClick={() => handleImageClick(image.source, index)}
            />
          </div>
        ))}
      </ImageWrapper>

      {selectedImage && (
        <ModalOverlay onClick={handleCloseModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ImageContainer
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onClick={handleCloseModal}
            >
              <img
                src={selectedImage}
                alt="Selected"
                style={{
                  maxWidth: "100%",
                  maxHeight: "90vh",
                  objectFit: "contain",
                  cursor: "pointer",
                }}
              />
            </ImageContainer>
          </ModalContent>
        </ModalOverlay>
      )}

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
            zIndex: 2,
          }}
        />
      )}

      {/* isMoreView가 false일 때만 보이도록 설정 */}
      {!isMoreView && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "100px",
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
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            cursor: "pointer",
            zIndex: 3,
          }}
        >
          <span style={{ display: "flex", alignItems: "center" }}>
            사진 더보기
            <KeyboardArrowDownIcon
              fontSize="large"
              style={{ marginLeft: "8px" }}
            />
          </span>
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
  padding-left: 20px;
  padding-right: 20px;
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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  cursor: pointer;
  touch-action: none;
  user-select: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled.div`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  touch-action: none;
  user-select: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  touch-action: none;
  user-select: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
`;
