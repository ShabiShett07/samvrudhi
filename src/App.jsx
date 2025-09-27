import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Features from './components/Features'
import Footer from './components/Footer'
import UserTypeSelection from './components/UserTypeSelection'
import LandlordRegistration from './components/LandlordRegistration'
import WorkerRegistration from './components/WorkerRegistration'

function App() {
  const [currentView, setCurrentView] = useState('home')
  const [selectedUserType, setSelectedUserType] = useState(null)

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
    setCurrentView('home')
    setSelectedUserType(null)
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

  return (
    <div className="App">
      <Navbar onRegisterClick={handleRegisterClick} />
      <Hero />
      <Services />
      <Features />
      <Footer />
    </div>
  )
}

export default App
