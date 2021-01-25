import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";

import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import HomePage from "views/HomePage/HomePage";
import RegisterPage from "views/RegisterPage/RegisterPage";
import PatientsPage from "views/PatientsPage/PatientsPage";
import ContainersPage from "views/ContainersPage/ContainersPage";
import Logout from "views/Logout";
import Header from "./components/Header/Header";
import HeaderLinks from "./components/Header/HeaderLinks";
import NotFound from "views/NotFound";

class App extends Component {
  state = {};

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      this.setState({ user: user });
    } catch (ex) {}
  }

  render() {
    return (
      <>
        <Header
          absolute
          brand="Smart Pill Manager"
          fixed
          color="transparent"
          changeColorOnScroll={{
            height: 250,
            color: "info",
          }}
          rightLinks={<HeaderLinks user={this.state.user} />}
        />
        <Switch>
          <Route path="/landing-page" component={LandingPage} />
          <Route path="/profile-page" component={ProfilePage} />
          <Route path="/login-page" component={LoginPage} />
          <Route path="/register-page" component={RegisterPage} />
          <Route path="/logout" component={Logout} />
          <Route path="/patients" component={PatientsPage} />
          <Route path="/containers" component={ContainersPage} />
          <Route path="/components" component={Components} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/" exact component={HomePage} />
          <Redirect to="/not-found" />
        </Switch>
      </>
    );
  }
}

export default App;
