import load from "load-script";

const KAKAO_APPKEY = "5be4aa4e20004e3fbc83810c9d0d5437";

const loadScript = async () => {
  try {
    if (window.kakao) return;

    await load(
      `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APPKEY}&libraries=clusterer,services,drawing"
    `
    );
  } catch (err) {
    console.log(err);
  }
};

const initKakaoMap = (el, callback) => {
  loadScript().then(() => {
    const map = new window.kakao.maps.Map(el, {
      //지도를 생성할 때 필요한 기본 옵션
      center: new window.kakao.maps.LatLng(36.3639718, 127.3826557), //33.450701, 126.570667), //지도의 중심좌표.
      level: 13 //, //지도의 레벨(확대, 축소 정도)
    }); //지도 생성 및 객체 리턴

    callback && callback(map);
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
      let latlng = value.latlng.split(",");

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

export default drawMarkers;
