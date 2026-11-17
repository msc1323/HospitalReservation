import React, { useEffect, useState } from "react";
import { api } from "../api.js";

const times = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
];

export default function DoctorCard({ doctor, date, minimumDate, user, onLogin }) {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(date || minimumDate);
  const [selectedTime, setSelectedTime] = useState("");
  const [taken, setTaken] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (!open || !selectedDate) return;
    let active = true;
    setLoading(true);
    setError("");
    api(`/api/booking/availability?doctorId=${doctor.id}&date=${selectedDate}`)
      .then((data) => {
        if (active) setTaken(data.bookings || []);
      })
      .catch((err) => {
        if (active) setError(err.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [doctor.id, selectedDate, open, success]);

  function available(time) {
    const start = new Date(`${selectedDate}T${time}:00`);
    const end = new Date(start.getTime() + 30 * 60000);
    if (start <= new Date()) return false;
    return !taken.some(
      (booking) => new Date(booking.startTime) < end && new Date(booking.finishTime) > start,
    );
  }

  async function book() {
    if (!user) {
      setOpen(false);
      onLogin();
      return;
    }
    const start = `${selectedDate}T${selectedTime}:00`;
    const finish = new Date(new Date(start).getTime() + 30 * 60000);
    const localFinish = `${finish.getFullYear()}-${String(finish.getMonth() + 1).padStart(2, "0")}-${String(finish.getDate()).padStart(2, "0")}T${String(finish.getHours()).padStart(2, "0")}:${String(finish.getMinutes()).padStart(2, "0")}:00`;
    setLoading(true);
    setError("");
    try {
      await api("/api/booking/new", {
        method: "POST",
        body: JSON.stringify({
          doctorId: doctor.id,
          startTime: start,
          finishTime: localFinish,
          comment,
        }),
      });
      setSuccess(`Sikeres foglalás: ${selectedDate}, ${selectedTime}`);
      setSelectedTime("");
      setComment("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <article className="doctor-card">
      <div className={`doctor-image ${doctor.color}`}>
        <img src={doctor.image} alt={`${doctor.name} profilképe`} loading="lazy" />
      </div>
      <div className="doctor-content">
        <span className="doctor-specialty">{doctor.specialty}</span>
        <h3>{doctor.name}</h3>
        {doctor.qualification && <p className="doctor-role">{doctor.qualification}</p>}
        <p className="doctor-location">
          <i className="icon bi bi-geo-alt" /> {doctor.location}
        </p>
        {doctor.hours && (
          <p className="doctor-location">
            <i className="icon bi bi-clock" /> {doctor.hours}
          </p>
        )}
        <div className="doctor-bottom">
          <button
            className="button button-outline"
            onClick={() => {
              setSelectedDate(date || minimumDate);
              setError("");
              setSuccess("");
              setOpen(true);
            }}
          >
            Időpontok <i className="icon bi bi-arrow-right" />
          </button>
        </div>
      </div>
      {open && (
        <div
          className="modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <div className="form-modal" role="dialog" aria-modal="true" aria-label="Időpontfoglalás">
            <button className="dialog-close" onClick={() => setOpen(false)} aria-label="Bezárás">
              <i className="bi bi-x-lg" />
            </button>
            <span className="eyebrow">IDŐPONTFOGLALÁS</span>
            <h2>{doctor.name}</h2>
            <p className="muted">
              {doctor.specialty}
              {doctor.qualification ? ` · ${doctor.qualification}` : ""}
              {` · ${doctor.location}`}
            </p>
            <label className="form-label">
              Dátum
              <input
                type="date"
                min={minimumDate}
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setSelectedTime("");
                  setSuccess("");
                }}
              />
            </label>
            <p className="time-label">Válassz szabad időpontot (30 perc)</p>
            {loading && <p className="muted">Betöltés...</p>}
            <div className="time-slots">
              {times.map((time) => (
                <button
                  key={time}
                  disabled={loading || !selectedDate || !available(time)}
                  className={`time-slot ${selectedTime === time ? "selected" : ""}`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
            <label className="form-label">
              Megjegyzés (nem kötelező)
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                maxLength={500}
                rows={2}
                placeholder="Rövid megjegyzés a foglaláshoz"
              />
            </label>
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            {success && (
              <p className="form-success" role="status">
                {success}
              </p>
            )}
            <button className="button full-width" disabled={!selectedTime || loading} onClick={book}>
              {user ? "Időpont lefoglalása" : "Bejelentkezés a foglaláshoz"}
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
