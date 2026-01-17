'use client'

import NextImage from 'next/image'
import Header from '../components/Header'
import '../globals.css'

export default function SugarGradingPage() {
  return (
    <div>
      <Header />

      {/* Sugar Grading Section */}
      <section className="product-section">
        <div className="product-section-container">
          <div className="product-visual">
            <NextImage 
              src="/sugar.png" 
              alt="Sugar Grading Solutions" 
              width={800}
              height={600}
              className="product-image"
            />
          </div>
          <div className="product-content-panel">
            <p className="welcome-text">SUGAR GRADING</p>
            <h2 className="product-heading">High Frequency Screen for Sugar Grading</h2>
            <p className="product-description">
              Our specialized sugar grading screens deliver precise particle separation for sugar processing. The high frequency screening technology ensures consistent grading and quality control in sugar production facilities.
            </p>
            <div className="hero-buttons-vertical">
              <a href="/contact" className="btn-hero">CONTACT FOR MORE</a>
              <a href="/" className="btn-hero">LEARN MORE</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

