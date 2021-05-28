import React, { useState, useEffect } from "react";
import { MDBCol, MDBIcon, MDBInput, MDBFormInline } from "mdbreact";

export default function SeacrhBarInput() {
  const [state, setstate] = useState("");
  const handleChange = (e) => {
    setstate(e.target.value);
    // console.log(e.target.value);
  };
  return (
    <>
      <MDBCol md="4">
        <MDBInput
          value={state}
          hint="Search"
          type="text"
          onChange={handleChange}
          containerClass="active-pink active-pink-2 "
        />
      </MDBCol>
    </>
  );
}
