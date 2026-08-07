export default function filterHistory(history, filter) {

  const today = new Date();

  // console.log("Today:", today);

  return history.filter((day) => {

    // console.log("Original Date:", day.date);

    const [d, m, y] = day.date.split("/");

    const date = new Date(
      Number(y),
      Number(m) - 1,
      Number(d)
    );

    // console.log("Converted Date:", date);

    switch (filter) {

      case "Today":
        return date.toDateString() === today.toDateString();

      case "This Week": {

        const diff =
          (today - date) / (1000 * 60 * 60 * 24);

        // console.log(day.date, "Diff =", diff);

        return diff >= 0 && diff <= 7;
      }

      case "This Month":
        return (
          date.getMonth() === today.getMonth() &&
          date.getFullYear() === today.getFullYear()
        );

      case "Last 30 Days": {

        const diff =
          (today - date) / (1000 * 60 * 60 * 24);

        return diff >= 0 && diff <= 30;
      }

      default:
        return true;
    }

  });

}