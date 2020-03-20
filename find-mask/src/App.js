import React, { useState, useEffect } from "react";
import "./App.css";
import { drawMarkers,clearMarkers } from "./utils/kakaomap";
import axios from "axios";

function App() {
  const [storeInfos, setStoreInfos] = useState([]);

  const fetch = async () => {
    try {
      const { data } = await axios({
        baseURL: "https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1",
        method: "get",
        url: "/stores/json",
        params: {
          page: 1,
          perPage: 500
        }
      });

      setStoreInfos(data.storeInfos);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    /**
     * API 요청 실행하는 경우, 뒷정리가 필요없음
     * https://medium.com/@dayong/%EB%A6%AC%EC%95%A1%ED%8A%B8-%ED%9B%85-react-hooks-3-useeffect-6b781a6c6769
     */
    fetch();

    // eslint-disable-next-line
  }, []);

  /**
   * storeInfos 데이터를 가져온 후, 그에 따른 지도 맵과 마커 생성
   */
  useEffect(() => {
    drawMarkers(document.getElementById("map"), storeInfos);

    return (() => { 
      clearMarkers();
    })
  }, [storeInfos]);

  return (
    <div className="App">
      <header className="App-header" />
      <div className="container">
        <div id="map" style={{ width: "100%", height: "100vh" }} />
      </div>
    </div>
  );
}

export default App;
