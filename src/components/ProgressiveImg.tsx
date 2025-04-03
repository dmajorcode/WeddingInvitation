import { useState } from "react";

const ProgressiveImg = ({ placeholderSrc, src, ...props }: any) => {
  const [imgSrc, setImgSrc] = useState(placeholderSrc || src);

  return (
    <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
      {/* 원본 이미지 */}
      <img
        src={imgSrc}
        alt={props.alt || ""}
        draggable={false}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          userSelect: "none",
          WebkitUserSelect: "none",
          WebkitTouchCallout: "none",
          WebkitTapHighlightColor: "transparent",
          pointerEvents: "none",
        }}
      />

      {/* ✅ 훨씬 더 부드러운 그라데이션 */}
      <div
        style={{
          position: "absolute",
          bottom: "0",
          left: "0",
          width: "100%",
          height: "200px", // 🔥 높이 늘려서 부드럽게 확산
          background:
            "linear-gradient(to bottom, rgba(249, 249, 249, 0) 30%, rgba(249, 249, 249, 0.5) 55%, #f9f9f9 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

export default ProgressiveImg;
