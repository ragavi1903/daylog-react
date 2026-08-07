import { createContext, useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { STORAGE_KEY } from "../utils/constants";

const DayLogContext = createContext();

export function DayLogProvider({ children }) {

  const [entries, setEntries] = useLocalStorage(STORAGE_KEY, []);

  const [history, setHistory] = useLocalStorage("daylog_history", []);

const [user, setUser] = useState(() => {
  const saved = localStorage.getItem("daylog_user");
  return saved ? JSON.parse(saved) : null;
});

  function saveEntry(entry) {

    setEntries((prev) => [...prev, entry]);

  }

  function deleteEntry(id) {

    setEntries((prev) =>
      prev.filter((item) => item.id !== id)
    );

  }

  function finishToday() {

    if (entries.length === 0) return;

    const today = {

      date: new Date().toLocaleDateString(),

      entries,

    };

    setHistory((prev) => [...prev, today]);

    setEntries([]);

  }

  return (

    <DayLogContext.Provider
      value={{
        entries,
        history,
        saveEntry,
        deleteEntry,
        finishToday,
        user,
        setUser,
      }}
    >

      {children}

    </DayLogContext.Provider>

  );

}

export function useDayLog() {

  return useContext(DayLogContext);

}