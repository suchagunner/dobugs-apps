const BOUNDS = {
  KOREA: {
    latitude: {
      min: 33.1206,
      max: 38.6122429469,
    },
    longitude: {
      min: 126.2671,
      max: 129.468304478,
    },
  },
} as const;

export default class Bounding {
  static get(country: keyof typeof BOUNDS) {
    return BOUNDS[country];
  }
}
