import { NextRequest, NextResponse } from 'next/server'
// import nodemailer from 'nodemailer' // Disabled for now

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

    // Email sending disabled for now
    // TODO: Uncomment nodemailer import and code below to enable email sending
    /*
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })

    // Email content
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.COMPANY_EMAIL || 'Info@cruxtor.com',
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
    */

    // For now, just log and return success
    console.log('Contact form submission (email disabled):', { name, email, mobile, message })

    return NextResponse.json(
      { 
        success: true, 
        message: 'Form submitted successfully (email disabled)',
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Error processing form:', error)
    return NextResponse.json(
      { error: 'Failed to process form', details: error.message },
      { status: 500 }
    )
  }
}

