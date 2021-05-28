import { render } from "@testing-library/react";
import React, { useState, useEffect, useRef } from "react";
// import {
//   Form,
//   Col,
//   InputGroup,
//   Row,
//   Button,
//   Jumbotron,
//   Alert,
//   Badge,
// } from "react-bootstrap";
import { MapPicker } from "../Maps/MapPicker";
import fire from "../../../config";
import Spinner from "../Spinner/Spinner";

import LinearProgress from "@material-ui/core/LinearProgress";
import { useAuth } from "../.././AuthContext";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";
import emailjs from "emailjs-com";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Form, Field } from "@material-ui/core";
import { Checkbox, Radio, Select } from "@material-ui/core";
import firebase from "firebase";

import {
  Typography,
  Paper,
  Link,
  Grid,
  Button,
  CssBaseline,
  RadioGroup,
  FormLabel,
  MenuItem,
  FormGroup,
  FormControl,
  FormControlLabel,
} from "@material-ui/core";
// Picker
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker,
} from "@material-ui/core";
import TestVendor from "./TestVendor";
import FreeSolo from "./VendorName";

export default function RegisterNewVendor() {
  function FormExample() {
    const [validated, setValidated] = useState(false);
    const [image, setImage] = useState(null);
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState();

    const { addVendor, currentUser } = useAuth();
    const nameRef = useRef();
    const numRef = useRef();
    const cityRef = useRef();
    const latRef = useRef();
    const lngRef = useRef();
    const imgRef = useRef();
    const catRef = useRef();

    const [url, setUrl] = useState("");
    const [error, setError] = useState("");
    const [vDetails, setVDetails] = useState([]);
    const [lat, setLat] = useState("");
    const [vendors, setVendors] = useState([]);

    const [lng, setLng] = useState("");
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      fetchData();
    }, []);
    if (loading) {
      return (
        <div className="App">
          <Spinner />
        </div>
      );
    }

    const fetchData = () => {
      const ref = fire.firestore().collection("Vendor");
      setLoading(true);
      ref.onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setVendors(items);
        setLoading(false);
      });
    };

    const handleImageChange = (e) => {
      if (e.target.files[0]) {
        setImage(e.target.files[0]);
      }
    };
    function sendEmail() {
      emailjs
        .send(
          "service_2xxoloj",
          "template_j2ydnii",
          {
            username: currentUser.displayName,
            useremail: currentUser.email,
          },
          "user_wg0oAcutEshfBeupCEV0E"
        )
        .then((v) => {
          console.log(v.status);
        });
    }
    const handleUpload = () => {
      const uploadTask = fire
        .storage()
        .ref(`VendorImages/${nameRef.current.value}/${image.name}`)
        .put(image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        async () => {
          fire
            .storage()
            .ref(`VendorImages/${nameRef.current.value}`)
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              setUrl(url);

              const data = {
                id: uuidv4(),
                name: nameRef.current.value,
                lat: lat,
                lng: lng,
                number: numRef.current.value,
                image: url,
                city: cityRef.current.value,
                date: new Date().toDateString(),
                category: catRef.current.value,
                avgrating: 0,
                totalreviews: 0,
                fiverating: 0,
                fourrating: 0,
                threerating: 0,
                tworating: 0,
                onerating: 0,
              };
              addVendor(data);

              sendEmail();
              setError("Vendor Registered");
              nameRef.current.value = "";
              numRef.current.value = "";
              cityRef.current.value = "";
              // history.push("/allvendors");
            });
        }
      );
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
      }
      if (nameRef.current.value) {
        handleUpload();
      }

      setValidated(true);
    };
    const sendDataToParent1 = (lat) => {
      // the callback. Use a better name
      //   console.log(lat);
      setLat(lat);
    };
    const sendDataToParent2 = (lng) => {
      // the callback. Use a better name
      //   console.log(lng);
      setLng(lng);
    };
    return (
      <>
        <TestVendor vendorData={vendors} />
      </>
    );
  }
  return (
    <>
      <FormExample />
    </>
  );
}
