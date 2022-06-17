/** @jsxImportSource @emotion/react */
import KakaoMap from "components/commons/kakao.map";
import config from "config";
import { useCallback, useEffect, useRef } from "react";
import page from "styles/page";

const { kakaoDevelopers: KAKAO_MAP_KEY } = config.get("keys");

function PageSpaces() {
  const mapRef = useRef(null);
  const onLoad = useCallback((map: any) => {
    mapRef.current = map;
    console.log(mapRef.current);
  }, []);

  return (
    <div css={[page]}>
      <KakaoMap
        mapKey={KAKAO_MAP_KEY}
        options={{
          center: {
            latitude: 37.517235,
            longitude: 127.047325,
          },
          level: 7,
        }}
        onLoad={onLoad}
      />
    </div>
  );
}

export default PageSpaces;
