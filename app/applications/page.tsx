'use client'

import Header from '../components/Header'
import '../globals.css'

export default function ApplicationsPage() {
  return (
    <div>
      <Header />

      {/* Applications Section */}
      <section className="applications-section">
        <div className="applications-container">
          <h2 className="section-title">APPLICATIONS OF HIGH FREQUENCY SCREENS</h2>
          
          <div className="applications-grid">
            <div className="application-panel">
              <h3 className="panel-header">Metallic Minerals</h3>
              <ul className="panel-list">
                <li>Iron ore fines</li>
                <li>Copper ore</li>
                <li>Zinc & lead ores</li>
                <li>Manganese ore</li>
                <li>Chromite</li>
                <li>Bauxite</li>
                <li>Gold ore (pre-classification)</li>
              </ul>
            </div>

            <div className="application-panel">
              <h3 className="panel-header">Non-Metallic Minerals</h3>
              <ul className="panel-list">
                <li>Quartz & silica sand</li>
                <li>Feldspar</li>
                <li>Limestone & dolomite</li>
                <li>Kaolin & china clay</li>
                <li>Bariter</li>
                <li>Talc</li>
                <li>Phosphate rock</li>
                <li>Bentonite</li>
                <li>Garnet</li>
                <li>Fluorspar</li>
              </ul>
            </div>

            <div className="application-panel">
              <h3 className="panel-header">Sand Processing & Manufactured Sand (M-Sand)</h3>
              <ul className="panel-list">
                <li>Manufactured sand (M-Sand)</li>
                <li>Plaster sand (P-Sand)</li>
                <li>Crusher dust processing</li>
              </ul>
            </div>

            <div className="application-panel">
              <h3 className="panel-header">Quartz, Silica & High-Purity Materials</h3>
              <ul className="panel-list">
                <li>Quartz sand classification</li>
                <li>Quartz powder production</li>
                <li>High-purity silica sand</li>
                <li>Foundry silica sand</li>
                <li>Industrial silica sand</li>
              </ul>
            </div>

            <div className="application-panel">
              <h3 className="panel-header">Fertilizer Industry Applications</h3>
              <ul className="panel-list">
                <li>Urea</li>
                <li>DAP</li>
                <li>MAP</li>
                <li>NPK</li>
                <li>SSP</li>
                <li>Potash</li>
              </ul>
            </div>

            <div className="application-panel">
              <h3 className="panel-header">Chemical Industry Applications</h3>
              <ul className="panel-list">
                <li>Soda ash</li>
                <li>Calcium carbonate</li>
                <li>Sodium bicarbonate</li>
                <li>Industrial salts</li>
                <li>Sulphur granules</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
