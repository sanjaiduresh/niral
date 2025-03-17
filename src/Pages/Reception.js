import React, { useState, useEffect } from "react";
import "../Style/reception.css";

const Reception = () => {
  const [queue, setQueue] = useState([]);
  const [records, setRecords] = useState([
    { id: 1, name: "Alice Johnson", age: 30, contact: "9876543210", ailment: "Flu" },
    { id: 2, name: "Bob Williams", age: 45, contact: "9876543211", ailment: "Fractured Arm" },
    { id: 3, name: "Charlie Davis", age: 29, contact: "9876543212", ailment: "Migraine" }   
  ]);
  const [newPatient, setNewPatient] = useState({ name: "", severity: "", arrival_time: "", priority: "Low" });
  const [searchTerm, setSearchTerm] = useState("");
  const filteredRecords = records.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.ailment.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.contact.includes(searchTerm) ||
    patient.age.toString().includes(searchTerm)
  );


  // Simulated API Fetch
  useEffect(() => {
    const fetchQueue = async () => {
      // Simulated API response
      const data = [
        { id: 1, name: "John Doe", severity: 3, arrival_time: "10:30 AM", priority: "High", predicted_wait_time: "15 min" },
        { id: 2, name: "Jane Smith", severity: 2, arrival_time: "10:45 AM", priority: "Medium", predicted_wait_time: "20 min" },
        { id: 3, name: "Michael Brown", severity: 5, arrival_time: "11:00 AM", priority: "High", predicted_wait_time: "10 min" }
      ];
      setQueue(data);
    };

    fetchQueue();
    const interval = setInterval(fetchQueue, 5000); // Refresh every 5 sec
    return () => clearInterval(interval);
  }, []);

  // Simulate wait time prediction
  const predictWaitTime = (patientId) => {
    setQueue((prevQueue) =>
      prevQueue.map((patient) =>
        patient.id === patientId
          ? { ...patient, predicted_wait_time: `${Math.floor(Math.random() * 30) + 5} min` }
          : patient
      )
    );
  };

  // Handle form input change
  const handleChange = (e) => {
    setNewPatient({ ...newPatient, [e.target.name]: e.target.value });
  };

  // Add new patient to the queue
  const addPatient = (e) => {
    e.preventDefault();
    if (!newPatient.name || !newPatient.severity || !newPatient.arrival_time) return;

    const newEntry = { id: queue.length + 1, ...newPatient };
    setQueue([...queue, newEntry]);
    setNewPatient({ name: "", severity: "", arrival_time: "", priority: "Low" }); // Reset form
  };
  const fetchRecords = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/get-records");
      const data = await response.json();
      setRecords(data.records);
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  const addPatientToRecords = async (e) => {
    e.preventDefault();
    if (!newPatient.name || !newPatient.age || !newPatient.contact || !newPatient.ailment) return;

    try {
      const response = await fetch("http://localhost:5000/api/add-record", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPatient),
      });

      if (response.ok) {
        setNewPatient({ name: "", age: "", contact: "", ailment: "" }); // Reset form
        fetchRecords(); // Refresh records list
      }
    } catch (error) {
      console.error("Error adding patient record:", error);
    }
  };

  return (
    <div className="reception-container">
      <h2 className="reception-title">Hospital Reception Dashboard</h2>
      {/* Add Patient to Records */}
      <h3 className="section-title">Add New Patient to Records</h3>
      <form className="patient-form" onSubmit={addPatientToRecords}>
        <input type="text" name="name" placeholder="Patient Name" value={newPatient.name} onChange={handleChange} required />
        <input type="number" name="age" placeholder="Age" value={newPatient.age} onChange={handleChange} required />
        <input type="text" name="contact" placeholder="Contact Number" value={newPatient.contact} onChange={handleChange} required />
        <input type="text" name="ailment" placeholder="Ailment / Condition" value={newPatient.ailment} onChange={handleChange} required />
        <button type="submit" className="add-btn">Add Patient</button>
      </form>
      <h3 className="section-title">Search Patient</h3>
      <input
        type="text"
        placeholder="Search by Name, Age, Contact, or Ailment..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {/* Patient Records */}
      <h3 className="section-title">Patient Records</h3>
      <table className="reception-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Contact</th>
            <th>Ailment</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.name}</td>
              <td>{patient.age}</td>
              <td>{patient.contact}</td>
              <td>{patient.ailment}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 className="section-title">Patient Queue</h3>

      {/* Add New Patient Form */}
      <form className="patient-form" onSubmit={addPatient}>
        <input type="text" name="name" placeholder="Patient Name" value={newPatient.name} onChange={handleChange} required />
        <input type="number" name="severity" placeholder="Severity (1-5)" value={newPatient.severity} onChange={handleChange} required min="1" max="5" />
        <input type="time" name="arrival_time" value={newPatient.arrival_time} onChange={handleChange} required />
        <select name="priority" value={newPatient.priority} onChange={handleChange}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button type="submit" className="add-btn">Add Patient</button>
      </form>

      {/* Patient Table */}
      <table className="reception-table">
        <thead>
          <tr className="table-header">
            <th className="table-cell">Patient Name</th>
            <th className="table-cell">Severity</th>
            <th className="table-cell">Arrival Time</th>
            <th className="table-cell">Priority</th>
            <th className="table-cell">Predicted Wait</th>
          </tr>
        </thead>
        <tbody>
          {queue.map((patient) => (
            <tr key={patient.id} className="table-row">
              <td className="table-cell">{patient.name}</td>
              <td className="table-cell">{patient.severity}</td>
              <td className="table-cell">{patient.arrival_time}</td>
              <td className={`table-cell ${patient.priority === "High" ? "priority-high" : patient.priority === "Medium" ? "priority-medium" : "priority-low"}`}>
                {patient.priority}
              </td>
              <td className="table-cell">
                {patient.predicted_wait_time ? (
                  patient.predicted_wait_time
                ) : (
                  <button className="predict-btn" onClick={() => predictWaitTime(patient.id)}>
                    Predict
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reception;
