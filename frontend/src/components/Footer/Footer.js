/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
import { Link } from "react-router-dom";
// material-ui core components
import { List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";

// @material-ui/icons
import { Favorite, Facebook, Twitter, GitHub } from "@material-ui/icons";

import styles from "assets/jss/material-kit-react/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  const { whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont,
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont,
  });
  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <Link to="/landing-page" className={classes.block}>
                About us
              </Link>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <Link to="/components" className={classes.block}>
                Blog
              </Link>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <div className={classes.textCenter + " " + classes.sharingArea}>
                <Button size="sm" color="twitter">
                  <Twitter /> Tweet
                </Button>
                <Button size="sm" color="facebook">
                  <Facebook /> Share
                </Button>
                <Button size="sm" color="google">
                  <i className={classes.socials + " fab fa-google-plus-g"} />
                  Share
                </Button>
                <Button size="sm" color="github">
                  <GitHub /> Star+
                </Button>
              </div>
            </ListItem>
          </List>
        </div>
        <div className={classes.right}>
          &copy; {1900 + new Date().getYear()} , made with{" "}
          <Favorite className={classes.icon} /> by{" "}
          <a
            href="https://github.com/arunanuwantha97"
            className={aClasses}
            target="_blank"
          >
            Aruna-Chandula-Isuru
          </a>{" "}
          for a better web.
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool,
};
