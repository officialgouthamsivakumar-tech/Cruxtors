'use client'

import NextImage from 'next/image'
import Header from '../components/Header'
import '../globals.css'

export default function SandPage() {
  return (
    <div>
      <Header />

      {/* Sand Section */}
      <section className="product-section">
        <div className="product-section-container">
          <div className="product-visual">
            <NextImage 
              src="/sand.png" 
              alt="Sand Screening Solutions" 
              width={800}
              height={600}
              className="product-image"
            />
          </div>
          <div className="product-content-panel">
            <p className="welcome-text">SAND</p>
            <h2 className="product-heading">High Frequency Screen for Sand Processing</h2>
            <p className="product-description">
              Our high frequency screens are specifically designed for sand processing applications, providing efficient and precise screening for M Sand plants. The advanced screening technology ensures optimal particle separation and high throughput rates.
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

