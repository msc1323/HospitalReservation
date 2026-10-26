import React from "react";

// Ez egy statikus komponens: csak a nyitó szöveget és a helyőrző képet mutatja.
export default function Hero() {
  return (
    <div className="container hero-grid">
      <div className="hero-copy">
        <span className="eyebrow">
          <span className="tiny-dot" /> EGÉSZSÉG, EGYSZERŰBBEN
        </span>
        <h1>
          Az egészséged
          <br />
          <span>jó kezekben.</span>
        </h1>
        <p>
          Találd meg a hozzád illő szakorvost, és válassz időpontot néhány
          kattintással. Több figyelem magadra, kevesebb várakozás.
        </p>
        <a className="text-link" href="#kereso">
          Tedd meg az első lépést{" "}
          <i
            className="icon bi bi-arrow-right"
            style={{ fontSize: 19 }}
            aria-hidden="true"
          />
        </a>
        <div className="hero-benefits">
          <span>
            <i
              className="icon bi bi-shield-check"
              style={{ fontSize: 18 }}
              aria-hidden="true"
            />{" "}
            Átlátható választás
          </span>
          <span>
            <i
              className="icon bi bi-clock"
              style={{ fontSize: 18 }}
              aria-hidden="true"
            />{" "}
            Kényelmes keresés
          </span>
        </div>
      </div>
      <div className="hero-visual">
        <img
          className="hero-image"
          src="/dist/images/consultation-placeholder.svg"
          alt="Helyőrző illusztráció egy orvosi konzultációhoz"
          fetchPriority="high"
        />
      </div>
    </div>
  );
}
