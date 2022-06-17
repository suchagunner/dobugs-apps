/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";

interface TravelersRangePickerProps {
  min: number;
  max: number;
  value: number;
  onChange(cnt: number): void;
}

const formStyle = css`
  & > fieldset {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.2rem;

    & > span {
      font-size: 6.4rem;
      font-weight: bold;
      width: 11.2rem;
      text-align: center;
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 3.6rem;
      font-size: 4.8rem;
      font-weight: bold;
      border-radius: 50%;
      background: #f1f3f5;
      flex: 0 0 5rem;
      height: 5rem;
    }
  }
`;

function TravelersRangePicker({
  min = 1,
  max = 5,
  value,
  onChange,
}: TravelersRangePickerProps) {
  const [count, setCount] = useState(value);

  function getButtonClickHandler(action: "plus" | "minus") {
    let cb = (prevCount: number) => prevCount;

    if (action === "plus") {
      cb = (prevCount) => Math.min(max, prevCount + 1);
    } else if (action === "minus") {
      cb = (prevCount) => Math.max(min, prevCount - 1);
    }

    return (_: any) => {
      setCount(cb);
    };
  }

  useEffect(() => {
    onChange(count);
  }, [count]);

  return (
    <form css={formStyle}>
      <fieldset>
        <button type="button" onClick={getButtonClickHandler("minus")}>
          -
        </button>
        <span>{count}</span>
        <button type="button" onClick={getButtonClickHandler("plus")}>
          +
        </button>
      </fieldset>
    </form>
  );
}

export default TravelersRangePicker;
