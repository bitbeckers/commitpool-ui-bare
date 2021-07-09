import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    updateAccessToken: (state, action: PayloadAction<string>) => {
      state.access_token = action.payload
    },
    logInStravaUser: (state, action: PayloadAction<StravaState>) => {
      const data = action.payload;
      state.athlete = data.athlete;
      state.refresh_token = data.refresh_token;
      state.access_token = data.access_token;
      state.expires_at = data.expires_at;
      state.expires_in = data.expires_in;
      state.isLoggedIn = true;    },
    logOutStravaUser: () => initialState,
  },
});

export const { logInStravaUser, logOutStravaUser, updateAccessToken } = stravaSlice.actions;

export default stravaSlice.reducer;
