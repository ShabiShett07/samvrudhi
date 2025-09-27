import './UserTypeSelection.css'

const UserTypeSelection = ({ onUserTypeSelect, onBack }) => {
  return (
    <div className="user-type-selection">
      <div className="selection-container">
        <h2>Choose Your Role</h2>
        <p>Please select how you would like to register:</p>

        <div className="user-type-cards">
          <div className="user-type-card" onClick={() => onUserTypeSelect('landlord')}>
            <div className="card-icon">🏠</div>
            <h3>Landlord</h3>
            <p>I have properties to rent or manage</p>
            <button className="select-btn">Select Landlord</button>
          </div>

          <div className="user-type-card" onClick={() => onUserTypeSelect('worker')}>
            <div className="card-icon">🔧</div>
            <h3>Worker</h3>
            <p>I provide services like plumbing, electrical, etc.</p>
            <button className="select-btn">Select Worker</button>
          </div>
        </div>

        <button className="back-btn" onClick={onBack}>Back to Home</button>
      </div>
    </div>
  )
}

export default UserTypeSelection