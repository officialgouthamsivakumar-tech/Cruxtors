'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import NextImage from 'next/image'

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-container">
          <Link href="/" className="logo">
            <NextImage 
              src="/cruxtor.png" 
              alt="Cruxtor - Purpose-Built Engineering" 
              width={180}
              height={60}
              className="logo-image"
              priority
            />
          </Link>
        </div>
        <nav className="nav-container">
          <ul className="nav-menu">
            <li>
              <Link href="/" className={pathname === '/' ? 'active' : ''}>
                HOME
              </Link>
            </li>
            <li>
              <Link href="/sand" className={pathname === '/sand' ? 'active' : ''}>
                SAND
              </Link>
            </li>
            <li>
              <Link href="/sugar-grading" className={pathname === '/sugar-grading' ? 'active' : ''}>
                SUGAR GRADING
              </Link>
            </li>
            <li>
              <Link href="/applications" className={pathname === '/applications' ? 'active' : ''}>
                APPLICATIONS
              </Link>
            </li>
            <li>
              <Link href="/resources" className={pathname === '/resources' ? 'active' : ''}>
                RESOURCES
              </Link>
            </li>
            <li>
              <Link href="/contact" className={`nav-button ${pathname === '/contact' ? 'active' : ''}`}>
                CONTACT US
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

