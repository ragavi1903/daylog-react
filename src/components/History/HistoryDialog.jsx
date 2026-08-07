// import HistoryPage from "../../pages/HistoryPage";
// import "./History.css";

// function HistoryDialog({ isOpen, onClose, history }) {

//   if (!isOpen) return null;

//   return (
//     <div className="dialog-overlay">

//       <div className="history-dialog">

//         <div className="history-header">

//           <h2>History</h2>

//           <button onClick={onClose}>✖</button>

//         </div>

//         <div className="history-body">

//           {history.length === 0 ? (

//             <p>No completed days yet.</p>

//           ) : (

//             history.map((day) => (

//               <div
//                 className="history-day"
//                 key={day.date}
//               >

//                 <h3>{day.date}</h3>

//                 {day.entries.map((entry) => (

//                   <div
//                     className="history-entry"
//                     key={entry.id}
//                   >

//                     <strong>{entry.activity}</strong>

//                     <span>{entry.category}</span>

//                     <small>
//                       {entry.start} - {entry.end}
//                     </small>

//                   </div>

//                 ))}

//               </div>

//             ))

//           )}

//         </div>

//       </div>

//     </div>
//   );
// }

// export default HistoryDialog;