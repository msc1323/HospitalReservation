import React from "react";

// A lábléc külön fájlban van, így könnyű megtalálni és átírni.
export default function Footer() {
  return (
    <footer className="footer container">
      <div className="footer-top">
        <a href="#" className="logo">
          <span className="logo-symbol">
            <i
              className="icon bi bi-plus-lg"
              style={{ fontSize: 23 }}
              aria-hidden="true"
            />
          </span>
          Orvosi időpontfoglalás
        </a>
        <p>Egy hely, ahol az egészséged van a középpontban.</p>
        <a href="#kereso" className="text-link">
          Tedd meg az első lépést{" "}
          <i
            className="icon bi bi-arrow-right"
            style={{ fontSize: 17 }}
            aria-hidden="true"
          />
        </a>
      </div>
    </footer>
  );
}
