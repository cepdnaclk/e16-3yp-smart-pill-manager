import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ContainerDetails from "./ContainerDetails";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 120,
    
  },
});

export default function ContainerCard({
  medicine,
  startDate,
  endDate,
  patientID,
  containerID,
  noOfPills,
  routine,
  onDelete,
}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          title="Contemplative Reptile"
         
        >
         <Typography color="secondary"  style={{justifyContent: 'center'}}  gutterBottom variant="h1" component="h1">
            {containerID}
          </Typography>
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {medicine}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            This container belongs to {patientID} patient.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <ContainerDetails
          medicine={medicine}
          startDate={startDate}
          endDate={endDate}
          containerID={containerID}
          patientID={patientID}
          routine={routine}
          noOfPills={noOfPills}
        />
        <Button size="small" color="secondary" onClick={onDelete}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
