import {
  Container as MapDiv,
  Marker,
  NaverMap,
  useNavermaps,
} from "react-naver-maps";

const Map = () => {
  const lat = 37.48332; // 37.483626;
  const lon = 127.119668; // 127.19732;
  const navermaps = useNavermaps();

  return (
    <MapDiv
      style={{
        width: "100%",
        height: "310px",
      }}
    >
      <NaverMap
        defaultCenter={new navermaps.LatLng(lat, lon)}
        defaultZoom={16}
        draggable={true}
        pinchZoom={true}
        zoomControl={true}
        scrollWheel={false}
        keyboardShortcuts={false}
      >
        <Marker defaultPosition={new navermaps.LatLng(lat, lon)} />
      </NaverMap>
    </MapDiv>
  );
};

export default Map;
