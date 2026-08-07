import "./Hero.css";
import { getDuration, formatDuration } from "../../utils/helpers";
import { motion } from "framer-motion";

function Hero({ entries }) {

  const totalMinutes = entries.reduce((sum, entry) => {

    return sum + getDuration(entry.start, entry.end);

  }, 0);

  return (

    <motion.section
    className="hero"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
        duration: 0.7
    }}
>

      <div className="hero-left">

        <p className="hero-subtitle">

          DAILY TIME TRACKER

        </p>

        <h1>

          Own Your <span>Time.</span>

        </h1>

        <p>

          Build an honest picture of your day.

          Every hour counts.

        </p>

      </div>

      <div className="hero-card">

        <p>Today's Total</p>

        <h2>

          {formatDuration(totalMinutes)}

        </h2>

        <div className="progress">

          <div

            className="progress-fill"

            style={{

              width: `${(totalMinutes / 1440) * 100}%`

            }}

          ></div>

        </div>

      </div>

    </motion.section>

  );

}

export default Hero;