import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function WeeklyActivityChart({ history }) {
  const weekDays = [
    { day: "Mon", hours: 0 },
    { day: "Tue", hours: 0 },
    { day: "Wed", hours: 0 },
    { day: "Thu", hours: 0 },
    { day: "Fri", hours: 0 },
    { day: "Sat", hours: 0 },
    { day: "Sun", hours: 0 },
  ];

  history.forEach((dayData) => {
    const [d, m, y] = dayData.date.split("/");

    const date = new Date(
      Number(y),
      Number(m) - 1,
      Number(d)
    );

    let index = date.getDay();

    // Convert Sunday-first to Monday-first
    index = index === 0 ? 6 : index - 1;

    const totalMinutes = dayData.entries.reduce(
      (sum, entry) => sum + (entry.duration || 0),
      0
    );

    if (weekDays[index]) {
      weekDays[index].hours += Number(
        (totalMinutes / 60).toFixed(1)
      );
    }
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={weekDays}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="day" />

        <YAxis />

        <Tooltip />

        <Bar
          dataKey="hours"
          fill="#173126"
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default WeeklyActivityChart;