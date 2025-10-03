import { useState } from 'react'
import { authAPI, tokenManager } from '../utils/api'
import './Login.css'

const Login = ({ onBack, onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    setLoading(true)

    try {
      // Get registered users from localStorage
      const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]')

      // Find user with matching email
      const user = users.find(u => u.email === formData.email)

      if (!user) {
        throw new Error('No account found with this email address')
      }

      // In a real app, you'd verify the password hash
      // For now, we'll just check if password is provided
      if (!formData.password) {
        throw new Error('Please enter your password')
      }

      // Simulate password verification (in real app, compare hashed passwords)
      if (formData.password !== user.password) {
        throw new Error('Incorrect password')
      }

      // Generate token
      const token = `mock_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

      // Save token
      tokenManager.save(token)

      // Show success message
      alert(`Welcome back, ${user.firstName}!`)

      // Call parent handler with user data
      onLogin(user)
    } catch (error) {
      console.error('Login error:', error)
      setError(error.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="form-header">
          <button className="back-button" onClick={onBack}>
            ← Back
          </button>
          <h2>🔐 Welcome Back</h2>
          <p>Sign in to access your account</p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="login-footer">
          <p>Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); onBack(); }}>Register here</a></p>
        </div>
      </div>
    </div>
  )
}

export default Login
