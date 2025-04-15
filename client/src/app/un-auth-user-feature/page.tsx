import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const UnAuthUser = () => {
  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-3xl font-bold">Feature Access Denied</h1>
      <p className="text-lg mt-2 text-gray-500">
        Please login to use this user feature
      </p>
      <div className="mt-6 flex flex-col items-center space-y-1">
        <h1 className="text-lg font-bold">You can login as</h1>
        <p>email : user@gmail.com</p>
        <p>password : user</p>
        <Link href={"/auth/login"}>
          <Button className="bg-[#b5e6dc] text-black hover:bg-[#9ed9cd] transition-colors duration-200">
            Login
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default UnAuthUser;
