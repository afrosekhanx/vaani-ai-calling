import LogoMark from './LogoMark';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <a className="footer__logo" href="#top">
          <LogoMark size={26} /> Vaani
        </a>
        <p>Built as a design and React exercise. All numbers shown are sample data.</p>
        <p>© 2026 Vaani</p>
      </div>
    </footer>
  );
}
