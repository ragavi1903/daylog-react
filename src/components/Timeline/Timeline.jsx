import "./Timeline.css";
import TimelineItem from "./TimelineItem";

function Timeline({
    entries,
    onDelete,
    onEdit,
    onFinish
}){
  return (
    <section className="timeline">

      <div className="timeline-header">

        <div>
          <p className="timeline-subtitle">
            YOUR ACTIVITY LOG
          </p>

          <h2>Today's Routine</h2>
        </div>

        <button
    className="finish-btn"
    onClick={onFinish}
>
    Finish Today
</button>

      </div>

      <div className="timeline-list">

        {entries.length === 0 ? (

          <div className="empty-timeline">

            <div className="clock-icon">🕒</div>

            <h3>Your timeline is waiting</h3>

            <p>Log what you did in the last hour to begin.</p>

          </div>

        ) : (

         entries.map((entry) => (
          <TimelineItem
    key={entry.id}
    entry={entry}
    onDelete={onDelete}
    onEdit={onEdit}
/>
))

        )}

      </div>

    </section>
  );
}

export default Timeline;