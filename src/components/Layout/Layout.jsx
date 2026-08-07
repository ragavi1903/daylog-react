import { Outlet } from "react-router-dom";

import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";

import "./Layout.css";

function Layout({ currentTime, onReminder }) {

  return (

    <div className="layout">

      <Sidebar />

      <div className="main-content">

        <Navbar
          currentTime={currentTime}
          onReminder={onReminder}
        />

        <Outlet />

      </div>

    </div>

  );

}

export default Layout;