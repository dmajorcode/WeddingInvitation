import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import images from "./Images.ts";

const NoDragImage = styled.img`
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
  pointer-events: auto;
`;

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
  const touchStartY = useRef(0);
  const isSwiping = useRef(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(
    null
  );

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
    touchStartY.current = e.touches[0].clientY;
    isSwiping.current = true;
    setSwipeDirection(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!selectedImage || !isSwiping.current) return;

    const touchEndX = e.touches[0].clientX;
    const touchEndY = e.touches[0].clientY;
    const diffX = touchStartX.current - touchEndX;
    const diffY = Math.abs(touchStartY.current - touchEndY);

    // Only handle horizontal swipes if the vertical movement is minimal
    if (diffY < 50) {
      if (Math.abs(diffX) > 30) {
        setSwipeDirection(diffX > 0 ? "left" : "right");
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!selectedImage || !isSwiping.current) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchStartX.current - touchEndX;
    const diffY = Math.abs(touchStartY.current - touchEndY);

    // Only process swipe if vertical movement is minimal
    if (diffY < 50 && Math.abs(diffX) > 50) {
      if (diffX > 0) {
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

    isSwiping.current = false;
    setSwipeDirection(null);
  };

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;

      if (e.key === "ArrowLeft") {
        const prevIndex = (currentIndex - 1 + images.length) % images.length;
        setCurrentIndex(prevIndex);
        setSelectedImage(images[prevIndex].source);
      } else if (e.key === "ArrowRight") {
        const nextIndex = (currentIndex + 1) % images.length;
        setCurrentIndex(nextIndex);
        setSelectedImage(images[nextIndex].source);
      } else if (e.key === "Escape") {
        handleCloseModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, currentIndex]);

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
      {/* 이미지 썸네일 컨테이너 */}
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
          margin: "0 auto" /* 중앙 정렬 */,
          padding: "0",
          marginBottom: "40px" /* 🟢 아래 여백 추가 */,
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="image-container"
            style={{
              userSelect: "none",
              WebkitUserSelect: "none",
              WebkitTouchCallout: "none",
              WebkitTapHighlightColor: "transparent",
              pointerEvents: "auto",
            }}
          >
            <div
              style={{
                backgroundImage: `url(${image.thumbnail})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                // width: "100px", // 이미지 크기에 맞게 조절
                // height: "100px",
                // borderRadius: "8px", // 둥근 모서리 추가 가능
                // cursor: "pointer",
                objectFit: "cover",
                width: "min(30vw, 11.87rem)",
                height: "min(30vw, 11.87rem)",
                borderRadius: "2%",
                transition: "all 0.3s ease",
              }}
              onClick={() => handleImageClick(image.source, index)}
              onContextMenu={(e) => e.preventDefault()} // 우클릭 방지
            />
          </div>
        ))}
      </ImageWrapper>
      {selectedImage && (
        <ModalOverlay onClick={handleCloseModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={handleCloseModal}>
              <CloseIcon
                sx={{
                  width: "7vw",
                  fill: "rgba(250, 250, 250, 0.86)",
                }}
              />
            </CloseButton>
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
              onTouchEnd={handleTouchEnd}
              onClick={handleCloseModal}
              style={{
                transform:
                  swipeDirection === "left"
                    ? "translateX(-10px)"
                    : swipeDirection === "right"
                    ? "translateX(10px)"
                    : "none",
                transition: "transform 0.2s ease-out",
              }}
            >
              {isImageLoading && (
                <LoadingPlaceholder>
                  <div className="loading-spinner" />
                </LoadingPlaceholder>
              )}
              <NoDragImage
                ref={imageRef}
                src={selectedImage}
                alt="Selected"
                draggable={false}
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
            bottom: "60px" /* 🔹 기존보다 조금 아래로 조정 */,
            left: 0,
            right: 0,
            height: "90px" /* 🔹 그라데이션 크기 조정 */,
            background:
              "linear-gradient(to bottom, rgba(255, 255, 255, 0) 2%, rgba(255, 255, 255, 1) 100%)",
            zIndex: 2 /* 🔹 버튼보다 뒤쪽으로 */,
          }}
        />
      )}

      {/* 버튼 위쪽의 블러 효과 (그라데이션) */}
      {!isMoreView && (
        <div
          style={{
            position: "absolute",
            bottom: "0px",
            left: 0,
            width: "100%",
            height: "100px",
            transition: "opacity 0.3s ease",
            zIndex: 2 /* 🔹 버튼보다 뒤쪽으로 */,
          }}
        />
      )}

      {/* 더보기 버튼 */}
      {!isMoreView && (
        <MoreButton
          onClick={() => setIsMoreView(true)}
          style={{
            position: "absolute",
            bottom: "-10px",
            left: 0,
            width: "100%",
            backgroundColor: "#fff",
            padding: "25px 0",
            height: "70px",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            cursor: "pointer",
            zIndex: 3 /* 🔹 버튼이 가장 위 */,
          }}
        >
          <span style={{ display: "flex", alignItems: "center" }}>
            사진 더보기
            <KeyboardArrowDownIcon
              sx={{ marginLeft: "8px", fontWeight: 400 }}
            />
          </span>
        </MoreButton>
      )}

      {/* 버튼 아래 흰색 영역 추가 */}
      {!isMoreView && (
        <div
          style={{
            position: "absolute",
            bottom: "-50px",
            left: 0,
            width: "100%",
            height: "50px",
            backgroundColor: "#fff",
            zIndex: 2 /* 🔹 버튼보다 아래 */,
          }}
        />
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
    font-size: clamp(16px, 3vw, 24px)
    color: rgba(226, 226, 226, 0.59);
    filter: drop-shadow(0 0 4px rgba(226, 226, 226, 0.51));
  }

  @media (max-width: 768px) {
    width: 24px;
    height: 24px;

    svg {
      font-size: 20px;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1002;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  svg {
    font-size: 32px;
    color: white;
    filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.3));
  }

  @media (max-width: 768px) {
    top: 8px;
    right: 8px;
    width: 35px;
    height: 35px;

    svg {
      font-size: 28px;
      color: white;
      filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.3));
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
