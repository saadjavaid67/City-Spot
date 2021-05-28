import { render } from "@testing-library/react";
import React, { useState, useEffect, useRef } from "react";
import {
  Form,
  Col,
  InputGroup,
  Row,
  Button,
  Jumbotron,
  Alert,
  Badge,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../.././AuthContext";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router";

export default function AddNewItem(props) {
  function FormExample() {
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState("");
    const history = useHistory();

    // const handleImageChange = (e) => {
    //   if (e.target.files[0]) {
    //     setImage(e.target.files[0]);
    //   }
    // };
    const handleUpload = () => {
      const data = {
        id: uuidv4(),
        name: nameRef.current.value,
        type: typeRef.current.value,
        vendorId: props.location.state.vendorId.id,
        vendorName: props.location.state.vendorId.name,
      };
      addNewItem(data);
      console.log(data);
      setError("Item Added");
    };
    const nameRef = useRef();
    const typeRef = useRef();

    const handleSubmit = (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
      }
      if (nameRef.current.value) {
        handleUpload();
        history.push("/allvendors");
      }

      setValidated(true);
    };
    // console.log(props.location.state.vendorId.id);

    // const sendDataToParent1 = (lat) => {
    //   // the callback. Use a better name
    //   //   console.log(lat);
    //   setLat(lat);
    // };
    // const sendDataToParent2 = (lng) => {
    //   // the callback. Use a better name
    //   //   console.log(lng);
    //   setLng(lng);
    // };
    const { addNewItem } = useAuth();

    return (
      <Jumbotron>
        <Alert variant="success">
          <Alert.Heading>Note</Alert.Heading>
          <hr />
          <p>
            To avoid duplication, check to see if the service is already offered
            in the Vendors Inventory.
          </p>
        </Alert>
        {error && <Alert variant="primary">{error}</Alert>}

        <h1>
          Add New Serice Provided by the Vendor{" "}
          <Badge variant="secondary">New</Badge>
        </h1>
        <Form noValidate validated={validated}>
          <Form.Row>
            <Form.Group as={Col} controlId="validationCustom01">
              <Form.Label>Service Name</Form.Label>
              <Form.Control
                name="name"
                // value={vDetails.name}
                ref={nameRef}
                // onChange={(e) => setVDetails({ name: e.target.value })}
                required
                type="text"
                placeholder="Name"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="validationCustom01">
              <Form.Label>Service Type</Form.Label>
              <Form.Control
                name="type"
                // value={vDetails.name}
                ref={typeRef}
                // onChange={(e) => setVDetails({ name: e.target.value })}
                required
                type="text"
                placeholder="Type"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            {/* <Form.Group as={Col} controlId="validationCustom02">
              <Form.Label></Form.Label>
              <Form.Control
                name="number"
                ref={numRef}
                // value={vDetails.number}
                // onChange={(e) => setVDetails({ number: e.target.value })}
                required
                type="text"
                placeholder="Phone Number"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group> */}
          </Form.Row>
          {/* <Form.Row>
            <Form.Group as={Col} controlId="validationCustom03">
              <Form.Label>City</Form.Label>
              <Form.Control
                name="city"
                type="text"
                ref={cityRef}
                // onChange={(e) => setVDetails({ city: e.target.value })}
                // value={vDetails.city}
                placeholder="City"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid city.
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row> */}
          {/* <Form.Row>
            <Form.Group as={Col} controlId="validationCustom03">
              <Form.Label>Vendor Images</Form.Label>
              <Form.File
                id="custom-file"
                name="image"
                ref={imgRef}
                // value={vDetails.image}
                onChange={(e) => handleImageChange(e)}
                label="Custom file input"
                custom
              />
              <LinearProgress
                variant="buffer"
                value={progress}
                color="secondary"
                valueBuffer={progress}
              />
            </Form.Group> */}
          {/* </Form.Row> */}
          <Form.Group>
            <Form.Check
              label="Agree to terms and conditions"
              feedback="You must agree before submitting."
            />
          </Form.Group>

          <Button type="submit" onClick={handleSubmit}>
            Submit form
          </Button>
        </Form>
      </Jumbotron>
    );
  }

  return (
    <>
      <FormExample />
    </>
  );
}
