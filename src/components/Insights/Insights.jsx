function Insights({ history }) {
  let totalMinutes = 0;
  let totalActivities = 0;

  const categoryTotals = {};
  let longestActivity = null;

  history.forEach((day) => {
    day.entries.forEach((entry) => {
      totalMinutes += entry.duration || 0;
      totalActivities++;

      // Category totals
      categoryTotals[entry.category] =
        (categoryTotals[entry.category] || 0) +
        (entry.duration || 0);

      // Longest activity
      if (
        !longestActivity ||
        entry.duration > longestActivity.duration
      ) {
        longestActivity = entry;
      }
    });
  });

  const totalHours = (totalMinutes / 60).toFixed(1);

  const averageSession =
    totalActivities > 0
      ? (totalMinutes / totalActivities).toFixed(0)
      : 0;

  let topCategory = "-";
  let max = 0;

  Object.keys(categoryTotals).forEach((category) => {
    if (categoryTotals[category] > max) {
      max = categoryTotals[category];
      topCategory = category;
    }
  });

  return (
    <div className="insights-list">

      <p>⏱ <strong>Total Hours:</strong> {totalHours} hrs</p>

      <p>📝 <strong>Total Activities:</strong> {totalActivities}</p>

      <p>📂 <strong>Most Used Category:</strong> {topCategory}</p>

      <p>
        🚀 <strong>Longest Activity:</strong>{" "}
        {longestActivity
          ? `${longestActivity.activity} (${longestActivity.duration} mins)`
          : "-"}
      </p>

      <p>
        📊 <strong>Average Session:</strong> {averageSession} mins
      </p>

    </div>
  );
}

export default Insights;