import './WorkerCard.css'

const WorkerCard = ({ worker }) => {
  const getExperienceBadge = (experience) => {
    const badges = {
      beginner: { emoji: '🌱', color: '#4CAF50' },
      intermediate: { emoji: '⚡', color: '#2196F3' },
      experienced: { emoji: '⭐', color: '#FF9800' },
      expert: { emoji: '🏆', color: '#9C27B0' }
    }
    return badges[experience] || badges.beginner
  }

  const badge = getExperienceBadge(worker.experience)

  return (
    <div className="worker-card">
      <div className="worker-card-header">
        <div className="worker-avatar">
          {worker.firstName.charAt(0)}{worker.lastName.charAt(0)}
        </div>
        <div className="worker-info">
          <h3 className="worker-name">{worker.firstName} {worker.lastName}</h3>
          <div className="worker-rating">
            <span className="rating-stars">⭐ {worker.rating}</span>
            <span className="total-jobs">({worker.totalJobs} jobs)</span>
          </div>
        </div>
        <div className="experience-badge" style={{ backgroundColor: badge.color }}>
          <span>{badge.emoji}</span>
        </div>
      </div>

      <div className="worker-services">
        {worker.services.map((service, index) => (
          <span key={index} className="service-badge">{service}</span>
        ))}
      </div>

      <div className="worker-details">
        <div className="detail-item">
          <span className="detail-icon">📍</span>
          <span className="detail-text">{worker.location}</span>
        </div>
        <div className="detail-item">
          <span className="detail-icon">💼</span>
          <span className="detail-text">{worker.availability}</span>
        </div>
        <div className="detail-item">
          <span className="detail-icon">📜</span>
          <span className="detail-text">{worker.certifications}</span>
        </div>
      </div>

      <div className="worker-card-footer">
        <div className="hourly-rate">
          <span className="rate-label">Hourly Rate</span>
          <span className="rate-value">₹{worker.hourlyRate}/hr</span>
        </div>
        <button className="hire-button">Contact Worker</button>
      </div>
    </div>
  )
}

export default WorkerCard
