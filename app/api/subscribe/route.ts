import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    // Validate email
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Create transporter for email
    const smtpUser = process.env.SMTP_USER || 'info@cruxtor.com'
    const smtpPass = process.env.SMTP_PASSWORD || 'Cruxtor@3044'
    
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtpout.secureserver.net',
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: true,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      tls: {
        // Do not fail on invalid certificates
        rejectUnauthorized: false,
      },
      // Add connection timeout
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
    })

    // Verify connection before sending
    try {
      await transporter.verify()
      console.log('SMTP server connection verified successfully')
    } catch (verifyError: any) {
      console.error('SMTP verification failed:', verifyError)
      throw new Error(`SMTP connection failed: ${verifyError.message || 'Authentication error. Please check your email credentials.'}`)
    }

    // Email content
    const mailOptions = {
      from: process.env.SMTP_USER || 'info@cruxtor.com',
      to: process.env.COMPANY_EMAIL || 'info@cruxto.com',
      subject: `New Newsletter Subscription: ${email}`,
      html: `
        <h2>New Newsletter Subscription</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subscribed at:</strong> ${new Date().toLocaleString()}</p>
      `,
    }

    // Send email
    const info = await transporter.sendMail(mailOptions)
    console.log('Subscription email sent successfully:', info.messageId)

    return NextResponse.json(
      { 
        success: true, 
        message: 'Subscription successful! Thank you for subscribing.',
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Error processing subscription:', error)
    
    // Provide more specific error messages
    let errorMessage = 'Failed to process subscription. Please try again later.'
    if (error.code === 'EAUTH') {
      errorMessage = 'Email authentication failed. Please check the email server configuration.'
    } else if (error.message) {
      errorMessage = error.message
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    )
  }
}

