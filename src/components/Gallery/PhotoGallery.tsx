import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import images from "./Images.ts";

const PhotoGallery = () => {
  const [isMoreView, setIsMoreView] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [leftArrowColor, setLeftArrowColor] = useState(
    "rgba(255, 255, 255, 0.9)"
  );
  const [rightArrowColor, setRightArrowColor] = useState(
    "rgba(255, 255, 255, 0.9)"
  );
  const touchStartX = useRef(0);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const analyzeImageBrightness = (image: HTMLImageElement) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to match image
    canvas.width = image.width;
    canvas.height = image.height;

    // Draw image
    ctx.drawImage(image, 0, 0);

    // Analyze left side
    const leftData = ctx.getImageData(
      0,
      0,
      Math.floor(image.width * 0.2),
      image.height
    ).data;
    const leftBrightness = calculateBrightness(leftData);

    // Analyze right side
    const rightData = ctx.getImageData(
      Math.floor(image.width * 0.8),
      0,
      Math.floor(image.width * 0.2),
      image.height
    ).data;
    const rightBrightness = calculateBrightness(rightData);

    // Update arrow colors based on brightness
    setLeftArrowColor(
      leftBrightness > 128 ? "rgba(0, 0, 0, 0.9)" : "rgba(255, 255, 255, 0.9)"
    );
    setRightArrowColor(
      rightBrightness > 128 ? "rgba(0, 0, 0, 0.9)" : "rgba(255, 255, 255, 0.9)"
    );
  };

  const calculateBrightness = (data: Uint8ClampedArray): number => {
    let sum = 0;
    for (let i = 0; i < data.length; i += 4) {
      sum += (data[i] + data[i + 1] + data[i + 2]) / 3;
    }
    return sum / (data.length / 4);
  };

  useEffect(() => {
    if (selectedImage && imageRef.current) {
      const img = new Image();
      img.onload = () => {
        analyzeImageBrightness(img);
      };
      img.src = selectedImage;
    }
  }, [selectedImage]);

  const smallItemStyles: React.CSSProperties = {
    cursor: "pointer",
    objectFit: "cover",
    width: "min(32vw, 190px)",
    height: "min(32vw, 190px)",
    borderRadius: "2%",
    transition: "all 0.3s ease",
    userSelect: "none",
    WebkitTouchCallout: "none",
    WebkitUserSelect: "none",
    WebkitTapHighlightColor: "transparent",
  };

  const handleImageClick = (imageSource: string, index: number) => {
    setIsImageLoading(true);
    // Preload the image before showing it
    const img = new Image();
    img.onload = () => {
      setSelectedImage(imageSource);
      setCurrentIndex(index);
    };
    img.src = imageSource;
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
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
        padding: "0 20px",
        userSelect: "none",
        WebkitTouchCallout: "none",
        WebkitUserSelect: "none",
        WebkitTapHighlightColor: "transparent",
        boxSizing: "border-box",
        margin: 0,
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
          boxSizing: "border-box",
          margin: 0,
          padding: 0,
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
            <TouchZone
              onClick={(e) => {
                e.stopPropagation();
                const prevIndex =
                  (currentIndex - 1 + images.length) % images.length;
                setIsImageLoading(true);
                const img = new Image();
                img.onload = () => {
                  setCurrentIndex(prevIndex);
                  setSelectedImage(images[prevIndex].source);
                };
                img.src = images[prevIndex].source;
              }}
              style={{ left: 0 }}
            >
              <NavButton>
                <ArrowBackIosNewIcon style={{ color: leftArrowColor }} />
              </NavButton>
            </TouchZone>
            <ImageContainer
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onClick={handleCloseModal}
            >
              {isImageLoading && (
                <LoadingPlaceholder>
                  <div className="loading-spinner" />
                </LoadingPlaceholder>
              )}
              <img
                ref={imageRef}
                src={selectedImage}
                alt="Selected"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                  cursor: "pointer",
                  userSelect: "none",
                  WebkitTouchCallout: "none",
                  WebkitUserSelect: "none",
                  WebkitTapHighlightColor: "transparent",
                  transform: "scale(1)",
                  transformOrigin: "center",
                  pointerEvents: "none",
                  opacity: isImageLoading ? 0 : 1,
                  transition: "opacity 0.3s ease",
                }}
                onLoad={handleImageLoad}
              />
            </ImageContainer>
            <TouchZone
              onClick={(e) => {
                e.stopPropagation();
                const nextIndex = (currentIndex + 1) % images.length;
                setIsImageLoading(true);
                const img = new Image();
                img.onload = () => {
                  setCurrentIndex(nextIndex);
                  setSelectedImage(images[nextIndex].source);
                };
                img.src = images[nextIndex].source;
              }}
              style={{ right: 0 }}
            >
              <NavButton>
                <ArrowForwardIosIcon style={{ color: rightArrowColor }} />
              </NavButton>
            </TouchZone>
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
  box-sizing: border-box;
  margin: 0;
  padding: 0;
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
  font-size: 17px;
  font-weight: 600;
  gap: 6px;

  @media only screen and (max-width: 400px) {
    font-size: 16px;
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
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  touch-action: pan-x;
  user-select: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  touch-action: pan-x;
  user-select: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
`;

const TouchZone = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1001;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  &:hover {
    opacity: 0.8;
  }

  svg {
    font-size: 24px;
    filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.3));
  }

  @media (max-width: 768px) {
    width: 24px;
    height: 24px;

    svg {
      font-size: 20px;
    }
  }
`;

const GalleryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  touch-action: pan-x pan-y;
  -webkit-overflow-scrolling: touch;
  overflow: auto;
  &.photo-gallery {
    position: relative;
    touch-action: pan-x pan-y;
    -webkit-overflow-scrolling: touch;
    overflow: auto;
  }
`;

const LoadingPlaceholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: #fff;
    animation: spin 1s ease-in-out infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
