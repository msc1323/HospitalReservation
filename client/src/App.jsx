import React, { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import DoctorCard from "./components/DoctorCard.jsx";
import Footer from "./components/Footer.jsx";
import AuthModal from "./components/AuthModal.jsx";
import AccountPanel from "./components/AccountPanel.jsx";
import AdminPanel from "./components/AdminPanel.jsx";
import { specialties } from "./data.js";
import { api, doctorFromApi } from "./api.js";

export default function App() {
  const [doctors, setDoctors] = useState([]);
  const [specialty, setSpecialty] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [user, setUser] = useState(null);
  const [panel, setPanel] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const minimumDate = new Date().toLocaleDateString("sv-SE");

  async function loadDoctors() {
    setLoading(true);
    try {
      const data = await api("/doctors");
      setDoctors(data.map(doctorFromApi));
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function loadUser() {
    try {
      setUser(await api("/api/auth/me"));
    } catch {
      setUser(null);
    }
  }

  useEffect(() => {
    loadDoctors();
    loadUser();
  }, []);

  const cities = [...new Set(doctors.map((doctor) => doctor.city))].sort((a, b) =>
    a.localeCompare(b, "hu"),
  );
  const availableSpecialties = [...new Set(doctors.map((doctor) => doctor.specialty))].sort((a, b) =>
    a.localeCompare(b, "hu"),
  );
  const filtered = doctors.filter(
    (doctor) =>
      (!specialty || doctor.specialty.toLowerCase().includes(specialty.toLowerCase())) &&
      (!city || doctor.city.toLowerCase() === city.toLowerCase()),
  );

  function search(e) {
    e.preventDefault();
    document.getElementById("orvosok")?.scrollIntoView();
  }

  function chooseSpecialty(name) {
    setSpecialty(name);
    document.getElementById("orvosok")?.scrollIntoView();
  }

  async function logout() {
    try {
      await api("/api/auth/logout", { method: "POST" });
      setUser(null);
      setPanel("");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <Header
        user={user}
        onLogin={() => setPanel("auth")}
        onAccount={() => setPanel("account")}
        onAdmin={() => setPanel("admin")}
        onLogout={logout}
      />
      <main>
        <section className="hero">
          <Hero />
          <div className="container search-container" id="kereso">
            <form className="search-form" onSubmit={search}>
              <label className="search-field">
                <i className="icon bi bi-heart-pulse" />
                <span>
                  <span className="field-label">Milyen szakorvost keresel?</span>
                  <select value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
                    <option value="">Összes szakterület</option>
                    {availableSpecialties.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </span>
              </label>
              <label className="search-field">
                <i className="icon bi bi-geo-alt" />
                <span>
                  <span className="field-label">Hol keresel?</span>
                  <select value={city} onChange={(e) => setCity(e.target.value)}>
                    <option value="">Összes város</option>
                    {cities.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </span>
              </label>
              <label className="search-field date-field">
                <i className="icon bi bi-calendar3" />
                <span>
                  <span className="field-label">Mikortól lenne jó?</span>
                  <input
                    type="date"
                    value={date}
                    min={minimumDate}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </span>
              </label>
              <button className="button search-button" type="submit">
                <i className="icon bi bi-search" /> Időpontot keresek
              </button>
            </form>
          </div>
        </section>

        <section className="section container" id="szakteruletek">
          <div className="section-heading">
            <div>
              <span className="eyebrow">MIBEN SEGÍTHETÜNK?</span>
              <h2>Válassz a fő szakrendeléseink közül.</h2>
            </div>
            <p>
              Átlátható felület, néhány kiemelt szakrendelés,
              <br className="desktop-break" /> gyors online időpontfoglalással.
            </p>
          </div>
          <div className="specialty-grid specialty-grid-compact">
            {specialties.map((item) => (
              <button key={item.name} className="specialty-card" onClick={() => chooseSpecialty(item.name)}>
                <span className={`specialty-icon ${item.color}`}>
                  <i className={`icon bi bi-${item.icon}`} style={{ fontSize: 27 }} />
                </span>
                <strong>{item.name}</strong>
                <span className="specialty-description">{item.text}</span>
                <span className="card-arrow">
                  <i className="icon bi bi-arrow-right" />
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="doctors-section" id="orvosok">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="eyebrow">SZAKÉRTELEM ÉS ODAFIGYELÉS</span>
                <h2>Ismerd meg szakembereinket.</h2>
              </div>
              <button
                className="text-link"
                onClick={() => {
                  setSpecialty("");
                  setCity("");
                }}
              >
                Szűrők törlése <i className="icon bi bi-arrow-counterclockwise" />
              </button>
            </div>
            {error && (
              <div className="form-error" role="alert">
                {error} <button className="text-link" onClick={loadDoctors}>Újrapróbálás</button>
              </div>
            )}
            {loading && <p className="muted">Orvosok betöltése...</p>}
            <div className="doctor-grid">
              {filtered.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  date={date}
                  minimumDate={minimumDate}
                  user={user}
                  onLogin={() => setPanel("auth")}
                />
              ))}
            </div>
            {!loading && !error && filtered.length === 0 && (
              <div className="empty-state">
                <i className="icon bi bi-search" style={{ fontSize: 32 }} />
                <h3>Nem találtunk megfelelő szakembert.</h3>
                <p>Válassz másik várost vagy szakterületet.</p>
                <button
                  className="button"
                  onClick={() => {
                    setSpecialty("");
                    setCity("");
                  }}
                >
                  Összes orvos
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      {panel === "auth" && <AuthModal onClose={() => setPanel("")} onSuccess={loadUser} />}
      {panel === "account" && user && <AccountPanel user={user} onClose={() => setPanel("")} />}
      {panel === "admin" && user?.isAdmin && (
        <AdminPanel onClose={() => setPanel("")} onUpdated={loadDoctors} />
      )}
    </>
  );
}
