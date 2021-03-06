import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Formik } from "formik";

import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg3.jpg";

import CustomInput from "components/CustomInput/CustomInput";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");

  //const [serverError, setserverError] = useState("");

  setTimeout(function () {
    setCardAnimation("");
  }, 800);
  const classes = useStyles();

  const handleSubmit = (e) => {
    console.log(e);
  };

  //   const errorStyle = {
  //     color: "red",
  //     fontFamily: "monospace",
  //     bottom: 100,
  //   };

  return (
    <div>
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={5}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="success" className={classes.cardHeader}>
                    <h4>Forget Password?</h4>
                  </CardHeader>

                  <Formik
                    initialValues={{ deviceID: "" }}
                    onSubmit={handleSubmit}
                  >
                    {({ handleChange, handleSubmit }) => (
                      <>
                        <CardBody>
                          <CustomInput
                            labelText="Your Device ID..."
                            id="deviceID"
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              type: "text",
                              onChange: handleChange("deviceID"),
                            }}
                          />
                        </CardBody>
                        <CardFooter className={classes.cardFooter}>
                          <Button
                            color="success"
                            size="lg"
                            onClick={handleSubmit}
                          >
                            SEND EMAIL
                          </Button>
                        </CardFooter>
                      </>
                    )}
                  </Formik>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer />
      </div>
    </div>
  );
}
