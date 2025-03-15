import React, { useState } from 'react';
import { predictQueue } from '../api';

const QueuePrediction = () => {
    const [arrivalTime, setArrivalTime] = useState("");
    const [severityLevel, setSeverityLevel] = useState("");
    const [doctorAssigned, setDoctorAssigned] = useState("");
    const [waitingTime, setWaitingTime] = useState(null);

    const handlePredict = async () => {
        const data = await predictQueue(arrivalTime, severityLevel, doctorAssigned);
        setWaitingTime(data.waiting_time);
    };

    return (
        <div className="p-4 border rounded shadow-lg">
            <h2 className="text-xl font-bold mb-3">Queue Prediction</h2>
            <input type="text" placeholder="Arrival Time" onChange={(e) => setArrivalTime(e.target.value)} className="border p-2 m-2"/>
            <input type="text" placeholder="Severity Level" onChange={(e) => setSeverityLevel(e.target.value)} className="border p-2 m-2"/>
            <input type="text" placeholder="Doctor Assigned" onChange={(e) => setDoctorAssigned(e.target.value)} className="border p-2 m-2"/>
            <button onClick={handlePredict} className="bg-blue-500 text-white p-2 rounded">Predict</button>
            {waitingTime !== null && <p className="mt-3">Estimated Waiting Time: {waitingTime} mins</p>}
        </div>
    );
};

export default QueuePrediction;
