import React
// , 
// { useState, useEffect } 
from "react";

const Reception = () => {
//   const [queue, setQueue] = useState([]);

  // Fetch queue data
//   useEffect(() => {
//     const fetchQueue = async () => {
//       const response = await fetch("http://localhost:5000/api/get-queue");
//       const data = await response.json();
//       setQueue(data.patients);
//     };

//     fetchQueue();
//     const interval = setInterval(fetchQueue, 5000); // Refresh every 5 sec
//     return () => clearInterval(interval);
//   }, []);

//   // Predict wait time for a patient
//   const predictWaitTime = async (patient) => {
//     const response = await fetch("http://localhost:5000/api/predict-queue", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         arrival_time: patient.arrival_time,
//         severity_level: patient.severity_level,
//       }),
//     });

//     const data = await response.json();
//     return data.predicted_wait_time;
//   };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Reception Dashboard</h2>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Patient Name</th>
            <th className="border p-2">Severity</th>
            <th className="border p-2">Arrival Time</th>
            <th className="border p-2">Priority</th>
            <th className="border p-2">Predicted Wait</th>
          </tr>
        </thead>
        <tbody>
          {/* {queue.map((patient, index) => (
            <tr key={index} className="border">
              <td className="border p-2">{patient.name}</td>
              <td className="border p-2">{patient.severity_level}</td>
              <td className="border p-2">{patient.arrival_time}</td>
              <td className={`border p-2 ${patient.priority === "High" ? "text-red-500" : "text-green-500"}`}>
                {patient.priority}
              </td>
              <td className="border p-2">
                {patient.predicted_wait_time ? (
                  `${patient.predicted_wait_time} min`
                ) : (
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    // onClick={async () => {
                    //   const waitTime = await predictWaitTime(patient);
                    //   setQueue((prevQueue) =>
                    //     prevQueue.map((p) =>
                    //       p.id === patient.id ? { ...p, predicted_wait_time: waitTime } : p
                    //     )
                    //   );
                    // }}
                  >
                    Predict
                  </button>
                )}
              </td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default Reception;
