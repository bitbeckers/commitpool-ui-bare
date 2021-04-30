import React, { useState, useEffect } from "react";

export const useStravaLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log("Loaded Stava Login hook");

  const handleLogin = () => {
    isLoggedIn ? logOut() : logIn();
  };

  const logIn = () => {
    console.log("Please log in to Strava");
    console.log("Executing log in flow...");
    setIsLoggedIn(true);
  };

  const logOut = () => {
    console.log("Executing log out flow...");
    setIsLoggedIn(false);
  };

  return [isLoggedIn, handleLogin];
};
