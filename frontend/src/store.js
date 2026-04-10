import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import metricsReducer from './features/metricsSlice';
import resourcesReducer from './features/resourcesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    metrics: metricsReducer,
    resources: resourcesReducer,
  },
});

export default store;