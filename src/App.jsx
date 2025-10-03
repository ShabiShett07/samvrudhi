import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Features from './components/Features'
import Footer from './components/Footer'
import UserTypeSelection from './components/UserTypeSelection'
import LandlordRegistration from './components/LandlordRegistration'
import WorkerRegistration from './components/WorkerRegistration'
import LandlordDashboard from './components/LandlordDashboard'
import WorkerDashboard from './components/WorkerDashboard'
import FindWorkers from './components/FindWorkers'
import { tokenManager } from './utils/api'

function App() {
  const [currentView, setCurrentView] = useState('home')
  const [selectedUserType, setSelectedUserType] = useState(null)
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [selectedService, setSelectedService] = useState(null)

  // Check for existing authentication on mount
  useEffect(() => {
    const token = tokenManager.get()
    if (token) {
      // Get user data from localStorage (from registration)
      const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
      const lastUser = users[users.length - 1]
      if (lastUser) {
        setUser(lastUser)
        setIsAuthenticated(true)
      }
    }
  }, [])

  const handleRegisterClick = () => {
    setCurrentView('userTypeSelection')
  }

  const handleUserTypeSelect = (userType) => {
    setSelectedUserType(userType)
    setCurrentView('registration')
  }

  const handleBackToHome = () => {
    setCurrentView('home')
    setSelectedUserType(null)
  }

  const handleBackToSelection = () => {
    setCurrentView('userTypeSelection')
    setSelectedUserType(null)
  }

  const handleRegistration = async (userData) => {
    // The API call will be handled by the individual registration components
    // Set user as authenticated after successful registration
    setUser(userData)
    setIsAuthenticated(true)
    setCurrentView('home')
    setSelectedUserType(null)
  }

  const handleLogout = () => {
    tokenManager.remove()
    setUser(null)
    setIsAuthenticated(false)
    setCurrentView('home')
  }

  const handleFindWorkers = (serviceType = null) => {
    setSelectedService(serviceType)
    setCurrentView('findWorkers')
  }

  const handleBackFromFindWorkers = () => {
    setSelectedService(null)
    setCurrentView('home')
  }

  const handleLogoClick = () => {
    setCurrentView('home')
    setSelectedService(null)
    setSelectedUserType(null)
  }

  if (currentView === 'findWorkers') {
    return (
      <>
        <Navbar onRegisterClick={handleRegisterClick} isAuthenticated={isAuthenticated} onLogout={handleLogout} user={user} onLogoClick={handleLogoClick} />
        <FindWorkers onBack={handleBackFromFindWorkers} preSelectedService={selectedService} />
        <Footer />
      </>
    )
  }

  if (currentView === 'userTypeSelection') {
    return (
      <UserTypeSelection
        onUserTypeSelect={handleUserTypeSelect}
        onBack={handleBackToHome}
      />
    )
  }

  if (currentView === 'registration') {
    if (selectedUserType === 'landlord') {
      return (
        <LandlordRegistration
          onBack={handleBackToSelection}
          onRegister={handleRegistration}
        />
      )
    } else if (selectedUserType === 'worker') {
      return (
        <WorkerRegistration
          onBack={handleBackToSelection}
          onRegister={handleRegistration}
        />
      )
    }
  }

  // Show dashboard if user is authenticated
  if (isAuthenticated && user) {
    if (user.userType === 'landlord') {
      return (
        <>
          <Navbar onRegisterClick={handleRegisterClick} isAuthenticated={true} onLogout={handleLogout} user={user} onLogoClick={handleLogoClick} />
          <LandlordDashboard user={user} onLogout={handleLogout} onFindWorkers={handleFindWorkers} />
          <Footer />
        </>
      )
    } else if (user.userType === 'worker') {
      return (
        <>
          <Navbar onRegisterClick={handleRegisterClick} isAuthenticated={true} onLogout={handleLogout} user={user} onLogoClick={handleLogoClick} />
          <WorkerDashboard user={user} onLogout={handleLogout} />
          <Footer />
        </>
      )
    }
  }

  return (
    <div className="App">
      <Navbar onRegisterClick={handleRegisterClick} onLogoClick={handleLogoClick} />
      <Hero onFindWorkers={handleFindWorkers} />
      <Services onFindWorkers={handleFindWorkers} />
      <Features />
      <Footer />
    </div>
  )
}

export default App
