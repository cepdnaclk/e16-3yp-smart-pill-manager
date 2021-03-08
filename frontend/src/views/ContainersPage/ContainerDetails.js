import React, { useState } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import styles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.js";

const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

export default function ContainerDetails({
  medicine,
  startDate,
  endDate,
  patientID,
  containerID,
  routine,
}) {
  const classes = useStyles();
  const [classicModal, setClassicModal] = useState(false);

  return (
    <div className={classes.container}>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6} lg={4}>
              <Button
                color="primary"
                size="small"
                onClick={() => setClassicModal(true)}
              >
                more
              </Button>
              <Dialog
                classes={{
                  root: classes.center,
                  paper: classes.modal,
                }}
                open={classicModal}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setClassicModal(false)}
                aria-labelledby="classic-modal-slide-title"
                aria-describedby="classic-modal-slide-description"
              >
                <DialogTitle
                  id="classic-modal-slide-title"
                  disableTypography
                  className={classes.modalHeader}
                >
                  <IconButton
                    className={classes.modalCloseButton}
                    key="close"
                    aria-label="Close"
                    color="secondary"
                    onClick={() => setClassicModal(false)}
                  >
                    <Close className={classes.modalClose} />
                  </IconButton>
                  <Typography color="secondary" component="h5" variant="h5">
                    CONTAINER DETAILS
                  </Typography>
                </DialogTitle>
                <DialogContent
                  id="classic-modal-slide-description"
                  className={classes.modalBody}
                >
                  <Typography color="primary" variant="h5">
                    MEDICINE : {medicine}
                  </Typography>
                  <Typography color="primary" component="h5" variant="h5">
                    CONTAINER NO. : {containerID}
                  </Typography>
                  <Typography color="primary" component="h5" variant="h5">
                    PATIENT ID : {patientID}
                  </Typography>
                  <Typography color="primary" component="h5" variant="h5">
                    SESSION START DATE : {startDate}
                  </Typography>
                  <Typography color="primary" component="h5" variant="h5">
                    SESSION END DATE : {endDate}
                  </Typography>
                  <Typography color="primary" component="h5" variant="h5">
                    ROUTINE...
                  </Typography>
                  <Typography color="secondary">
                    {`MORNING TIME: ${routine[0].time}   MORNING PILLS: ${routine[0].pills}`}
                  </Typography>
                  <Typography color="secondary">
                    AFTERNOON TIME: {routine[1].time} {"  "} AFTERNOON PILLS:{" "}
                    {routine[1].pills}
                  </Typography>
                  <Typography color="secondary">
                    EVENING TIME: {routine[2].time} {"  "} EVENING PILLS:{" "}
                    {routine[2].pills}
                  </Typography>
                </DialogContent>
              </Dialog>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </div>
  );
}
