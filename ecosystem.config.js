const path = require('path')
const fs = require('fs')

// Load .env file manually to ensure it's loaded
const envPath = path.resolve(__dirname, '.env')
if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, 'utf8')
  envFile.split('\n').forEach(line => {
    const trimmedLine = line.trim()
    // Skip comments and empty lines
    if (trimmedLine && !trimmedLine.startsWith('#')) {
      const match = trimmedLine.match(/^([^#=]+)=(.*)$/)
      if (match) {
        const key = match[1].trim()
        const value = match[2].trim()
        if (key && value) {
          process.env[key] = value
        }
      }
    }
  })
  console.log('Environment variables loaded from .env file')
  console.log('SMTP_HOST:', process.env.SMTP_HOST ? '✓ Set' : '✗ Missing')
  console.log('SMTP_PORT:', process.env.SMTP_PORT ? '✓ Set' : '✗ Missing')
  console.log('SMTP_USER:', process.env.SMTP_USER ? '✓ Set' : '✗ Missing')
  console.log('SMTP_PASSWORD:', process.env.SMTP_PASSWORD ? '✓ Set' : '✗ Missing')
} else {
  console.warn('.env file not found at:', envPath)
}

// Also try dotenv as fallback
try {
  require('dotenv').config({ path: envPath })
} catch (e) {
  console.warn('dotenv not available, using manual parsing')
}

module.exports = {
  apps: [
    {
      name: 'cruxtor',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      cwd: './',
      instances: 1,
      exec_mode: 'fork',
      env_file: '.env',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
        SMTP_HOST: process.env.SMTP_HOST || 'smtpout.secureserver.net',
        SMTP_PORT: process.env.SMTP_PORT || '465',
        SMTP_USER: process.env.SMTP_USER || 'info@cruxtor.com',
        SMTP_PASSWORD: process.env.SMTP_PASSWORD || 'Cruxtor@3044',
        COMPANY_EMAIL: process.env.COMPANY_EMAIL || 'info@cruxtor.com',
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
    },
  ],
}

