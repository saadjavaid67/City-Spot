import React, { useEffect, useRef } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function FreeSolo(props) {
  const [vendors, setVendors] = React.useState([]);
  const [value, setValue] = React.useState();
  const nameRef = useRef();
  useEffect(() => {
    sendDataToParent();
  }, [value]);

  const sendDataToParent = async () => {
    await props.parentFunction(value);
  };
  return (
    <div style={{}}>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        getOptionLabel={(option) => option.name}
        options={props.vendorData.map((option) => option)}
        renderOption={(option) => (
          <React.Fragment>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                window.location.href = `/allvendors/${option.id}`;
              }}
            >
              {option.name} - Click to visit the Vendor
            </span>
          </React.Fragment>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            value={value}
            required
            inputRef={nameRef}
            onChange={(e) => {
              setValue(e.target.value.trim());
              sendDataToParent();
            }}
            label="Vendor Name"
            margin="normal"
            variant="standard"
            InputProps={{ ...params.InputProps, type: "search" }}
          />
        )}
      />
    </div>
  );
}
