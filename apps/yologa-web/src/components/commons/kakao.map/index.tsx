/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from "@emotion/react";
import useEffectOnce from "hooks/effect.once";
import { useCallback, useEffect, useRef, useState } from "react";
import SDK from "./lib/sdk";

interface KakaoMapOptions {
  center: { latitude: string | number; longitude: string | number };
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
  const [initialized, setInitialized] = useState(false);
  const $mapDivRef = useRef(null);
  const mapRef = useRef(null);
  const { mapKey, options } = props;

  const initialize = useCallback(() => {
    const { latitude, longitude } = options.center;
    const sdk = new SDK(mapKey);
    sdk.load().then((kakao) => {
      mapRef.current = new kakao.maps.Map($mapDivRef.current, {
        ...options,
        center: new kakao.maps.LatLng(latitude, longitude),
      });
    });
  }, [mapRef]);

  useEffectOnce(() => {
    initialize();
  });

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
