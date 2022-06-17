/** @jsxImportSource @emotion/react */
import MapCanvas from "components/commons/kakao.map";
import config from "config";
import { useCallback, useEffect, useRef } from "react";
import page from "styles/page";

const { kakaoDevelopers: KAKAO_MAP_KEY } = config.get("keys");

function PageSpaces() {
  const mapRef = useRef(null);
  const onLoad = useCallback((map: any) => {
    mapRef.current = map;
  }, []);

  useEffect(() => {}, [mapRef]);

  return (
    <main css={[page]}>
      <MapCanvas
        mapKey={KAKAO_MAP_KEY}
        options={{
          center: [33.450701, 126.570667],
          level: 3,
        }}
        onLoad={onLoad}
      />
    </main>
  );
}

export default PageSpaces;
