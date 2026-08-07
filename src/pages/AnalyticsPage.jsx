import "./AnalyticsPage.css";
import CategoryBarChart from "../components/Charts/Analytics/CategoryBarChart";
import useLocalStorage from "../hooks/useLocalStorage";
import CategoryDonutChart from "../components/Charts/Analytics/CategoryDonutChart";
import ProductivityLineChart from "../components/Charts/Analytics/ProductivityLineChart";
import Insights from "../components/Insights/Insights";
import { useState } from "react";
import AnalyticsFilter from "../components/Filters/AnalyticsFilter";
import filterHistory from "../utils/filterHistory";
import WeeklyActivityChart from "../components/Charts/Analytics/WeeklyActivityChart";


function AnalyticsPage() {
  const [history] = useLocalStorage("daylog_history", []);
  
  const [filter, setFilter] = useState("This Week");
  const filteredHistory = filterHistory(history, filter);


  return (
    <div className="analytics-page">

      <div className="analytics-header">

        <h1>Analytics</h1>
        <AnalyticsFilter
    filter={filter}
    setFilter={setFilter}
/>


      </div>

      <div className="analytics-grid">

        <div className="chart-box">

          <h2>Time by Category</h2>
            <CategoryBarChart history={filteredHistory} />

        </div>
        

  <div className="chart-box">

    <h2>Category Distribution</h2>

    <CategoryDonutChart history={filteredHistory} />

  </div>
<div className="chart-box">

    <h2>Productivity Trend</h2>

    <ProductivityLineChart history={filteredHistory} />

</div>

        <div className="chart-box">
             <h2>Weekly Activity</h2>

        <WeeklyActivityChart history={filteredHistory} />
        </div>

      </div>

      <div className="insight-box">

        <h2>Insights</h2>

       <Insights history={filteredHistory} />

      </div>

    </div>
  );
}

export default AnalyticsPage;