import load from "load-script";

/**
 * async await 로 해당 스크립트가 로드되지 않아, promise 절로 우선 변경 합니다.
 */
const loadScript = () => {
  return new Promise((resolve, reject) => {
    !window.kakao
      ? load(
          `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
            process.env.REACT_APP_KAKAO_MAP_KEY
          }&autoload=false&libraries=services,clusterer,drawing`,
          { charset: "utf-8" },
          (error, script) => {
            !error ? resolve(script) : reject(error);
          }
        )
      : resolve();
  });
};

const initKakaoMap = (el, callback) => {
  loadScript().then(() => {
    /**
     * v3 스크립트를 동적으로 로드하기위해 사용
     * http://apis.map.kakao.com/web/documentation/#load
     */
    window.kakao.maps.load(function() {
      const map = new window.kakao.maps.Map(el, {
        center: new window.kakao.maps.LatLng(36.3639718, 127.3826557), //33.450701, 126.570667), //지도의 중심좌표.
        level: 13 //, //지도의 레벨(확대, 축소 정도)
      }); //지도 생성 및 객체 리턴

      callback && callback(map);
    });
  });
};

const drawMarkers = (el, data, options) => {
  initKakaoMap(el, map => {
    const { markerOption, clusterOption } = options || {};
    // 마커 클러스터러를 생성합니다
    const clusterer = new window.kakao.maps.MarkerClusterer(
      Object.assign(
        {
          map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
          averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
          minLevel: 10 // 클러스터 할 최소 지도 레벨
        },
        clusterOption
      )
    );

    const markers = (data || []).map(function(value) {
      let latlng = (value.latlng || "").split(",");

      return new window.kakao.maps.Marker(
        Object.assign(
          {
            position: new window.kakao.maps.LatLng(
              value.lat || latlng[0],
              value.lng || latlng[1]
            )
          },
          markerOption
        )
      );
    });

    clusterer.addMarkers(markers);
  });
};

// 추가된 모든 마커를 삭제
const clearMarkers = () => new window.kakao.maps.MarkerClusterer().clear();

export {
  drawMarkers,
  clearMarkers
};
