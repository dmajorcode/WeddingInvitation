import { useState } from "react";

const ProgressiveImg = ({ placeholderSrc, src, ...props }: any) => {
  const [imgSrc, setImgSrc] = useState(placeholderSrc || src);

  return (
    <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
      {/* 이미지 삽입 (짤리지 않도록 width 100% 설정) */}
      <img
        src={imgSrc}
        alt={props.alt || ""}
        style={{
          width: "100%",
          height: "auto", // 이미지 비율 유지
          display: "block",
        }}
      />

      {/* 그라데이션 오버레이 */}
      <div
        style={{
          position: "absolute",
          bottom: "0",
          left: "0",
          width: "100%",
          height: "100px", // 조절 가능
          background: "linear-gradient(to bottom, transparent, white)",
        }}
      />
    </div>
  );
};

export default ProgressiveImg;
