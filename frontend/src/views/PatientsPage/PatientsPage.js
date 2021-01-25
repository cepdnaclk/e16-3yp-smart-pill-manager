import React, { useState, useEffect } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomCard from "components/MyCard/Card";
import IconButton from "@material-ui/core/IconButton";
import { Delete, Check, Close } from "@material-ui/icons";
import Alert from "@material-ui/lab/Alert";
import Collapse from "@material-ui/core/Collapse";

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
          <div style={{ width: "100%" }}>
            <Collapse in={alertOpen}>
              <Alert
                variant="filled"
                severity="error"
                action={
                  <>
                    <IconButton
                      style={{ marginRight: 20 }}
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        handleDeletePatient();
                        setAlertOpen(false);
                      }}
                    >
                      <Check fontSize="inherit" />
                    </IconButton>

                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setAlertOpen(false);
                      }}
                    >
                      <Close fontSize="inherit" />
                    </IconButton>
                  </>
                }
              >
                Do you want to delete Patient?
              </Alert>
            </Collapse>
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
