import loadScript from "load-script";

export default function load(kakaoMapKey: Nullable<string>) {
  return new Promise<any>((resolve, reject) => {
    loadScript(
      `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapKey}&autoload=false`,
      (error, script) => {
        if (error) {
          alert(error);
          reject(error);
          return;
        }

        window.kakao.maps.load(() => {
          resolve(window.kakao);
        });
      },
    );
  });
}
