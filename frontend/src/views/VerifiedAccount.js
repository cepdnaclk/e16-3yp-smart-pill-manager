import React from "react";
import Button from "@material-ui/core/Button";

export default function VerifiedAccount(props) {
  const handleClick = () => {
    console.log(props);
  };

  return (
    <div>
      <h1>If you want to verify your account?</h1>
      <Button variant="text" color="inherit" onClick={handleClick}>
        Click Me
      </Button>
    </div>
  );
}
