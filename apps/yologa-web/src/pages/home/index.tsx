/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import TravelersRangePicker from "components/commons/TravelersRangePicker";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  position: sticky;
  bottom: 0;
  height: 5rem;
`;

const buttonStyle = css`
  display: block;
  width: 100%;
  color: white;
  font-weight: 500;
  font-size: 1.6rem;
  background: black;
  border-radius: 3px;
  height: 5rem;
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
        ></TravelersRangePicker>
      </section>
      <section css={buttonSection}>
        <button
          type="button"
          css={buttonStyle}
          onClick={() => navigate(`/spaces?travelers=${travelersCnt}`)}
        >
          여행지 욜로가기!
        </button>
      </section>
    </main>
  );
}

export default PageHome;
