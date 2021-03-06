import React, { useState, useEffect } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomCard from "components/MyCard/Card";
import IconButton from "@material-ui/core/IconButton";
import { Delete } from "@material-ui/icons";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import Footer from "components/Footer/Footer";

import styles from "assets/jss/material-kit-react/views/profilePage.js";

import image from "assets/img/bg2.jpg";
import AddPatient from "./AddPatient";
import UpdatePatient from "./UpdatePatient";
import { getPatients, deletePatient } from "../../services/patientService";

const useStyles = makeStyles(styles);

export default function PatientsPage(props) {
  const classes = useStyles();
  const [patients, setPatients] = useState([]);

  const [alertOpen, setAlertOpen] = useState(false);
  const [patientId, setPatientId] = useState();

  useEffect(() => {
    async function getP() {
      const response = await getPatients();
      setPatients(response.data);
    }
    getP();
  }, []);

  const handleDeletePatient = async () => {
    await deletePatient(patientId);
    const updatePatients = patients;
    const patientsNew = updatePatients.filter((p) => p._id !== patientId);
    setPatients(patientsNew);
  };

  const handleDelete = (id) => {
    setAlertOpen(true);
    setPatientId(id);
  };

  return (
    <div
      className={classes.pageHeader}
      style={{
        backgroundImage: "url(" + image + ")",
        height: "70px",
        backgroundPosition: "top center",
      }}
    >
      <div className={classes.container}>
        <br />

        <div className={classes.title} style={{ top: "20px" }}>
          <h2>Patients</h2>
        </div>
        <GridContainer>
          <div>
            <Dialog
              open={alertOpen}
              //onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Do you realy want to delete this patient?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  If you click the accept button, this patient will remove from
                  the equation forever.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    setAlertOpen(false);
                  }}
                  color="primary"
                >
                  Decline
                </Button>
                <Button
                  onClick={() => {
                    handleDeletePatient();
                    setAlertOpen(false);
                  }}
                  color="primary"
                  autoFocus
                >
                  Accept
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          <AddPatient />
          {patients.map((p) => (
            <GridItem
              style={{ marginTop: "20px", marginBottom: "20px" }}
              key={p._id}
              sm={12}
              xs={12}
              md={4}
            >
              <CustomCard name={p.name} age={p.age} letter={p.name[0]}>
                <UpdatePatient patient={p} />
                <IconButton
                  color="secondary"
                  onClick={() => handleDelete(p._id)}
                >
                  <Delete />
                </IconButton>
              </CustomCard>
            </GridItem>
          ))}
        </GridContainer>
      </div>
      <Footer />
    </div>
  );
}
