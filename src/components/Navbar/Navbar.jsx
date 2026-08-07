import "./Navbar.css";
import { FaBell, FaClock, FaUserCircle } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar({ currentTime, onReminder }) {
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);

const navigate = useNavigate();

const user = JSON.parse(localStorage.getItem("daylog_user"));


useEffect(() => {

  function handleClickOutside(event) {

    if (
      profileRef.current &&
      !profileRef.current.contains(event.target)
    ) {
      setShowProfile(false);
    }

  }

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };

}, []);

  return (
    <header className="top-navbar">

      <div>
        <h2>Welcome 👋</h2>
        <p>Track your day honestly.</p>
      </div>

      <div className="nav-right">

        <button
          className="reminder-btn"
          onClick={onReminder}
        >
          <FaBell />
          Reminder
        </button>

        <div className="clock">
    <FaClock />
    {currentTime instanceof Date
        ? currentTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        : currentTime}
</div>

       <div
  className="profile"
  ref={profileRef}
>

 <div
  className="profile-avatar"
  onClick={() => setShowProfile(!showProfile)}
>
  {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
</div>

  {showProfile && (
    <div className="profile-dropdown">

      <div className="profile-header">
        <strong>{user?.name || "User"}</strong>
        <p>{user?.email || "No Email"}</p>
      </div>

      <hr />

      <button
        onClick={() => {
          navigate("/settings");
          setShowProfile(false);
        }}
      >
        ⚙ Settings
      </button>

      <button
        onClick={() => {
          localStorage.removeItem("daylog_user");
          navigate("/login");
        }}
      >
        🚪 Logout
      </button>

    </div>
  )}

</div>

      </div>

    </header>
  );
}

export default Navbar;