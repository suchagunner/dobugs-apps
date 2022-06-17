/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Btn from "components/atoms/Btn";
import TravelersRangePicker from "components/commons/TravelersRangePicker";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { solidButtonStyle } from "styles/atoms";
import page, { pageHeader } from "styles/page";

const pageHomeStyle = css`
  display: flex;
  flex-direction: column;

  & > h1 {
    flex: 0;
  }
`;

const rangePickerSection = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 6.4rem;
`;

const buttonSection = css`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 1.6rem;
`;

function PageHome() {
  const [travelersCnt, setTravelersCnt] = useState(2);
  const navigate = useNavigate();

  return (
    <main css={[page, pageHomeStyle]}>
      <h1 css={pageHeader}>몇 명이서 여행가실 계획이신가요?</h1>
      <section css={rangePickerSection}>
        <TravelersRangePicker
          min={1}
          max={5}
          value={travelersCnt}
          onChange={(cnt: number) => setTravelersCnt(cnt)}
        />
      </section>
      <section css={buttonSection}>
        <Btn
          css={solidButtonStyle}
          onClick={() => navigate(`/spaces?travelers=${travelersCnt}`)}
        >
          여행지 욜로가기!
        </Btn>
      </section>
    </main>
  );
}

export default PageHome;
