import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { Form, Field } from "react-final-form";
import { TextField, Checkbox, Radio, Select } from "final-form-material-ui";
import {
  Typography,
  Paper,
  Link,
  Grid,
  Button,
  CssBaseline,
  RadioGroup,
  FormLabel,
  Input,
  MenuItem,
  FormGroup,
  FormControl,
  FormControlLabel,
} from "@material-ui/core";
import FreeSolo from "./VendorName";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "../.././AuthContext";
import emailjs from "emailjs-com";

import { useHistory } from "react-router-dom";
import fire from "../../../config";
import { v4 as uuidv4 } from "uuid";

import Alert from "@material-ui/lab/Alert";
import { Badge } from "react-bootstrap";
import "./TestVendor.css";
import { MapPicker } from "../Maps/MapPicker";
import FileUpload from "./FileUpload";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function TestVendor(props) {
  const [value, setValue] = useState();
  const [name, setName] = useState();
  const [image, setImage] = useState([]);
  const history = useHistory();

  const { addVendor, currentUser } = useAuth();
  const nameRef = useRef();
  const numRef = useRef();

  const [lat, setLat] = useState("");

  const [lng, setLng] = useState("");

  const onSubmit = async (values) => {
    handleUpload(values);
  };
  const validate = (values) => {
    const errors = {};
    if (!values.vendorName) {
      errors.vendorName = "Required";
    }
    if (!values.number) {
      errors.number = "Required";
    }
    if (!values.city) {
      errors.city = "Required";
    }
    if (!values.category) {
      errors.category = "Required";
    }
    return errors;
  };
  const sendDataToParent1 = (lat) => {
    setLat(lat);
  };
  const sendDataToParent2 = (lng) => {
    setLng(lng);
  };

  const handleImageChange = async (e) => {
    setImage(e);
  };

  const callBackFunction = async (v) => {
    setName(v);
  };
  const handleUpload = async (values) => {
    const data = {
      id: uuidv4(),
      name: name,
      lat: lat,
      lng: lng,
      number: values.number,
      city: values.city,
      category: values.category,
      date: moment().format("ll"),
      avgrating: 0,
      totalreviews: 0,
      fiverating: 0,
      fourrating: 0,
      threerating: 0,
      tworating: 0,
      onerating: 0,
      totalviews: 0,
    };

    await addVendor(data);
    sendEmail();
    history.push("/allvendors");
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
  return (
    <>
      <div className="cen">
        <span className="span-cen">
          <Alert variant="filled" severity="warning">
            To avoid duplication, check to see if the Vendor is already
            registered.
          </Alert>
        </span>
      </div>

      <div
        style={{
          padding: 16,
          margin: "auto",
          maxWidth: 1000,
        }}
      >
        <CssBaseline />

        <Typography variant="h4" align="center" component="h1" gutterBottom>
          Register New Vendor
          <Badge variant="danger">New</Badge>
        </Typography>
        <Typography
          variant="h5"
          align="center"
          component="h2"
          gutterBottom
        ></Typography>
        {/* <Typography paragraph>
          <Link href="https://github.com/erikras/react-final-form#-react-final-form">
            {name}
          </Link>
          . This example demonstrates using
          <Link href="https://material-ui.com/demos/text-fields/">
            Material-UI
          </Link>{" "}
          form controls.
        </Typography> */}

        <Form
          onSubmit={(e) => {
            onSubmit(e);
          }}
          validate={validate}
          render={({ handleSubmit, reset, submitting, pristine, values }) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit(values);
              }}
              Validate
            >
              <Paper style={{ padding: 16 }}>
                <Grid
                  container
                  alignItems="flex-start"
                  direction="row"
                  justify="flex-start"
                  spacing={2}
                >
                  <Grid item xs={12}>
                    <Field
                      fullWidth
                      required
                      parentFunction={(e) => {
                        callBackFunction(e);
                      }}
                      ref={nameRef}
                      name="vendorName"
                      component={FreeSolo}
                      vendorData={props.vendorData}
                      type="text"
                      label="Vendor Name"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      fullWidth
                      required
                      ref={numRef}
                      name="number"
                      component={TextField}
                      type="text"
                      label="Number"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      fullWidth
                      required
                      name="category"
                      component={Select}
                      label="Select a Category"
                      formControlProps={{ fullWidth: true }}
                    >
                      <MenuItem value="Food">Food</MenuItem>
                      <MenuItem value="Finance">Finance</MenuItem>
                      <MenuItem value="Shopping">Shopping</MenuItem>
                      <MenuItem value="Automotive">Automotive</MenuItem>
                      <MenuItem value="Home Services">Home Services</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      fullWidth
                      required
                      name="city"
                      component={TextField}
                      type="text"
                      label="City"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControlLabel
                      required
                      label="Agree to terms and conditions"
                      control={
                        <Field
                          name="employed"
                          required
                          component={Checkbox}
                          type="checkbox"
                        />
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      fullWidth
                      required
                      name="File Upload"
                      component={FileUpload}
                      vendorData={name}
                    />

                    {/* <Field
                      fullWidth
                      required
                      name="fileUpload"
                      ref={imgRef}
                      onChange={(e) => {
                        handleImageChange(e);
                      }}
                      filesLimit={1}
                      component={DropzoneArea}
                      acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
                      type="file"
                      label="File Upload"
                    /> */}
                  </Grid>

                  <Grid item style={{ marginTop: 16 }}>
                    <Button
                      type="button"
                      variant="contained"
                      onClick={reset}
                      disabled={submitting || pristine}
                    >
                      Reset
                    </Button>
                  </Grid>
                  <Grid item style={{ marginTop: 16 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={submitting}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    required
                    name="Map"
                    component={MapPicker}
                    sendDataToParent1={sendDataToParent1}
                    sendDataToParent2={sendDataToParent2}
                    label="Current Location"
                  />
                </Grid>
              </Paper>
            </form>
          )}
        />
      </div>
    </>
  );
}
