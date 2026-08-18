import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Layout from "./components/Layout/Layout";
import Login from "./pages/Login/Login";
import DashboardPage from "./pages/DashboardPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import HistoryPage from "./pages/HistoryPage";
import SettingsPage from "./pages/SettingsPage";

import useClock from "./hooks/useClock";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

function App() {

  const currentTime = useClock();


  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  function enableReminder() {
    alert("Reminder feature coming soon!");
  }

  return (

    <BrowserRouter>

      <Routes>

        {/* Login Page (No Sidebar) */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Pages with Sidebar */}
       <Route
  element={
    <ProtectedRoute>
      <Layout
        currentTime={currentTime}
        onReminder={enableReminder}
      />
    </ProtectedRoute>
  }
>

          <Route
            path="/"
            element={<DashboardPage />}
          />

          <Route
            path="/analytics"
            element={<AnalyticsPage />}
          />

          <Route
            path="/history"
            element={<HistoryPage />}
          />

                    <Route
            path="/settings"
            element={
              <SettingsPage
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            }
          />

        </Route>


      </Routes>

    </BrowserRouter>

  );
}

export default App;
