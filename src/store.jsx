import { configureStore } from '@reduxjs/toolkit';
import userReducer from './hook/userSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    // Add other reducers as needed
  },
});
