import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import brain from "../../../../img/brain.png";
import { Link } from "react-router-dom";

export default function ItemCard(props) {
  return (
    <tr>
      <td>
        {/* <img
          src="https://bootdey.com/img/Content/avatar/avatar1.png"
          width="32"
          height="32"
          className="rounded-circle my-n1"
          alt="Avatar"
        /> */}
        {props.id}
      </td>
      <td>{props.name}</td>
      <td>{props.type}</td>
    </tr>
  );
}
