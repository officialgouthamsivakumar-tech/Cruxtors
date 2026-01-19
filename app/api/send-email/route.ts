import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, mobile, message, attachments } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Create transporter for email
    const smtpUser = process.env.SMTP_USER 
    const smtpPass = process.env.SMTP_PASSWORD 
    
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST , 
      port: parseInt(process.env.SMTP_PORT||'0'
      ),
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
      console.error('SMTP verification failed:',JSON.stringify(verifyError));
      throw new Error(`SMTP connection failed: ${verifyError.message || 'Authentication error. Please check your email credentials.'}`)
    }

    // Email content
    const mailOptions = {
      from: process.env.SMTP_USER || 'info@cruxtor.com',
      to: process.env.COMPANY_EMAIL || 'info@cruxto.com',
      replyTo: email,
      subject: `Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mobile:</strong> ${mobile || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    }

    // Send email
    const info = await transporter.sendMail(mailOptions)
    console.log('Email sent successfully:', info.messageId)

    return NextResponse.json(
      { 
        success: true, 
        message: 'Form submitted successfully. We will get back to you soon.',
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Error processing form:', error)
    
    // Provide more specific error messages
    let errorMessage = 'Failed to send email. Please try again later.'
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

