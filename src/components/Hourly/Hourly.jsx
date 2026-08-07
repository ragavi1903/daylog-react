import "./Hourly.css";

function Hourly({ onOpen }) {
  return (
    <section className="hourly">

      <div className="hourly-left">

        <div className="icon">
          ✦
        </div>

        <div>

          <p className="hourly-title">
            HOURLY UPDATE
          </p>

          <h2>
            How did you spend the last hour?
          </h2>

          <p className="hourly-text">
            Add a quick, honest entry — it only takes a moment.
          </p>

        </div>

      </div>

      <button
        className="log-button"
        onClick={onOpen}
      >
        Log this hour →
      </button>

    </section>
  );
}

export default Hourly;