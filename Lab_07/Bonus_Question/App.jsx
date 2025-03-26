"use client"

import { useState } from "react"

export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    feedback: "",
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.feedback.trim()) {
      newErrors.feedback = "Feedback message is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {

      console.log("Form submitted:", formData)
      setSubmitted(true)
      setFormData({
        name: "",
        feedback: "",
      })

      setTimeout(() => {
        setSubmitted(false)
      }, 3000)
    }
  }

  return (
    <div className="app-container">
      <div className="form-container">
        <h1>Feedback Form</h1>

        {submitted && <div className="success-message">Thank you for your feedback!</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? "error" : ""}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="feedback">Feedback Message</label>
            <textarea
              id="feedback"
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              rows={5}
              className={errors.feedback ? "error" : ""}
            />
            {errors.feedback && <span className="error-message">{errors.feedback}</span>}
          </div>

          <button type="submit" className="submit-button">
            Submit Feedback
          </button>
        </form>
      </div>

      <style jsx global>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
          background-color: #f5f7fa;
          color: #333;
          line-height: 1.6;
        }
        
        .app-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 20px;
        }
        
        .form-container {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          padding: 30px;
          width: 100%;
          max-width: 500px;
        }
        
        h1 {
          color: #2c3e50;
          margin-bottom: 24px;
          text-align: center;
          font-size: 28px;
        }
        
        .form-group {
          margin-bottom: 20px;
        }
        
        label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #4a5568;
        }
        
        input, textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        
        input:focus, textarea:focus {
          outline: none;
          border-color: #3498db;
          box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
        }
        
        input.error, textarea.error {
          border-color: #e74c3c;
        }
        
        .error-message {
          color: #e74c3c;
          font-size: 14px;
          margin-top: 5px;
          display: block;
        }
        
        .submit-button {
          background-color: #3498db;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 12px 20px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          width: 100%;
          transition: background-color 0.3s;
        }
        
        .submit-button:hover {
          background-color: #2980b9;
        }
        
        .submit-button:active {
          transform: translateY(1px);
        }
        
        .success-message {
          background-color: #2ecc71;
          color: white;
          padding: 12px;
          border-radius: 4px;
          margin-bottom: 20px;
          text-align: center;
          font-weight: 600;
        }
      `}</style>
    </div>
  )
}

