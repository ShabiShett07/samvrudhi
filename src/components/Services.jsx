import './Services.css'

const Services = () => {
  const services = [
    {
      icon: '🌱',
      title: 'Planting & Seeding',
      description: 'Expert planting services for crops, trees, and landscaping with proper seed selection and placement.',
      features: ['Crop planting', 'Tree plantation', 'Seed selection', 'Soil preparation']
    },
    {
      icon: '🚜',
      title: 'Land Cultivation',
      description: 'Professional land preparation including plowing, tilling, and soil conditioning for optimal crop growth.',
      features: ['Plowing', 'Tilling', 'Harrowing', 'Land leveling']
    },
    {
      icon: '💧',
      title: 'Irrigation Systems',
      description: 'Installation and maintenance of efficient irrigation systems to ensure proper water management.',
      features: ['Sprinkler systems', 'Drip irrigation', 'Water management', 'System maintenance']
    },
    {
      icon: '🌾',
      title: 'Harvesting',
      description: 'Timely and efficient harvesting services to maximize crop yield and quality.',
      features: ['Crop harvesting', 'Post-harvest handling', 'Storage solutions', 'Quality control']
    },
    {
      icon: '🌿',
      title: 'Pest & Weed Control',
      description: 'Comprehensive pest management and weed control using sustainable and effective methods.',
      features: ['Pest control', 'Weed management', 'Disease prevention', 'Organic solutions']
    },
    {
      icon: '🔧',
      title: 'Equipment Maintenance',
      description: 'Professional maintenance and repair services for all types of agricultural equipment.',
      features: ['Equipment repair', 'Preventive maintenance', 'Parts replacement', 'Technical support']
    }
  ]

  return (
    <section id="services" className="services">
      <div className="services-container">
        <div className="services-header">
          <h2 className="services-title">Our Land Management Services</h2>
          <p className="services-subtitle">
            Choose from our comprehensive range of professional land management services
            tailored to meet your specific agricultural and maintenance needs.
          </p>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature, idx) => (
                  <li key={idx}>✓ {feature}</li>
                ))}
              </ul>
              <button className="service-button">Find Workers</button>
            </div>
          ))}
        </div>
        <div className="services-footer">
          <button className="view-more-button">View More Services</button>
        </div>
      </div>
    </section>
  )
}

export default Services