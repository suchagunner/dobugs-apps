import { css } from "@emotion/react";

const reset = css`
  * {
    position: relative;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    vertical-align: baseline;
    resize: none;
    outline: 0;
    font-size: inherit;
    font-weight: inherit;
    font-family: inherit;
    line-height: inherit;
    letter-spacing: inherit;
    word-break: keep-all;
    word-spacing: inherit;
    color: inherit;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    // 뷰표트 변환시 폰트크기 자동확대 방지
    -webkit-appearance: none;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-text-size-adjust: none;
    -webkit-overflow-scrolling: touch;
  }

  body,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  div,
  span,
  p,
  blockquote,
  pre,
  abbr,
  acronym,
  address,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  figure,
  ins,
  kbd,
  q,
  samp,
  small,
  strong,
  sub,
  sup,
  var,
  b,
  i,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  form,
  fieldset,
  legend,
  a,
  textarea,
  input,
  select,
  option,
  button,
  label,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    border: 0;
    background: transparent;
  }

  img,
  iframe,
  canvas,
  svg,
  video,
  input,
  button,
  textarea {
    display: block;
    max-width: 100%;
  }

  html,
  body {
    width: 100%;
    height: 100%;
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui,
      Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo",
      "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol", sans-serif;
    color: #000000;
    font-size: 62.5%;
    background-color: #f1f3f5;
    scroll-behavior: smooth;
  }

  audio:not([controls]) {
    display: none;
    height: 0;
  }
  a:link {
    text-decoration: none;
  }
  a:focus {
    outline: thin dotted;
  }
  a:active,
  a:hover {
    outline: 0;
    text-decoration: none;
  }
  a:visited {
    text-decoration: none;
  }

  details summary::-webkit-details-marker {
    display: none;
  }

  ul,
  ol,
  li {
    list-style: none;
  }
  img,
  iframe,
  canvas,
  svg,
  video,
  input,
  button,
  textarea,
  select {
    display: block;
    max-width: 100%;
    width: 100%;
    background-color: transparent;
  }

  input,
  textarea {
    -webkit-user-select: auto; /* Safari */
    -khtml-user-select: auto; /* Konqueror HTML */
    -moz-user-select: auto; /* Old versions of Firefox */
    -ms-user-select: auto; /* Internet Explorer/Edge */
    user-select: auto; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
  }

  /* IOS Safari */
  textarea,
  input[type="text"],
  input[type="password"],
  input[type="button"],
  input[type="submit"] {
    -webkit-appearance: none;
    border-radius: 0;
  }
`;

export default reset;
