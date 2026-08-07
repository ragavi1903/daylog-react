import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#4F46E5", // Study
  "#10B981", // Work
  "#F59E0B", // Exercise
  "#8B5CF6", // Sleep
  "#06B6D4", // Personal
  "#94A3B8", // Other
];

function CategoryDonutChart({ history }) {

  const totals = {};

  history.forEach((day) => {
    day.entries.forEach((entry) => {
      totals[entry.category] =
        (totals[entry.category] || 0) + (entry.duration || 0);
    });
  });

  const data = Object.keys(totals).map((category) => ({
    name: category,
    value: totals[category],
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>

        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={70}
          outerRadius={110}
        >
          {data.map((item, index) => (
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>

        <Tooltip />

      </PieChart>
    </ResponsiveContainer>
  );
}

export default CategoryDonutChart;