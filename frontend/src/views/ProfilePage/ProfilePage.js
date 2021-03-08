import React, { useState, useEffect } from "react";
import { clearHistory, deleteAccount } from "../../services/userService";
// nodejs library that concatenates classes
import classNames from "classnames";

import jwtDecode from "jwt-decode";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import Parallax from "components/Parallax/Parallax.js";

import profile from "assets/img/faces/christian.jpg";

import styles from "assets/jss/material-kit-react/views/profilePage.js";

const useStyles = makeStyles(styles);

export default function ProfilePage() {
  const classes = useStyles();
  //const user = useContext(UserContext);
  const [user, setUser] = useState({});

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    const userFromToken = jwtDecode(jwt);
    setUser(userFromToken);
  }, []);

  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  const token = localStorage.getItem("token");

  const handleChangePassword = () => {
    window.location = "/change-password/" + token;
  };
  const handleClearHistory = async () => {
    await clearHistory();
    alert("History is cleared.");
  };
  const handleDeleteAccount = async () => {
    await deleteAccount(token);
    alert("Account deleted successfully.");
    window.location = "/login-page";
  };

  return (
    <div>
      <Parallax small filter image={require("assets/img/profile-bg.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img src={profile} alt="..." className={imageClasses} />
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>{user.username}</h3>
                    <h4>{user.email}</h4>
                    <Button justIcon color="white" className={classes.margin5}>
                      <i className={"fab fa-twitter"} />
                    </Button>
                    <Button justIcon color="white" className={classes.margin5}>
                      <i className={"fab fa-instagram"} />
                    </Button>
                    <Button justIcon color="white" className={classes.margin5}>
                      <i className={"fab fa-facebook"} />
                    </Button>
                  </div>
                  <div className={classes.name} style={{ paddingTop: 80 }}>
                    <h4>More Functions</h4>
                    <Button
                      color="success"
                      className={classes.margin5}
                      onClick={handleChangePassword}
                    >
                      change password
                    </Button>
                    <Button
                      color="primary"
                      className={classes.margin5}
                      onClick={handleClearHistory}
                    >
                      clear history
                    </Button>
                    <Button
                      color="danger"
                      className={classes.margin5}
                      onClick={handleDeleteAccount}
                    >
                      delete account
                    </Button>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <div className={classes.description}>
              <p>I'm owner of the this smart pill manager device.</p>
              <p>DEVICE ID : {user.deviceID}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
