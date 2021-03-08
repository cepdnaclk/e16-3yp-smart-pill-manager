import React, { useState, useEffect } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

import { getHistory } from "../../services/userService";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HistoryCard from "./HistoryCard";

import Footer from "components/Footer/Footer";

import styles from "assets/jss/material-kit-react/views/profilePage.js";

import image from "assets/img/bg2.jpg";

const useStyles = makeStyles(styles);

export default function HistoryPage(props) {
  const classes = useStyles();
  const [containers, setContainers] = useState([]);

  useEffect(() => {
    async function getC() {
      const response = await getHistory();
      var new_containers = response.data;
      setContainers(new_containers);
    }
    getC();
  }, []);

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
        <div className={classes.title} style={{ top: "20px" }}>
          <h1 style={{ paddingTop: 20 }}>History</h1>
        </div>
        <GridContainer>
          {containers.map((c) => (
            <GridItem
              style={{ marginTop: "20px", marginBottom: "20px" }}
              key={c._id}
              sm={12}
              xs={12}
              md={4}
            >
              <HistoryCard
                medicine={c.medicine}
                startDate={c.startDate}
                endDate={c.endDate}
                containerID={c.containerID}
                patientID={c.patientID}
                routine={c.routine}
              />
            </GridItem>
          ))}
        </GridContainer>
      </div>
      {containers.length >= 4 && <Footer />}
    </div>
  );
}
