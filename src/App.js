import "./App.css";
import { Map } from "react-kakao-maps-sdk";
import { useEffect, useState } from "react";
const { kakao } = window;
function App() {
  const [positions, setPositions] = useState([
    { lat: 35.73231364037916, lng: 127.84714600698338 },
  ]);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        let new_geo = [
          {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        ];
        setPositions(new_geo);
        send(new_geo);
      });
    } else {
      alert("no geolocation support");
    }
  }, []);
  function send(position) {
    window.ReactNativeWebView.postMessage(`
    ${position[0].lat},
    ${position[0].lng}
    `);
  }
  return (
    <div className="App">
      <Map
        center={{ lat: positions[0].lat, lng: positions[0].lng }}
        style={{ width: "100vw", height: "100vh" }}
        level={11}
        onClick={(_t, mouseEvent) => {
          let new_geo = [
            {
              lat: Math.floor(mouseEvent.latLng.getLat() * 10000) / 10000,
              lng: Math.floor(mouseEvent.latLng.getLng() * 10000) / 10000,
            },
          ];
          send(new_geo);
        }}
        zoomable={true}
      ></Map>
    </div>
  );
}

export default App;
