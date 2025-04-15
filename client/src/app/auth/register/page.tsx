"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerThunk } from "@/redux/slices/authSlice";
import { AppDispatch } from "../../../redux/store";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";

const Register = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerThunk({ name, email, password }));
  };
  return (
    <div className="max-w-md mx-auto mt-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Your Name"
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email"
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
            placeholder="Enter Your Password"
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Register
        </Button>
      </form>
    </div>
  );
};

export default Register;

// components/auth/register.tsx

// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { registerThunk } from "../../redux/slices/authSlice";
// import { RootState } from "../../redux/store";
// import { Button, Input, Label } from "shadcn"; // Use ShadCN components

// const Register = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const dispatch = useDispatch();
//   const { isLoading, error } = useSelector((state: RootState) => state.auth);

//   const handleRegister = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const userData = { name, email, password };
//     dispatch(registerThunk(userData));
//   };

//   return (
//     <div className="max-w-md mx-auto">
//       <form onSubmit={handleRegister}>
//         <div className="mb-4">
//           <Label htmlFor="name">Name</Label>
//           <Input
//             type="text"
//             id="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Enter your name"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <Label htmlFor="email">Email</Label>
//           <Input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your email"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <Label htmlFor="password">Password</Label>
//           <Input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Enter your password"
//             required
//           />
//         </div>
//         {error && <p className="text-red-500">{error}</p>}
//         <Button type="submit" disabled={isLoading} className="w-full">
//           {isLoading ? "Registering..." : "Register"}
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default Register;
