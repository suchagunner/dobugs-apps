/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import page from "styles/page";

const timeout = 2000;

const splashStyle = css`
  font-size: 3.2rem;
  font-weight: bold;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: appear ${timeout}ms ease-out;

  @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

function PageSplash() {
  const navigate = useNavigate();
  const header = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    setTimeout(() => {
      navigate("/home", { replace: true });
    }, timeout);
  });

  return (
    <div css={page}>
      <h1 ref={header} css={splashStyle}>
        환영합니다!
      </h1>
    </div>
  );
}

export default PageSplash;
