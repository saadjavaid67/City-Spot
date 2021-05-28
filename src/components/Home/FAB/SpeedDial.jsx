// import React, { useState, useEffect } from "react";
// import { useHistory, Link } from "react-router-dom";
// import { makeStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";
// import Backdrop from "@material-ui/core/Backdrop";
// import SpeedDial from "@material-ui/lab/SpeedDial";
// import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
// import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
// import FileCopyIcon from "@material-ui/icons/FileCopyOutlined";
// import SaveIcon from "@material-ui/icons/Save";
// import PrintIcon from "@material-ui/icons/Print";
// import ShareIcon from "@material-ui/icons/Share";
// import FavoriteIcon from "@material-ui/icons/Favorite";

// // const useStyles = makeStyles((theme) => ({
// //   root: {
// //     height: 380,
// //     transform: "translateZ(0px)",
// //     flexGrow: 1,
// //   },
// //   speedDial: {
// //     position: "absolute",
// //     bottom: theme.spacing(2),
// //     right: theme.spacing(2),
// //   },
// // }));

// const actions = [
//   { icon: <FileCopyIcon />, name: "Upload Image" },
//   { icon: <SaveIcon />, name: "New Service" },
// ];

// export default function SpeedDialExport(props) {
//   //   const classes = useStyles();
//   const [open, setOpen] = React.useState(false);
//   const [id, setId] = useState("");
//   const history = useHistory();

//   const handleOpen = () => {
//     setOpen(true);
//   };
//   useEffect(() => {
//     setId(props.link);
//   }, [id]);
//   const handleClose = () => {
//     setOpen(false);
//   };
//   const style = {
//     margin: 0,
//     top: "auto",
//     right: 20,
//     bottom: 20,
//     left: "auto",
//     position: "fixed",
//   };

//   return (
//     <div>
//       <Link
//         to={{
//           pathname: props.link,
//           state: {
//             vendorId: props.vendorDetails,
//           },
//         }}
//       ></Link>
//       <SpeedDial
//         ariaLabel="SpeedDial tooltip example"
//         // className={classes.speedDial}
//         icon={<SpeedDialIcon />}
//         onClose={handleClose}
//         style={style}
//         onOpen={handleOpen}
//         open={open}
//       >
//         {actions.map((action) => (
//           <SpeedDialAction
//             key={action.name}
//             icon={action.icon}
//             tooltipTitle={action.name}
//             tooltipOpen
//             onClick={() => {
//               console.log(action.name);
//             }}
//           />
//         ))}
//       </SpeedDial>
//     </div>
//   );
// }
