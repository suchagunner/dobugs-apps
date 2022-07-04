/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from "@emotion/react";
import useEffectOnce from "hooks/effect.once";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  const { mapKey, options } = props;
  const Canvas = useCallback(() => {
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
  }, []);

  const sdk = useMemo(() => new SDK(mapKey), []);
  const $mapDivRef = useRef<Nullable<HTMLDivElement>>(null);
  const mapRef = useRef<any>(null);
  const $kakao = useRef<any>(null);

  const markers = useMemo<any>(() => [], [mapRef]);

  const initialize = useCallback(() => {
    const { latitude, longitude } = options.center;
    sdk.load().then((kakao) => {
      $kakao.current = kakao;
      mapRef.current = new kakao.maps.Map($mapDivRef.current, {
        ...options,
        center: new kakao.maps.LatLng(latitude, longitude),
      });
    });
  }, [mapRef]);

  useEffectOnce(() => {
    initialize();
  });

  useEffect(() => {
    if (mapRef.current && $kakao.current) {
      const { current: map } = mapRef;
      const { current: kakao } = $kakao;

      const point = new kakao.maps.LatLng(
        options.point.latitude,
        options.point.longitude,
      );

      const marker = new kakao.maps.Marker({
        map,
        position: point,
      });

      markers.push(marker);
    }

    return () => {
      if (markers.length > 0) {
        markers
          .map((o: any) => {
            o.setMap(null);
            return null;
          })
          .filter((f: any) => f);
      }
    };
  });

  return <Canvas />;
}

export default MapCanvas;
