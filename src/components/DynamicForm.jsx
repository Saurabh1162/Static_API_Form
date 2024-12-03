/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./DynamicForm.css";


const apiResponses = {
  userInformation: {
    fields: [
      { name: "firstName", type: "text", label: "First Name", required: true },
      { name: "lastName", type: "text", label: "Last Name", required: true },
      { name: "age", type: "number", label: "Age", required: false },
    ],
  },
  addressInformation: {
    fields: [
      { name: "street", type: "text", label: "Street", required: true },
      { name: "city", type: "text", label: "City", required: true },
      { name: "state", type: "dropdown", label: "State", options: ["California", "Texas", "New York"], required: true },
      { name: "zipCode", type: "text", label: "Zip Code", required: false },
    ],
  },
  paymentInformation: {
    fields: [
      { name: "cardNumber", type: "text", label: "Card Number", required: true },
      { name: "expiryDate", type: "date", label: "Expiry Date", required: true },
      { name: "cvv", type: "password", label: "CVV", required: true },
      { name: "cardholderName", type: "text", label: "Cardholder Name", required: true },
    ],
  },
};

const DynamicForm = () => {
  const [formType, setFormType] = useState("userInformation");
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [submittedData, setSubmittedData] = useState([]);

  const fields = apiResponses[formType]?.fields || [];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const validateForm = () => {
    const errors = {};
    fields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        errors[field.name] = `${field.label} is required`;
      }
    });
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      setSubmittedData([...submittedData, formData]);
      setFormData({});
      alert("Form submitted successfully!");
    }
  };
  

  const calculateProgress = () => {
    const completedFields = fields.filter((field) => formData[field.name]);
    return (completedFields.length / fields.length) * 100;
  };

  return (
    <div className="dynamic-form-container">
      <header>
        <h1>Dynamic Form</h1>
      </header>
      <main>
        <div className="form-header">
          <label htmlFor="formType">Select Form Type:</label>
          <select id="formType" onChange={(e) => setFormType(e.target.value)} value={formType}>
            <option value="userInformation">User Information</option>
            <option value="addressInformation">Address Information</option>
            <option value="paymentInformation">Payment Information</option>
          </select>
        </div>

        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field.name} className="form-field">
              <label htmlFor={field.name}>{field.label}</label>
              {field.type === "dropdown" ? (
                <select id={field.name} name={field.name} onChange={handleInputChange} value={formData[field.name] || ""}>
                  <option value="">Select {field.label}</option>
                  {field.options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleInputChange}
                />
              )}
              {formErrors[field.name] && <span className="error">{formErrors[field.name]}</span>}
            </div>
          ))}
          <div className="progress-bar">
            <div className="progress" style={{ width: `${calculateProgress()}%` }}></div>
          </div>

          
          <button type="submit" style={{marginBottom:"10%"}}>Submit</button>

        </form>
      </main>
    </div>
  );
};

export default DynamicForm;
