import { Link } from "react-router-dom";

const Icon = ({ d }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d={d} />
  </svg>
);

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <img src="/media/logo.png" alt="JOSHWAY" style={{ height: 42, marginBottom: 16 }} />
            <div className="social-row">
              <a href="https://www.facebook.com/JOSHWAYLV" aria-label="Facebook" target="_blank" rel="noreferrer"><Icon d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13v-2c0-.6.4-1 1-1z" /></a>
              <a href="https://www.instagram.com/JOSHWAYlv/" aria-label="Instagram" target="_blank" rel="noreferrer"><Icon d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm5 4.5A4.5 4.5 0 1 0 16.5 12 4.5 4.5 0 0 0 12 7.5zm6.2-.9a1.1 1.1 0 1 0 1.1 1.1 1.1 1.1 0 0 0-1.1-1.1zM12 9.2A2.8 2.8 0 1 1 9.2 12 2.8 2.8 0 0 1 12 9.2z" /></a>
              <a href="https://www.tiktok.com/@joshway_lv" aria-label="TikTok" target="_blank" rel="noreferrer"><Icon d="M14 4h2.2a5.2 5.2 0 0 0 3.8 3.6v2.2A7.4 7.4 0 0 1 16 8.6v6.2a5.8 5.8 0 1 1-5.8-5.8c.3 0 .6 0 .9.1v2.4a3.4 3.4 0 1 0 2.4 3.3V4z" /></a>
              <a href="https://twitter.com/JOSHWAYlv" aria-label="X" target="_blank" rel="noreferrer"><Icon d="M4 4h4.2l3.2 4.4L15.6 4H20l-6.2 7.2L20.4 20h-4.2l-3.6-5L8.2 20H4l6.6-7.6z" /></a>
              <a href="https://www.linkedin.com/company/JOSHWAY-org/" aria-label="LinkedIn" target="_blank" rel="noreferrer"><Icon d="M6.5 9H4V20h2.5zM5.2 4A1.6 1.6 0 1 0 5.2 7.2 1.6 1.6 0 0 0 5.2 4zM20 20h-2.5v-5.6c0-1.6-.6-2.6-2-2.6a2.2 2.2 0 0 0-2 1.4c-.1.3-.1.7-.1 1.1V20H11V9h2.4v1.5A3.4 3.4 0 0 1 16.6 9c2.4 0 3.4 1.6 3.4 4.6z" /></a>
            </div>
          </div>
          <div>
            <h3>Learn</h3>
            <ul>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/programs">Programs</Link></li>
              <li><Link to="/impact">Impact</Link></li>
              <li><a href="https://impact.joshway.org/" target="_blank" rel="noreferrer">Impact Dashboard</a></li>
              <li><Link to="/partners">Partners</Link></li>
              <li><Link to="/events">Events</Link></li>
            </ul>
          </div>
          <div>
            <h3>Get Involved</h3>
            <ul>
              <li><Link to="/donate">Give</Link></li>
              <li><Link to="/eitc">EITC Giving</Link></li>
              <li><Link to="/volunteer">Volunteer</Link></li>
              <li><a href="https://shop.joshway.org/" target="_blank" rel="noreferrer">Buy Merch</a></li>
              <li><Link to="/newsletter">Join Newsletter</Link></li>
            </ul>
          </div>
          <div>
            <h3>Contact JOSHWAY</h3>
            <address>
              913 Northampton Street<br />
              Easton, PA 18042<br />
              <a href="mailto:info@joshway.org">info@joshway.org</a>
            </address>
            <p style={{ marginTop: 12 }}><Link className="link" to="/contact">Contact Us</Link></p>
          </div>
        </div>
        <p className="fine">
          JOSHWAY® is a registered trademark and a 501(c)(3) nonprofit. Federal Tax ID: 88-4332763. We are an EITC-approved organization and UWGLV-qualified partner.
        </p>
        <div className="legal">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms & Conditions</Link>
          <span>© 2023–2026 JOSHWAY Inc. All Rights Reserved</span>
          <a href="https://www.instagram.com/jssocialagency/?hl=en" target="_blank" rel="noreferrer">Design by JS Social Agency</a>
        </div>
      </div>
    </footer>
  );
}
