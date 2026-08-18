import "./SettingsPage.css";
import useLocalStorage from "../hooks/useLocalStorage";
import { STORAGE_KEY } from "../utils/constants";
// import { useState, useEffect } from "react";
import { exportDaylogReport } from "../utils/exportPdf";

function SettingsPage({ darkMode, setDarkMode }) {
  const [history, setHistory] = useLocalStorage("daylog_history", []);
  const [entries, setEntries] = useLocalStorage(STORAGE_KEY, []);



  function exportData() {

  const dataStr = JSON.stringify(history, null, 2);

  const blob = new Blob([dataStr], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;

  link.download = "daylog-history.json";

  link.click();

  URL.revokeObjectURL(url);

}


function clearData() {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete all your DayLog data?"
  );

  if (!confirmDelete) return;

  setHistory([]);
  setEntries([]);

  localStorage.removeItem("daylog_history");
  localStorage.removeItem("daylog_entries");

  alert("All data has been deleted.");

}


  return (
    <div className="settings-page">

      <h1>Settings</h1>

      <div className="settings-card">

<div className="settings-card">
  <h2>Appearance</h2>

  <button
    className="settings-btn"
    onClick={() => setDarkMode(!darkMode)}
  >
    {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
  </button>
</div>

      </div>

      <div className="settings-card">

        <h2>Data</h2>

      <button
    className="settings-btn"
    onClick={() => exportDaylogReport(history)}
>
    📤Export PDF Report
</button>
        

        <button
        className="danger-btn"
        onClick={clearData}
      >
        🗑 Clear All Data
      </button>

      </div>

      <div className="settings-card">

        <h2>About</h2>

        <p><strong>DayLog</strong></p>

        <p>Version 1.0</p>

        <p>Daily Productivity Tracker</p>

      </div>

    </div>
  );
}

export default SettingsPage;