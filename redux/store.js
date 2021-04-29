import { configureStore } from '@reduxjs/toolkit';
import commitmentReducer from './commitment/commitmentSlice';

export default configureStore({
  reducer: {commitment: commitmentReducer},
})