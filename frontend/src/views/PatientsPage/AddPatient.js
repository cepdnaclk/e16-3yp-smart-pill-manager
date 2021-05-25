import React from "react";

import { Formik } from "formik";
import * as Yup from "yup";
import { addPatients } from "../../services/patientService";
import jwtDecode from "jwt-decode";

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
import { Typography } from "@material-ui/core";

import styles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.js";
import { httpTrigger } from "services/azureHttpTrigger";

const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

export default function AddPatient() {
  const classes = useStyles();
  const [classicModal, setClassicModal] = React.useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(4).max(50).required(),
    age: Yup.number().max(120).required(),
  });

  const jwt = localStorage.getItem("token");
  const user = jwtDecode(jwt);

  const handleSubmit = async ({ name, age }) => {
    httpTrigger(user.deviceID);
    await addPatients(name, age);

    window.location = "/patients";
    setClassicModal(false);
  };

  return (
    <div className={classes.container}>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6} lg={4}>
              <Button
                color="primary"
                block
                onClick={() => setClassicModal(true)}
              >
                <LibraryBooks className={classes.icon} />
                Add Patient
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
                  <h4 className={classes.modalTitle}>Add Patient Details</h4>
                </DialogTitle>
                <DialogContent
                  id="classic-modal-slide-description"
                  className={classes.modalBody}
                >
                  <Formik
                    initialValues={{ name: "", age: "" }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                  >
                    {({
                      handleChange,
                      handleSubmit,
                      errors,
                      touched,
                      setFieldTouched,
                      setFieldValue,
                    }) => (
                      <form>
                        <CustomInput
                          labelText="Name..."
                          id="name"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            type: "text",
                            onChange: handleChange("name"),
                            onBlur: () => setFieldTouched("name"),
                          }}
                        />

                        {touched.name && (
                          <Typography
                            style={{
                              color: "red",
                              fontFamily: "monospace",
                            }}
                          >
                            {errors.name}
                          </Typography>
                        )}
                        <CustomInput
                          labelText="Age"
                          id="age"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            type: "text",
                            onChange: handleChange("age"),
                            onBlur: () => setFieldTouched("age"),
                            autoComplete: "off",
                          }}
                        />
                        {touched.age && (
                          <Typography
                            style={{ color: "red", fontFamily: "monospace" }}
                          >
                            {errors.age}
                          </Typography>
                        )}
                        <Button color="primary" onClick={handleSubmit}>
                          Add
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
