import { configureStore } from '@reduxjs/toolkit';
import commitmentReducer from './commitment/commitmentSlice';
import stravaReducer from './strava/stravaSlice';

export default configureStore({
  reducer: {commitment: commitmentReducer, strava: stravaReducer},
})