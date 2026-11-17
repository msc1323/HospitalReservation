import React, { useState } from "react";

export default function Header({ user, onLogin, onAccount, onAdmin, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return <header className="header"><div className="container header-inner">
    <a href="#" className="logo" aria-label="Orvosi időpontfoglalás főoldal"><span className="logo-symbol"><i className="icon bi bi-plus-lg" style={{ fontSize: 25 }} /></span>Orvosi időpontfoglalás</a>
    <nav className={menuOpen ? "navigation is-open" : "navigation"} aria-label="Főmenü">
      <a href="#szakteruletek" onClick={() => setMenuOpen(false)}>Szakterületek</a>
      <a href="#orvosok" onClick={() => setMenuOpen(false)}>Orvosaink</a>
      {user ? <><button className="nav-action" onClick={() => { onAccount(); setMenuOpen(false); }}>Foglalásaim</button>{user.isAdmin && <button className="nav-action" onClick={() => { onAdmin(); setMenuOpen(false); }}>Admin</button>}<button className="nav-action" onClick={() => { onLogout(); setMenuOpen(false); }}>Kilépés</button></> : <button className="nav-action" onClick={() => { onLogin(); setMenuOpen(false); }}>Bejelentkezés</button>}
    </nav>
    <a className="button header-button" href="#kereso">Időpontot keresek <i className="icon bi bi-arrow-right" /></a>
    <button className="menu-toggle" aria-label={menuOpen ? "Menü bezárása" : "Menü megnyitása"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><i className={menuOpen ? "icon bi bi-x-lg" : "icon bi bi-list"} /></button>
  </div></header>;
}
