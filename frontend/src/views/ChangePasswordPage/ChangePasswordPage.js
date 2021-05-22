import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Formik } from "formik";
import { changePassword } from "../../services/passwordChangeService";

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

export default function ChangePasswordPage({ match }) {
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");

  const [serverError, setServerError] = useState("");

  setTimeout(function () {
    setCardAnimation("");
  }, 800);
  const classes = useStyles();

  const handleSubmit = async ({ password, cpassword }) => {
    try {
      const token = match.params.token;
      await changePassword(token, password, cpassword);
      alert("Password changed.");
      window.location = "/login-page";
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        setServerError(ex.response.data);
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
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Change Password</h4>
                  </CardHeader>

                  <Formik
                    initialValues={{ password: "", cpassword: "" }}
                    onSubmit={handleSubmit}
                  >
                    {({ handleChange, handleSubmit }) => (
                      <>
                        <CardBody>
                          <p style={errorStyle}>{serverError}</p>
                          <CustomInput
                            labelText="Password..."
                            id="password"
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              type: "password",
                              onChange: handleChange("password"),
                            }}
                          />
                          <CustomInput
                            labelText="Confirm Password..."
                            id="cpassword"
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              type: "password",
                              onChange: handleChange("cpassword"),
                            }}
                          />
                        </CardBody>
                        <CardFooter className={classes.cardFooter}>
                          <Button
                            color="primary"
                            size="lg"
                            onClick={handleSubmit}
                          >
                            change password
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
