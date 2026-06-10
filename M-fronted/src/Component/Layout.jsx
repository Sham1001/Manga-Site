import React from "react";
import { Outlet } from "react-router-dom";
import Spline from "@splinetool/react-spline";

const Layout = () => {
  return (
    <div className="relative min-h-screen bg-gray-900 text-white">
     
      <div className="absolute inset-0 -z-10">
        <Spline scene="https://prod.spline.design/qWOw1U7GFckTHXgS/scene.splinecode" />
      </div>
      <div className="relative z-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
