import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    athlete: "",
    refresh_token: "",
    access_token: "",
    expires_at: 0,
    expires_in: 0,
  }

//TODO persist Strava login state
export const stravaSlice = createSlice({
  name: "strava",
  initialState,
  reducers: {
    logInStravaUser: (state, action) => {
      const data = action.payload;
      state.athlete = data.athlete;
      state.refresh_token = data.refresh_token;
      state.access_token = data.access_token;
      state.expires_at = data.expires_at;
      state.expires_in = data.expires_in;
      state.isLoggedIn = true;
    },
    logOutStravaUser: () => initialState,
  },
});

export const {
  logInStravaUser,
  logOutStravaUser,
} = stravaSlice.actions;

export default stravaSlice.reducer;
