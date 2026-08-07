import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaChartPie,
  FaHistory,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import "./Sidebar.css";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

function logout() {

  localStorage.removeItem("daylog_user");

  navigate("/login");

}
  return (
    <aside className="sidebar">

      <div className="logo">

        <h2>Daylog</h2>

      </div>

      <nav>

        <NavLink to="/" end>
          <FaHome />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/analytics">
          <FaChartPie />
          <span>Analytics</span>
        </NavLink>

        <NavLink to="/history">
          <FaHistory />
          <span>History</span>
        </NavLink>

        <NavLink to="/settings">
          <FaCog />
          <span>Settings</span>
        </NavLink>

      </nav>

     <button type="button" className="logout-btn" onClick={logout}>
    <FaSignOutAlt />
    <span>Logout</span>
</button>

    </aside>
  );
}

export default Sidebar;