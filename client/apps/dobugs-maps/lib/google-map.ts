import loadScript from 'load-script';
import MapError from './error';
import { getLoadedScript } from '../utils';

const getScriptUrl = (clientId) => `https://maps.googleapis.com/maps/api/js?key=${clientId}&libraries=geometry,places`;

const defaultGoogleMapOptions = {
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: true,
  rotateControl: false,
  scrollwheel: true,
  fullscreenControl: false,
  autobindAllEvents: false,
  disableDefaultUI: true,
  minZoom: 10,
  maxZoom: 20,
  center: {
    lat: 37.5729503,
    lng: 126.97935789999997,
  },
  gestureHandling: 'greedy',
  zoom: 15,
  styles: [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'transit.station.bus',
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
  ],
} as const;

export default class GoogleMap {
  private clientId: string = '';

  public loaded: boolean = false;

  public initiated: boolean = false;

  public map: any = null;

  private readonly markers: any = {};

  private readonly markerList: any = {};

  private mapEventListeners: any = {};

  private markerEventListeners: any = {};

  constructor(clientId) {
    this.clientId = clientId;
  }

  load() {
    return new Promise<any>((resolve, reject) => {
      const scriptUrl = getScriptUrl(this.clientId);
      const script = getLoadedScript(scriptUrl);

      if (script) {
        this.loaded = true;
        resolve(script);
        return;
      }

      loadScript(scriptUrl, (error, script) => {
        if (error) {
          reject(error);
          return;
        }

        this.loaded = true;
        resolve(script);
      });
    });
  }

  initMap(el: HTMLElement, options = {}) {
    if (!this.loaded) {
      throw new MapError('Script Unloaded');
    }

    this.map = new window.google.maps.Map(el, {
      ...defaultGoogleMapOptions,
      ...options,
    });
    this.initiated = true;

    return this.map;
  }

  addMapEventListener(eventName: string, callback: Function) {
    const listener = this.map.addListener(eventName, callback);

    this.mapEventListeners[eventName] = listener;
  }

  removeMapEventListener(eventName: string) {
    const listener = this.mapEventListeners[eventName];

    if (listener) {
      window.google.maps.event.removeListener(listener);
      delete this.mapEventListeners[listener];
    }
  }

  triggerEvent(target, eventName, eventObject) {
    window.google.maps.event.trigger(target, eventName, eventObject);
  }

  createMarker(
    options: {
      id: any;
      latitude: number;
      longitude: number;
      icon: any;
      [propName: string]: any;
    },
    callback
  ) {
    if (!this.initiated) {
      throw new MapError('Need Initialize');
    }

    const { id } = options;

    const position = new window.google.maps.LatLng(options.latitude, options.longitude);

    const marker = new window.google.maps.Marker({
      ...options,
      id,
      position,
      map: this.map,
    });

    this.markers[id] = marker;
    if (callback) {
      callback(marker);
    }
  }

  getMarker(id) {
    return this.markers[id];
  }

  addMarkerEventListener(marker: any, eventName: string, callback: Function) {
    const { id } = marker;

    const listener = marker.addListener(eventName, (e) => {
      callback(e);
    });

    if (!this.markerEventListeners[id]) {
      this.markerEventListeners[id] = {};
    }

    this.markerEventListeners[id][eventName] = listener;
  }

  removeMarkerEventListener(marker: any, eventName: string) {
    const { id } = marker;
    const listener = this.markerEventListeners[id]?.[eventName];

    if (listener) {
      window.google.maps.event.clearListeners(marker, eventName);
      delete this.markerEventListeners[id][eventName];
    }
  }

  removeMarker({ id }) {
    if (this.markers[id]) {
      this.markers[id].setMap(null);
      delete this.markers[id];
    }
  }

  clearMarkers() {
    Object.keys(this.markers).forEach((id) => {
      if (this.markers[id]) {
        this.markers[id].setMap(null);
        delete this.markers[id];
      }
    });
  }

  setMarkerIcon(marker, icon) {
    if (!icon) {
      return;
    }

    const { id } = marker || {};

    this.markers[id]?.setIcon?.(icon);
  }

  updateMarkers() {
    const mapBounds = this.map.getBounds();

    const data = {
      hidden: {},
      shown: {},
    };

    Object.keys(this.markers).forEach((key) => {
      const marker = this.markers[key];
      const position = marker.getPosition();

      if (mapBounds.contains(position)) {
        this.showMarker(marker);
        data.shown[key] = marker;
      } else {
        this.hideMarker(marker);
        data.hidden[key] = marker;
      }
    });

    return data;
  }

  isMarkerExists({ id }) {
    return !!this.markers[id];
  }

  isInBounds(key) {
    const mapBounds = this.map.getBounds();
    const target = this.markers[key];

    if (target) {
      const position = target.getPosition();
      return mapBounds.contains(position);
    }

    return false;
  }

  private showMarker(marker) {
    if (marker.getMap()) {
      return;
    }

    marker.setMap(this.map);
  }

  private hideMarker(marker) {
    if (!marker.getMap()) {
      return;
    }
    marker.setMap(null);
  }

  getZoom() {
    return this.map.getZoom();
  }

  setZoom(value) {
    this.map.setZoom(value);
  }

  getCenter() {
    const { lat, lng } = this.map.getCenter();

    return {
      latitude: lat(),
      longitude: lng(),
    };
  }

  setCenter(latitude, longitude) {
    this.map.setCenter(new window.google.maps.LatLng(latitude, longitude));
  }

  panTo(coords) {
    const { latitude, longitude } = coords;

    const center = new window.google.maps.LatLng(latitude, longitude);

    this.map.panTo(center);
  }

  getRadius() {
    const bounds = this.map.getBounds();
    const ne = bounds.getNorthEast();
    const center = this.map.getCenter();
    const radius = this.getDistanceBetween(center, ne);

    return radius;
  }

  setSize(width, height) {
    const size = new window.google.maps.Size(width, height);
    this.map.setSize(size);
  }

  resize() {
    this.map.autoResize();
  }

  // destroy() {
  //   this.map.destroy();
  // TODO safe DESTROY METHOD 구현F
  // }

  getDistanceBetween(pointA, pointB) {
    const points = [pointA, pointB].map((point) => {
      if (typeof point.lat === 'function' && typeof point.lng === 'function') {
        return point;
      }

      return new window.google.maps.LatLng(
        point?.latitude || point?.x || point?.lat,
        point?.longitude || point?.y || point?.lng
      );
    });

    const distance = window.google.maps.geometry.spherical.computeDistanceBetween(...points);

    return distance;
  }

  setMarkerZIndex(marker: any, zIndex: number) {
    const { id } = marker || {};

    this.markers[id]?.setZIndex?.(zIndex);
  }

  setMarkerVisibility(marker, visibility) {
    const { id } = marker || {};

    this.markers[id]?.setMap(visibility ? this.map : null);
  }
}
