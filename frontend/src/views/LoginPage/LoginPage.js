import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import { Formik } from "formik";
import * as Yup from "yup";
import { login } from "../../services/userService";

import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg2.jpg";

import CustomInput from "components/CustomInput/CustomInput";
import { InputAdornment } from "@material-ui/core";
import { Email, VpnKey } from "@material-ui/icons";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  const [serverError, setserverError] = useState("");

  setTimeout(function () {
    setCardAnimation("");
  }, 800);
  const classes = useStyles();

  const validateSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(5).label("Password"),
  });

  const handleSubmit = async ({ email, password }) => {
    try {
      const { data: jwt } = await login(email, password);
      localStorage.setItem("token", jwt);
      window.location = "/patients";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        setserverError(ex.response.data);
        console.log("new Error: ", serverError);
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
                  <CardHeader color="info" className={classes.cardHeader}>
                    <h4>LOGIN</h4>
                    <div className={classes.socialLine}>
                      <Button
                        justIcon
                        href="#"
                        target="_blank"
                        color="transparent"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className={"fab fa-twitter"} />
                      </Button>
                      <Button
                        justIcon
                        href="#"
                        target="_blank"
                        color="transparent"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className={"fab fa-facebook"} />
                      </Button>
                      <Button
                        justIcon
                        href="#"
                        target="_blank"
                        color="transparent"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className={"fab fa-google-plus-g"} />
                      </Button>
                    </div>
                  </CardHeader>
                  <Formik
                    initialValues={{ email: "", password: "" }}
                    onSubmit={handleSubmit}
                    validationSchema={validateSchema}
                  >
                    {({
                      handleChange,
                      handleSubmit,
                      errors,
                      touched,
                      setFieldTouched,
                    }) => (
                      <React.Fragment>
                        <CardBody>
                          <strong style={errorStyle}>{serverError}</strong>
                          <CustomInput
                            labelText="Email..."
                            id="email"
                            error={errors.email && true}
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              type: "email",
                              onChange: handleChange("email"),
                              onBlur: () => setFieldTouched("email"),
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Email className={classes.inputIconsColor} />
                                </InputAdornment>
                              ),
                            }}
                          />
                          {touched.email && (
                            <strong
                              style={{ color: "red", fontFamily: "monospace" }}
                            >
                              {errors.email}
                            </strong>
                          )}
                          <CustomInput
                            labelText="Password"
                            id="pass"
                            error={errors.password && true}
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              type: "password",
                              onChange: handleChange("password"),
                              onBlur: () => setFieldTouched("password"),
                              endAdornment: (
                                <InputAdornment position="end">
                                  <VpnKey className={classes.inputIconsColor} />
                                </InputAdornment>
                              ),
                              autoComplete: "off",
                            }}
                          />
                          {touched.password && (
                            <strong
                              style={{ color: "red", fontFamily: "monospace" }}
                            >
                              {errors.password}
                            </strong>
                          )}
                        </CardBody>
                        <CardFooter className={classes.cardFooter}>
                          <Button color="info" size="lg" onClick={handleSubmit}>
                            Get started
                          </Button>
                        </CardFooter>
                      </React.Fragment>
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
