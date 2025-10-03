import { useState, useEffect } from 'react'
import './AdminDashboard.css'

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview')
  const [users, setUsers] = useState([])
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalLandlords: 0,
    totalWorkers: 0,
    totalJobs: 0,
    activeJobs: 0,
    completedJobs: 0,
    revenue: 0,
    pendingApprovals: 0
  })

  useEffect(() => {
    // Load users from localStorage
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
    setUsers(registeredUsers)

    // Calculate statistics
    const landlords = registeredUsers.filter(u => u.userType === 'landlord')
    const workers = registeredUsers.filter(u => u.userType === 'worker')

    setStats({
      totalUsers: registeredUsers.length,
      totalLandlords: landlords.length,
      totalWorkers: workers.length,
      totalJobs: 342,
      activeJobs: 45,
      completedJobs: 297,
      revenue: 1250000,
      pendingApprovals: 12
    })
  }, [])

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const updatedUsers = users.filter(u => u.id !== userId)
      setUsers(updatedUsers)
      localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers))
      alert('User deleted successfully')
    }
  }

  const handleToggleUserStatus = (userId) => {
    const updatedUsers = users.map(u =>
      u.id === userId ? { ...u, isActive: !u.isActive } : u
    )
    setUsers(updatedUsers)
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers))
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="admin-header-content">
          <h1>Admin Dashboard</h1>
          <p>Manage your platform and monitor performance</p>
        </div>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </div>

      {/* Statistics Overview */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            👥
          </div>
          <div className="stat-info">
            <h3>{stats.totalUsers}</h3>
            <p>Total Users</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
            🏠
          </div>
          <div className="stat-info">
            <h3>{stats.totalLandlords}</h3>
            <p>Landowners</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
            👷
          </div>
          <div className="stat-info">
            <h3>{stats.totalWorkers}</h3>
            <p>Workers</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
            💼
          </div>
          <div className="stat-info">
            <h3>{stats.totalJobs}</h3>
            <p>Total Jobs</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
            ⚡
          </div>
          <div className="stat-info">
            <h3>{stats.activeJobs}</h3>
            <p>Active Jobs</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' }}>
            ✅
          </div>
          <div className="stat-info">
            <h3>{stats.completedJobs}</h3>
            <p>Completed Jobs</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' }}>
            💰
          </div>
          <div className="stat-info">
            <h3>₹{(stats.revenue / 1000).toFixed(0)}K</h3>
            <p>Revenue</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' }}>
            🔔
          </div>
          <div className="stat-info">
            <h3>{stats.pendingApprovals}</h3>
            <p>Pending Approvals</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="admin-tabs">
        <button
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          📊 Overview
        </button>
        <button
          className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          👥 Users
        </button>
        <button
          className={`tab-btn ${activeTab === 'workers' ? 'active' : ''}`}
          onClick={() => setActiveTab('workers')}
        >
          👷 Workers
        </button>
        <button
          className={`tab-btn ${activeTab === 'jobs' ? 'active' : ''}`}
          onClick={() => setActiveTab('jobs')}
        >
          💼 Jobs
        </button>
        <button
          className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          ⚙️ Settings
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="overview-section">
            <div className="chart-section">
              <h2>Recent Activity</h2>
              <div className="activity-list">
                <div className="activity-item">
                  <div className="activity-icon">✅</div>
                  <div className="activity-details">
                    <p className="activity-text">New landlord registered: Rajesh Kumar</p>
                    <span className="activity-time">2 hours ago</span>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">💼</div>
                  <div className="activity-details">
                    <p className="activity-text">Job completed: Land Cultivation Project</p>
                    <span className="activity-time">5 hours ago</span>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">👷</div>
                  <div className="activity-details">
                    <p className="activity-text">New worker verified: Priya Sharma</p>
                    <span className="activity-time">1 day ago</span>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">💰</div>
                  <div className="activity-details">
                    <p className="activity-text">Payment received: ₹25,000</p>
                    <span className="activity-time">2 days ago</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="quick-actions">
              <h2>Quick Actions</h2>
              <div className="action-grid">
                <button className="action-card">
                  <span className="action-icon">➕</span>
                  <span>Add New Service</span>
                </button>
                <button className="action-card">
                  <span className="action-icon">✅</span>
                  <span>Approve Workers</span>
                </button>
                <button className="action-card">
                  <span className="action-icon">📊</span>
                  <span>View Reports</span>
                </button>
                <button className="action-card">
                  <span className="action-icon">💬</span>
                  <span>Messages</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="users-section">
            <div className="section-header">
              <h2>User Management</h2>
              <div className="search-filter">
                <input type="text" placeholder="Search users..." className="search-input" />
                <select className="filter-select">
                  <option>All Users</option>
                  <option>Landlords</option>
                  <option>Workers</option>
                </select>
              </div>
            </div>

            <div className="users-table">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Type</th>
                    <th>Phone</th>
                    <th>Joined</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.firstName} {user.lastName}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`badge ${user.userType}`}>
                          {user.userType === 'landlord' ? '🏠 Landlord' : '👷 Worker'}
                        </span>
                      </td>
                      <td>{user.phone || 'N/A'}</td>
                      <td>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</td>
                      <td>
                        <span className={`status ${user.isActive !== false ? 'active' : 'inactive'}`}>
                          {user.isActive !== false ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="btn-view"
                            title="View Details"
                          >
                            👁️
                          </button>
                          <button
                            className="btn-toggle"
                            onClick={() => handleToggleUserStatus(user.id)}
                            title="Toggle Status"
                          >
                            🔄
                          </button>
                          <button
                            className="btn-delete"
                            onClick={() => handleDeleteUser(user.id)}
                            title="Delete User"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {users.length === 0 && (
                <div className="no-data">
                  <p>No users found</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'workers' && (
          <div className="workers-section">
            <div className="section-header">
              <h2>Worker Management</h2>
              <button className="btn-add">+ Add Worker</button>
            </div>
            <div className="info-message">
              <p>🔧 Worker management panel - Verify, approve, and manage worker profiles</p>
            </div>
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className="jobs-section">
            <div className="section-header">
              <h2>Job Management</h2>
              <button className="btn-add">+ Create Job</button>
            </div>
            <div className="info-message">
              <p>💼 Job management panel - Monitor, assign, and track all jobs on the platform</p>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="settings-section">
            <h2>Platform Settings</h2>
            <div className="settings-grid">
              <div className="setting-card">
                <h3>🔔 Notifications</h3>
                <p>Configure notification preferences</p>
                <button className="btn-configure">Configure</button>
              </div>
              <div className="setting-card">
                <h3>💳 Payment Settings</h3>
                <p>Manage payment gateways and fees</p>
                <button className="btn-configure">Configure</button>
              </div>
              <div className="setting-card">
                <h3>🔒 Security</h3>
                <p>Security and privacy settings</p>
                <button className="btn-configure">Configure</button>
              </div>
              <div className="setting-card">
                <h3>📧 Email Templates</h3>
                <p>Customize email notifications</p>
                <button className="btn-configure">Configure</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
