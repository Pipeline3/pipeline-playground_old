import React, { useEffect } from "react";
import "./App.css";
import data from "./data";
import drawMarkers from "./utils/kakaomap";

function App() {
  useEffect(() => {
    drawMarkers(document.getElementById("map"), data);
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
