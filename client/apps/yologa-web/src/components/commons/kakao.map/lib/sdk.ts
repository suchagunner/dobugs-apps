import loadScript from "load-script";

export default class SDK {
  private isLoaded = false;

  private appKey: Nullable<string>;

  constructor(kakaoMapKey: Nullable<string>) {
    this.appKey = kakaoMapKey;
    this.load();
  }

  load() {
    return new Promise<any>((resolve, reject) => {
      if (this.isLoaded) {
        resolve(window.kakao);
        return;
      }

      loadScript(
        `//dapi.kakao.com/v2/maps/sdk.js?appkey=${this.appKey}&autoload=false`,
        (error, script) => {
          if (error) {
            alert(error);
            reject(error);
            return;
          }

          window.kakao.maps.load(() => {
            this.isLoaded = true;
            resolve(window.kakao);
          });
        },
      );
    });
  }
}
