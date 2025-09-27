import { useState } from 'react'
import { authAPI, tokenManager } from '../utils/api'
import './Registration.css'

const WorkerRegistration = ({ onBack, onRegister }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    services: [],
    experience: '',
    hourlyRate: '',
    address: '',
    certifications: '',
    availability: ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const serviceOptions = [
    'Plumbing',
    'Electrical',
    'Carpentry',
    'Painting',
    'Cleaning',
    'Gardening',
    'HVAC',
    'Appliance Repair',
    'Pest Control',
    'Roofing'
  ]

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleServiceToggle = (service) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!')
      return
    }
    if (formData.services.length === 0) {
      setError('Please select at least one service!')
      return
    }

    setLoading(true)

    try {
      const registrationData = {
        ...formData,
        userType: 'worker'
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
          <h2>🔧 Worker Registration</h2>
          <p>Join our platform to offer your professional services</p>
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
            <label>Address/Service Area</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label>Services Offered (Select all that apply)</label>
            <div className="services-grid">
              {serviceOptions.map(service => (
                <div key={service} className="service-checkbox">
                  <input
                    type="checkbox"
                    id={service}
                    checked={formData.services.includes(service)}
                    onChange={() => handleServiceToggle(service)}
                  />
                  <label htmlFor={service}>{service}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Experience Level</label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="beginner">Beginner (0-2 years)</option>
                <option value="intermediate">Intermediate (2-5 years)</option>
                <option value="experienced">Experienced (5-10 years)</option>
                <option value="expert">Expert (10+ years)</option>
              </select>
            </div>
            <div className="form-group">
              <label>Hourly Rate (₹)</label>
              <input
                type="number"
                name="hourlyRate"
                value={formData.hourlyRate}
                onChange={handleChange}
                min="100"
                max="5000"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Availability</label>
            <select
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="weekdays">Weekdays only</option>
              <option value="weekends">Weekends only</option>
              <option value="full-time">Full time (7 days)</option>
              <option value="flexible">Flexible schedule</option>
            </select>
          </div>

          <div className="form-group">
            <label>Certifications (Optional)</label>
            <textarea
              name="certifications"
              value={formData.certifications}
              onChange={handleChange}
              rows="2"
              placeholder="List any relevant certifications or licenses"
            ></textarea>
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
              {loading ? 'Registering...' : 'Register as Worker'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default WorkerRegistration