import React from "react";

import { Formik } from "formik";
import * as Yup from "yup";
import { updatePatient } from "../../services/patientService";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

// @material-ui/icons
import { Edit, Close } from "@material-ui/icons";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";

import CustomInput from "components/CustomInput/CustomInput";

import styles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.js";

const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

export default function UpdatePatient({ patient }) {
  const classes = useStyles();
  const [classicModal, setClassicModal] = React.useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    age: Yup.number().required(),
  });

  const handleSubmit = async ({ name, age }) => {
    console.log(name, parseInt(age));
    await updatePatient(patient._id, name, parseInt(age));
    setClassicModal(false);
    window.location = "/patients";
  };

  return (
    <div className={classes.container}>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6} lg={4}>
              <IconButton color="primary" onClick={() => setClassicModal(true)}>
                <Edit />
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
                  <h4 className={classes.modalTitle}>Add Patient Details</h4>
                </DialogTitle>
                <DialogContent
                  id="classic-modal-slide-description"
                  className={classes.modalBody}
                >
                  <Formik
                    initialValues={{ name: patient.name, age: patient.age }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                  >
                    {({ handleChange, handleSubmit }) => (
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
                          }}
                        />
                        <CustomInput
                          labelText="Age"
                          id="age"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            type: "text",
                            onChange: handleChange("age"),
                            autoComplete: "off",
                          }}
                        />
                        <Button color="primary" onClick={handleSubmit}>
                          UPDATE
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
