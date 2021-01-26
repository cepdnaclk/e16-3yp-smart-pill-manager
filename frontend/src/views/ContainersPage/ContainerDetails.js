import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
// @material-ui/icons
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.js";

const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

export default function ContainerDetails({
  medicine,
  startDate,
  endDate,
  patientID,
  containerID,
  noOfPills,
  routine,
}) {
  const classes = useStyles();
  const [classicModal, setClassicModal] = React.useState(false);

  return (
    <div className={classes.container}>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6} lg={4}>
              <IconButton color="danger" onClick={() => setClassicModal(true)}>
                <LibraryBooks className={classes.icon} />
              </IconButton>
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
                    color="inherit"
                    onClick={() => setClassicModal(false)}
                  >
                    <Close className={classes.modalClose} />
                  </IconButton>
                  <h4 className={classes.modalTitle}>CONTAINER DETAILS</h4>
                </DialogTitle>
                <DialogContent
                  id="classic-modal-slide-description"
                  className={classes.modalBody}
                >
                  <Typography component="h5" variant="h5">
                    Medicine : {medicine}
                  </Typography>
                  <Typography component="h5" variant="h5">
                    Container No. : {containerID}
                  </Typography>
                  <Typography component="h5" variant="h5">
                    Start Date : {startDate}
                  </Typography>
                  <Typography component="h5" variant="h5">
                    End Date : {endDate}
                  </Typography>
                  <Typography component="h5" variant="h5">
                    No. Of Pills : {noOfPills}
                  </Typography>
                  <Typography component="h5" variant="h5">
                    routine : {routine[0].time}
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
