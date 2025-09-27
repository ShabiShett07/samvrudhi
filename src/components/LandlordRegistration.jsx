import { useState } from 'react'
import { authAPI, tokenManager } from '../utils/api'
import './Registration.css'

const LandlordRegistration = ({ onBack, onRegister }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    properties: '',
    experience: '',
    address: ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!')
      return
    }

    setLoading(true)

    try {
      const registrationData = {
        ...formData,
        userType: 'landlord'
      }

      const response = await authAPI.register(registrationData)

      // Save token
      tokenManager.save(response.token)

      // Show success message
      alert(`Registration successful! Welcome, ${response.user.firstName}!`)

      // Call parent handler
      onRegister(registrationData)
    } catch (error) {
      console.error('Registration error:', error)
      setError(error.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="registration-container">
      <div className="registration-form">
        <div className="form-header">
          <h2>🏠 Landlord Registration</h2>
          <p>Join our platform to manage your properties efficiently</p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Number of Properties</label>
              <select
                name="properties"
                value={formData.properties}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="1-5">1-5 Properties</option>
                <option value="6-10">6-10 Properties</option>
                <option value="11-20">11-20 Properties</option>
                <option value="20+">20+ Properties</option>
              </select>
            </div>
            <div className="form-group">
              <label>Experience</label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="new">New to property management</option>
                <option value="1-3">1-3 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5+">5+ years</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                minLength="6"
                required
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                minLength="6"
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="back-btn" onClick={onBack}>
              Back
            </button>
            <button type="submit" className="register-btn" disabled={loading}>
              {loading ? 'Registering...' : 'Register as Landlord'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LandlordRegistration