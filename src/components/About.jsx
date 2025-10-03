import './About.css'

const About = () => {
  return (
    <section id="about" className="about">
      <div className="about-container">
        <div className="about-header">
          <h2 className="about-title">About Samvrudhi</h2>
          <p className="about-subtitle">
            Empowering landowners and workers through seamless connections
          </p>
        </div>

        <div className="about-content">
          <div className="about-story">
            <div className="story-image">
              <img
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Our Mission"
                className="mission-image"
              />
            </div>
            <div className="story-text">
              <h3>Our Mission</h3>
              <p>
                Samvrudhi is dedicated to revolutionizing land management by creating a trusted platform
                that connects landowners with skilled agricultural professionals. We believe in sustainable
                practices, fair compensation, and building strong community relationships.
              </p>
              <p>
                Founded with the vision of bridging the gap between land resources and skilled labor,
                we're committed to making land management accessible, efficient, and profitable for everyone
                involved.
              </p>
            </div>
          </div>

          <div className="about-values">
            <h3>Our Core Values</h3>
            <div className="values-grid">
              <div className="value-card">
                <div className="value-icon">🌱</div>
                <h4>Sustainability</h4>
                <p>We promote eco-friendly practices that preserve our land for future generations</p>
              </div>
              <div className="value-card">
                <div className="value-icon">🤝</div>
                <h4>Trust</h4>
                <p>Building reliable connections between landowners and verified professionals</p>
              </div>
              <div className="value-card">
                <div className="value-icon">💡</div>
                <h4>Innovation</h4>
                <p>Leveraging technology to modernize traditional land management practices</p>
              </div>
              <div className="value-card">
                <div className="value-icon">⭐</div>
                <h4>Excellence</h4>
                <p>Committed to delivering the highest quality service in every interaction</p>
              </div>
            </div>
          </div>

          <div className="about-stats">
            <div className="stat-item">
              <div className="stat-number">5000+</div>
              <div className="stat-label">Verified Workers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Happy Landowners</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50,000+</div>
              <div className="stat-label">Jobs Completed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">98%</div>
              <div className="stat-label">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
