import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";

import profile from "assets/img/faces/christian.jpg";
import ContainerDetails from "./ContainerDetails";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    display: "flex",
    alignItems: "center",
    // flex: "1 0 auto",
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
}));

export default function ContainerCard({
  medicine,
  startDate,
  endDate,
  patientID,
  containerID,
  noOfPills,
  routine,
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
          {/* <Typography variant="subtitle2" color="textSecondary">
            No. of Pills : {noOfPills}
          </Typography> */}
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
        </div>
      </div>
      <CardMedia
        className={classes.cover}
        image={profile}
        title="Live from space album cover"
      />
    </Card>
  );
}
