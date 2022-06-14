/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import LottiePlayer from "lottie-web";
import { useEffect, useRef, useState } from "react";

interface LottieOptions {
  isStopped?: boolean;
  value: any;
  isPaused?: boolean;
  width?: number;
  height?: number;
}

const LottieWrapperStyle = css`
  width: auto;
  height: auto;
  display: block;
  margin: auto;
`;

const LottiePlayerStyle = css`
  width: 10rem;
  height: 10rem;
  margin: auto;
`;

function Lottie({
  value,
  isStopped,
  isPaused,
  width = 100,
  height = 100,
}: LottieOptions) {
  const player = useRef<HTMLDivElement>(null);
  let playing = false;

  useEffect(() => {
    if (playing) {
      return;
    }

    LottiePlayer.loadAnimation({
      container: player.current as Element,
      animationData: value,
      renderer: "svg",
      loop: true,
      autoplay: true,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    });

    playing = true;
  });

  return (
    <div css={LottieWrapperStyle}>
      <div css={LottiePlayerStyle} ref={player}></div>
    </div>
  );
}

export default Lottie;
