import React from "react";
import { MDBCol, MDBIcon, MDBInput, MDBFormInline } from "mdbreact";
import "./SearchBar.css";
import { link } from "react-router-dom";
import SeacrhBarInput from "./SeacrhBarInput";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// Can be a string as well. Need to ensure each key-value pair ends with ;

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px",
  },
  gridContainerSearch: {
    paddingLeft: "40px",
    paddingRight: "40px",
    marginTop: "2rem",
    marginBottom: "2rem",
  },
});

export const SearchBar = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container justify="center" className={classes.gridContainerSearch}>
        <SeacrhBarInput />
      </Grid>
      <nav>
        <ul className="font-style">
          <li className="text-dec">
            <a href="#">Searched Items</a>
          </li>
          <li className="text-dec">
            <a href="#">Searched Items</a>
          </li>
          <li className="text-dec">
            <a href="#">Searched Items</a>
          </li>
          <li className="text-dec">
            <a href="#">Searched Items</a>
          </li>
        </ul>
      </nav>
    </React.Fragment>
  );
};
