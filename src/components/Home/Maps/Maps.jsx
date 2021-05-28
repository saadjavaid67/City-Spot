import React, { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import img1 from "../../../img/compass.svg";
import img2 from "../../../img/bear.svg";
import img3 from "../../../img/vendor.svg";
import { Row, Col, Container, Card } from "react-bootstrap";
import mapStyles from "./MapStyles";
import "./Maps.css";
import fire from "../../../config";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "./TestMaps.css";
import "@reach/combobox/styles.css";
import ShowRating from "../Reviews/ShowRating";
import { Link } from "react-router-dom";
const libraries = ["places"];

const mapContainerStyle = {
  width: "100%",
  height: "45vh",
};
const googleMapsApiKey = "AIzaSyB-ys_gzU0iYE1HflHesIpB5Obth3Tig8A";
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
export const Maps = (props) => {
  const [vendors, setVendors] = useState([]);
  const [state, setstate] = useState("");
  const [marker, setMarker] = useState("");
  const ref = fire.firestore().collection("Vendor");

  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  const [loading, setLoading] = useState(false);
  const [currentLocationMarker, setCurrentLocationMarker] = useState("");
  const mapRef = React.useRef();
  const getCurrentLocaion = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  };
  const fetchVendorsLocation = () => {
    // setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setVendors(items);
      setLoading(false);
    });
  };
  useEffect(() => {
    getCurrentLocaion();
    fetchVendorsLocation();
  }, []);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyB-ys_gzU0iYE1HflHesIpB5Obth3Tig8A",
    libraries,
  });
  const [center, setCenter] = React.useState({
    lat: "32.00",
    lng: "79.04",
  });
  // const onMapClick = React.useCallback((e) => {
  //   setMarkers((current) => [
  //     ...current,
  //     {
  //       lat: e.latLng.lat(),
  //       lng: e.latLng.lng(),
  //       time: new Date(),
  //     },
  //   ]);
  // }, []);

  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  console.log(currentLocationMarker.lat);

  props.sendDataToParent1(center.lat);
  props.sendDataToParent2(center.lng);

  //   return (
  //     <div className="container-middle depth">
  //       <GoogleMap
  //         mapContainerStyle={containerStyle}
  //         center={center}
  //         onLoad={onMapLoad}
  //         zoom={10}
  //         options={options}
  //       >
  //         {vendors.map((v) => {
  //           return (
  //             <Marker
  //               key={v.name}
  //               icon={{
  //                 url: { img2 },
  //                 // origin: new window.google.maps.Point(0, 0),
  //                 // anchor: new window.google.maps.Point(15, 15),
  //                 scaledSize: new window.google.maps.Size(30, 30),
  //               }}
  //               position={{
  //                 lat: v.lat,
  //                 lng: v.lng,
  //               }}
  //             />
  //           );
  //         })}
  //         <Marker
  //           position={center}
  //           // icon={}
  //           icon={{
  //             url: { img2 },
  //             origin: new window.google.maps.Point(0, 0),
  //             anchor: new window.google.maps.Point(15, 15),
  //             scaledSize: new window.google.maps.Size(30, 30),
  //           }}
  //         ></Marker>
  //       </GoogleMap>
  //     </div>
  //   );
  // };
  return (
    <div className="container depth">
      {/* <h1>
        Bears{" "}
        <span role="img" aria-label="tent">
          ⛺️
        </span>
      </h1> */}

      {/* <Locate panTo={panTo} /> */}
      <Search panTo={panTo} />

      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        {vendors.map((v) => {
          return (
            <Marker
              key={v.name}
              icon={{
                url: `/vendor.svg`,
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
                scaledSize: new window.google.maps.Size(30, 30),
              }}
              onClick={(e) => {
                // e.preventDefault();
                setSelected(v);
              }}
              // icon={{
              //   url: { img2 },
              //   // origin: new window.google.maps.Point(0, 0),
              //   // anchor: new window.google.maps.Point(15, 15),
              //   scaledSize: new window.google.maps.Size(30, 30),
              // }}
              position={{
                lat: v.lat,
                lng: v.lng,
              }}
            />
          );
        })}
        {
          <Marker
            position={center}
            title="Current Location"
            key={center.lat}
            // icon={img3}

            // icon={}
            // icon={{
            //   url: { img2 },
            //   origin: new window.google.maps.Point(0, 0),
            //   anchor: new window.google.maps.Point(15, 15),
            //   scaledSize: new window.google.maps.Size(30, 30),
            onClick={(e) => {
              setCurrentLocationMarker(center);
            }}
            // }}
          ></Marker>
        }
        {/* {markers.map((marker) => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker);
            }}
            icon={{
              url: { img2 },
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        ))} */}

        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h4>
                {/* <span role="img" aria-label="bear">
                  Location
                </span>{" "} */}
                {/* <img src={selected.image} alt="" /> */}
                {selected.name}
              </h4>
              <h5>{selected.number}</h5>
              <h5>{selected.category}</h5>
              <ShowRating rating={selected.avgrating / selected.totalreviews} />
              <Link to={`/allvendors/${selected.id}`}> Visit Vendor</Link>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
};
//         {currentLocationMarker ? (
//           <InfoWindow
//             position={{ lat: currentLocationMarker.lat, lng: currentLocationMarker.lng }}
//             onCloseClick={() => {
//               setCurrentLocationMarker(null);
//             }}
//           >
//             <div>
//               <h4>
//                 {/* <span role="img" aria-label="bear">
//                   Location
//                 </span>{" "} */}
//                 {/* <img src={selected.image} alt="" /> */}
//                 Current Location
//               </h4>
//               {/* <h5>{selected.number}</h5> */}
//             </div>
//           </InfoWindow>
//         ) : null}
//       </GoogleMap>
//     </div>
//   );
// };

function Locate({ panTo }) {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <img src={img1} alt="compass" />
    </button>
  );
}

function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.6532, lng: () => -79.3832 },
      radius: 100 * 1000,
    },
  });

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
    } catch (error) {
      console.log("😱 Error: ", error);
    }
  };

  return (
    <div className="row">
      <div className="col-lg-12 card-margin">
        <div className="card search-form">
          <div className="card-body p-0">
            <form id="search-form">
              <div className="row">
                <div className="col-12">
                  <div className="row no-gutters">
                    <div className="col-lg-8 col-md-6 col-sm-12 p-0">
                      <Combobox onSelect={handleSelect}>
                        <ComboboxInput
                          value={value}
                          onChange={handleInput}
                          disabled={!ready}
                          placeholder="Search Vendors"
                        />
                        <ComboboxPopover>
                          <ComboboxList>
                            {status === "OK" &&
                              data.map(({ id, description }) => (
                                <ComboboxOption key={id} value={description} />
                              ))}
                          </ComboboxList>
                        </ComboboxPopover>
                      </Combobox>
                    </div>
                    <div className="col-lg-1 col-md-3 col-sm-12 p-0">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                        onSubmit={(e) => {
                          e.preventDefault();
                        }}
                        className="btn btn-base"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                          onSubmit={(e) => {
                            e.preventDefault();
                          }}
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="feather feather-search"
                        >
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <Locate panTo={panTo} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    // <div className="search">
    //   <Combobox onSelect={handleSelect}>
    //     <ComboboxInput
    //       value={value}
    //       onChange={handleInput}
    //       disabled={!ready}
    //       placeholder="Search Vendors"
    //     />
    //     <ComboboxPopover>
    //       <ComboboxList>
    //         {status === "OK" &&
    //           data.map(({ id, description }) => (
    //             <ComboboxOption key={id} value={description} />
    //           ))}
    //       </ComboboxList>
    //     </ComboboxPopover>
    //   </Combobox>
    // </div>
  );
}
