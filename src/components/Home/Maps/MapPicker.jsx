import React, { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import mapStyles from "./MapStyles";
import "./Maps.css";

const mapContainerStyle = {
  width: "100%",
  height: "45vh",
};

export const MapPicker = (props) => {
  const [vendors, setVendors] = useState([]);
  const [state, setstate] = useState("");

  const getCurrentLocaion = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  };
  const googleMapsApiKey = "AIzaSyB-ys_gzU0iYE1HflHesIpB5Obth3Tig8A";

  useEffect(() => {
    getCurrentLocaion();
  }, []);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: googleMapsApiKey,
  });
  const [center, setCenter] = React.useState({
    lat: "32.00",
    lng: "79.04",
  });

  props.sendDataToParent1(center.lat);
  props.sendDataToParent2(center.lng);

  return (
    <div className="container-middle depth">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={10}
      >
        <Marker position={center}></Marker>
      </GoogleMap>
    </div>
  );
};
