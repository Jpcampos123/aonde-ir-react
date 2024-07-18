"use client";
import { AuthContext } from "@/app/contexts/AuthContext";
import Link from "next/link";
import { useContext } from "react";
import { FaRegSmileWink } from "react-icons/fa";
import { IoMdHome, IoMdSearch } from "react-icons/io";

const Navigation = () => {
  const { user } = useContext(AuthContext);

  if (!user) return;

  return (
    <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 mt-5">
      <ul className="flex justify-around  py-1 text-red-500">
        <li className="flex flex-col items-center ">
          <Link href="/" className="flex flex-col items-center ">
            <IoMdHome size={24} />
            <span className="text-sm">Home</span>
          </Link>
        </li>
        <li className="flex flex-col items-center p-1">
          <Link href="/pages/Favorites" className="flex flex-col items-center">
            <IoMdSearch size={24} />
            <span className="text-sm">Favorites</span>
          </Link>
        </li>
        <li className="flex flex-col items-center p-1">
          <Link href="/pages/Profile" className="flex flex-col items-center">
            <FaRegSmileWink size={24} />
            <span className="text-sm">Profile</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
