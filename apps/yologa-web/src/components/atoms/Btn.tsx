import React from "react";

interface BtnProps {
  label?: string;
  size?: string;
  color?: string;
  background?: string;
  onClick(e: React.MouseEvent<HTMLButtonElement>): void;
}

function Btn({
  label,
  size,
  color = "#fffff",
  background = "#000000",
  onClick,
}: BtnProps) {
  function handleBtnClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    onClick?.(e);
  }

  return <button onClick={handleBtnClick}>{label}</button>;
}

export default Btn;
