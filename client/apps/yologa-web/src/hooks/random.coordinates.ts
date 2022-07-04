import { Bounding, Coordinates } from "store/typings/coordinates";
import { ReactText, useEffect, useRef, useState } from "react";

function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const FLOATING_POINT = 10000000;

const useRandomCoordinates = (bounding: Bounding) => {
  const [data, setData] = useState<Nullable<Coordinates>>(null);
  const [playing, setPlaying] = useState<boolean>(false);

  const interval = useRef<Nullable<number>>(null);
  const generateRandomCoords = () => {
    const { latitude, longitude } = bounding;

    return {
      latitude:
        Math.round(
          getRandomArbitrary(
            Number(latitude.min) * FLOATING_POINT,
            Number(latitude.max) * FLOATING_POINT,
          ),
        ) / FLOATING_POINT,
      longitude:
        Math.round(
          getRandomArbitrary(
            Number(longitude.min) * FLOATING_POINT,
            Number(longitude.max) * FLOATING_POINT,
          ),
        ) / FLOATING_POINT,
    };
  };

  useEffect(() => {
    if (playing === false) {
      if (interval.current) {
        clearTimeout(interval.current);
        interval.current = null;
      }
      return;
    }

    if (!interval.current) {
      interval.current = window.setInterval(() => {
        const data = generateRandomCoords();
        setData(data);
      }, 100);
    }
  }, [playing]);

  return {
    data,
    playing,
    setPlaying,
  };
};

export default useRandomCoordinates;
