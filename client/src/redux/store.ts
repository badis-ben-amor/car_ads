import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import carReducer from "./slices/carSlice";

const store = configureStore({
  reducer: { auth: authReducer, user: userReducer, car: carReducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
