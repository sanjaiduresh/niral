import axios from 'axios';

const API_BASE_URL = "http://localhost:5000";

export const predictQueue = async (arrivalTime, severityLevel, doctorAssigned) => {
    const response = await axios.post(`${API_BASE_URL}/predict_queue`, {
        arrival_time: arrivalTime,
        severity_level: severityLevel,
        doctor_assigned: doctorAssigned
    });
    return response.data;
};

export const allocateBed = async (severityLevel, bedAvailability, expectedStay) => {
    const response = await axios.post(`${API_BASE_URL}/allocate_bed`, {
        severity_level: severityLevel,
        bed_availability: bedAvailability,
        expected_stay: expectedStay
    });
    return response.data;
};

export const triagePatient = async (symptoms) => {
    const response = await axios.post(`${API_BASE_URL}/triage`, { symptoms });
    return response.data;
};
