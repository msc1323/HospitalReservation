import React, { useState } from 'react';

// Új szakterület hozzáadásához elég ezt a listát bővíteni.
const szakteruletek = [
  { nev: 'Fül-orr-gégészet', leiras: 'Fül-, orr- és torokpanaszok' },
  { nev: 'Ortopédia', leiras: 'Ízületek és mozgásszervek' },
  { nev: 'Bőrgyógyászat', leiras: 'Bőr, haj és köröm vizsgálata' },
  { nev: 'Szemészet', leiras: 'Látás és szemvizsgálat' },
  { nev: 'Kardiológia', leiras: 'Szív- és érrendszeri vizsgálatok' },
  { nev: 'Gyermekgyógyászat', leiras: 'A gyermekek egészségéért' },
];

// Az ékezet nélküli keresést is elfogadjuk (pl. "borgyogyaszat").
function keresheto(szoveg) {
  return szoveg.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

export default function App() {
  const [kereses, setKereses] = useState('');
  const [kivalasztott, setKivalasztott] = useState('');

  const talalatok = szakteruletek.filter((szakterulet) =>
    keresheto(szakterulet.nev).includes(keresheto(kereses.trim()))
  );

  return (
    <>
      <a className="skip-link" href="#tartalom">Ugrás a tartalomhoz</a>

      <header className="fejlec">
        <div className="kontener navigacio">
          <a className="logo" href="#" aria-label="JóDoktor főoldal">
            <span className="logo-jel" aria-hidden="true">+</span> JóDoktor
          </a>
          <nav aria-label="Főmenü">
            <a href="#szakteruletek">Szakterületek</a>
            <a href="#hogyan-mukodik">Hogyan működik?</a>
            <a href="#segitseg">Segítség</a>
          </nav>
        </div>
      </header>

      <main id="tartalom">
        <section className="bemutatkozas">
          <div className="kontener">
            <p className="felirat">MAGÁNORVOSI IDŐPONTFOGLALÁS</p>
            <h1>Orvosi időpont,<br />egyszerűen.</h1>
            <p className="bevezeto">Válasszon szakterületet, találja meg orvosát,<br className="asztali-sortores" /> és foglaljon időpontot néhány lépésben.</p>
            <a className="gomb" href="#szakteruletek">Szakterület választása</a>
          </div>
        </section>

        <section className="kontener lepesek" id="hogyan-mukodik" aria-label="A foglalás menete">
          <div className="lepes"><span className="sorszam">1</span><div><h2>Válasszon szakterületet</h2><p>Milyen ellátást keres?</p></div></div>
          <div className="lepes"><span className="sorszam">2</span><div><h2>Keresse meg orvosát</h2><p>Válasszon a szakorvosok közül.</p></div></div>
          <div className="lepes"><span className="sorszam">3</span><div><h2>Foglaljon időpontot</h2><p>Az Önnek megfelelő időpontra.</p></div></div>
        </section>

        <section className="kontener szakteruletek" id="szakteruletek" aria-labelledby="szakterulet-cim">
          <div className="szakasz-fejlec">
            <div><h2 id="szakterulet-cim">Milyen szakorvost keres?</h2><p>Válasszon az alábbi szakterületek közül.</p></div>
            <div className="kereso">
              <label htmlFor="kereses">Szakterület keresése</label>
              <input id="kereses" type="search" placeholder="Pl. bőrgyógyászat" value={kereses} onChange={(event) => setKereses(event.target.value)} />
            </div>
          </div>

          <div className="kartya-racs">
            {talalatok.map((szakterulet) => (
              <button key={szakterulet.nev} type="button" className={`szakterulet-kartya ${kivalasztott === szakterulet.nev ? 'kivalasztott' : ''}`} aria-pressed={kivalasztott === szakterulet.nev} onClick={() => setKivalasztott(szakterulet.nev)}>
                <span className="kartya-cim">{szakterulet.nev}</span>
                <span className="kartya-leiras">{szakterulet.leiras}</span>
              </button>
            ))}
          </div>
          <div role="status" aria-live="polite">
            {talalatok.length === 0 && <p className="uzenet">Nincs ilyen szakterület a listában. Próbáljon másik keresést!</p>}
            {kivalasztott && <p className="uzenet"><strong>Kiválasztott szakterület: {kivalasztott}.</strong> Az orvosválasztó oldal még nem érhető el ebben a bemutatóban.</p>}
          </div>
        </section>

        <section className="kontener segitseg" id="segitseg">
          <div><h2>Segítség a választáshoz</h2><p>A keresőbe a szakterület nevét írja be, vagy kattintson a megfelelő kártyára.</p></div>
          <a className="gomb masodlagos" href="#szakteruletek">Vissza a szakterületekhez</a>
        </section>
      </main>

      <footer className="lablec"><div className="kontener"><span className="lablec-logo">JóDoktor</span><span>Egyetemi mintaprojekt · Valós foglalás nem történik.</span></div></footer>
    </>
  );
}
