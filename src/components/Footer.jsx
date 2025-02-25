import React from 'react'
import {  FaGlobe } from "react-icons/fa";
import { NavLink } from 'react-router-dom';

const Footer = ({isOpen}) => {
  return (
    <>

     <div className={`mt-3 text-sm text-gray-500 flex flex-wrap gap-3 ${isOpen ? "block" : "hidden"}`}>
          <NavLink to={"/"} className="hover:underline">Legal</NavLink>
          <NavLink to={"/"} className="hover:underline">Safety & Privacy Center</NavLink>
          <NavLink to={"/"} className="hover:underline">Privacy Policy</NavLink>
          <NavLink to={"/"} className="hover:underline">Cookies</NavLink>
          <NavLink to={"/"} className="hover:underline">About Ads</NavLink>
          <NavLink to={"/"} className="hover:underline">Accessibility</NavLink>
        </div>
        
        <button className={`mt-3 w-[40%] flex items-center gap-2 text-white border border-gray-600 px-4 py-2 rounded-full hover:bg-gray-800 transition ${isOpen ? "block" : "hidden"}`}>
          <FaGlobe className="text-lg" /> English
        </button>
   </>
  )
}

export default Footer
