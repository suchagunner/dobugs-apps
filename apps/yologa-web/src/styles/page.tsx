/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { appHeaderHeight } from "./layout";

const page = css`
  background-color: white;
  width: 100%;
  min-width: 320px;
  max-width: 568px;
  margin: auto;
  min-height: 100vh;
  padding: ${appHeaderHeight} 1.6rem 1.6rem 1.6rem !important ;
`;

export const pageHeader = css`
  font-size: 3.2rem;
  font-weight: 500;
  margin-right: 1.6rem;
  padding-top: 1.6rem;
`;

export default page;
