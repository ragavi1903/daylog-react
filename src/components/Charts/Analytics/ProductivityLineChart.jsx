import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function ProductivityLineChart({ history }) {

  const data = history.map((day) => {

    const avg =
      day.entries.length > 0
        ? (
            day.entries.reduce(
              (sum, item) => sum + (item.productivity || 0),
              0
            ) / day.entries.length
          ).toFixed(1)
        : 0;

    return {
      date: day.date,
      productivity: Number(avg),
    };

  });

  return (
    <ResponsiveContainer width="100%" height={300}>

      <LineChart data={data}>

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="date" />

        <YAxis domain={[0, 5]} />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="productivity"
          stroke="#10B981"
          strokeWidth={3}
        />

      </LineChart>

    </ResponsiveContainer>
  );
}

export default ProductivityLineChart;