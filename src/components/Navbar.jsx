import './Navbar.css'

const Navbar = ({ onRegisterClick, onLoginClick, isAuthenticated, onLogout, user, onLogoClick, onServicesClick, onFeaturesClick, onAboutClick, onContactClick }) => {
  const handleServicesClick = (e) => {
    e.preventDefault()
    if (onServicesClick) {
      onServicesClick()
    } else {
      const servicesSection = document.getElementById('services')
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const handleFeaturesClick = (e) => {
    e.preventDefault()
    if (onFeaturesClick) {
      onFeaturesClick()
    } else {
      const featuresSection = document.getElementById('features')
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const handleAboutClick = (e) => {
    e.preventDefault()
    if (onAboutClick) {
      onAboutClick()
    } else {
      const aboutSection = document.getElementById('about')
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const handleContactClick = (e) => {
    e.preventDefault()
    if (onContactClick) {
      onContactClick()
    } else {
      const contactSection = document.getElementById('contact')
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo" onClick={onLogoClick} style={{ cursor: 'pointer' }}>
          <img src="/logo.png" alt="Samvrudhi" className="logo-image" />
        </div>
        <ul className="nav-menu">
          <li><a href="#home" onClick={(e) => { e.preventDefault(); onLogoClick && onLogoClick() }}>Home</a></li>
          <li><a href="#services" onClick={handleServicesClick}>Services</a></li>
          <li><a href="#features" onClick={handleFeaturesClick}>Features</a></li>
          <li><a href="#about" onClick={handleAboutClick}>About</a></li>
          <li><a href="#contact" onClick={handleContactClick}>Contact</a></li>
        </ul>
        <div className="nav-buttons">
          {isAuthenticated ? (
            <>
              <span className="user-greeting">Hi, {user?.firstName}!</span>
              <button className="btn-primary" onClick={onLogout}>Logout</button>
            </>
          ) : (
            <>
              <button className="btn-secondary" onClick={onLoginClick}>Login</button>
              <button className="btn-primary" onClick={onRegisterClick}>Register</button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar