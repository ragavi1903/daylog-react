import { BrowserRouter, Routes, Route } from "react-router-dom";

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
            element={<SettingsPage />}
          />

        </Route>

      </Routes>

    </BrowserRouter>

  );
}

export default App;
