/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Btn from "components/atoms/Btn";
import KakaoMap from "components/commons/kakao.map";
import config from "config";
import Bounding from "data/model/Bounding";
import useEffectOnce from "hooks/effect.once";
import useRandomCoordinates from "hooks/random.coordinates";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Coordinates } from "store/typings/coordinates";
import { solidButtonStyle } from "styles/atoms";
import page from "styles/page";

const { kakaoDevelopers: KAKAO_MAP_KEY } = config.get("keys");

const buttonSection = css`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 1.6rem;
`;

function PageSpaces() {
  const [searchParams] = useSearchParams();
  const mapRef = useRef(null);
  const onLoad = useCallback((map: any) => {
    mapRef.current = map;
  }, []);

  const [center] = useState<Coordinates>({
    latitude: 37.517235,
    longitude: 127.047325,
  });

  const { data, playing, setPlaying } = useRandomCoordinates(
    Bounding.get("KOREA"),
  );

  useEffectOnce(() => {
    setPlaying(true);
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div css={[page]}>
      <KakaoMap
        mapKey={KAKAO_MAP_KEY}
        options={{
          point: { ...data },
          center,
          level: 13,
        }}
        onLoad={onLoad}
      />

      <section
        css={css`
          ${buttonSection} z-index: 1;
        `}
      >
        <Btn css={solidButtonStyle} onClick={() => setPlaying(!playing)}>
          {playing ? "멈춰!" : "돌려!"}
        </Btn>
      </section>
    </div>
  );
}

export default PageSpaces;
