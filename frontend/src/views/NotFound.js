import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/material-kit-react/views/profilePage.js";

const useStyles = makeStyles(styles);

const NotFound = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <h1>NOT FOUND 404</h1>
    </div>
  );
};

export default NotFound;
