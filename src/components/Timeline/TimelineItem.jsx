import "./Timeline.css";
import { motion } from "framer-motion";

function TimelineItem({ entry, onDelete, onEdit }) {
  return (
    <motion.div
    className="timeline-item"
    initial={{
        opacity: 0,
        x: -40
    }}
    animate={{
        opacity: 1,
        x: 0
    }}
    transition={{
        duration: 0.4
    }}
    whileHover={{
        scale: 1.02
    }}
>

      {/* Time */}
      <div className="time">
        🕒 {entry.start} - {entry.end}
      </div>

      {/* Activity */}
      <div className="activity">

        <div className="dot"></div>

        <div>

          <h3>{entry.activity}</h3>

          <span className="category-badge">
            📂 {entry.category}
          </span>

          <p className="duration">
            ⏱ {(entry.duration / 60).toFixed(1)} hrs
          </p>

          <p className="productivity">
            ⭐ {"★".repeat(entry.productivity || 0)}
            {"☆".repeat(5 - (entry.productivity || 0))}
          </p>

        </div>

      </div>

      {/* Buttons */}
      <div className="actions">

        <button
          className="edit-btn"
          onClick={() => onEdit(entry)}
        >
          ✏ Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(entry.id)}
        >
          🗑 Delete
        </button>

      </div>

    </motion.div>
  );
}

export default TimelineItem;