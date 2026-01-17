'use client'

import { useState } from 'react'
import NextImage from 'next/image'
import Header from './components/Header'
import { COMPANY_EMAIL, COMPANY_ADDRESS } from './config/constants'
import './globals.css'

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: ''
  })
  const [subscribeEmail, setSubscribeEmail] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const sanitizeInput = (input: string, maxLength: number): string => {
    return input
      .trim()
      .substring(0, maxLength)
      .replace(/[<>]/g, '') // Remove potential HTML tags
  }

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(formData.name, 100),
      email: sanitizeInput(formData.email, 255).toLowerCase(),
      mobile: sanitizeInput(formData.mobile, 20),
      message: sanitizeInput(formData.message, 5000),
    }

    // Validate required fields
    if (!sanitizedData.name || !sanitizedData.email) {
      alert('Please fill in all required fields.')
      return
    }

    // Validate email format
    if (!validateEmail(sanitizedData.email)) {
      alert('Please enter a valid email address.')
      return
    }


    // Email sending disabled for now
    // TODO: Enable email sending by uncommenting the code below
    /*
    try {
      // Send email via API
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedData),
      })

      const data = await response.json()

      if (response.ok) {
        alert('Thank you for your inquiry! We will get back to you soon.')
        setFormData({ name: '', email: '', mobile: '', message: '' })
      } else {
        alert(data.error || 'There was an error sending your message. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('There was an error sending your message. Please try again.')
    }
    */
    
    // Open email client with mailto link
    const subject = encodeURIComponent(`Contact Form Submission from ${sanitizedData.name}`)
    const body = encodeURIComponent(
      `Name: ${sanitizedData.name}\n` +
      `Email: ${sanitizedData.email}\n` +
      `Mobile: ${sanitizedData.mobile || 'Not provided'}\n\n` +
      `Message:\n${sanitizedData.message}`
    )
    const mailtoLink = `mailto:${COMPANY_EMAIL}?subject=${subject}&body=${body}`
    
    // Open email client
    window.location.href = mailtoLink
    
    // Reset form after a short delay
    setTimeout(() => {
      setFormData({ name: '', email: '', mobile: '', message: '' })
    }, 100)
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Sanitize and validate email
    const sanitizedEmail = sanitizeInput(subscribeEmail, 255).toLowerCase()
    
    if (!sanitizedEmail) {
      alert('Please enter an email address.')
      return
    }

    if (!validateEmail(sanitizedEmail)) {
      alert('Please enter a valid email address.')
      return
    }

    // Email sending disabled for now
    // TODO: Enable email sending by uncommenting the code below
    /*
    try {
      // Send subscription via API
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: sanitizedEmail }),
      })

      const data = await response.json()

      if (response.ok) {
        alert('Thank you for subscribing!')
        setSubscribeEmail('')
      } else {
        alert(data.error || 'There was an error processing your subscription. Please try again.')
      }
    } catch (error) {
      console.error('Error subscribing:', error)
      alert('There was an error processing your subscription. Please try again.')
    }
    */
    
    // For now, just show success message without sending email
    console.log('Subscribe (email disabled):', sanitizedEmail)
    alert('Thank you for subscribing!')
    setSubscribeEmail('')
  }

  return (
    <div>
      <Header />

      {/* Hero Section - Home */}
      <section id="home" className="hero-home">
        <div className="hero-home-container">
          <div className="hero-content-left">
            <div className="content-section">
              <h2 className="content-heading">Advanced Screening Technology</h2>
              <p className="content-text">
                CRUXTOR High Frequency Screens represent the pinnacle of screening technology, engineered specifically for modern industrial applications. Our purpose-built solutions deliver precise particle size distribution control, ensuring optimal performance across diverse industries.
              </p>
              <ul className="content-features">
                <li>Operating speeds from 2,800 to 6,000 RPM for precise separation</li>
                <li>Stainless steel screening media for high-purity applications</li>
                <li>Energy-efficient operation with ultra-low power consumption</li>
                <li>Non-blinding performance even with fine materials</li>
                <li>Compact design with high throughput capacity</li>
              </ul>
            </div>

            <div className="content-section">
              <h2 className="content-heading">Key Applications</h2>
              <div className="applications-grid-small">
                <div className="app-item">
                  <strong>M Sand Production</strong>
                  <p>Manufactured sand with precise gradation control</p>
                </div>
                <div className="app-item">
                  <strong>Sugar Grading</strong>
                  <p>Accurate particle size classification for sugar processing</p>
                </div>
                <div className="app-item">
                  <strong>Mineral Processing</strong>
                  <p>Efficient screening for metallic and non-metallic minerals</p>
                </div>
                <div className="app-item">
                  <strong>Fertilizer Industry</strong>
                  <p>Reliable grading for various fertilizer formulations</p>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-content-panel">
            <p className="welcome-text">WELCOME</p>
            <h1 className="hero-main-heading">High Frequency Screen - fine screening technology used widely in M Sand Plant and Sugar Grader</h1>
            <p className="hero-description-text">
              The high frequency screen is an essential component of advanced screening solutions, designed for the fine screening technology of solid bulk material. It plays a crucial role in M Sand Plant operations and also serves effectively as a sugar grader.
            </p>
            <div className="hero-buttons-vertical">
              <a href="#contact" className="btn-hero">CONTACT FOR MORE</a>
              <a href="#about" className="btn-hero">LEARN MORE</a>
            </div>
          </div>
        </div>
        
        {/* TrustedSite Badge */}
        <div className="trusted-badge">
          <div className="trusted-badge-content">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z" fill="white"/>
            </svg>
            <span>TrustedSite</span>
          </div>
        </div>

        {/* Chat Icon */}
        <div className="chat-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H6L4 18V4H20V16Z" fill="white"/>
            <path d="M7 9H17V11H7V9ZM7 12H15V14H7V12Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Sand Section */}
      <section id="sand" className="product-section">
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
              <a href="#contact" className="btn-hero">CONTACT FOR MORE</a>
              <a href="#about" className="btn-hero">LEARN MORE</a>
            </div>
          </div>
        </div>
      </section>

      {/* Sugar Grading Section */}
      <section id="sugar-grading" className="product-section">
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
              <a href="#contact" className="btn-hero">CONTACT FOR MORE</a>
              <a href="#about" className="btn-hero">LEARN MORE</a>
            </div>
          </div>
        </div>
      </section>

      {/* Fertiliser Section */}
      <section id="fertiliser" className="product-section">
        <div className="product-section-container">
          <div className="product-visual">
            <NextImage 
              src="/fertilizer.png" 
              alt="Fertiliser Screening Solutions" 
              width={800}
              height={600}
              className="product-image"
            />
          </div>
          <div className="product-content-panel">
            <p className="welcome-text">FERTILISER</p>
            <h2 className="product-heading">High Frequency Screen for Fertiliser Processing</h2>
            <p className="product-description">
              Our high frequency screens are engineered for fertiliser processing applications, providing efficient screening and grading of fertiliser particles. The technology ensures uniform particle size distribution and optimal product quality.
            </p>
            <div className="hero-buttons-vertical">
              <a href="#contact" className="btn-hero">CONTACT FOR MORE</a>
              <a href="#about" className="btn-hero">LEARN MORE</a>
            </div>
          </div>
        </div>
      </section>

      {/* Quartz Powder Section */}
      <section id="quartz-powder" className="quartz-section">
        <div className="quartz-container">
          <h1 className="quartz-main-title">Quartz Powder Processing with High Frequency Screens</h1>
          <h2 className="quartz-subtitle">QUARTZ</h2>
          <p className="quartz-intro">High Frequency Screens for Quartz Processing & Quartz Powder Production</p>
          
          <div className="quartz-content">
            <p className="quartz-text">
              High Frequency Screens are advanced quartz processing equipment designed for precise particle size classification in quartz sand and quartz powder production plants. Operating at speeds ranging from 2,800 to 6,000 RPM, these screens are engineered to handle the hard, abrasive, and brittle characteristics of quartz while ensuring consistent quality and high throughput.
            </p>
            
            <p className="quartz-text">
              The system utilizes stainless steel (SS) screening media, making it particularly suitable for applications that demand high purity, dimensional accuracy, and long service life.
            </p>

            <h3 className="quartz-heading">Why High Frequency Screens Are Ideal for Quartz Processing</h3>
            <p className="quartz-text">
              Quartz processing requires sharp separation, minimal contamination, and reliable performance at fine sizes. High Frequency Screens effectively meet these needs through high-speed vibration and rigid SS screen decks.
            </p>

            <h3 className="quartz-heading">Precise Fine Screening of Quartz Sand</h3>
            <p className="quartz-text">High vibration speeds enable:</p>
            <ul className="quartz-list">
              <li>Accurate separation below 1 mm</li>
              <li>Narrow and repeatable particle size distribution (PSD)</li>
              <li>Clean segregation of quartz sand grades</li>
            </ul>
            <p className="quartz-text">
              This makes High Frequency Screens perfect for quartz sand classification, beneficiation plants, and controlled feed preparation for grinding.
            </p>

            <h3 className="quartz-heading">Stainless Steel Screening Media – Built for Quartz Production</h3>
            <p className="quartz-text">The use of SS wire mesh and SS screen panels provides:</p>
            <ul className="quartz-list">
              <li>High resistance to abrasion from quartz</li>
              <li>Dimensional stability at high vibration frequencies</li>
              <li>Suitability for high-purity quartz applications</li>
            </ul>
            <p className="quartz-text">
              SS media ensures consistent aperture accuracy, which is essential for both quartz sand and quartz powder production.
            </p>

            <h3 className="quartz-heading">Non-Blinding Performance with Quartz Fines</h3>
            <p className="quartz-text">
              At operating speeds of 2,800–6,000 RPM, the high G-force vibration prevents particle lodging in SS apertures, maintains an open screening area, and enables continuous operation without choking. This guarantees stable performance even with fine quartz material.
            </p>

            <h3 className="quartz-heading">Reduced Over-Grinding and Energy Savings</h3>
            <p className="quartz-text">
              Accurate screening ensures that only true oversize material returns to the mill, resulting in lower grinding energy consumption, reduced generation of ultra-fine quartz, and improved recovery of saleable size fractions. This directly lowers operating costs per ton in quartz powder manufacturing plants.
            </p>

            <h3 className="quartz-heading">High Throughput with Compact Footprint</h3>
            <p className="quartz-text">
              High Frequency Screens operate with a thin material bed, allowing faster particle travel and higher capacity per unit screen area. This makes them ideal for space-constrained quartz processing plants, retrofits, and capacity upgrades.
            </p>

            <h3 className="quartz-heading">Role of High Frequency Screens in Quartz Powder Production</h3>
            <p className="quartz-text">
              In quartz powder production, product performance heavily relies on particle size control and consistency. High Frequency Screens are integral for pre-classification before grinding, post-grinding size control, and tight PSD management for downstream applications. This enhances powder uniformity, reduces mill load, and boosts overall plant efficiency.
            </p>

            <h3 className="quartz-heading">Applications of Quartz Powder</h3>
            <p className="quartz-text">Quartz powder screened using High Frequency Screens is extensively used in:</p>
            <ul className="quartz-list">
              <li>Glass and specialty glass manufacturing</li>
              <li>Ceramics and vitrified tiles</li>
              <li>Paints, coatings, and wall putty</li>
              <li>Electronics and semiconductor fillers</li>
              <li>Construction chemicals and epoxy flooring systems</li>
            </ul>

            <h3 className="quartz-heading">Key Advantages at a Glance</h3>
            <ul className="quartz-list">
              <li>Operating speed: 2,800–6,000 RPM</li>
              <li>Stainless steel screening media for accuracy and durability</li>
              <li>Sharp cut sizes for quartz sand and powder</li>
              <li>Non-blinding performance with fine quartz</li>
              <li>Lower grinding energy and operating cost</li>
              <li>Compact design with high throughput</li>
            </ul>

            <h3 className="quartz-heading">Reliable Screening Technology for Quartz Processing</h3>
            <p className="quartz-text">
              High Frequency Screens with SS screening media are a proven solution for quartz mining, beneficiation, sand processing, and quartz powder production. They deliver consistent product quality, reduced operating costs, and long-term reliability in demanding quartz applications.
            </p>
          </div>
        </div>
      </section>

      {/* Silica Sand Section */}
      <section id="silica-sand" className="quartz-section">
        <div className="quartz-container">
          <h1 className="quartz-main-title">About High Frequency Screen</h1>
          <h2 className="quartz-subtitle">Silica Sand</h2>
          <h1 className="quartz-main-title" style={{ fontSize: '2rem', marginTop: '1rem' }}>High Frequency Screens for Silica Sand Processing & Classification</h1>
          
          <div className="quartz-content">
            <p className="quartz-text">
              Silica sand processing requires <strong>high precision screening</strong>, consistent particle size distribution, and minimal contamination. High Frequency Screens are widely used in <strong>silica sand beneficiation and processing plants</strong> to achieve accurate size classification, high throughput, and reliable performance—especially in fine and ultra-fine size ranges.
            </p>
            
            <p className="quartz-text">
              Operating at <strong>2,800 to 6,000 RPM</strong>, High Frequency Screens are engineered to handle the <strong>hard, abrasive nature of silica sand</strong> while delivering sharp separation and stable operation.
            </p>

            <h3 className="quartz-heading">Why High Frequency Screens Are Ideal for Silica Sand</h3>
            <p className="quartz-text">
              Silica sand is used in multiple industrial applications where <strong>particle size accuracy directly affects product performance</strong>. Conventional screens often struggle with blinding, low efficiency, and inconsistent cut sizes. High Frequency Screens overcome these challenges through high-speed vibration and rigid screen construction.
            </p>

            <h3 className="quartz-heading">Accurate Fine Screening of Silica Sand</h3>
            <p className="quartz-text">High Frequency Screens provide:</p>
            <ul className="quartz-list">
              <li>Sharp cut sizes below <strong>1 mm</strong></li>
              <li>Narrow and repeatable particle size distribution (PSD)</li>
              <li>Clean separation of multiple silica sand grades</li>
            </ul>
            <p className="quartz-text">
              This makes them ideal for <strong>glass-grade silica sand</strong>, <strong>foundry sand</strong>, and <strong>industrial sand processing</strong>.
            </p>

            <h3 className="quartz-heading">Stainless Steel Screening Media for Purity</h3>
            <p className="quartz-text">High Frequency Screens used in silica sand plants typically employ <strong>stainless steel (SS) screening media</strong>, which offers:</p>
            <ul className="quartz-list">
              <li>High resistance to abrasion</li>
              <li>Dimensional accuracy at high vibration speeds</li>
              <li>Suitability for high-purity silica sand applications</li>
            </ul>
            <p className="quartz-text">
              SS screening media ensures <strong>consistent aperture control</strong>, critical for premium silica sand markets.
            </p>

            <h3 className="quartz-heading">Non-Blinding Performance with Fine Silica</h3>
            <p className="quartz-text">
              Fine silica particles tend to clog conventional screens. High Frequency Screens operate with:
            </p>
            <ul className="quartz-list">
              <li>High G-force vibration</li>
              <li>Low amplitude stroke</li>
            </ul>
            <p className="quartz-text">
              This prevents particle lodging, maintains open screening area, and ensures <strong>continuous, clog-free operation</strong>.
            </p>

            <h3 className="quartz-heading">Reduced Over-Grinding and Energy Efficiency</h3>
            <p className="quartz-text">
              Accurate classification ensures that only true oversize material is sent back for grinding, resulting in:
            </p>
            <ul className="quartz-list">
              <li>Lower mill power consumption</li>
              <li>Reduced generation of excess fines</li>
              <li>Higher recovery of usable silica sand fractions</li>
            </ul>
            <p className="quartz-text">
              This improves overall <strong>plant energy efficiency and operating cost per ton</strong>.
            </p>

            <h3 className="quartz-heading">High Throughput with Compact Footprint</h3>
            <p className="quartz-text">High Frequency Screens allow:</p>
            <ul className="quartz-list">
              <li>Thin material bed depth</li>
              <li>Faster material travel across the deck</li>
            </ul>
            <p className="quartz-text">
              This enables high capacity screening in a compact layout, ideal for <strong>space-constrained silica sand plants</strong> and retrofit installations.
            </p>

            <h3 className="quartz-heading">Applications of Screened & Processed Silica Sand</h3>
            <p className="quartz-text">
              Properly screened and processed silica sand is a critical raw material across multiple industries.
            </p>

            <h4 className="quartz-subheading">Glass Industry</h4>
            <ul className="quartz-list">
              <li>Float glass</li>
              <li>Container glass</li>
              <li>Specialty and solar glass</li>
            </ul>
            <p className="quartz-text" style={{ marginTop: '0.5rem' }}>
              Requires narrow PSD and high purity silica sand.
            </p>

            <h4 className="quartz-subheading">Foundry Industry</h4>
            <ul className="quartz-list">
              <li>Moulding sand</li>
              <li>Core sand</li>
            </ul>
            <p className="quartz-text" style={{ marginTop: '0.5rem' }}>
              Consistent grain size improves casting quality and surface finish.
            </p>

            <h4 className="quartz-subheading">Construction & Building Materials</h4>
            <ul className="quartz-list">
              <li>Plaster</li>
              <li>Flooring compounds</li>
              <li>Specialty mortars</li>
            </ul>
            <p className="quartz-text" style={{ marginTop: '0.5rem' }}>
              Screened silica sand improves strength and workability.
            </p>

            <h4 className="quartz-subheading">Ceramics & Tiles</h4>
            <ul className="quartz-list">
              <li>Body and glaze formulations</li>
            </ul>
            <p className="quartz-text" style={{ marginTop: '0.5rem' }}>
              Controlled particle size ensures uniform firing and strength.
            </p>

            <h4 className="quartz-subheading">Paints, Coatings & Chemicals</h4>
            <ul className="quartz-list">
              <li>Functional fillers</li>
              <li>Anti-abrasive additives</li>
            </ul>
            <p className="quartz-text" style={{ marginTop: '0.5rem' }}>
              Fine silica sand enhances durability and chemical resistance.
            </p>

            <h4 className="quartz-subheading">Water Filtration</h4>
            <ul className="quartz-list">
              <li>Filter media for drinking and industrial water</li>
            </ul>
            <p className="quartz-text" style={{ marginTop: '0.5rem' }}>
              Uniform grading ensures effective filtration performance.
            </p>

            <h3 className="quartz-heading">Key Advantages of High Frequency Screens in Silica Sand Plants</h3>
            <ul className="quartz-list">
              <li>Operating speed: <strong>2,800–6,000 RPM</strong></li>
              <li>Precise fine screening of silica sand</li>
              <li>Stainless steel screening media for purity and durability</li>
              <li>Non-blinding performance with fine material</li>
              <li>Lower grinding energy and operating costs</li>
              <li>High throughput in a compact design</li>
            </ul>

            <h3 className="quartz-heading">Reliable Screening Technology for Silica Sand Processing</h3>
            <p className="quartz-text">
              High Frequency Screens are a proven solution for <strong>silica sand beneficiation plants</strong>, <strong>industrial sand processing units</strong>, and <strong>high-purity silica sand producers</strong>. They deliver consistent product quality, improved efficiency, and long-term reliability for demanding silica sand applications.
            </p>
          </div>
        </div>
      </section>

      {/* Technical Features Section */}
      <section id="technical-features" className="technical-section">
        <div className="technical-container">
          <h2 className="section-title">CRUXTOR High Frequency Screening Technology</h2>
          <p className="technical-intro">
            CRUXTOR delivers high-frequency screening technology for modern manufactured sand plants, designed for precise particle size distribution control, energy efficiency, and environmentally compliant dry processing. Also used in fines screening for metallic, non-metallic minerals, chemicals in solid bulk material handling.
          </p>
          <p className="technical-tagline">
            CUSTOM DESIGNED FOR FOOD AND AGRO PROCESSING. WIDELY USED IN FERTILISERS.
          </p>

          <div className="technical-grid">
            <div className="technical-features-box">
              <h3 className="technical-box-title">KEY TECHNICAL FEATURES</h3>
              <div className="features-list">
                <div className="feature-item">
                  <span className="feature-number">1.</span>
                  <span className="feature-text">Capacity range from <strong>10 TPH to 200 TPH</strong></span>
                </div>
                <div className="feature-item">
                  <span className="feature-number">2.</span>
                  <span className="feature-text">Custom designed size and configuration as per application requirement</span>
                </div>
                <div className="feature-item">
                  <span className="feature-number">3.</span>
                  <span className="feature-text">Variable operating frequency from <strong>2800 to 6000 RPM</strong></span>
                </div>
                <div className="feature-item">
                  <span className="feature-number">4.</span>
                  <span className="feature-text">Multideck inclined screen design based on desired particle size distribution</span>
                </div>
                <div className="feature-item">
                  <span className="feature-number">5.</span>
                  <span className="feature-text">High G-forces up to <strong>40G</strong> for sharp and efficient separation</span>
                </div>
                <div className="feature-item">
                  <span className="feature-number">6.</span>
                  <span className="feature-text">Ultra-low energy consumption - approx. <strong>0.13 kW per ton</strong></span>
                </div>
                <div className="feature-item">
                  <span className="feature-number">7.</span>
                  <span className="feature-text">Low carbon footprint with energy efficient operation</span>
                </div>
                <div className="feature-item">
                  <span className="feature-number">8.</span>
                  <span className="feature-text">No lubrication required - minimal maintenance</span>
                </div>
                <div className="feature-item">
                  <span className="feature-number">9.</span>
                  <span className="feature-text">No water required for sand processing</span>
                </div>
                <div className="feature-item">
                  <span className="feature-number">10.</span>
                  <span className="feature-text">Provision for dust collection system - clean and environment-friendly</span>
                </div>
                <div className="feature-item">
                  <span className="feature-number">11.</span>
                  <span className="feature-text">Pollution control norms compliant</span>
                </div>
                <div className="feature-item">
                  <span className="feature-number">12.</span>
                  <span className="feature-text">Each deck with independent amplitude and frequency control</span>
                </div>
                <div className="feature-item">
                  <span className="feature-number">13.</span>
                  <span className="feature-text">Amplitude and frequency tuned per particle size for optimum output</span>
                </div>
                <div className="feature-item">
                  <span className="feature-number">14.</span>
                  <span className="feature-text">Efficient silt removal from crusher dust</span>
                </div>
                <div className="feature-item">
                  <span className="feature-number">15.</span>
                  <span className="feature-text">Full PSD customization - top size, bottom size, and intermediate fractions</span>
                </div>
              </div>
            </div>

            <div className="benefits-box">
              <h3 className="technical-box-title">CUSTOMER BENEFITS</h3>
              <div className="benefits-list">
                <div className="benefit-item">Higher saleable sand recovery</div>
                <div className="benefit-item">Improved concrete strength and plaster finish</div>
                <div className="benefit-item">Reduced recirculation and plant load</div>
                <div className="benefit-item">Cleaner, dust-controlled working environment</div>
                <div className="benefit-item">Consistent and repeatable particle size distribution</div>
                <div className="benefit-item">Lower operating cost per ton</div>
                <div className="benefit-item">Compact footprint - easy retrofit into existing plants</div>
              </div>
            </div>
          </div>

          <div className="purpose-built-box">
            <h3 className="technical-box-title">CRUXTOR - PURPOSE-BUILT ENGINEERING</h3>
            <p className="purpose-text">
              High Frequency Screens are designed not as generic equipment, but engineered specifically for sand producers who demand performance, control, and sustainability.
            </p>
          </div>

          <div className="psd-reference-box">
            <h3 className="technical-box-title">IS 383 - ZONE II & PLASTER SAND PSD REFERENCE</h3>
            <p className="psd-text">
              CRUXTOR High Frequency Screens allow tuning of amplitude and frequency at each deck, enabling producers to achieve IS 383 Zone II compliance or plaster sand gradation without water.
            </p>
            <div className="psd-note">
              <p><strong>IS 383 Zone II:</strong> Standard specification for fine aggregate (sand) for concrete</p>
              <p><strong>Plaster Sand:</strong> Specially graded sand for plastering applications with controlled particle size distribution</p>
            </div>
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section id="applications" className="applications-section">
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

      {/* About Section */}
      <section id="about" className="about">
        <div className="about-container">
          <h2 className="section-title">About CRUXTOR</h2>
          <p className="section-subtitle">High Frequency Screen.</p>
          
          <div className="about-content">
            <div className="about-text">
              <p>
                At Cruxtor, we strive to revolutionize the material handling equipment industry by providing advanced screening solutions. Our focus is on delivering innovative technologies, such as fine screening technology and high frequency screens, that enhance operational efficiency and productivity. We also cater to specific needs, including M Sand Plants and sugar graders, ensuring our clients receive the best solutions for their requirements.
              </p>
            </div>
            <div className="vision-box">
              <h3>Our Vision</h3>
              <p>
                At Cruxtor, we strive to revolutionize the material handling equipment industry by providing advanced screening solutions. Our focus is on delivering innovative technologies, such as fine screening technology and high frequency screens, that enhance operational efficiency and productivity. We also cater to specific needs, including M Sand Plants and sugar graders, ensuring our clients receive the best solutions for their requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="contact-container">
          <h2 className="section-title">Contact Us</h2>
          <p className="section-subtitle">Drop us a line!</p>
          
          <div className="contact-grid">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email*</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="mobile">Mobile number</label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                />
              </div>
              
              <button type="submit" className="btn btn-submit">Send</button>
            </form>
            
            <div className="contact-info">
              <div className="info-box">
                <h3>MAIL US YOUR REQUIREMENT</h3>
                <p>
                  For inquiries about our advanced screening solutions, including fine screening technology and high frequency screens for M Sand Plants and sugar graders, please reach out to {COMPANY_EMAIL}.
                </p>
              </div>
              
              <div className="info-box">
                <h3>Cruxtor</h3>
                <p>{COMPANY_ADDRESS}</p>
                <p>{COMPANY_EMAIL}</p>
              </div>
              
              <div className="info-box">
                <h3>Hours</h3>
                <table className="hours-table">
                  <thead>
                    <tr>
                      <th>Day</th>
                      <th>Hours</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Mon</td>
                      <td>09:00 am – 05:00 pm</td>
                    </tr>
                    <tr>
                      <td>Tue</td>
                      <td>09:00 am – 05:00 pm</td>
                    </tr>
                    <tr>
                      <td>Wed</td>
                      <td>09:00 am – 05:00 pm</td>
                    </tr>
                    <tr>
                      <td>Thu</td>
                      <td>09:00 am – 05:00 pm</td>
                    </tr>
                    <tr>
                      <td>Fri</td>
                      <td>09:00 am – 05:00 pm</td>
                    </tr>
                    <tr>
                      <td>Sat</td>
                      <td>Closed</td>
                    </tr>
                    <tr>
                      <td>Sun</td>
                      <td>Closed</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="subscribe">
        <div className="subscribe-container">
          <h2>Subscribe</h2>
          <p>
            Sign up to hear from us about our advanced screening solutions, including specials on fine screening technology, sales related to high frequency screens, and events featuring our M Sand Plant and sugar grader.
          </p>
          <form className="subscribe-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Email"
              value={subscribeEmail}
              onChange={(e) => setSubscribeEmail(e.target.value)}
              required
            />
            <button type="submit">Sign up</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Blog</h3>
            </div>
            <div className="footer-section">
              <h3>Cruxtor</h3>
              <p>{COMPANY_ADDRESS}</p>
              <p>{COMPANY_EMAIL}</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>Copyright © 2026 CRUXTOR - All Rights Reserved.</p>
            <p>Powered by</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
