import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Formik } from "formik";
import { checkDeviceIDAndEmail } from "../../services/passwordChangeService";
import emailjs from "emailjs-com";
import { sign } from "jsonwebtoken";

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

export default function ForgetPasswordPage(props) {
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");

  const [serverError, setServerError] = useState("");

  setTimeout(function () {
    setCardAnimation("");
  }, 800);
  const classes = useStyles();

  const handleSubmit = async ({ deviceID, email }) => {
    try {
      await checkDeviceIDAndEmail(deviceID, email);

      const token = sign(
        {
          deviceID: deviceID,
        },
        "jwtPrivateKey"
      );

      const endPoint = process.env.REACT_APP_FRONTEND_ENDPOINT;

      const link = `${endPoint}change-password/${token}`;

      const senderInfo = {
        subject: "SPM: Reset Password",
        output: "Forget Password?",
        link: link,
        email: email,
      };

      emailjs
        .send(
          "service_hem270e",
          "template_rbx6gmm",
          senderInfo,
          "user_fsFQHDXBhdP1v3CEiiGJ0"
        )
        .then(
          (result) => {
            alert("Reset password email is sent.Check your email");
          },
          (error) => {
            alert(error.text);
          }
        );
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        setServerError(ex.response.data);
      }
    }
  };

  const errorStyle = {
    color: "red",
    fontFamily: "monospace",
    bottom: 100,
  };

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
                    initialValues={{ deviceID: "", email: "" }}
                    onSubmit={handleSubmit}
                  >
                    {({ handleChange, handleSubmit }) => (
                      <>
                        <CardBody>
                          <p style={errorStyle}>{serverError}</p>
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
                          <CustomInput
                            labelText="Email..."
                            id="email"
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              type: "text",
                              onChange: handleChange("email"),
                            }}
                          />
                        </CardBody>
                        <CardFooter className={classes.cardFooter}>
                          <Button
                            color="success"
                            size="lg"
                            onClick={handleSubmit}
                          >
                            Confirm
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
