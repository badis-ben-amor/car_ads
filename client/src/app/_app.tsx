"use client";
import { getUserThunk } from "@/redux/slices/userSlice";
import { AppDispatch, RootState } from "@/redux/store";
import React, { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const App = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { accessToken } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(getUserThunk(accessToken));
  }, []);
  return <>{children}</>;
};

export default App;
