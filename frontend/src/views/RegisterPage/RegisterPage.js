import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { register } from "../../services/userService";

import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";

import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg2.jpg";
import { ConfirmationNumber, Lock, Email, People } from "@material-ui/icons";

const useStyles = makeStyles(styles);

export default function RegisterPage(props) {
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  const [serverError, setServerError] = useState("");

  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();

  const validateSchema = Yup.object().shape({
    deviceID: Yup.string().required().label("Device ID"),
    username: Yup.string().required().label("Username"),
    name: Yup.string().required().label("Name"),
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(5).label("Password"),
  });

  const handleSubmit = async (userInfo) => {
    try {
      const response = await register(userInfo);
      const token = response.data;
      localStorage.setItem("token", token);
      window.location = "/patients";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        setServerError(ex.response.data);
      }
    }
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
                <Formik
                  initialValues={{
                    deviceID: "",
                    email: "",
                    name: "",
                    username: "",
                    password: "",
                  }}
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
                    <form className={classes.form}>
                      <CardHeader color="danger" className={classes.cardHeader}>
                        <h4>REGISTER</h4>
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

                      <CardBody>
                        {
                          <strong
                            style={{ color: "red", fontFamily: "monospace" }}
                          >
                            {serverError}
                          </strong>
                        }
                        <CustomInput
                          labelText="Name..."
                          id="name"
                          error={errors.name && true}
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            type: "text",
                            onChange: handleChange("name"),
                            onBlur: () => setFieldTouched("name"),
                            endAdornment: (
                              <InputAdornment position="end">
                                <People className={classes.inputIconsColor} />
                              </InputAdornment>
                            ),
                          }}
                        />
                        {touched.name && (
                          <strong
                            style={{ color: "red", fontFamily: "monospace" }}
                          >
                            {errors.name}
                          </strong>
                        )}
                        <CustomInput
                          labelText="Device ID..."
                          id="deviceID"
                          error={errors.deviceID && true}
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            type: "text",
                            onChange: handleChange("deviceID"),
                            onBlur: () => setFieldTouched("deviceID"),
                            endAdornment: (
                              <InputAdornment position="end">
                                <ConfirmationNumber
                                  className={classes.inputIconsColor}
                                />
                              </InputAdornment>
                            ),
                          }}
                        />
                        {touched.deviceID && (
                          <strong
                            style={{ color: "red", fontFamily: "monospace" }}
                          >
                            {errors.deviceID}
                          </strong>
                        )}
                        <CustomInput
                          labelText="Username..."
                          id="username"
                          error={errors.username && true}
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            type: "text",
                            onChange: handleChange("username"),
                            onBlur: () => setFieldTouched("username"),
                            endAdornment: (
                              <InputAdornment position="end">
                                <People className={classes.inputIconsColor} />
                              </InputAdornment>
                            ),
                          }}
                        />
                        {touched.username && (
                          <strong
                            style={{ color: "red", fontFamily: "monospace" }}
                          >
                            {errors.username}
                          </strong>
                        )}
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
                                <Lock className={classes.inputIconsColor} />
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
                        <Button
                          round
                          color="danger"
                          size="lg"
                          onClick={handleSubmit}
                        >
                          Get started
                        </Button>
                      </CardFooter>
                    </form>
                  )}
                </Formik>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
