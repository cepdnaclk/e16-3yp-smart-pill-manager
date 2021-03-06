// import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Card from "@material-ui/core/Card";
// import CardActionArea from "@material-ui/core/CardActionArea";
// import CardActions from "@material-ui/core/CardActions";
// import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
import ContainerDetails from "./ContainerDetails";

// const useStyles = makeStyles({
//   root: {
//     maxWidth: 345,
//   },
//   media: {
//     height: 120,

//   },
// });

// export default function ContainerCard({
//   medicine,
//   startDate,
//   endDate,
//   patientID,
//   containerID,
//   noOfPills,
//   routine,
//   onDelete,
// }) {
//   const classNamees = useStyles();

//   return (
//     <Card classNameName={classNamees.root}>
//       <CardActionArea>
//         <CardMedia
//           classNameName={classNamees.media}
//           title="Contemplative Reptile"

//         >
//          <Typography color="secondary"  style={{justifyContent: 'center'}}  gutterBottom variant="h1" component="h1">
//             {containerID}
//           </Typography>
//         </CardMedia>
//         <CardContent>
//           <Typography gutterBottom variant="h5" component="h2">
//             {medicine}
//           </Typography>
//           <Typography variant="body2" color="textSecondary" component="p">
//             This container belongs to {patientID} patient.
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//       <CardActions>
//         <ContainerDetails
//           medicine={medicine}
//           startDate={startDate}
//           endDate={endDate}
//           containerID={containerID}
//           patientID={patientID}
//           routine={routine}
//           noOfPills={noOfPills}
//         />
//         <Button size="small" color="secondary" onClick={onDelete}>
//           Delete
//         </Button>
//       </CardActions>
//     </Card>
//   );
// }

import React from "react";
import "../../assets/css/card.css";

function ContainerCard({
  medicine,
  startDate,
  endDate,
  patientID,
  containerID,
  noOfPills,
  routine,
  onDelete,
}) {
  return (
    <div className="card-container">
      <div className="card-number">
        <p>{containerID}</p>
      </div>
      <div className="card-title">
        <h1>{medicine}</h1>
        <p>{endDate.slice(0, 10)}</p>
      </div>
      <div className="card-description">this is the template container</div>
      <div className="card-more">
        {/* <button className="card-btn btn-more">more</button> */}
        <ContainerDetails
          className="card-btn btn-more"
          medicine={medicine}
          startDate={startDate}
          endDate={endDate}
          containerID={containerID}
          patientID={patientID}
          routine={routine}
          noOfPills={noOfPills}
        />
      </div>
      <div className="card-delete">
        <button className="card-btn btn-delete" onClick={onDelete}>
          delete
        </button>
      </div>
    </div>
  );
}

export default ContainerCard;
