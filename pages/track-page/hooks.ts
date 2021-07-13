// import React, { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { RootState, useAppDispatch } from "../../redux/store";
// import axios from "axios";

// import * as WebBrowser from "expo-web-browser";
// import {
//   DiscoveryDocument,
// } from "expo-auth-session";

// import {
//   logInStravaUser,
// } from "../../redux/strava/stravaSlice";

// import { useNavigation } from '@react-navigation/native';

// WebBrowser.maybeCompleteAuthSession();

// //Strava Credentials
// const clientID: string = "66714";
// const clientSecret: string = "6b5e8c4fd9bb841d1e8d9be15020dab2017607e4";

// // Strava Endpoints
// const discovery: DiscoveryDocument = {
//   tokenEndpoint: "https://www.strava.com/api/v3/oauth/token",
// };

// // endpoint for read-all activities. temporary token is added in getActivities()
// // const callActivities = `https://www.strava.com/api/v3/athlete/activities?access_token=`;

// export const useStravaRefresh = () => {
//   const dispatch = useAppDispatch();
//   const navigation = useNavigation();

//   const refreshToken: string | undefined = useSelector(
//     (state: RootState) => state.strava.refresh_token
//   );

//   //Post strava user to db
//   useEffect(() => {
//     console.log("HERE")
//     const getAccessToken = async () => {
//       await axios({
//         baseURL: discovery.tokenEndpoint,
//         method: "post",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         data: {
//           client_id: clientID,
//           client_secret: clientSecret,
//           refresh_token: refreshToken,
//           grant_type: "refresh_token",
//         },
//       })
//       .then(async (response) => {
//         console.log("Auth response: ", response)
//         console.log("Strava login data: ", response.data);
//         dispatch(logInStravaUser(response.data));
//       })
//       .catch((error) => {
//         navigation.navigate("ActivitySource");
//         console.log("Error getting login data: ", error);
//       });
//     };

//     getAccessToken();
//   },[]);

//   return [];
// };
