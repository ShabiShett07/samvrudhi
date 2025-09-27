import './Features.css'

const Features = () => {
  const features = [
    {
      icon: '🔍',
      title: 'Smart Matching',
      description: 'Our intelligent system matches you with the most qualified workers based on your specific land management needs and location.'
    },
    {
      icon: '⭐',
      title: 'Verified Professionals',
      description: 'All workers are thoroughly vetted and verified with ratings and reviews from previous clients to ensure quality service.'
    },
    {
      icon: '📱',
      title: 'Easy Booking',
      description: 'Book services instantly through our user-friendly platform with transparent pricing and flexible scheduling options.'
    },
    {
      icon: '🛡️',
      title: 'Secure Payments',
      description: 'Safe and secure payment processing with multiple payment options and protection for both landowners and workers.'
    },
    {
      icon: '📊',
      title: 'Progress Tracking',
      description: 'Monitor your projects in real-time with detailed progress reports and photo updates from the field.'
    },
    {
      icon: '🎯',
      title: 'Custom Solutions',
      description: 'Tailored solutions for every type of land - from small gardens to large agricultural operations.'
    }
  ]

  return (
    <section id="features" className="features">
      <div className="features-container">
        <div className="features-header">
          <h2 className="features-title">Why Choose Samvrudhi?</h2>
          <p className="features-subtitle">
            Discover the advantages that make us the leading platform for land management services
          </p>
        </div>

        <div className="features-content">
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-item">
                <div className="feature-icon-wrapper">
                  <span className="feature-icon">{feature.icon}</span>
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="features-cta">
            <div className="cta-content">
              <h3 className="cta-title">Ready to Transform Your Land?</h3>
              <p className="cta-description">
                Join thousands of satisfied landowners who have improved their properties with our platform
              </p>
              <div className="cta-buttons">
                <button className="btn-cta-primary">Start Your Project</button>
                <button className="btn-cta-secondary">View Success Stories</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features