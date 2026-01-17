# Cruxtor - High Frequency Screen Website

A Next.js replica of the ScreenNX website, rebranded as Cruxtor.

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build for Production

```bash
npm run build
npm start
```

## Features

- Responsive design matching the original ScreenNX website
- Contact form with file upload support and email integration
- Subscribe newsletter functionality with email notifications
- All sections from the original website
- Email sending via Nodemailer

## Email Configuration

To enable email functionality, you need to set up SMTP credentials:

1. Create a `.env.local` file in the root directory
2. Add the following environment variables:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
COMPANY_EMAIL=Info@cruxtor.com
```

### Gmail Setup (if using Gmail)

1. Enable 2-Step Verification on your Google account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use this password in `SMTP_PASSWORD`

### Other Email Providers

You can use any SMTP provider. Update `SMTP_HOST` and `SMTP_PORT` accordingly:
- **Gmail**: smtp.gmail.com:587
- **Outlook**: smtp-mail.outlook.com:587
- **Yahoo**: smtp.mail.yahoo.com:587
- **Custom SMTP**: Use your provider's settings

## Technologies Used

- Next.js 14
- React 18
- TypeScript
- CSS Modules



