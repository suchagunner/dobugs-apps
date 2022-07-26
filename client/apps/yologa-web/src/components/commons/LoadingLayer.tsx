import { css } from "@emotion/react";

import SpinnerBlue from "assets/lotties/spinner-blue.json";
import Lottie from "components/atoms/Lottie";

interface Props {
  isOpened: boolean;
}

const fixedLayer = css`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overscroll-behavior: contain;
  margin: auto;

  & > * {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

function loadingLayer({ isOpened }: Props) {
  return (
    <>
      {isOpened ? (
        <div css={fixedLayer}>
          <Lottie value={SpinnerBlue} width={120} height={120} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default loadingLayer;
