import './Dashboard.css'

const WorkerDashboard = ({ user, onLogout }) => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {user.firstName}! 👋</h1>
        <p className="dashboard-subtitle">Your skills are in demand - check out available jobs!</p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-icon">💼</div>
          <h3>Available Jobs</h3>
          <p className="card-value">0</p>
          <button className="card-button">Browse Jobs</button>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">✅</div>
          <h3>Active Jobs</h3>
          <p className="card-value">0</p>
          <button className="card-button">View Jobs</button>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">💰</div>
          <h3>Earnings</h3>
          <p className="card-value">₹0</p>
          <button className="card-button">View Earnings</button>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">⭐</div>
          <h3>Rating</h3>
          <p className="card-value">New</p>
          <button className="card-button">View Reviews</button>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <button className="action-btn primary">
            <span className="action-icon">🔍</span>
            Browse Jobs
          </button>
          <button className="action-btn secondary">
            <span className="action-icon">👤</span>
            Update Profile
          </button>
          <button className="action-btn secondary">
            <span className="action-icon">📊</span>
            View Stats
          </button>
        </div>
      </div>

      <div className="services-offered">
        <h2>Your Services</h2>
        <div className="services-tags">
          {user.services && user.services.length > 0 ? (
            user.services.map((service, index) => (
              <span key={index} className="service-tag">{service}</span>
            ))
          ) : (
            <p className="no-services">No services added yet</p>
          )}
        </div>
      </div>

      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon">🎉</div>
            <div className="activity-content">
              <p className="activity-title">Welcome to Samvrudhi!</p>
              <p className="activity-time">Just now</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkerDashboard
