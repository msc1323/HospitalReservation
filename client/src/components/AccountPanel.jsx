import React, { useEffect, useState } from "react";
import { api } from "../api.js";

export default function AccountPanel({ user, onClose }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const load = () =>
    api("/api/booking/mine")
      .then(setItems)
      .catch((err) => setError(err.message));

  useEffect(() => {
    load();
  }, []);

  async function cancel(id) {
    if (!window.confirm("Biztosan lemondod ezt az időpontot?")) return;
    setBusy(true);
    setError("");
    try {
      await api(`/api/booking/${id}`, { method: "DELETE" });
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="form-modal wide-modal" role="dialog" aria-modal="true" aria-label="Foglalásaim">
        <button className="dialog-close" onClick={onClose} aria-label="Bezárás">
          <i className="bi bi-x-lg" />
        </button>
        <span className="eyebrow">FIÓKOM</span>
        <h2>Foglalásaim</h2>
        <p className="muted">{user.name || user.email}</p>
        {error && <p className="form-error">{error}</p>}
        {items.length === 0 && !error && (
          <p className="muted panel-empty">Még nincs lefoglalt időpontod.</p>
        )}
        <div className="booking-list">
          {items.map((item) => (
            <div className="booking-row" key={item.id}>
              <div>
                <strong>{item.doctorName}</strong>
                <p className="muted">
                  {item.specialization}
                  {item.qualification ? ` · ${item.qualification}` : ""}
                </p>
                <p>
                  {new Date(item.startTime).toLocaleString("hu-HU", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </div>
              {new Date(item.startTime) > new Date() && (
                <button className="button button-outline" disabled={busy} onClick={() => cancel(item.id)}>
                  Lemondás
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
