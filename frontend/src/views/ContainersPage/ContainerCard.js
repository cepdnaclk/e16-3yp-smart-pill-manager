import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Delete } from "@material-ui/icons";
import ContainerDetails from "./ContainerDetails";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

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
  const theme = useTheme();

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {medicine}
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <ContainerDetails
            medicine={medicine}
            startDate={startDate}
            endDate={endDate}
            containerID={containerID}
            patientID={patientID}
            routine={routine}
            noOfPills={noOfPills}
          />
          <IconButton color="inherit" onClick={onDelete}>
            <Delete />
          </IconButton>
        </div>
      </div>
      <CardMedia className={classes.cover}>
        <div>
          <h1>{containerID}</h1>
        </div>
      </CardMedia>
    </Card>
  );
}
