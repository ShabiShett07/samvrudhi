import { useState } from 'react'
import './FindWorkers.css'
import WorkerCard from './WorkerCard'

const FindWorkers = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedService, setSelectedService] = useState('All')
  const [selectedExperience, setSelectedExperience] = useState('All')
  const [priceRange, setPriceRange] = useState('All')

  // Mock worker data
  const workers = [
    {
      id: 1,
      firstName: 'Rajesh',
      lastName: 'Kumar',
      services: ['Plumbing', 'Electrical'],
      experience: 'experienced',
      hourlyRate: 350,
      rating: 4.8,
      totalJobs: 127,
      location: 'Bangalore',
      availability: 'full-time',
      certifications: 'Licensed Plumber, Electrical Technician'
    },
    {
      id: 2,
      firstName: 'Priya',
      lastName: 'Sharma',
      services: ['Gardening', 'Landscaping'],
      experience: 'expert',
      hourlyRate: 450,
      rating: 4.9,
      totalJobs: 215,
      location: 'Bangalore',
      availability: 'flexible',
      certifications: 'Certified Horticulturist'
    },
    {
      id: 3,
      firstName: 'Amit',
      lastName: 'Patel',
      services: ['Carpentry', 'Painting'],
      experience: 'intermediate',
      hourlyRate: 300,
      rating: 4.5,
      totalJobs: 89,
      location: 'Bangalore',
      availability: 'weekdays',
      certifications: 'Carpentry Diploma'
    },
    {
      id: 4,
      firstName: 'Sunita',
      lastName: 'Reddy',
      services: ['Cleaning', 'Pest Control'],
      experience: 'experienced',
      hourlyRate: 250,
      rating: 4.7,
      totalJobs: 156,
      location: 'Bangalore',
      availability: 'full-time',
      certifications: 'Hygiene & Sanitation Certificate'
    },
    {
      id: 5,
      firstName: 'Vikram',
      lastName: 'Singh',
      services: ['HVAC', 'Appliance Repair'],
      experience: 'expert',
      hourlyRate: 500,
      rating: 5.0,
      totalJobs: 342,
      location: 'Bangalore',
      availability: 'full-time',
      certifications: 'HVAC Specialist, Electronics Engineer'
    },
    {
      id: 6,
      firstName: 'Lakshmi',
      lastName: 'Iyer',
      services: ['Painting', 'Cleaning'],
      experience: 'beginner',
      hourlyRate: 200,
      rating: 4.3,
      totalJobs: 34,
      location: 'Bangalore',
      availability: 'weekends',
      certifications: 'Basic Training Certificate'
    }
  ]

  const serviceOptions = [
    'All', 'Plumbing', 'Electrical', 'Carpentry', 'Painting', 'Cleaning',
    'Gardening', 'HVAC', 'Appliance Repair', 'Pest Control'
  ]

  const experienceOptions = ['All', 'beginner', 'intermediate', 'experienced', 'expert']

  const priceRanges = [
    { label: 'All', min: 0, max: Infinity },
    { label: 'Under ₹250', min: 0, max: 250 },
    { label: '₹250 - ₹400', min: 250, max: 400 },
    { label: 'Above ₹400', min: 400, max: Infinity }
  ]

  // Filter workers based on search and filters
  const filteredWorkers = workers.filter(worker => {
    const matchesSearch =
      worker.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.services.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesService =
      selectedService === 'All' ||
      worker.services.includes(selectedService)

    const matchesExperience =
      selectedExperience === 'All' ||
      worker.experience === selectedExperience

    const selectedPriceRange = priceRanges.find(r => r.label === priceRange)
    const matchesPrice =
      worker.hourlyRate >= selectedPriceRange.min &&
      worker.hourlyRate <= selectedPriceRange.max

    return matchesSearch && matchesService && matchesExperience && matchesPrice
  })

  return (
    <div className="find-workers">
      <div className="find-workers-header">
        <button className="back-button" onClick={onBack}>← Back</button>
        <h1>Find Skilled Workers</h1>
        <p className="header-subtitle">Connect with verified professionals for your land management needs</p>
      </div>

      <div className="search-filter-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="🔍 Search by name or service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filters">
          <div className="filter-group">
            <label>Service Type</label>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="filter-select"
            >
              {serviceOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Experience Level</label>
            <select
              value={selectedExperience}
              onChange={(e) => setSelectedExperience(e.target.value)}
              className="filter-select"
            >
              {experienceOptions.map(option => (
                <option key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Price Range</label>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="filter-select"
            >
              {priceRanges.map(range => (
                <option key={range.label} value={range.label}>{range.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="results-section">
        <div className="results-header">
          <h2>Available Workers ({filteredWorkers.length})</h2>
          {(searchTerm || selectedService !== 'All' || selectedExperience !== 'All' || priceRange !== 'All') && (
            <button
              className="clear-filters"
              onClick={() => {
                setSearchTerm('')
                setSelectedService('All')
                setSelectedExperience('All')
                setPriceRange('All')
              }}
            >
              Clear Filters
            </button>
          )}
        </div>

        <div className="workers-grid">
          {filteredWorkers.length > 0 ? (
            filteredWorkers.map(worker => (
              <WorkerCard key={worker.id} worker={worker} />
            ))
          ) : (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>No workers found</h3>
              <p>Try adjusting your filters or search term</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FindWorkers
