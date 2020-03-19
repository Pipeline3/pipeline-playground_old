import React, { useState, useEffect } from "react";
import "./App.css";
import drawMarkers from "./utils/kakaomap";
import axios from "axios";

function App() {
  const [storeInfos, setStoreInfos] = useState([]);

  useEffect(() => {
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
        drawMarkers(document.getElementById("map"), storeInfos);
      } catch (err) {
        console.log(err);
      }
    };

    return () => {
      fetch();
    };

    // eslint-disable-next-line
  }, []);

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
