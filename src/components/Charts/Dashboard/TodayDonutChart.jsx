import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "./TodayDonutChart.css";

const COLORS = [
  "#2563EB", // Study
  "#16A34A", // Work
  "#F59E0B", // Exercise
  "#EC4899", // Personal
  "#8B5CF6", // Sleep
  "#6B7280", // Other
];

function TodayDonutChart({ entries }) {

  const totals = {};

  entries.forEach((entry) => {
    totals[entry.category] =
      (totals[entry.category] || 0) + entry.duration;
  });

  const data = Object.keys(totals).map((category) => ({
    name: category,
    value: totals[category],
  }));

  return (

    <div className="today-chart">

      <div className="chart-left">

        <h2>Today's Distribution</h2>

        {data.length === 0 ? (

          <p>No activities today.</p>

        ) : (

          <ResponsiveContainer width="100%" height={320}>

            <PieChart>

              <Pie
                data={data}
                innerRadius={70}
                outerRadius={110}
                paddingAngle={4}
                dataKey="value"
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

        )}

      </div>

      <div className="chart-right">

        <h3>Today's Summary</h3>

        {data.map((item, index) => (

          <div
            key={index}
            className="summary-item"
          >

            <span
              className="dot"
              style={{
                background: COLORS[index % COLORS.length],
              }}
            />

            <span>{item.name}</span>

            <strong>{item.value} min</strong>

          </div>

        ))}

      </div>

    </div>

  );

}

export default TodayDonutChart;