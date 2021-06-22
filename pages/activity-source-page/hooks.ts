import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import axios from "axios";

import * as WebBrowser from "expo-web-browser";
import {
  makeRedirectUri,
  useAuthRequest,
  DiscoveryDocument,
  revokeAsync,
  RevokeTokenRequestConfig,
} from "expo-auth-session";

import {
  logInStravaUser,
  logOutStravaUser,
} from "../../redux/strava/stravaSlice";

WebBrowser.maybeCompleteAuthSession();

//Strava Credentials
const clientID: string = "51548&";
const clientSecret: string = "28d56211b9ca33972055bf61010074fbedc3c7c2";

// Strava Endpoints
const discovery: DiscoveryDocument = {
  authorizationEndpoint: "https://www.strava.com/oauth/mobile/authorize",
  tokenEndpoint: "https://www.strava.com/oauth/token",
  revocationEndpoint: "https://www.strava.com/oauth/deauthorize",
};

// endpoint for read-all activities. temporary token is added in getActivities()
// const callActivities = `https://www.strava.com/api/v3/athlete/activities?access_token=`;

export const useStravaLogin = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn: boolean = useSelector(
    (state: RootState) => state.strava.isLoggedIn
  );
  const stravaAthlete: Athlete | undefined = useSelector(
    (state: RootState) => state.strava.athlete
  );
  const refreshToken: string | undefined = useSelector(
    (state: RootState) => state.strava.refresh_token
  );
  const accessToken: string | undefined = useSelector(
    (state: RootState) => state.strava.access_token
  );


  const handleLogin = () => {
    isLoggedIn ? logOutAndClearState() : stravaOauth();
  };

  const logOutAndClearState = async () => {
    if(refreshToken){
      const config: RevokeTokenRequestConfig = {token: refreshToken}

      await revokeAsync(config, discovery);
  
      dispatch(logOutStravaUser());
    }
  };

  const stravaOauth = () => {
    promptAsync();
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
  useEffect(() => {
    console.log("Response: ", response)
    if (response?.type === "success") {
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
            console.log("Auth response: ", response)
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

  //Post strava user to db
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
            address: stravaAthlete?.id,
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

  return [isLoggedIn, handleLogin];
};
