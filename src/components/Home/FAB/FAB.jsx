import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { useHistory, Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function FAB(props) {
  const classes = useStyles();
  const [id, setId] = useState("");
  const style = {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
  };

  useEffect(() => {
    setId(props.link);
  }, [id]);
  const history = useHistory();
  return (
    <div className={classes.root}>
      {/* <Fab style={style} variant="extended" color="primary" aria-label="add">
        <AddIcon />
      </Fab> */}
      <Link
        to={{
          pathname: props.link,
          state: {
            vendorId: props.vendorDetails,
          },
        }}
      >
        <Fab variant="extended" color="primary" style={style}>
          <AddIcon className={classes.extendedIcon} />
          {props.name}
        </Fab>{" "}
      </Link>
    </div>
  );
}
