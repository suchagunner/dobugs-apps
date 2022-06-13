class MapError extends Error {
  constructor(message) {
    super(message);
    this.name = "MapError";
    this.message = message;
  }
}

export default MapError;
