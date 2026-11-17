import React, { useState } from "react";
import { api } from "../api.js";

export default function AuthModal({ onClose, onSuccess }) {
  const [register, setRegister] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", dateOfBirth: "", gender: false, phoneNumber: "", homeAddress: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  function field(key, value) { setForm((f) => ({ ...f, [key]: value })); }
  async function submit(event) {
    event.preventDefault();
    setError(""); setLoading(true);
    try {
      await api(`/api/auth/${register ? "register" : "login"}`, { method: "POST", body: JSON.stringify(register ? form : { email: form.email, password: form.password }) });
      await onSuccess();
      onClose();
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }
  return <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
    <div className="form-modal" role="dialog" aria-modal="true" aria-label={register ? "Regisztráció" : "Bejelentkezés"}>
      <button className="dialog-close" onClick={onClose} aria-label="Bezárás"><i className="bi bi-x-lg" /></button>
      <span className="eyebrow">FIÓKOM</span><h2>{register ? "Regisztráció" : "Bejelentkezés"}</h2>
      <p className="muted">{register ? "Hozz létre betegfiókot az időpontfoglaláshoz." : "Lépj be, és kezeld a foglalásaidat."}</p>
      <form className="stack-form" onSubmit={submit}>
        {register && <><div className="form-two"><label className="form-label">Vezetéknév<input required value={form.lastName} onChange={(e) => field("lastName", e.target.value)} /></label><label className="form-label">Keresztnév<input required value={form.firstName} onChange={(e) => field("firstName", e.target.value)} /></label></div><label className="form-label">Születési dátum<input required type="date" max={new Date().toISOString().slice(0,10)} value={form.dateOfBirth} onChange={(e) => field("dateOfBirth", e.target.value)} /></label><label className="form-label">Nem<select value={String(form.gender)} onChange={(e) => field("gender", e.target.value === "true")}><option value="false">Férfi</option><option value="true">Nő</option></select></label><label className="form-label">Telefonszám<input required type="tel" value={form.phoneNumber} onChange={(e) => field("phoneNumber", e.target.value)} /></label><label className="form-label">Lakcím<input required value={form.homeAddress} onChange={(e) => field("homeAddress", e.target.value)} /></label></>}
        <label className="form-label">E-mail cím<input required type="email" autoComplete="email" value={form.email} onChange={(e) => field("email", e.target.value)} /></label>
        <label className="form-label">Jelszó<input required minLength={6} type="password" autoComplete={register ? "new-password" : "current-password"} value={form.password} onChange={(e) => field("password", e.target.value)} /></label>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="button full-width" disabled={loading} type="submit">{loading ? "Feldolgozás..." : register ? "Regisztrálok" : "Belépés"}</button>
      </form>
      <button className="text-link centered" onClick={() => { setRegister(!register); setError(""); }}>{register ? "Már van fiókom – bejelentkezés" : "Még nincs fiókom – regisztráció"}</button>
    </div>
  </div>;
}
