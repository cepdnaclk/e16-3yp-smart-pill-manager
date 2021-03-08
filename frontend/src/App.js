import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";

import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import HomePage from "views/HomePage/HomePage";
import RegisterPage from "views/RegisterPage/RegisterPage";
import PatientsPage from "views/PatientsPage/PatientsPage";
import ContainersPage from "views/ContainersPage/ContainersPage";
import ForgetPasswordPage from "views/ForgetPasswordPage/ForgetPasswordPage";
import ChangePasswordPage from "views/ChangePasswordPage/ChangePasswordPage";
import Logout from "views/Logout";
import Header from "./components/Header/Header";
import HeaderLinks from "./components/Header/HeaderLinks";
import NotFound from "views/NotFound";
import VerifiedAccount from "views/VerifiedAccount";
import "aos/dist/aos.css";

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
    const { user } = this.state;

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
          rightLinks={<HeaderLinks user={user} />}
        />
        <Switch>
          <Route path="/landing-page" component={LandingPage} />
          <Route path="/login-page" component={LoginPage} />
          <Route path="/register-page" component={RegisterPage} />
          <Route path="/forgetpassword" component={ForgetPasswordPage} />
          <Route path="/forward-email/:token" component={VerifiedAccount} />
          <Route
            path="/change-password/:token"
            component={ChangePasswordPage}
          />
          <Route path="/logout" component={Logout} />
          <Route
            path="/profile-page"
            render={(props) => {
              if (!user) return <LoginPage />;
              return <ProfilePage {...props} />;
            }}
          />
          <Route
            path="/patients"
            render={(props) => {
              if (!user) return <LoginPage />;
              return <PatientsPage {...props} />;
            }}
          />
          <Route
            path="/containers"
            render={(props) => {
              if (!user) return <LoginPage />;
              return <ContainersPage {...props} />;
            }}
          />
          <Route path="/not-found" component={NotFound} />
          <Route path="/" exact component={HomePage} />
          <Redirect to="/not-found" />
        </Switch>
      </>
    );
  }
}

export default App;
