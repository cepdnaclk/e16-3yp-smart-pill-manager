import React from "react";

import { Formik } from "formik";
import * as Yup from "yup";
import { addContainer } from "../../services/containerService";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

// @material-ui/icons
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";

import CustomInput from "components/CustomInput/CustomInput";
import PatientSelect from "./PatientSelect";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import styles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.js";
import Muted from "components/Typography/Muted";

const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

export default function AddContainer() {
  const classes = useStyles();
  const [classicModal, setClassicModal] = React.useState(false);

  const validationSchema = Yup.object().shape({
    containerID: Yup.number().min(1).max(12).required(),
    patientID: Yup.string().required().min(2).max(50),
    medicine: Yup.string().required(),
    endDate: Yup.date().required(),
    morningPills: Yup.number(),
    noOfPills: Yup.number(),
  });

  const handleSubmit = async (info) => {
    const routineArray = [];
    const morningData = {
      time: info.morningTime,
      pills: parseInt(info.morningPills),
    };
    const afternoonData = {
      time: info.afternoonTime,
      pills: parseInt(info.afternoonPills),
    };
    const eveningData = {
      time: info.eveningTime,
      pills: parseInt(info.eveningPills),
    };

    routineArray.push(morningData);
    routineArray.push(afternoonData);
    routineArray.push(eveningData);

    const data = {
      containerID: parseInt(info.containerID),
      patientID: info.patientID,
      medicine: info.medicine,
      startDate: info.startDate,
      endDate: info.endDate,
      routine: routineArray,
      noOfPills: info.noOfPills,
      isFull: true,
    };

    await addContainer(data);
    window.location = "/containers";
    console.log(data);
    setClassicModal(false);
  };

  const myStyles = {
    textField: {
      width: 150,
    },
  };

  return (
    <div className={classes.container}>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6} lg={4}>
              <Button
                color="danger"
                block
                onClick={() => setClassicModal(true)}
              >
                <LibraryBooks className={classes.icon} />
                Add Container
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
                    color="inherit"
                    onClick={() => setClassicModal(false)}
                  >
                    <Close className={classes.modalClose} />
                  </IconButton>
                  <h4 className={classes.modalTitle}>Add Container Details</h4>
                </DialogTitle>
                <DialogContent
                  id="classic-modal-slide-description"
                  className={classes.modalBody}
                >
                  <Formik
                    initialValues={{
                      patientID: "",
                      containerID: 0,
                      medicine: "",
                      startDate: Date.now(),
                      endDate: Date.now(),
                      morningTime: "",
                      afternoonTime: "",
                      eveningTime: "",
                      morningPills: 0,
                      afternoonPills: 0,
                      eveningPills: 0,

                      noOfPills: 0,
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                  >
                    {({ handleChange, handleSubmit, values }) => (
                      <form>
                        <PatientSelect
                          onChange={handleChange("patientID")}
                          value={values.patientID}
                        />
                        <CustomInput
                          labelText="Container Number..."
                          id="containerID"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            type: "text",
                            onChange: handleChange("containerID"),
                            autoComplete: "off",
                          }}
                        />
                        <CustomInput
                          labelText="Medicine Name..."
                          id="medicine"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            type: "text",
                            onChange: handleChange("medicine"),
                            autoComplete: "off",
                          }}
                        />
                        <CustomInput
                          labelText="Start Date"
                          id="startDate"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            type: "text",
                            onChange: handleChange("startDate"),
                            autoComplete: "off",
                          }}
                        />
                        <CustomInput
                          labelText="End Date..."
                          id="endDate"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            type: "text",
                            onChange: handleChange("endDate"),
                            autoComplete: "off",
                          }}
                        />
                        <Muted>Routine Time</Muted>
                        <br />
                        <Grid container justify="space-between">
                          <TextField
                            id="time"
                            label="Morining Time"
                            type="time"
                            defaultValue=""
                            style={myStyles.textField}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            inputProps={{
                              step: 300, // 5 min
                              onChange: handleChange("morningTime"),
                            }}
                          />
                          <TextField
                            id="time"
                            label="Afternoon Time"
                            type="time"
                            defaultValue=""
                            style={myStyles.textField}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            inputProps={{
                              step: 300, // 5 min
                              onChange: handleChange("afternoonTime"),
                            }}
                          />
                          <TextField
                            id="time"
                            label="Evening Time"
                            type="time"
                            defaultValue=""
                            style={myStyles.textField}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            inputProps={{
                              step: 300, // 5 min
                              onChange: handleChange("eveningTime"),
                            }}
                          />
                        </Grid>
                        <Muted>Routine Pills</Muted>
                        <br />
                        <GridContainer justify="space-around">
                          <GridItem xs={12} sm={4} md={4} lg={3}>
                            <CustomInput
                              labelText="Morninig Pills"
                              id="mpills"
                              inputProps={{
                                type: "int",
                                onChange: handleChange("morningPills"),
                                autoComplete: "off",
                              }}
                              formControlProps={{
                                fullWidth: true,
                              }}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={4} md={4} lg={3}>
                            <CustomInput
                              labelText="Afternoon Pills"
                              id="apills"
                              formControlProps={{
                                fullWidth: true,
                              }}
                              inputProps={{
                                type: "text",
                                onChange: handleChange("afternoonPills"),
                                autoComplete: "off",
                              }}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={4} md={4} lg={3}>
                            <CustomInput
                              labelText="Evening Pills"
                              id="float"
                              formControlProps={{
                                fullWidth: true,
                              }}
                              inputProps={{
                                type: "text",
                                onChange: handleChange("eveningPills"),
                                autoComplete: "off",
                              }}
                            />
                          </GridItem>
                        </GridContainer>

                        <CustomInput
                          labelText="No of Pills..."
                          id="noOfPills"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            type: "text",
                            onChange: handleChange("noOfPills"),
                            autoComplete: "off",
                          }}
                        />
                        <Button color="danger" onClick={handleSubmit}>
                          Add Container
                        </Button>
                      </form>
                    )}
                  </Formik>
                </DialogContent>
              </Dialog>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </div>
  );
}
