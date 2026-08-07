import "./Overview.css";

function Overview({ entries }) {

  const totalMinutes = entries.reduce(
    (sum, entry) => sum + entry.duration,
    0
  );

  const totalHours = (totalMinutes / 60).toFixed(1);

  const totalActivities = entries.length;

  const categories = {};

  entries.forEach((entry) => {
    categories[entry.category] =
      (categories[entry.category] || 0) + entry.duration;
  });

  let topCategory = "-";

  let max = 0;

  Object.entries(categories).forEach(([category, minutes]) => {
    if (minutes > max) {
      max = minutes;
      topCategory = category;
    }
  });

  const productivity =
    totalMinutes === 0
      ? 0
      : Math.min(
          100,
          Math.round((categories.Study || 0) / totalMinutes * 100)
        );

  return (

    <section className="overview">

      <div className="card">

        <h4>Total Hours</h4>

        <h2>{totalHours} h</h2>

      </div>

      <div className="card">

        <h4>Activities</h4>

        <h2>{totalActivities}</h2>

      </div>

      <div className="card">

        <h4>Top Category</h4>

        <h2>{topCategory}</h2>

      </div>

      <div className="card">

        <h4>Productivity</h4>

        <h2>{productivity}%</h2>

      </div>

    </section>

  );
}

export default Overview;