import React from "react";
import { assets } from "../assets/admin_assets/assets.js";
import { Link } from "react-router-dom";

const Navbar = ({setToken}) => {
  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <img src={assets.logoS} alt="Logo" className="w-[15%] max-w-[150px]" />
      <button onClick={() => setToken("")} type="button" className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm cursor-pointer">Logout</button>
    </div>
  )
}

export default Navbar