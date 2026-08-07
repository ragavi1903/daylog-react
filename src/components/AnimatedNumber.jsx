import { useEffect, useState } from "react";

function AnimatedNumber({
  value,
  duration = 1500,
  decimals = 0,
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;

    const increment = value / (duration / 16);

    const timer = setInterval(() => {

      start += increment;

      if (start >= value) {

        start = value;

        clearInterval(timer);

      }

      setDisplay(start);

    },16);

    return () => clearInterval(timer);

  }, [value, duration]);

  return <>{display.toFixed(decimals)}</>;
}

export default AnimatedNumber;