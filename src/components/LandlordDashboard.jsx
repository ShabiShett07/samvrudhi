import './Dashboard.css'

const LandlordDashboard = ({ user, onLogout }) => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {user.firstName}! 👋</h1>
        <p className="dashboard-subtitle">Manage your properties and find skilled workers</p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-icon">🏠</div>
          <h3>My Properties</h3>
          <p className="card-value">{user.properties || '1-5'}</p>
          <button className="card-button">View Properties</button>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">👷</div>
          <h3>Active Workers</h3>
          <p className="card-value">0</p>
          <button className="card-button">Find Workers</button>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">📋</div>
          <h3>Active Jobs</h3>
          <p className="card-value">0</p>
          <button className="card-button">Post a Job</button>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">⭐</div>
          <h3>Reviews</h3>
          <p className="card-value">0</p>
          <button className="card-button">View Reviews</button>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <button className="action-btn primary">
            <span className="action-icon">🔍</span>
            Find Workers
          </button>
          <button className="action-btn secondary">
            <span className="action-icon">📝</span>
            Post a Job
          </button>
          <button className="action-btn secondary">
            <span className="action-icon">📊</span>
            View Analytics
          </button>
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

export default LandlordDashboard
