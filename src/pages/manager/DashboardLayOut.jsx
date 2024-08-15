// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import SideBar from "./inc/SideBar";
import { Outlet } from "react-router-dom";

const DashboardLayOut = () => {
  
  return (
    <div className="bg-success p-4 my-4">
      <div className="row">
      <div className="col-12 col-md-3 col-xl-5 px-sm-2 px-0 bg-dark">
          <SideBar />
        </div>
        <div className="col-12 col-md-9 col-xl-7 mt-2 mt-xl-9 mt-md-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayOut;
