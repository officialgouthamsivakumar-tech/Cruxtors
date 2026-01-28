'use client'

import { useState } from 'react'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import Header from '../components/Header'
import { COMPANY_EMAIL, COMPANY_ADDRESS, COMPANY_PHONE, COMPANY_NAME } from '../config/constants'
import '../globals.css'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  
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


    setIsLoading(true)
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

      if (response.ok && data.success) {
        alert('Thank you for your inquiry! We will get back to you soon.')
        setFormData({ name: '', email: '', mobile: '', message: '' })
      } else {
        alert(data.error || data.message || 'There was an error sending your message. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('There was an error sending your message. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <Header />

      {/* Contact Section */}
      <section className="contact">
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
                <PhoneInput
                  international
                  defaultCountry="IN"
                  value={formData.mobile}
                  onChange={(value) => setFormData(prev => ({ ...prev, mobile: value || '' }))}
                  id="mobile"
                  className="phone-input"
                  countrySelectProps={{ unicodeFlags: true }}
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
              
              <button 
                type="submit" 
                className="btn btn-submit" 
                disabled={isLoading}
                style={{ 
                  opacity: isLoading ? 0.7 : 1, 
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  position: 'relative'
                }}
              >
                {isLoading ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <span 
                      style={{
                        width: '16px',
                        height: '16px',
                        border: '2px solid #ffffff',
                        borderTop: '2px solid transparent',
                        borderRadius: '50%',
                        animation: 'spin 0.8s linear infinite',
                        display: 'inline-block'
                      }}
                    />
                    Sending...
                  </span>
                ) : (
                  'Send'
                )}
              </button>
            </form>
            
            <div className="contact-info">
              <div className="info-box">
                <h3>MAIL US YOUR REQUIREMENT</h3>
                <p>
                  For inquiries about our advanced screening solutions, including fine screening technology and high frequency screens for M Sand Plants and sugar graders, please reach out to info@cruxtor.com.
                </p>
              </div>
              
              <div className="info-box">
                <h3>{COMPANY_NAME}</h3>
                <p>{COMPANY_ADDRESS}</p>
                <p>📞 {COMPANY_PHONE}</p>
                <p>📧 {COMPANY_EMAIL}</p>
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
    </div>
  )
}
