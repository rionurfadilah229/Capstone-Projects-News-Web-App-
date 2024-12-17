import { configureStore } from '@reduxjs/toolkit';
import savedReducer from './savedsclice';

export const store = configureStore({
  reducer: {
    saved: savedReducer,
  },
});