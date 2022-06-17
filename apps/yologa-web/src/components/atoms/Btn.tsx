import { SerializedStyles } from "@emotion/react";
import React from "react";

interface BtnProps {
  label?: string;
  size?: string;
  color?: string;
  background?: string;
  onClick(e: React.MouseEvent<HTMLButtonElement>): void;
  css?: SerializedStyles;
}

function Btn(props: React.PropsWithChildren<BtnProps>) {
  function handleBtnClick(e: React.MouseEvent<HTMLButtonElement>) {
    props.onClick(e);
  }

  return (
    <button {...props} onClick={handleBtnClick}>
      {props.children}
    </button>
  );
}

export default Btn;
