import { NextRequest, NextResponse } from 'next/server'
// import nodemailer from 'nodemailer' // Disabled for now

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

    // Email sending disabled for now
    // TODO: Uncomment nodemailer import and code below to enable email sending
    /*
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })

    // Email content
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.COMPANY_EMAIL || 'Info@cruxtor.com',
      subject: `New Newsletter Subscription: ${email}`,
      html: `
        <h2>New Newsletter Subscription</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subscribed at:</strong> ${new Date().toLocaleString()}</p>
      `,
    }

    // Send email
    const info = await transporter.sendMail(mailOptions)
    */

    // For now, just log and return success
    console.log('Newsletter subscription (email disabled):', email)

    return NextResponse.json(
      { 
        success: true, 
        message: 'Subscription successful (email disabled)',
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Error processing subscription:', error)
    return NextResponse.json(
      { error: 'Failed to process subscription', details: error.message },
      { status: 500 }
    )
  }
}

