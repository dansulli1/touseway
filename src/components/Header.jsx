import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { nav } from "../data";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <a className="skip" href="#content">Skip to content</a>
      <div className="wrap header-inner">
        <Link to="/" className="logo" onClick={() => setOpen(false)} aria-label="JOSHWAY home">
          <img src="/media/logo.png" alt="JOSHWAY" />
        </Link>
        <nav className={`nav ${open ? "open" : ""}`} aria-label="Menu">
          {nav.map((group) => (
            <div className="nav-item" key={group.label}>
              <button className="menu-btn" type="button" aria-haspopup="true">
                {group.label} <i className="caret" />
              </button>
              <div className="dropdown">
                {group.items.map((item) => (
                  <Link key={item.title} to={item.to} onClick={() => setOpen(false)}>
                    <strong>{item.title}</strong>
                    <span>{item.desc}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <NavLink className="nav-link" to="/arcade" onClick={() => setOpen(false)}>Arcade</NavLink>
          <a className="nav-link" href="https://shop.joshway.org/" target="_blank" rel="noreferrer">Shop</a>
          <Link className="btn donate" to="/donate" onClick={() => setOpen(false)}>Donate</Link>
        </nav>
        <button className="burger" aria-label="Open menu" onClick={() => setOpen((v) => !v)}>
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
