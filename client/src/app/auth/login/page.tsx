"use client";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "@/redux/slices/authSlice";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "next/navigation";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     await dispatch(loginThunk({ email, password })).unwrap();
  //     router.push("/");
  //   } catch (err) {}
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginThunk({ email, password }))
      .unwrap()
      .then(() => router.push("/"))
      .catch((err) => setError(err));
  };
  return (
    <div className="max-w-md mx-auto mt-4">
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="text-center">
            <p className="text-red-600">{error}</p>
          </div>
        )}
        <div className="mb-4">
          <Label htmlFor="email">email</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <Button className="w-full" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
