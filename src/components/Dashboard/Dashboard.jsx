import "./Dashboard.css";
import { getDuration, formatDuration } from "../../utils/helpers";
import SummaryCard from "./SummaryCard";

function Dashboard({ entries, onOpen }) {

  // Calculate total time for each category
  const categoryTotals = {};

  entries.forEach((entry) => {
    const minutes = getDuration(entry.start, entry.end);

    if (categoryTotals[entry.category]) {
      categoryTotals[entry.category] += minutes;
    } else {
      categoryTotals[entry.category] = minutes;
    }
  });

  return (
    <section className="dashboard">

      <div className="dashboard-header">

        <div>
          <p className="section-title">
            TODAY AT A GLANCE
          </p>

          <h2>Where your time went</h2>
        </div>

        {/* <button
          className="add-btn"
          onClick={onOpen}
        >
          + Add Time
        </button> */}

      </div>

      <div className="summary-grid">

        {Object.keys(categoryTotals).length === 0 ? (

          <div className="empty-summary">
            Your time totals will appear here.
          </div>

        ) : (

         Object.entries(categoryTotals).map(([category, minutes]) => (

  <SummaryCard
      key={category}
      category={category}
      minutes={formatDuration(minutes)}
  />

))

        )}

      </div>
   

    </section>
       
  );
}

export default Dashboard;