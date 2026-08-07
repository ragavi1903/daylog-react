import {useMemo, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import "./HistoryPage.css";
import "./Calender.css";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";


function HistoryPage() {
  const [history] = useLocalStorage("daylog_history", []);
  const [expandedDay, setExpandedDay] = useState(null);
  const [search, setSearch] = useState("");
const [category, setCategory] = useState("All");
  const [selectedDate, setSelectedDate] = useState(null);

  function toggleDay(index) {
    setExpandedDay(expandedDay === index ? null : index);
  }

  if (history.length === 0) {
    return (
      <div className="history-page">
        <h1>History</h1>
        <p>No history available yet.</p>
      </div>
    );
  }

  const displayedHistory = selectedDate
  ? history.filter(
      (day) =>
        day.date === selectedDate.toLocaleDateString()
    )
  : history;

  const filteredHistory = useMemo(() => {

  return history
    .map(day => ({

      ...day,

      entries: (day.entries || []).filter(entry => {

        const matchSearch =
          entry.activity
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchCategory =
          category === "All" ||
          entry.category === category;

        return matchSearch && matchCategory;

      })

    }))
    .filter(day => day.entries.length > 0);

}, [history, search, category]);

const totalDays = history.length;

const totalHours = history.reduce((sum, day) => {

  const minutes = (day.entries || []).reduce(
    (s, entry) => s + (entry.duration || 0),
    0
  );

  return sum + minutes;

}, 0);

const totalActivities = history.reduce(
  (sum, day) => sum + (day.entries || []).length,
  0
);

const averageHours =
  totalDays > 0
    ? (totalHours / 60 / totalDays).toFixed(1)
    : 0;

  return (
    <div className="history-page">
      <div className="history-header">
  <div>
    <p className="history-subtitle">YOUR DAILY JOURNEY</p>
    <h1>History</h1>
    <div className="history-overview">

  <div className="overview-card">
    <h3>📅 Days Logged</h3>
    <h2>{totalDays}</h2>
  </div>

  <div className="overview-card">
    <h3>⏱ Total Hours</h3>
    <h2>{(totalHours / 60).toFixed(1)}</h2>
  </div>

  <div className="overview-card">
    <h3>📝 Activities</h3>
    <h2>{totalActivities}</h2>
  </div>

  <div className="overview-card">
    <h3>📊 Avg Hours/Day</h3>
    <h2>{averageHours}</h2>
  </div>

</div>
    <div className="history-toolbar">

  <input
    type="text"
    placeholder="Search activity..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
  >
    <option>All</option>
    <option>Study</option>
    <option>Work</option>
    <option>Exercise</option>
    <option>Sleep</option>
    <option>Personal</option>
    <option>Other</option>
  </select>

</div>
  </div>
</div>
      <Calendar
      onChange={setSelectedDate}
      value={selectedDate}
    />

      {filteredHistory
        .slice()
        .reverse()
        .map((day, index) => {
          const totalMinutes = (day.entries || []).reduce(
            (sum, entry) => sum + (entry.duration || 0),
            0
          );

          const totalActivities = (day.entries || []).length;

          const avgProductivity =
            totalActivities > 0
              ? (
                  (day.entries || []).reduce(
                    (sum, entry) => sum + (entry.productivity || 0),
                    0
                  ) / totalActivities
                ).toFixed(1)
              : "0";

          return (
            <div
              key={`${day.date}-${index}`}
              className="history-card"
            >
              <div className="history-card-header">
              <h2>📅 {day.date}</h2>
            </div>

            <div className="history-summary">

              <div className="summary-box">
                <span>Activities</span>
                <h3>{totalActivities}</h3>
              </div>

              <div className="summary-box">
                <span>Total Hours</span>
                <h3>{(totalMinutes / 60).toFixed(1)} hrs</h3>
              </div>

              <div className="summary-box">
                <span>Productivity</span>
                <h3>{avgProductivity}/5</h3>
              </div>

              </div>

              <button
                className="view-btn"
                onClick={() => toggleDay(index)}
              >
                {expandedDay === index
                  ? "Hide Details ▲"
                  : "View Details ▼"}
              </button>

              {expandedDay === index && (
                <div className="history-details">
  {(day.entries || []).map((entry) => (
    <div
      key={entry.id}
      className="entry-card"
    >

      <h3>{entry.activity}</h3>

      <div className="entry-time">
        🕒 {entry.start} - {entry.end}
      </div>

      <div className="entry-tags">

        <span className="tag category">
          📂 {entry.category}
        </span>

        <span className="tag duration">
          ⏱ {(entry.duration / 60).toFixed(1)} hrs
        </span>

        <span className="tag productivity">
          ⭐ {entry.productivity || 0}/5
        </span>

      </div>

    </div>
  ))}
</div>
              )}
            </div>
          );
        })}
    </div>
  );
}

export default HistoryPage;