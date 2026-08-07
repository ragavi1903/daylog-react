import "./Stats.css";
import { motion } from "framer-motion";
import AnimatedNumber from "../AnimatedNumber";

function Stats({ entries }) {

  // Total time
  const totalMinutes = entries.reduce(
    (sum, item) => sum + (item.duration || 0),
    0
  );

  const totalHours = (totalMinutes / 60).toFixed(1);

  // Average productivity (only count entries that have productivity)
  const productivityEntries = entries.filter(
    (item) => item.productivity !== undefined
  );

  const avgProductivity =
    productivityEntries.length > 0
      ? (
          productivityEntries.reduce(
            (sum, item) => sum + item.productivity,
            0
          ) / productivityEntries.length
        ).toFixed(1)
      : "0.0";

  // Top category
  const categoryCount = {};

  entries.forEach((item) => {
    categoryCount[item.category] =
      (categoryCount[item.category] || 0) + (item.duration || 0);
  });

  let topCategory = "-";
  let highest = 0;

  for (const key in categoryCount) {
    if (categoryCount[key] > highest) {
      highest = categoryCount[key];
      topCategory = key;
    }
  }

  return (
    <div className="stats">

      <motion.div
    className="card"
    whileHover={{
        scale: 1.05
    }}
    initial={{
        opacity: 0,
        y: 20
    }}
    animate={{
        opacity: 1,
        y: 0
    }}
    transition={{
        duration: 0.4
    }}
>
        <h3>
  <span className="card-icon">⏱</span>
  Total Hours
</h3>
      <h2>
  <AnimatedNumber
    value={Number(totalHours)}
    decimals={1}
  />
  h
</h2>
      </motion.div>

            <motion.div
    className="card"
    whileHover={{
        scale: 1.05
    }}
    initial={{
        opacity: 0,
        y: 20
    }}
    animate={{
        opacity: 1,
        y: 0
    }}
    transition={{
        duration: 0.4
    }}
>
        <h3>
        <span className="card-icon">📝</span>
        Activities
      </h3>
       <h2>
  <AnimatedNumber
    value={entries.length}
  />
</h2>
      </motion.div>

            <motion.div
    className="card"
    whileHover={{
        scale: 1.05
    }}
    initial={{
        opacity: 0,
        y: 20
    }}
    animate={{
        opacity: 1,
        y: 0
    }}
    transition={{
        duration: 0.4
    }}
>
        <h3>
          <span className="card-icon">⭐</span>
          Avg Productivity
        </h3>
        <h2>
        <AnimatedNumber
          value={Number(avgProductivity)}
          decimals={1}
        />
        /5
      </h2>
      </motion.div>

            <motion.div
    className="card"
    whileHover={{
        scale: 1.05
    }}
    initial={{
        opacity: 0,
        y: 20
    }}
    animate={{
        opacity: 1,
        y: 0
    }}
    transition={{
        duration: 0.4
    }}
>
        <h3>
          <span className="card-icon">🏆</span>
          Top Category
        </h3>
        <h2>{topCategory}</h2>
      </motion.div>

    </div>
  );
}

export default Stats;