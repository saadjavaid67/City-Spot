import React, { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { Row, Col, Container, Card } from "react-bootstrap";
import "./Maps.css";
const containerStyle = {
  width: "100%",
  height: "65vh",
};
const googleMapsApiKey = "AIzaSyB-ys_gzU0iYE1HflHesIpB5Obth3Tig8A";

export const MapsSimple = (props) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: googleMapsApiKey,
  });
  const [center, setCenter] = React.useState({
    lat: "32.00",
    lng: "79.04",
  });
  const getVendorLocation = () => {
    setCenter({
      lat: props.lat,
      lng: props.lng,
    });
  };
  useEffect(() => {
    getVendorLocation();
  }, [center]);

  return (
    <div className="">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        <Marker position={center}></Marker>
      </GoogleMap>
    </div>
  );
};
