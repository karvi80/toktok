import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import useAuthStore from "../store/authStore";
import removeUser from "../store/authStore";

import Logo from "../utils/toktok-logo.png";
import { createOrGetUser } from "../utils";

import { IUser } from "../types"; // Make sure this path is correct and IUser is defined

const Navbar = () => {
  const { userProfile, addUser, removeUser } = useAuthStore() as {
    userProfile: IUser | null;
    addUser: (user: IUser) => void;
    removeUser: () => void;
  };
  const [searchValue, setSearchValue] = useState("");

  const router = useRouter();

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };
  return (
    <div
      className="w-full flex justify-between 
    items-center border-b-2
    border-gray=200 py-2 px-4"
    >
      <Link href="/">
        <div className="w-[100px] md:w=[100px] ">
          <Image
            className="cursor-pointer"
            src="/logo.png"
            alt="toktok"
            layout="responsive"
            width={120}
            height={120}
          />
        </div>
      </Link>

      <div className="relative hidden md:block">
        <form
          onSubmit={handleSearch}
          className="absolute md:static top-10 left-20"
        >
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search accounts and videos"
            className="bg-primary p-3 md:text-md font-medium border-2
            border-gray-100 focus:outline-none focus:border-2 
            focus:border-gray-300 w-[300px] md:w-[350px] rounded-full md:top-0"
          />
          <button
            type="submit"
            className="absolute md:right-5 right-6 top-4 border-1-2 
                      border-gray-300 pl-4 text-2xl text-gray-400"
          >
            <BiSearch />
          </button>
        </form>
      </div>

      <div>
        {userProfile ? (
          <div className="flex gap-5 md:gap-10 items-center">
            <Link href="/Upload">
              <button
                className="border-2 px-2 md:px-4 text-md 
                font-semibold flex items-center gap-2"
              >
                <IoMdAdd className="text-xl" /> {""}
                <span className="hidden md:block">Upload</span>
              </button>
            </Link>
            {userProfile.image && (
              <Link href="">
                <>
                  <Image
                    width={50}
                    height={50}
                    className="rounded-full cursor-pointer"
                    layout="responsive"
                    src={userProfile.image}
                    alt="profile photo"
                  />
                </>
              </Link>
            )}

            <button
              type="button"
              className="px-2"
              onClick={() => {
                googleLogout();
                removeUser();
              }}
            >
              <AiOutlineLogout color="red" fontSize={21} />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => createOrGetUser(response, addUser)}
            onError={() => console.log("Error")}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
