import "./Header.css";

function Header({ currentTime, onHistory, onReminder }) {

  return (
    <header className="header">

      <div className="logo">

        <h2>Daylog</h2>

      </div>

      <div className="header-right">

        <span className="clock">

          {currentTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}

        </span>

        <button
          className="secondary-btn"
          onClick={onHistory}
        >
          View History
        </button>

        <button
  className="primary-btn"
  onClick={onReminder}
>
  Enable Reminders
</button>

      </div>

    </header>
  );
}

export default Header;