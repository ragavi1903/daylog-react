import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function CategoryBarChart({ history }) {

  // console.log("History received:", history);

  const totals = {};

  history.forEach((day) => {
    day.entries.forEach((entry) => {
      totals[entry.category] =
        (totals[entry.category] || 0) + (entry.duration || 0);
    });
  });

  const data = Object.keys(totals).map((category) => ({
    category,
    hours: +(totals[category] / 60).toFixed(1),
  }));

  // console.log("Chart Data:", data);

  return (
    <div style={{ width: "100%", height: "350px" }}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="hours" fill="#2563EB" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CategoryBarChart;