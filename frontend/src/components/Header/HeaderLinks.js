/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import {
  Apps,
  Person,
  PersonAdd,
  Home,
  ExitToApp,
  AccountCircle,
  Group,
  Facebook,
  Instagram,
  Twitter,
} from "@material-ui/icons";

// core components
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks({ user }) {
  const classes = useStyles();

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Link to="/" className={classes.navLink}>
          <Home className={classes.icons} />
          Home
        </Link>
      </ListItem>
      {!user && (
        <React.Fragment>
          <ListItem className={classes.listItem}>
            <Link to="/login-page" className={classes.navLink}>
              <Person className={classes.icons} /> Login
            </Link>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Link to="/register-page" className={classes.navLink}>
              <PersonAdd className={classes.icons} /> Sign Up
            </Link>
          </ListItem>
        </React.Fragment>
      )}
      {user && (
        <React.Fragment>
          <ListItem className={classes.listItem}>
            <Link to="/profile-page" className={classes.navLink}>
              <AccountCircle className={classes.icons} /> Profile
            </Link>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Link to="/patients" className={classes.navLink}>
              <Group className={classes.icons} /> Patients
            </Link>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Link to="/containers" className={classes.navLink}>
              <Apps className={classes.icons} /> Containers
            </Link>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Link to="/logout" className={classes.navLink}>
              <ExitToApp className={classes.icons} /> Logout
            </Link>
          </ListItem>
        </React.Fragment>
      )}

      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-twitter"
          title="Follow us on twitter"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href="#"
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <Twitter />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-facebook"
          title="Follow us on facebook"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="#"
            target="_blank"
            className={classes.navLink}
          >
            <Facebook />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-tooltip"
          title="Follow us on instagram"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="#"
            target="_blank"
            className={classes.navLink}
          >
            <Instagram />
          </Button>
        </Tooltip>
      </ListItem>
    </List>
  );
}
