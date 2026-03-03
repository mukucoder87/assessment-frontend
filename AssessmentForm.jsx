import React, { useState } from 'react';
import './AssessmentForm.css';

const AssessmentForm = () => {
  const [formData, setFormData] = useState({
    locationId: '',
    observations: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Your specific Google Cloud Service URL
    const backendUrl = "https://assessment-service-604886069099.us-central1.run.app/api/assessments";

    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Success! Data transmitted to the Black Box.");
      } else {
        alert("Server error. Check your MongoDB connection.");
      }
    } catch (error) {
      console.error("Connection failed:", error);
      alert("Could not reach the backend.");
    }
  };

  return (
    <div className="center-container">
      <div className="form-container">
        <h2>PDNA Field Entry</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Location ID</label>
            <input name="locationId" value={formData.locationId} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Field Observations</label>
            <textarea name="observations" value={formData.observations} onChange={handleChange} required />
          </div>
          <button type="submit">Transmit Data</button>
        </form>
      </div>
    </div>
  );
};

export default AssessmentForm;