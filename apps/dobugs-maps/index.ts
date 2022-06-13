import { MapType } from './typings';
import NaverMap from './lib/naver-map';
import GoogleMap from './lib/google-map';
import KakaoMap from './lib/kakao-map';

declare global {
  interface Window {
    naver: any;
    google: any;
    kakao: any;
  }
}

const Maps = {
  GOOGLE: GoogleMap,
  KAKAO: KakaoMap,
  NAVER: NaverMap,
} as const;

class DobugsMaps {
  private static instance;

  public mapType: MapType = MapType.KAKAO;

  private mapInstance: any = {};

  get map() {
    return this.mapInstance?.map;
  }

  get initiated() {
    return this.mapInstance?.initiated || false;
  }

  get loaded() {
    return this.mapInstance?.loaded || false;
  }

  static getInstance() {
    if (!DobugsMaps.instance) {
      DobugsMaps.instance = new DobugsMaps();
    }

    return DobugsMaps.instance;
  }

  useMap(type: MapType) {
    if (type in MapType) {
      this.mapType = type;
    } else {
      this.mapType = MapType.NAVER;
    }
  }

  async initiate(key) {
    this.mapInstance = new Maps[this.mapType](key);
    await this.mapInstance.load(key);
  }

  initMap(el: HTMLElement, options = {}) {
    const map = this.mapInstance.initMap(el, options);
    return map;
  }

  clearMap() {
    if (!this.initiated) {
      return;
    }

    this.mapInstance?.destroy?.();
    this.mapInstance.clearMarkers();
    this.mapInstance = {};
    this.mapType = MapType.NAVER;
  }

  addMapEventListener(eventName: string, callback: Function) {
    if (!this.initiated) {
      return;
    }

    this.mapInstance.addMapEventListener(eventName, callback);
  }

  removeMapEventListener(eventName: string) {
    if (!this.initiated) {
      return;
    }

    this.mapInstance.removeMapEventListener(eventName);
  }

  triggerEvent(target, eventName, eventObject) {
    if (!this.initiated) {
      return;
    }

    this.mapInstance.triggerEvent(target, eventName, eventObject);
  }

  createMarker(
    {
      id,
      latitude,
      longitude,
      zIndex,
      ...args
    }: {
      id: number;
      latitude: string;
      longitude: string;
      zIndex?: number;
    },
    callback?: Function
  ) {
    if (!this.initiated) {
      return;
    }

    this.mapInstance.createMarker(
      {
        id,
        latitude,
        longitude,
        zIndex,
        ...args,
      },
      callback
    );
  }

  addMarkerEventListener(marker: any, eventName: string, callback: Function) {
    if (!this.initiated) {
      return;
    }

    this.mapInstance.addMarkerEventListener(marker, eventName, callback);
  }

  removeMarkerEventListener(marker: any, eventName: string) {
    if (!this.initiated) {
      return;
    }

    this.mapInstance.removeMarkerEventListener(marker, eventName);
  }

  getMarker(id) {
    return this.mapInstance?.getMarker?.(id);
  }

  setMarkerZIndex(marker: any, zIndex: number) {
    if (!this.initiated) {
      return;
    }

    this.mapInstance?.setMarkerZIndex(marker, zIndex);
  }

  removeMarker(marker: any) {
    if (!this.initiated) {
      return;
    }

    this.mapInstance?.removeMarker(marker);
  }

  clearMarkers() {
    if (!this.initiated) {
      return;
    }

    this.mapInstance.clearMarkers();
  }

  setMarkerIcon(marker: any, icon: any) {
    if (!this.initiated) {
      return;
    }

    this.mapInstance.setMarkerIcon(marker, icon);
  }

  isMarkerExists(options: any) {
    if (!this.initiated) {
      return false;
    }

    return this.mapInstance.isMarkerExists(options);
  }

  updateMarkers() {
    if (!this.initiated) {
      return null;
    }

    const data = this.mapInstance.updateMarkers();
    return data;
  }

  setMarkerVisibility(marker, visibility: boolean) {
    if (!this.initiated) {
      return;
    }

    this.mapInstance?.setMarkerVisibility(marker, visibility);
  }

  isInBounds(key) {
    if (!this.initiated) {
      return false;
    }

    return this.mapInstance.isInBounds(key);
  }

  getZoom() {
    if (!this.initiated) {
      return 0;
    }

    return this.mapInstance.getZoom();
  }

  setZoom(value) {
    if (!this.initiated) {
      return;
    }

    this.mapInstance.setZoom(value);
  }

  getCenter() {
    if (!this.initiated) {
      return { latitude: 0, longitude: 0 };
    }

    const center = this.mapInstance.getCenter();

    return center;
  }

  setCenter(...args) {
    if (!this.initiated) {
      return;
    }

    this.mapInstance.setCenter(...args);
  }

  getRadius() {
    if (!this.initiated) {
      return 0;
    }

    const radius = this.mapInstance.getRadius();
    return radius;
  }

  setSize(width, height) {
    if (!this.initiated) {
      return;
    }

    this.mapInstance.setSize(width, height);
  }

  panTo(coords) {
    if (!this.initiated) {
      return;
    }

    this.mapInstance.panTo(coords);
  }

  resize() {
    if (!this.initiated) {
      return;
    }

    this.mapInstance.resize();
  }

  getDistanceBetween(pointA, pointB) {
    if (!this.initiated) {
      return 0;
    }

    const distance = this.mapInstance.getDistanceBetween(pointA, pointB);
    return distance;
  }
}

export default DobugsMaps;
