import React, { useEffect, useState } from "react";
import { api } from "../api.js";

const emptyDoctor = { firstName: "", lastName: "", dateOfBirth: "", gender: false, specialization: "", licencNumber: "", yearsOfExperience: 0, department: "", qualification: "", email: "", phoneNumber: "", officeAddress: "", workingHours: "" };
export default function AdminPanel({ onClose, onUpdated }) {
  const [tab, setTab] = useState("doctors");
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState(emptyDoctor);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const load = (type = tab) => api(`/api/admin/${type}`).then(setRows).catch((e) => setError(e.message));
  useEffect(() => { load(); }, [tab]);
  async function inactive(id) {
    if (!window.confirm("Biztosan inaktiválod ezt a profilt?")) return;
    setError("");
    try { await api(`/api/admin/inactive_${tab === "doctors" ? "doctor" : "patient"}?id=${id}`, { method: "DELETE" }); await load(); onUpdated(); }
    catch (e) { setError(e.message); }
  }
  async function addDoctor(e) {
    e.preventDefault(); setBusy(true); setError(""); setMessage("");
    const body = {
      psInformation: { firstName: form.firstName, lastName: form.lastName, dateOfBirth: form.dateOfBirth, gender: form.gender },
      profInformation: { specialization: form.specialization, licencNumber: form.licencNumber, yearsOfExperience: Number(form.yearsOfExperience), department: form.department, qualification: form.qualification },
      cInformationDoctor: { email: form.email, phoneNumber: form.phoneNumber, officeAddress: form.officeAddress, workingHours: form.workingHours }, systemField: { isActive: true }
    };
    try { await api("/api/admin/new_doctor", { method: "POST", body: JSON.stringify(body) }); setForm(emptyDoctor); setMessage("Az orvost sikeresen felvettük."); await load("doctors"); onUpdated(); }
    catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }
  return <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}><div className="form-modal wide-modal" role="dialog" aria-modal="true" aria-label="Adminisztráció">
    <button className="dialog-close" onClick={onClose} aria-label="Bezárás"><i className="bi bi-x-lg" /></button><span className="eyebrow">ADMINISZTRÁCIÓ</span><h2>Kezelőfelület</h2>
    <div className="tab-row"><button className={tab === "doctors" ? "active" : ""} onClick={() => setTab("doctors")}>Orvosok</button><button className={tab === "patients" ? "active" : ""} onClick={() => setTab("patients")}>Betegek</button></div>
    {error && <p className="form-error">{error}</p>}{message && <p className="form-success">{message}</p>}
    <div className="booking-list">{rows.map((row) => <div className="booking-row" key={row.id}><div><strong>{row.name}</strong><p className="muted">{row.email || `Azonosító: ${row.id}`} · {row.active ? "Aktív" : "Inaktív"}</p></div>{row.active && <button className="button button-outline" onClick={() => inactive(row.id)}>Inaktiválás</button>}</div>)}</div>
    {tab === "doctors" && <form className="stack-form admin-form" onSubmit={addDoctor}><h3>Új orvos felvétele</h3><div className="form-two">{Object.entries({ lastName: "Vezetéknév", firstName: "Keresztnév", dateOfBirth: "Születési dátum", specialization: "Szakterület", licencNumber: "Orvosi azonosító", yearsOfExperience: "Tapasztalat (év)", department: "Osztály", qualification: "Végzettség", email: "E-mail", phoneNumber: "Telefon", officeAddress: "Rendelő címe", workingHours: "Rendelési idő" }).map(([key, label]) => <label className="form-label" key={key}>{label}<input required={!["department", "qualification", "licencNumber"].includes(key)} type={key === "dateOfBirth" ? "date" : key === "yearsOfExperience" ? "number" : key === "email" ? "email" : "text"} value={form[key]} onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))} /></label>)}</div><label className="form-label">Nem<select value={String(form.gender)} onChange={(e) => setForm((f) => ({ ...f, gender: e.target.value === "true" }))}><option value="false">Férfi</option><option value="true">Nő</option></select></label><button className="button" disabled={busy}>Orvos mentése</button></form>}
  </div></div>;
}
