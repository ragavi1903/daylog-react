import "./Achievements.css";
import { motion } from "framer-motion";

function Achievements({ history }) {

  const allEntries = history.flatMap(day => day.entries || []);

  const totalHours =
    allEntries.reduce(
      (sum, entry) => sum + (entry.duration || 0),
      0
    ) / 60;

  const studyHours =
    allEntries
      .filter(e => e.category === "Study")
      .reduce((sum, e) => sum + (e.duration || 0), 0) / 60;

  const exerciseSessions =
    allEntries.filter(
      e => e.category === "Exercise"
    ).length;

  const badges = [

    {
      title: "🌱 First Entry",
      unlocked: allEntries.length >= 1
    },

    {
      title: "⏱ 10 Hours Logged",
      unlocked: totalHours >= 10
    },

    {
      title: "📚 Study Master",
      unlocked: studyHours >= 50
    },

    {
      title: "💪 Fitness Enthusiast",
      unlocked: exerciseSessions >= 20
    },

    {
      title: "🎯 Goal Achiever",
      unlocked: history.length >= 7
    }

  ];

  return (

    <section className="achievements">

      <h2>🏅 Achievements</h2>

      <div className="badge-grid">

        {badges.map((badge) => (

                  <motion.div
            key={badge.title}
            className={
                badge.unlocked
                    ? "badge unlocked"
                    : "badge locked"
            }
            whileHover={{
                scale: 1.05
            }}
            initial={{
                opacity: 0,
                y: 20
            }}
            whileInView={{
                opacity: 1,
                y: 0
            }}
            transition={{
                duration: 0.4
            }}
>

            <div className="badge-left">
              <h3>{badge.title}</h3>
            </div>

            <div className="badge-right">
              {badge.unlocked ? "✅" : "🔒"}
            </div>

          </motion.div>

        ))}

      </div>

    </section>

  );

}

export default Achievements;