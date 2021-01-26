import React, { useState, useEffect } from "react";

import {
  getContainers,
  deleteContainer,
} from "../../services/containerService";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import ContainerCard from "./ContainerCard";

import Footer from "components/Footer/Footer";

import styles from "assets/jss/material-kit-react/views/profilePage.js";

import image from "assets/img/bg2.jpg";
import AddContainer from "./AddContainer";
// import UpdatePatient from "./UpdatePatient";

//import logo from "../../assets/svg/logo.svg";

const useStyles = makeStyles(styles);

export default function ContainersPage(props) {
  const classes = useStyles();
  const [containers, setContainers] = useState([]);

  useEffect(() => {
    async function getC() {
      const response = await getContainers();
      setContainers(response.data);
    }
    getC();
  }, []);

  const handleDelete = async (id) => {
    await deleteContainer(id);
    const updateContainers = containers;
    const containersNew = updateContainers.filter((c) => c._id !== id);
    setContainers(containersNew);
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
          <h2>My Containers</h2>
          {/* <object type="image/svg+xml" data={logo} loop={true}>
            svg-animation
          </object> */}
        </div>
        <GridContainer>
          <AddContainer />
          {containers.map((c) => (
            <GridItem
              style={{ marginTop: "20px", marginBottom: "20px" }}
              key={c._id}
              sm={12}
              xs={12}
              md={4}
            >
              <ContainerCard
                medicine={c.medicine}
                startDate={c.startDate}
                endDate={c.endDate}
                containerID={c.containerID}
                patientID={c.patientID}
                routine={c.routine}
                noOfPills={c.noOfPills}
                onDelete={() => handleDelete(c._id)}
              />
            </GridItem>
          ))}
        </GridContainer>
      </div>
      <Footer />
    </div>
  );
}
