import { createSlice, Slice } from "@reduxjs/toolkit";

interface StravaState {
  isLoggedIn: boolean;
  athlete?: Athlete;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  expires_in?: number;
}

const initialState: StravaState = {
  isLoggedIn: false,
};

export const stravaSlice = createSlice({
  name: "strava",
  initialState,
  reducers: {
    logInStravaUser: (state, action) => {
      state = { ...state, ...action.payload };
    },
    logOutStravaUser: () => initialState,
  },
});

export const { logInStravaUser, logOutStravaUser } = stravaSlice.actions;

export default stravaSlice.reducer;
