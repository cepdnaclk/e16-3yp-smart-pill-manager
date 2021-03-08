import React from "react";
import "../assets/css/acc-verified.css";

import { accountVerify } from "../services/accountVerifyService";

export default function VerifiedAccount({ match }) {
  const handleClick = async () => {
    await accountVerify(match.params.token);
    alert("Your account is verified successfully.");
    window.location = "login-page";
  };

  return (
    <div className="container">
      <h2 className="title">If you want to verify your account?</h2>
      <button className="btn" onClick={handleClick}>
        Click Me
      </button>
    </div>
  );
}
