import './Navbar.css'

const Navbar = ({ onRegisterClick, isAuthenticated, onLogout, user, onLogoClick, onServicesClick }) => {
  const handleServicesClick = (e) => {
    e.preventDefault()
    if (onServicesClick) {
      onServicesClick()
    } else {
      // Fallback to scrolling if on home page
      const servicesSection = document.getElementById('services')
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' })
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
          <li><a href="#features">Features</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <div className="nav-buttons">
          {isAuthenticated ? (
            <>
              <span className="user-greeting">Hi, {user?.firstName}!</span>
              <button className="btn-primary" onClick={onLogout}>Logout</button>
            </>
          ) : (
            <>
              <button className="btn-secondary">Login</button>
              <button className="btn-primary" onClick={onRegisterClick}>Register</button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar