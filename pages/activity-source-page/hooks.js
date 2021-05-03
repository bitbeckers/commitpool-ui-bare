import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";

import {
  logInStravaUser,
  logOutStravaUser,
  updateAthlete
} from "../../redux/strava/stravaSlice";

WebBrowser.maybeCompleteAuthSession();

//TODO Strava account flow to state

//Strava Credentials
const clientID = "51548&";
const clientSecret = "28d56211b9ca33972055bf61010074fbedc3c7c2";

// Strava Endpoints
const discovery = {
  authorizationEndpoint: "https://www.strava.com/oauth/mobile/authorize",
  tokenEndpoint: "https://www.strava.com/oauth/token",
  revocationEndpoint: "https://www.strava.com/oauth/deauthorize",
};

// endpoint for read-all activities. temporary token is added in getActivities()
// const callActivities = `https://www.strava.com/api/v3/athlete/activities?access_token=`;

export const useStravaLogin = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.strava.isLoggedIn);
  const stravaAthlete = useSelector((state) => state.strava.athlete);
  const refreshToken = useSelector((state) => state.strava.refresh_token);

  console.log("Loaded Stava Login hook");

  const handleLogin = () => {
    isLoggedIn ? logOut() : logIn();
  };

  //Strava login
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: clientID,
      scopes: ["read,activity:read"],
      // For usage in managed apps using the proxy
      redirectUri: makeRedirectUri({
        // For usage in bare and standalone
        // the "redirect" must match your "Authorization Callback Domain" in the Strava dev console.
        native: "your.app://redirect",
      }),
    },
    discovery
  );

  //Set strava Code from response
  //TODO TS to check on ?.type
  useEffect(() => {
    if (response !== null && response.type === "success") {
      const executeLogin = async () => {
        await axios({
          method: "post",
          baseURL: discovery.tokenEndpoint,
          params: {
            client_id: clientID,
            client_secret: clientSecret,
            code: response.params.code,
            grant_type: "authorization_code",
          },
        })
          .then(async (response) => {
            console.log("Strava login data: ", response.data);
            dispatch(logInStravaUser(response.data));
          })
          .catch((error) => {
            console.log("Error getting login data: ", error);
          });
      };
      executeLogin();
    }
  }, [response]);

  //Post strava user
  useEffect(() => {
    if (isLoggedIn) {
      const createUser = async () => {
        await axios({
          url: "https://test2.dcl.properties/user",
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          data: {
            address: stravaAthlete.id,
            token: refreshToken,
          },
        })
          .then((response) => {
            console.log("Strava user data posted: ", response.data);
          })
          .catch((error) =>
            console.log("Error posting strava user data: ", error)
          );
      };

      createUser();
    }
  }, [isLoggedIn]);

  const stravaOauth = () => {
    promptAsync();
  };

  const logIn = () => {
    console.log("Executing log in flow...");
    stravaOauth();
  };

  const logOut = () => {
    console.log("Executing log out flow...");
    dispatch(logOutStravaUser());
  };

  return [isLoggedIn, handleLogin];
};
