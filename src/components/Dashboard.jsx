import React from "react";
import { Outlet } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const Dashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col p-0 m-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
