// libs.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useRef } from "react";

export {
  React,
  useDispatch,
  useSelector,
  useNavigate,
  useLocation,
  useEffect,
  useState,
  useParams,
  NavLink,
  Navigate,
  useRef,

  
};

//Routes
import { Route, Routes } from "react-router-dom";

export {
  Route,
  Routes
}

//Api and toaster 
import { Toaster } from "react-hot-toast";
import axios from "axios";
import toast from "react-hot-toast";

export {
  Outlet,
  Toaster,
  toast,
  axios,
  
}

//Auth
import Login from "@/Auth/Login";
import Register from "@/Auth/Register";

export {
  Login, Register
}

import { useGetLoggedInUser } from "../hooks/useGetLoggedInUser";
import { useGetAllPlaylists } from "@/hooks/useGetAllPlaylists";
import { useToggleLikeOrDislike } from "../hooks/useToggleLikeOrDislike"
import { useGetAllMusics } from "../hooks/useGetAllMusics";
export {
  useGetLoggedInUser,
  useGetAllPlaylists,
 useToggleLikeOrDislike,
  useGetAllMusics
}


//pages
import LikedPlayList from "@/pages/Playlist/LikedPlayList";
import PlaylistViewer from "@/pages/Playlist/PlaylistViewer";
import Section from "@/pages/Section/Section";


export {
  LikedPlayList,
  PlaylistViewer,
  Section,
}




//components
import Sidebar from "@/Layouts/components/Sidebar";
import RightSideBar from "@/Layouts/components/RightSideBar";
import MusicPlayer from "@/Layouts/components/MusicPlayer";
import Navbar from "@/Layouts/components/Navbar";

export {
  Sidebar,
  RightSideBar,
  MusicPlayer,
  Navbar
  
}

//layouts
import MainLayout from "@/Layouts/MainLayout";

export{
  MainLayout
}



import logo from "../assets/background.jpg"
export {

  logo
}