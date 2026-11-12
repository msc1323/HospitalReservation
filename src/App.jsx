import React, { useState } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import DoctorCard from "./components/DoctorCard.jsx";
import Footer from "./components/Footer.jsx";
import { doctors, specialties } from "./data.js";

export default function App() {
  // useState remembers a value, we can modify it using the set function.
  // An empty field for specialization or city means that no such filter is applied.
  const [specialty, setSpecialty] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [showAll, setShowAll] = useState(false);

  // The date field expects the YYYY-MM-DD format, padStart expands it to two digits.
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const minimumDate = year + "-" + month + "-" + day;

  // The filter creates a new list: it keeps only the doctors who meet the criteria.
  // The list updates immediately when the search fields are modified.
  const filteredDoctors = doctors.filter((doctor) => {
    if (specialty !== "" && doctor.specialty !== specialty) {
      return false;
    }
    if (city !== "" && doctor.city !== city) {
      return false;
    }
    return true;
  });

  // By default, we only show three cards. The slice does not modify the original list.
  let visibleDoctors = filteredDoctors;
  if (showAll === false) {
    visibleDoctors = filteredDoctors.slice(0, 3);
  }

  function handleSearch(event) {
    // The browser should not reload the page when the form is submitted.
    event.preventDefault();
    setShowAll(true);
    document.getElementById("orvosok").scrollIntoView();
  }

  function chooseSpecialty(name) {
    setSpecialty(name);
    setCity("");
    setShowAll(true);
    document.getElementById("orvosok").scrollIntoView();
  }

  function showEveryDoctor() {
    setSpecialty("");
    setCity("");
    setShowAll(true);
  }

  return (
    <>
      {/* The larger side sections are separate components that are used here. */}
      <Header />
      <main>
        <section className="hero">
          <Hero />
          <div className="container search-container" id="kereso">
            <form className="search-form" onSubmit={handleSearch}>
              <label className="search-field">
                <i className="icon bi bi-heart-pulse" aria-hidden="true" />
                <span>
                  <span className="field-label">
                    Milyen szakorvost keresel?
                  </span>
                  {/* value is the current value, and `onChange` handles the selection. */}
                  <select
                    value={specialty}
                    onChange={(event) => setSpecialty(event.target.value)}
                  >
                    <option value="">Összes szakterület</option>
                    {specialties.map((item) => (
                      <option key={item.name}>{item.name}</option>
                    ))}
                  </select>
                </span>
              </label>
              <label className="search-field">
                <i className="icon bi bi-geo-alt" aria-hidden="true" />
                <span>
                  <span className="field-label">Hol keresel?</span>
                  <select
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                  >
                    <option value="">Összes város</option>
                    <option>Budapest</option>
                    <option>Debrecen</option>
                    <option>Szeged</option>
                    <option>Pécs</option>
                  </select>
                </span>
              </label>
              <label className="search-field date-field">
                <i className="icon bi bi-calendar3" aria-hidden="true" />
                <span>
                  <span className="field-label">Mikortól lenne jó?</span>
                  <input
                    type="date"
                    value={date}
                    min={minimumDate}
                    onChange={(event) => setDate(event.target.value)}
                  />
                </span>
              </label>
              <button className="button search-button" type="submit">
                <i
                  className="icon bi bi-search"
                  style={{ fontSize: 20 }}
                  aria-hidden="true"
                />{" "}
                Időpontot keresek
              </button>
            </form>
          </div>
        </section>

        <section className="section container" id="szakteruletek">
          <div className="section-heading">
            <div>
              <span className="eyebrow">MIBEN SEGÍTHETÜNK?</span>
              <h2>Gondoskodás, tetőtől talpig.</h2>
            </div>
            <p>
              Válassz szakterületet, és találd meg
              <br className="desktop-break" /> a számodra megfelelő segítséget.
            </p>
          </div>
          {/* The map creates a card from each element of the array. The key is a unique identifier. */}
          <div className="specialty-grid">
            {specialties.map((item) => (
              <button
                key={item.name}
                className="specialty-card"
                onClick={() => chooseSpecialty(item.name)}
              >
                <span className={"specialty-icon " + item.color}>
                  <i
                    className={"icon bi bi-" + item.icon}
                    style={{ fontSize: 27 }}
                    aria-hidden="true"
                  />
                </span>
                <strong>{item.name}</strong>
                <span className="specialty-description">{item.text}</span>
                <span className="card-arrow">
                  <i
                    className="icon bi bi-arrow-right"
                    style={{ fontSize: 17 }}
                    aria-hidden="true"
                  />
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
                <h2>Ismerd meg orvosainkat.</h2>
              </div>
              <div className="doctor-list-buttons">
                <button className="text-link" onClick={showEveryDoctor}>
                  Összes orvos{" "}
                  <i
                    className="icon bi bi-arrow-right"
                    style={{ fontSize: 19 }}
                    aria-hidden="true"
                  />
                </button>
                {/* The && operator ensures that the following content is only displayed when the condition is true. */}
                {showAll && (
                  <button
                    className="text-link"
                    onClick={() => setShowAll(false)}
                  >
                    Kevesebb orvos
                  </button>
                )}
              </div>
            </div>

            <div className="doctor-grid">
              {visibleDoctors.map((doctor) => (
                // The card receives the doctor, the optional date, and the earliest date.
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  date={date}
                  minimumDate={minimumDate}
                />
              ))}
            </div>
            {visibleDoctors.length === 0 && (
              <div className="empty-state">
                <i
                  className="icon bi bi-search"
                  style={{ fontSize: 32 }}
                  aria-hidden="true"
                />
                <h3>A megadott időpontban nincs elérhető orvosunk.</h3>
                <p>Válassz másik várost, vagy nézd meg az összes orvost.</p>
                <button className="button" onClick={showEveryDoctor}>
                  Összes orvos megtekintése
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
