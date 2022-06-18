import { Bounding, Coordinates } from "store/typings/coordinates";
import { useEffect, useRef, useState } from "react";

interface RandomCoordinatesData {
  center: Coordinates;
  items: Array<Coordinates>;
}

function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const FLOATING_POINT = 10000000;

const useRandomCoordinates = (bounding: Bounding, num = 1) => {
  const [data, setData] = useState<Nullable<RandomCoordinatesData>>(null);

  const generateRandomCoords = (num: number) => {
    const { latitude, longitude } = bounding;

    const items = new Array(num).fill(null).map((_) => ({
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
    }));

    return items;
  };

  const getCenter = (items: Array<Coordinates>) => ({
    latitude:
      Math.round(
        (items.reduce((acc, cur) => acc + Number(cur.latitude), 0) /
          items.length) *
          FLOATING_POINT,
      ) / FLOATING_POINT,
    longitude:
      Math.round(
        (items.reduce((acc, cur) => acc + Number(cur.longitude), 0) /
          items.length) *
          FLOATING_POINT,
      ) / FLOATING_POINT,
  });

  useEffect(() => {
    const items = generateRandomCoords(Math.max(num, 1));
    const center = getCenter(items);

    setData({ center, items });
  }, []);

  return data;
};

export default useRandomCoordinates;
