import './Hero.css'

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Transform Your Land with <span className="highlight">Expert Care</span>
          </h1>
          <p className="hero-subtitle">
            Connect with skilled professionals for all your land management and agricultural needs.
            From soil preparation to harvesting, find the right worker for every job.
          </p>
          <div className="hero-buttons">
            <button className="btn-hero-primary">Find Workers</button>
            <button className="btn-hero-secondary">Learn More</button>
          </div>
          <div className="hero-features">
            <div className="feature">
              <span className="feature-icon">🌟</span>
              <span className="feature-label">Premium Quality</span>
            </div>
            <div className="feature">
              <span className="feature-icon">⚡</span>
              <span className="feature-label">Fast & Reliable</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🛡️</span>
              <span className="feature-label">Trusted Platform</span>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <div className="image-container">
            <img
              src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="Happy farmer working in agricultural field"
              className="farmer-image"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero