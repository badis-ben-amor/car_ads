"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Navbar = () => {
  const { user }: { user: any } = useSelector((state: RootState) => state.user);

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const handleCloseMenu = () => {
    setMenuIsOpen(false);
  };

  return (
    <div className="flex justify-between px-4 py-1 bg-blue-600 text-white font-bold shadow-md sticky top-0 z-50">
      <Link
        onClick={handleCloseMenu}
        className="text-xl text-red-50 hover:text-red-100 duration-200"
        href="/"
      >
        <img
          src="https://res.cloudinary.com/dorwd6svl/image/upload/v1744580910/car_ads_aiw090.png"
          width={54}
          height={54}
        />
      </Link>

      <div className="hidden md:flex w-120 flex justify-between">
        <Link
          className="text-lime-50 hover:text-lime-200 duration-200"
          href="/"
        >
          Home
        </Link>
        <Link className="text-lime-50 hover:text-lime-200 duration-200" href="">
          About
        </Link>
        <Link className="text-lime-50 hover:text-lime-200 duration-200" href="">
          Contact
        </Link>
      </div>

      <div className="hidden md:flex">
        {!user?.name ? (
          <>
            <Link href={"/auth/login"}>
              <Button className="bg-blue-50 text-black hover:bg-blue-100 transition-colors duration-200 mx-2">
                Login
              </Button>
            </Link>
            <Link href={"/auth/register"}>
              <Button className="bg-blue-50 text-black hover:bg-blue-100 transition-colors duration-200">
                Register
              </Button>
            </Link>
          </>
        ) : (
          <p className="flex flex-col justify-center bg-[#f0f7ba] text-black rounded-lg px-0.5 font-bold">
            Hello {user.name}
          </p>
        )}
      </div>

      {/* mobile */}
      <div className="md:hidden block space-y-2">
        <Button
          className="bg-lime-50 hover:bg-lime-100"
          onClick={() => setMenuIsOpen(!menuIsOpen)}
        >
          <Menu color="red" />
        </Button>

        {menuIsOpen && (
          <>
            <div className="space-y-2">
              <Link
                onClick={handleCloseMenu}
                className="block text-lime-50 hover:text-lime-200 duration-200"
                href="/"
              >
                Home
              </Link>
              <Link
                className="block text-lime-50 hover:text-lime-200 duration-200"
                href="/"
              >
                About
              </Link>
              <Link
                className="block text-lime-50 hover:text-lime-200 duration-200"
                href="/"
              >
                Contact
              </Link>
            </div>

            <div className="space-y-2">
              {!user?.name ? (
                <>
                  <Link href={"/auth/login"}>
                    <Button
                      onClick={handleCloseMenu}
                      className="block bg-blue-50 text-black hover:bg-blue-100 transition-colors duration-200 mb-2"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href={"/auth/register"}>
                    <Button
                      onClick={handleCloseMenu}
                      className="block bg-blue-50 text-black hover:bg-blue-100 transition-colors duration-200"
                    >
                      Register
                    </Button>
                  </Link>
                </>
              ) : (
                <p className="bg-[#f0f7ba] text-black rounded-lg px-0.5 font-bold">
                  Hello {user.name}
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
