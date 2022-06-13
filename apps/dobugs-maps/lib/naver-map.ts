import loadScript from 'load-script';
import MapError from './error';
import { getLoadedScript } from '../utils';

const getScriptUrl = (clientId) => `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}`;

enum MapEvent {
  MOUSE_DOWN = 'mousedown',
  MOUSE_UP = 'mouseup',
  CLICK = 'click',
  DOUBLE_CLICK = 'dblclick',
  RIGHT_CLICK = 'rightclick',
  MOUSE_OVER = 'mouseover',
  MOUSE_OUT = 'mouseout',
  MOUSE_MOVE = 'mousemove',
  DRAG_START = 'dragstart',
  DRAG = 'drag',
  DRAG_END = 'dragend',
  TOUCH_START = 'touchstart',
  TOUCH_MOVE = 'touchmove',
  TOUCH_END = 'touchend',
  PINCH_START = 'pinchstart',
  PINCH = 'pinch',
  PINCH_END = 'pinchend',
  TAP = 'tap',
  LONG_TAP = 'longtap',
  TWO_FINGER_TAP = 'twofingertap',
  DOUBLE_TAP = 'doubletap',
}

export default class NaverMap {
  private clientId: string = '';

  public loaded: boolean = false;

  public initiated: boolean = false;

  public map: any = null;

  private readonly markers: any = {};

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

    this.map = new window.naver.maps.Map(el, {
      center: new window.naver.maps.LatLng(37.5729503, 126.97935789999997),
      ...options,
    });
    this.initiated = true;

    return this.map;
  }

  addMapEventListener(eventName: string, callback: Function) {
    const listener = window.naver.maps.Event.addListener(this.map, eventName, callback);

    this.mapEventListeners[eventName] = listener;
  }

  removeMapEventListener(eventName: string) {
    const listener = this.mapEventListeners[eventName];

    if (listener) {
      window.naver.maps.Event.removeListener(listener);
      delete this.mapEventListeners[listener];
    }
  }

  triggerEvent(target, eventName, eventObject) {
    window.naver.maps.Event.trigger(target, eventName, eventObject);
  }

  createMarker(
    options: {
      id: any;
      latitude: number;
      longitude: number;
      markerUrl: string;
      [propName: string]: any;
    },
    callback
  ) {
    if (!this.initiated) {
      throw new MapError('Need Initialize');
    }

    const { id } = options;

    const position = new window.naver.maps.LatLng(options.latitude, options.longitude);

    const marker = new window.naver.maps.Marker({
      ...options,
      id,
      position,
      map: this.map,
      icon: {
        url: options.markerUrl,
        size: new window.naver.maps.Size(42, 50),
        scaledSize: new window.naver.maps.Size(42, 50),
        origin: new window.naver.maps.Point(0, 0),
        anchor: new window.naver.maps.Point(21, 0),
      },
    });

    this.markers[id] = marker;

    if (callback) {
      callback(marker);
    }
  }

  addMarkerEventListener(marker: any, eventName: string, callback: Function) {
    const { id } = marker;

    const listener = window.naver.maps.Event.addListener(marker, eventName, (e) => {
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
      window.naver.maps.Event.removeListener(listener);
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

  updateMarkers() {
    const mapBounds = this.map.getBounds();

    const data = {
      hidden: {},
      shown: {},
    };

    Object.keys(this.markers).forEach((key) => {
      const marker = this.markers[key];
      const position = marker.getPosition();

      if (mapBounds.hasLatLng(position)) {
        this.showMarker(marker);
        data.shown[key] = marker;
      } else {
        this.hideMarker(marker);
        data.hidden[key] = marker;
      }
    });

    return data;
  }

  isInBounds(key) {
    const mapBounds = this.map.getBounds();
    const target = this.markers[key];

    if (target) {
      const position = target.getPosition();
      return mapBounds.hasLatLng(position);
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
    const { x, y } = this.map.getCenter();

    return {
      latitude: y,
      longitude: x,
    };
  }

  setCenter(latitude, longitude) {
    this.map.setCenter(new window.naver.maps.LatLng(latitude, longitude));
  }

  panTo(coords) {
    const { latitude, longitude } = coords;

    const center = new window.naver.maps.LatLng(latitude, longitude);

    this.map.panTo(center);
  }

  getRadius() {
    const bounds = this.map.getBounds();
    const ne = bounds.getNE();
    const center = this.map.getCenter();
    const radius = this.getDistanceBetween(center, ne);

    return radius;
  }

  setSize(width, height) {
    const size = new window.naver.maps.Size(width, height);
    this.map.setSize(size);
  }

  resize() {
    this.map.autoResize();
  }

  destroy() {
    this.map.destroy();
  }

  getDistanceBetween(pointA, pointB) {
    const points = [pointA, pointB].map(
      (point) => new window.naver.maps.LatLng(point?.latitude || point?.x, point?.longitude || point?.y)
    );

    const mapSystemProjection = this.map.getProjection();
    const distance = mapSystemProjection.getDistance(...points);

    return distance;
  }

  setMarkerVisibility(marker, visibility) {
    const { id } = marker || {};

    this.markers[id]?.setMap(visibility ? this.map : null);
  }
}
