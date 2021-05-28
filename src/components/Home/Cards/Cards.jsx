import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardMaterialUi from "./Card/CardMaterialUi";

export default function Cards() {
  return (
    <React.Fragment>
      <div className="bg-cyan">
        <CardMaterialUi></CardMaterialUi>
      </div>
    </React.Fragment>
  );
}
//    <div className="bg-cyan">
//               <h1 className="quote">
//                 Daily Quote <i class="fas fa-quote-right"></i>
//               </h1>
//               <p className="quote">
//                 You have to really use your imagination to refresh your daily
//                 life.
//               </p>
//             </div>
//           </Col>
//           <Col className="extend">
//             <div className="bg-grey">
//               <h1 className="quote">Our Aim</h1>
//               <p className="quote">We Bring Good Things to Life</p>
//             </div>
//   <Col className="extend">
// //             <div className="bg-grey">
// //               <h1 className="quote">Our Aim</h1>
// //               <p className="quote">We Bring Good Things to Life</p>
// //             </div> */}*/
