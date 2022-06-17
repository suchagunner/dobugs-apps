/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from "@emotion/react";
import { useEffect, useRef } from "react";
import loadSdk from "./lib/sdk";

interface KakaoMapOptions {
  center: Array<string | number>;
  [propName: string | number | symbol]: any;
}

interface KakaoMapInterface {
  mapKey: string;
  options: KakaoMapOptions;
}

interface MapCanvasProps extends KakaoMapInterface {
  onLoad(map: unknown): void;
}

function MapCanvas(props: React.PropsWithChildren<MapCanvasProps>) {
  const $mapDivRef = useRef(null);
  const mapRef = useRef(null);
  const { mapKey, options } = props;

  useEffect(() => {
    loadSdk(mapKey).then((kakao) => {
      mapRef.current = new kakao.maps.Map($mapDivRef.current, {
        ...options,
        center: new kakao.maps.LatLng(options.center[0], options.center[1]),
      });
    });
  }, []);

  return (
    <div
      id="map-area"
      css={{
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}
      ref={$mapDivRef}
    ></div>
  );
}

export default MapCanvas;
