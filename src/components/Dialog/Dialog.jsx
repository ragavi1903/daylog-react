import { useState, useEffect} from "react";
import "./Dialog.css";
import { motion } from "framer-motion";


function Dialog({
    isOpen,
    onClose,
    onSave,
    editingEntry
}) {

  const [activity, setActivity] = useState("");
  const [category, setCategory] = useState("Study");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
//   const [mood, setMood] = useState("😊");
const [productivity, setProductivity] = useState(3);
// const [notes, setNotes] = useState("");
useEffect(() => {
  if (editingEntry) {
    setActivity(editingEntry.activity);
    setCategory(editingEntry.category);
    setStart(editingEntry.start);
    setEnd(editingEntry.end);
    setProductivity(editingEntry.productivity || 3);
  } else {
    setActivity("");
    setCategory("Study");
    setStart("");
    setEnd("");
  }
}, [editingEntry]);

  if (!isOpen) return null;

function handleSubmit(e) {
  e.preventDefault();

  if (!activity || !start || !end) {
    alert("Please fill all fields.");
    return;
  }

  // Calculate duration automatically
  const startTime = new Date(`1970-01-01T${start}`);
  const endTime = new Date(`1970-01-01T${end}`);

  const duration = Math.max(
    0,
    Math.floor((endTime - startTime) / 60000)
  );

  // Create entry object
  const newEntry = {
    id: editingEntry ? editingEntry.id : Date.now(),

    activity,
    category,

    start,
    end,

    duration,

    // mood,
    productivity,
    // notes,

    createdAt: new Date().toISOString(),
  };

  onSave(newEntry);

  // Clear form
  setActivity("");
  setCategory("Study");
  setStart("");
  setEnd("");
  // setMood("😊");
  setProductivity(3);
  // setNotes("");

  onClose();
}

  return (
    <div className="dialog-overlay">
        <motion.div
      className="dialog"
      initial={{
          opacity: 0,
          scale: 0.8
      }}
      animate={{
          opacity: 1,
          scale: 1
      }}
      transition={{
          duration: 0.3
      }}>

      <div className="dialog-header">
         <h2>
          {editingEntry ? "Edit Entry" : "Add New Entry"}
          </h2>

          <button onClick={onClose}>
            ✖
          </button>
        </div>

        <form onSubmit={handleSubmit}>

          <label>Activity</label>

          <input
            type="text"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            placeholder="Example: Studied React"
          />

          <label>Category</label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Study</option>
            <option>Work</option>
            <option>Exercise</option>
            <option>Sleep</option>
            <option>Personal</option>
            <option>Other</option>
          </select>

          <label>Start Time</label>

          <input
            type="time"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />

          <label>End Time</label>

          <input
            type="time"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />

          {/* <label>Mood</label> */}

          {/* { <div className="moods">

           {["😊","😐","😫","😴"].map((emoji)=>(

            <button
            type="button"
            key={emoji}
            className={mood===emoji ? "mood active":"mood"}
            onClick={()=>setMood(emoji)}
          >
            {emoji}
          </button>

              ))}

            </div> */}

            <label>Productivity</label>

              <div className="stars">

                {[1,2,3,4,5].map((star)=>(

                    <span
                      key={star}
                      className={productivity>=star ? "star active":"star"}
                      onClick={()=>setProductivity(star)}
                    >
                      ★
                    </span>

                  ))}

              </div>
                    {/* 
                    <label>Notes</label>

                    <textarea
                      rows="3"
                      value={notes}
                      onChange={(e)=>setNotes(e.target.value)}
                      placeholder="Write today's notes..."
                    />  */}
                      <button
                          className="save-btn"
                          type="submit"
                      >
                          {editingEntry ? "Update Entry" : "Save Entry"}
                      </button>

        </form>

      </motion.div>

  </div>
  );
}

export default Dialog;