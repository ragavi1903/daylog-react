import "./Dashboard.css";

function SummaryCard({ category, minutes }) {
  return (

    <div className="summary-card">

      <div className="card-dot"></div>

      <h3>{minutes}</h3>

      <p>{category}</p>

    </div>

  );
}

export default SummaryCard;