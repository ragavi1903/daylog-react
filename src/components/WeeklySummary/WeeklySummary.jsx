import "./WeeklySummary.css";
import { parseHistoryDate } from "../../utils/helpers";
import { motion } from "framer-motion";

function WeeklySummary({ history }) {

    const last7Days = history.slice(-7);

    let totalMinutes = 0;

    let totalActivities = 0;

    const dayCount = {};

    const categoryCount = {};

    last7Days.forEach(day => {

        totalActivities += day.entries.length;

        day.entries.forEach(entry => {

            totalMinutes += entry.duration || 0;

            categoryCount[entry.category] =
                (categoryCount[entry.category] || 0) + entry.duration;

        });
        // console.log(history);

       const date = parseHistoryDate(day.date);

            const weekday = date
            ? date.toLocaleDateString("en-US", {
                weekday: "long",
                })
            : "-";

        dayCount[weekday] =
            (dayCount[weekday] || 0) + 1;

    });

   

    let topCategory = "-";

    let highestCategory = 0;

    for (const key in categoryCount) {

        if (categoryCount[key] > highestCategory) {

            highestCategory = categoryCount[key];

            topCategory = key;

        }

    }

    let activeDay = "-";

    let highestDay = 0;

    for (const key in dayCount) {

        if (dayCount[key] > highestDay) {

            highestDay = dayCount[key];

            activeDay = key;

        }

    }

    return (

        <motion.div
    className="weekly-summary"
    initial={{
        opacity: 0,
        y: 30
    }}
    whileInView={{
        opacity: 1,
        y: 0
    }}
    transition={{
        duration: 0.5
    }}
>

            <h2>📊 Weekly Summary</h2>

            <div className="summary-grid">

                <div>

                    <h3>Total Hours</h3>

                    <p>{(totalMinutes / 60).toFixed(1)} h</p>

                </div>

                <div>

                    <h3>Activities</h3>

                    <p>{totalActivities}</p>

                </div>

                <div>

                    <h3>Most Active Day</h3>

                    <p>{activeDay}</p>

                </div>

                <div>

                    <h3>Top Category</h3>

                    <p>{topCategory}</p>

                </div>

            </div>

        </motion.div>

    );

}

export default WeeklySummary;