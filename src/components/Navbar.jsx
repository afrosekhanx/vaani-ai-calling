import { useState } from 'react';
import LogoMark from './LogoMark';
import './Navbar.css';

const links = [
  { href: '#dialer', label: 'Live dialer' },
  { href: '#analytics', label: 'Analytics' },
  { href: '#how', label: 'How it works' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <div className="container nav__inner">
        <a className="nav__logo" href="#top">
          <LogoMark /> Vaani
        </a>

        <nav className={`nav__links ${open ? 'is-open' : ''}`}>
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <a className="btn btn--primary nav__cta" href="#cta" onClick={() => setOpen(false)}>
            Book a demo
          </a>
        </nav>

        <button
          className={`nav__toggle ${open ? 'is-open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
