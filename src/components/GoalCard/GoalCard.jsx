import "./GoalCard.css";
import { motion } from "framer-motion";

function GoalCard({ entries , history}) {

  const GOAL = 8; // hours

  const totalMinutes = entries.reduce(
    (sum, entry) => sum + (entry.duration || 0),
    0
  );

  const totalHours = totalMinutes / 60;

  const progress = Math.min(
    (totalHours / GOAL) * 100,
    100
  );
  // Current streak
let streak = 0;

// Copy history and include today if there are entries
const allDays = [...history];

if (entries.length > 0) {
  allDays.push({
    date: new Date().toISOString().split("T")[0],
    entries,
  });
}

// Sort dates
allDays.sort(
  (a, b) => new Date(a.date) - new Date(b.date)
);

// Count streak from newest day backwards
for (let i = allDays.length - 1; i >= 0; i--) {

  const minutes = allDays[i].entries.reduce(
    (sum, e) => sum + (e.duration || 0),
    0
  );

  const hours = minutes / 60;

  if (hours >= GOAL) {
    streak++;
  } else {
    break;
  }
}
let bestStreak = 0;
let tempStreak = 0;

for (const day of allDays) {

  const minutes = day.entries.reduce(
    (sum, entry) => sum + (entry.duration || 0),
    0
  );

  const hours = minutes / 60;

  if (hours >= GOAL) {

    tempStreak++;

    if (tempStreak > bestStreak) {
      bestStreak = tempStreak;
    }

  } else {

    tempStreak = 0;

  }

}

  return (

    <motion.section
    className="goal-card"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.6 }}
>

      <div className="goal-header">

        <div>

          <p className="goal-subtitle">
            DAILY GOAL
          </p>

          <h2>🎯 8 Hour Challenge</h2>

        </div>

        <span className="goal-percent">
          {progress.toFixed(0)}%
        </span>

      </div>

      <div className="progress">

        <div
          className="progress-fill"
          style={{
            width: `${progress}%`,
          }}
        ></div>

      </div>

      <p className="goal-text">

        {totalHours.toFixed(1)} / {GOAL} Hours Completed

      </p>
      <h3 className="streak">
  🔥 Current Streak : {streak} day{streak !== 1 ? "s" : ""}
</h3>
          <h3 className="best-streak">
  🏆 Best Streak : {bestStreak} day{bestStreak !== 1 ? "s" : ""}
</h3>

    </motion.section>

  );

}

export default GoalCard;