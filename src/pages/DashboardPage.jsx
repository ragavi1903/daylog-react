import { useState } from "react";

import Hero from "../components/Hero/Hero";
import Hourly from "../components/Hourly/Hourly";

import Timeline from "../components/Timeline/Timeline";
import Dialog from "../components/Dialog/Dialog";
// import HistoryDialog from "../components/History/HistoryDialog";
import Toast from "../components/Toast/Toast";

import useLocalStorage from "../hooks/useLocalStorage";
import { STORAGE_KEY } from "../utils/constants";

import TodayDonutChart from "../components/Charts/Dashboard/TodayDonutChart";
import Stats from "../components/Stats/Stats";
import "../pages/DashboardPage.css";
import WeeklySummary from "../components/WeeklySummary/WeeklySummary";
import GoalCard from "../components/GoalCard/GoalCard";
import Achievements from "../components/Achievements/Achievements";

function DashboardPage() {

  const [entries, setEntries] = useLocalStorage(STORAGE_KEY, []);

  const [history, setHistory] = useLocalStorage("daylog_history", []);

  const [showDialog, setShowDialog] = useState(false);

  const [editingEntry, setEditingEntry] = useState(null);

//   const [showHistory, setShowHistory] = useState(false);

  const [toast, setToast] = useState("");

  function showToast(text) {
    setToast(text);

    setTimeout(() => {
      setToast("");
    }, 2500);
  }

  function saveEntry(entry) {

    if (editingEntry) {

      const updated = entries.map((item) =>
        item.id === editingEntry.id ? entry : item
      );

      setEntries(updated);

      setEditingEntry(null);

    } else {

      setEntries([...entries, entry]);

    }

    setShowDialog(false);

    showToast("Entry Saved Successfully");
  }

  function deleteEntry(id) {

    const updated = entries.filter((entry) => entry.id !== id);

    setEntries(updated);

    showToast("Entry Deleted Successfully");
  }

  function finishToday() {

    if (entries.length === 0) {

      alert("No entries to save.");

      return;

    }

 const today = new Date().toISOString().split("T")[0];

    const day = {

      date: today,

      entries

    };

    setHistory([...history, day]);

    setEntries([]);

    showToast("Day Finished Successfully");

  }

  return (
    <>

      <Hero entries={entries} />
      <GoalCard
    entries={entries}
    history={history}
/>
      <Stats entries={entries} />

<div className="dashboard-charts">

   

    {entries.length > 0 && (
  <TodayDonutChart entries={entries} />
)}
  <WeeklySummary history={history} />
  <Achievements history={history} />
</div>

<Hourly
  onOpen={() => setShowDialog(true)}
/>

     

      <Timeline
        entries={entries}
        onDelete={deleteEntry}
        onEdit={(entry) => {
          setEditingEntry(entry);
          setShowDialog(true);
        }}
        onFinish={finishToday}
      />

      <Dialog
        isOpen={showDialog}
        onClose={() => {
          setShowDialog(false);
          setEditingEntry(null);
        }}
        onSave={saveEntry}
        editingEntry={editingEntry}
      />

      {/* <HistoryDialog
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        history={history}
      /> */}

      <Toast message={toast} />

    </>
  );
}

export default DashboardPage;