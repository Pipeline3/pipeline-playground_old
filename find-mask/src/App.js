import React, { useEffect } from "react";
import "./App.css";
import data from "./data";

function App() {
  useEffect(() => {
    const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new window.kakao.maps.LatLng(36.3639718, 127.3826557), //33.450701, 126.570667), //지도의 중심좌표.
      level: 13 //, //지도의 레벨(확대, 축소 정도)
    };

    const map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    // 마커 클러스터러를 생성합니다
    var clusterer = new window.kakao.maps.MarkerClusterer({
      map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
      averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
      minLevel: 10 // 클러스터 할 최소 지도 레벨
    });

    const markers = (data || []).map(function(value) {
      let latlng = value.latlng.split(",");
      return new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(latlng[0], latlng[1])
      });
    });

    clusterer.addMarkers(markers);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div id="map" style={{ width: "500px", height: "400px" }} />
      </header>
    </div>
  );
}

export default App;
