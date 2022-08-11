import {css} from "@emotion/react";
import Lottie from "components/atoms/Lottie";
import {useNavigate} from "react-router-dom";
import {solidButtonStyle} from "styles/atoms";
import page, {pageHeader} from "styles/page";
import NotFound from "assets/lotties/not-found.json";

import Btn from "../components/atoms/Btn";

const page404Style = css`
  display: flex;
  flex-direction: column;

  & > h1 {
    flex: 0;
  }
`;

const buttonSection = css`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 1.6rem;
`;

function Page404() {
    const navigate = useNavigate();

    return (
        <div css={[page, page404Style]}>
            <h1 css={pageHeader} className="page__header">
                페이지가 존재하지 않습니다.
            </h1>

            <section
                css={css`
                  margin: 4.8rem 0;
                `}
            >
                <Lottie value={NotFound} width={320} height={240}/>
            </section>

            <section css={buttonSection}>
                <Btn
                    css={solidButtonStyle}
                    onClick={() => navigate("/", {replace: true})}
                >
                    홈으로 가기
                </Btn>
            </section>
        </div>
    );
}

export default Page404;
