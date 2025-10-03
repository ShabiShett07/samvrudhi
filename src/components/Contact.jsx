import { useState } from 'react'
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission (placeholder)
    alert('Thank you for contacting us! We will get back to you soon.')
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })
  }

  return (
    <section id="contact" className="contact">
      <div className="contact-container">
        <div className="contact-header">
          <h2 className="contact-title">Get In Touch</h2>
          <p className="contact-subtitle">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info-section">
            <h3>Contact Information</h3>
            <p className="contact-intro">
              Reach out to us through any of these channels, or fill out the form and we'll get back to you.
            </p>

            <div className="contact-details">
              <div className="contact-detail-item">
                <div className="detail-icon">📍</div>
                <div className="detail-content">
                  <h4>Office Address</h4>
                  <p>123 Agriculture Avenue<br/>Farm City, FC 12345<br/>India</p>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="detail-icon">📞</div>
                <div className="detail-content">
                  <h4>Phone Numbers</h4>
                  <p>+91 (555) 123-LAND<br/>+91 (555) 456-FARM</p>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="detail-icon">✉️</div>
                <div className="detail-content">
                  <h4>Email Address</h4>
                  <p>info@samvrudhi.com<br/>support@samvrudhi.com</p>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="detail-icon">🕒</div>
                <div className="detail-content">
                  <h4>Business Hours</h4>
                  <p>Mon - Fri: 9:00 AM - 6:00 PM<br/>Sat - Sun: 24/7 Emergency Support</p>
                </div>
              </div>
            </div>

            <div className="social-links">
              <h4>Follow Us</h4>
              <div className="social-icons">
                <a href="#" className="social-icon">📘</a>
                <a href="#" className="social-icon">📷</a>
                <a href="#" className="social-icon">🐦</a>
                <a href="#" className="social-icon">💼</a>
              </div>
            </div>
          </div>

          <div className="contact-form-section">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 12345 67890"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your inquiry..."
                  rows="6"
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-button">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
