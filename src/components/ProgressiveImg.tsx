import { useState, useEffect } from "react";

const ProgressiveImg = ({ placeholderSrc, src, ...props }: any) => {
  const [imgSrc, setImgSrc] = useState(placeholderSrc || src);

  const customClass =
    placeholderSrc && imgSrc === placeholderSrc ? "loading" : "loaded";

  return (
    <div style={{ position: "relative", width: "100%", minHeight: "400px" }}>
      <img
        {...{ src: imgSrc, ...props }}
        alt={props.alt || ""}
        className={`image ${customClass}`}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          objectFit: "cover", // 이미지 비율을 유지하면서 크기 조정
        }}
      />
      {/* 이미지 아래에 그라데이션 오버레이 추가 */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "15%", // 그라데이션 높이 조절
          background: "linear-gradient(to bottom, transparent, white)",
        }}
      />
    </div>
  );
};

export default ProgressiveImg;
