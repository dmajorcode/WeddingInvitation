import { useState } from "react";
import PhotoGallery from "./PhotoGallery.tsx";

const GalleryWrap = () => {
  const [isMoreView, setIsMoreView] = useState(false);

  return <PhotoGallery />;
};

export default GalleryWrap;
