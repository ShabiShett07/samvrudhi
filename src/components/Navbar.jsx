import './Navbar.css'

const Navbar = ({ onRegisterClick }) => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <img src="/src/assets/logo.png" alt="Samvrudhi" className="logo-image" />
        </div>
        <ul className="nav-menu">
          <li><a href="#home">Home</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <div className="nav-buttons">
          <button className="btn-secondary">Login</button>
          <button className="btn-primary" onClick={onRegisterClick}>Register</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar