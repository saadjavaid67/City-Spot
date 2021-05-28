import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useAuth } from "../../../AuthContext";
import Items from "../../Items/Items";
import fire from "../../../../config";
import { Maps } from "../../Maps/Maps";
// import "./Card.css";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    minWidth: 400,
    marginTop: "2rem",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function ReviewCard(props) {
  const { getVendorId } = useAuth();
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [display, setDisplay] = React.useState(false);
  const [id, setid] = React.useState("");
  const [url, setUrl] = React.useState("");
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
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  React.useEffect(() => {
    // getImageUrl();
    setid(props.id);
  }, [id]);

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}></Avatar>
        }
        className="course course-h6"
        title={props.name}
        subheader={props.date}
      />
      <CardMedia
        className={classes.media}
        image={props.imageUrl}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {id}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {/* <Link to={
          {

          }
        }>
          <Button size="small" color="primary">
            Inventory
          </Button>
        </Link> */}
        <Link
          to={{
            pathname: `/allvendors/${props.id}`,
            state: {
              vendorId: props.id,
            },
          }}
        >
          <Button size="small" color="primary">
            Check Out
          </Button>
        </Link>

        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Maps
            sendDataToParent1={sendDataToParent1}
            sendDataToParent2={sendDataToParent2}
          />{" "}
          {/* <Typography paragraph>Method:</Typography> */}
        </CardContent>
      </Collapse>
    </Card>
  );
}
