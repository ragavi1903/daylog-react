import "./AnalyticsFilter.css";

function AnalyticsFilter({ filter, setFilter }) {

  const filters = [
    "Today",
    "This Week",
    "This Month",
    "Last 30 Days",
  ];

  return (

    <div className="analytics-filter">

      {filters.map((item) => (

        <button
          key={item}
          className={filter === item ? "active" : ""}
          onClick={() => setFilter(item)}
        >
          {item}
        </button>

      ))}

    </div>

  );

}

export default AnalyticsFilter;