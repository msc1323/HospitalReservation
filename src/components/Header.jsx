import React, { useState } from "react";

// The header’s own state only tracks whether the mobile menu is open.
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="header">
      <div className="container header-inner">
        <a
          href="#"
          className="logo"
          aria-label="Orvosi időpontfoglalás főoldal"
        >
          <span className="logo-symbol">
            <i
              className="icon bi bi-plus-lg"
              style={{ fontSize: 25 }}
              aria-hidden="true"
            />
          </span>
          Orvosi időpontfoglalás
        </a>
        <nav
          className={menuOpen ? "navigation is-open" : "navigation"}
          aria-label="Főmenü"
        >
          <a href="#szakteruletek" onClick={() => setMenuOpen(false)}>
            Szakterületek
          </a>
          <a href="#orvosok" onClick={() => setMenuOpen(false)}>
            Orvosaink
          </a>
        </nav>
        <a className="button header-button" href="#kereso">
          Időpontot keresek{" "}
          <i
            className="icon bi bi-arrow-right"
            style={{ fontSize: 18 }}
            aria-hidden="true"
          />
        </a>
        <button
          className="menu-toggle"
          aria-label={menuOpen ? "Menü bezárása" : "Menü megnyitása"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i
            className={menuOpen ? "icon bi bi-x-lg" : "icon bi bi-list"}
            aria-hidden="true"
          />
        </button>
      </div>
    </header>
  );
}
