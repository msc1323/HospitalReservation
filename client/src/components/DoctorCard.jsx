import React, { useState } from "react";

// A keresőben megadott dátum opcionális: az ablakban is lehet napot választani.
export default function DoctorCard({ doctor, date, minimumDate }) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const times = ["09:00", "10:30", "14:00"];

  // Minden orvos ablaka saját azonosítót kap, így a megfelelő ablakot nyitjuk ki.
  const dialogId = "booking-" + doctor.id;
  const validDate = selectedDate !== "" && selectedDate >= minimumDate;

  function openBooking() {
    // Ha a keresőben nem választottunk napot, a mai napot ajánljuk fel.
    setSelectedDate(date || minimumDate);
    setSelectedTime("");
    // A showModal beépített böngészőfüggvény: megnyitja a dialog elemet.
    // A böngésző kezeli a fókuszt és az Escape billentyűvel történő bezárást is.
    document.getElementById(dialogId).showModal();
  }

  function closeBooking() {
    document.getElementById(dialogId).close();
  }

  return (
    <article className="doctor-card">
      <div className={"doctor-image " + doctor.color}>
        <img
          src="/dist/images/doctor-placeholder.svg"
          alt={doctor.name + " profilképének helye"}
          loading="lazy"
        />
      </div>
      <div className="doctor-content">
        <span className="doctor-specialty">{doctor.specialty}</span>
        <h3>{doctor.name}</h3>
        <p className="doctor-location">
          <i
            className="icon bi bi-geo-alt"
            style={{ fontSize: 16 }}
            aria-hidden="true"
          />
          {doctor.location}
        </p>

        <div className="doctor-bottom">
          <button className="button button-outline" onClick={openBooking}>
            Időpontok{" "}
            <i
              className="icon bi bi-arrow-right"
              style={{ fontSize: 16 }}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      {/* A dialog alapból rejtve van. Megnyitásakor az oldal fölött jelenik meg. */}
      <dialog
        id={dialogId}
        className="booking-dialog"
        aria-labelledby={dialogId + "-title"}
        onClick={(event) => {
          // Csak a háttérre kattintás zárja be, az ablak tartalmára kattintás nem.
          if (event.target === event.currentTarget) closeBooking();
        }}
      >
        <div className="booking-dialog-content">
          <button
            className="dialog-close"
            onClick={closeBooking}
            aria-label="Ablak bezárása"
          >
            <i className="icon bi bi-x-lg" aria-hidden="true" />
          </button>
          <span className="eyebrow">IDŐPONTOK · BEMUTATÓ</span>
          <h2 id={dialogId + "-title"}>{doctor.name}</h2>
          <p className="booking-doctor-info">
            {doctor.specialty} · {doctor.location}
          </p>
          <label className="dialog-date">
            Válassz napot
            <input
              type="date"
              min={minimumDate}
              value={selectedDate}
              onChange={(event) => {
                setSelectedDate(event.target.value);
                setSelectedTime("");
              }}
            />
          </label>
          {!validDate && (
            <p className="demo-note">Válassz mai vagy későbbi napot.</p>
          )}
          <p className="time-label">Szemléltető időpontok</p>
          <div className="time-slots">
            {times.map((time) => (
              <button
                key={time}
                className={
                  selectedTime === time ? "time-slot selected" : "time-slot"
                }
                disabled={!validDate}
                aria-pressed={selectedTime === time}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </button>
            ))}
          </div>
          <p className="booking-message" role="status">
            {selectedTime === ""
              ? "Válassz egy minta időpontot a kipróbáláshoz."
              : "Kiválasztott minta időpont: " +
                selectedDate +
                ", " +
                selectedTime +
                "."}
          </p>
          <p className="demo-note">
            Ez csak bemutató. Valódi foglalás nem történik.
          </p>
          <button className="button dialog-done" onClick={closeBooking}>
            Rendben{" "}
            <i
              className="icon bi bi-check-lg"
              style={{ fontSize: 18 }}
              aria-hidden="true"
            />
          </button>
        </div>
      </dialog>
    </article>
  );
}
