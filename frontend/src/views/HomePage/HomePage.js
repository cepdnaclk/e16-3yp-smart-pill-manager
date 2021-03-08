import React from "react";
// nodejs library that concatenates classes
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components

import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";
// sections for this page

import AOS from "aos";
import styles from "assets/jss/material-kit-react/views/components.js";

AOS.init();

const useStyles = makeStyles(styles);

export default function HomePage(props) {
  const classes = useStyles();

  return (
    <div>
      <Parallax image={require("assets/img/bg5.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <div style={{ display: "inline" }}>
                  <h1
                    className={classes.title}
                    data-aos="fade-right"
                    data-aos-duration="2000"
                    style={{ color: "rgb(0,0,42)" }}
                  >
                    Smart
                  </h1>
                  <h1
                    className={classes.title}
                    data-aos="fade-down"
                    data-aos-duration="2000"
                    style={{ color: "red" }}
                  >
                    Pill
                  </h1>
                  <h1
                    className={classes.title}
                    data-aos="fade-left"
                    data-aos-duration="2000"
                    style={{ color: "rgb(0,0,42)" }}
                  >
                    Manager
                  </h1>
                </div>

                <h3
                  className={classes.subtitle}
                  data-aos="fade-up"
                  data-aos-duration="2000"
                >
                  Get Medicine Without Tears!
                </h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <Footer />
    </div>
  );
}
