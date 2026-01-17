'use client'

import Header from '../components/Header'
import '../globals.css'

export default function ResourcesPage() {
  return (
    <div>
      <Header />

      {/* Resources Section */}
      <section className="quartz-section">
        <div className="quartz-container">
          <h1 className="quartz-main-title">Resources</h1>
          <p className="quartz-intro">
            Access technical documentation, specifications, and resources for CRUXTOR High Frequency Screens.
          </p>
          
          <div className="quartz-content">
            <h3 className="quartz-heading">Technical Documentation</h3>
            <p className="quartz-text">
              Comprehensive technical documentation covering installation, operation, and maintenance of CRUXTOR High Frequency Screens.
            </p>

            <h3 className="quartz-heading">Product Specifications</h3>
            <p className="quartz-text">
              Detailed specifications for all CRUXTOR High Frequency Screen models, including capacity ranges, operating parameters, and configuration options.
            </p>

            <h3 className="quartz-heading">Application Guides</h3>
            <p className="quartz-text">
              Industry-specific application guides to help you select the right screening solution for your requirements.
            </p>

            <h3 className="quartz-heading">Maintenance & Support</h3>
            <p className="quartz-text">
              Maintenance schedules, troubleshooting guides, and support resources to ensure optimal performance of your screening equipment.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

