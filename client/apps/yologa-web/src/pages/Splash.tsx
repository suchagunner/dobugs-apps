import {css} from "@emotion/react";
import {useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import page from "styles/page";

const splashStyle = css`
  font-size: 3.2rem;
  font-weight: bold;
  width: 215px;
  margin: auto;
  animation: appear 1.5s;

  @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const backgroundStyle = css`
  background-image: url(${require('@/assets/images/yologa-background.svg').default});
  background-size: min(calc(690px * 1.8), 180vw);
  background-repeat: no-repeat;
  background-position: center;
  background-color: #f5be29;
  width: 100%;
  height: 100%;
`

function PageSplash() {
  const navigate = useNavigate();
  const header = useRef<HTMLHeadingElement>(null);
  
  // useEffect(() => {
  //   setTimeout(() => {
  //     navigate("/home", {replace: true});
  //   }, timeout);
  // });
  
  return (
    <div css={css`
      ${page};
      ${backgroundStyle}
      
      display: flex;
      flex-direction: column;
      
      & > h1 {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      
      & > div {
        flex: 0;
        width: 100%;
        
        & > img {
          width: 87px;
          height: 16px;
          margin: 0 auto 33px auto;
        }
      }
    `}>
      <h1 ref={header} css={splashStyle}>
        <img
          src={require('@/assets/images/yologa-main-text.png').default}
          alt="욜로가"
          aria-label="app name"
          css={css`
          width: 100%;
          min-width: 217px;
          min-height: 87px;
          height: calc(87 / 215 * 100%);`}/>
      </h1>
      
      <div>
        <img src={require('@/assets/images/dobugs.com-text.svg').default}/>
      </div>
    </div>
  );
}

export default PageSplash;
