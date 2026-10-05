# JóDoktor – főoldal

Egyszerű React + JavaScript + CSS egyetemi mintaprojekt. Csak a landing page készült el, nincs backend, regisztráció vagy tényleges foglalás.

## Indítás VS Code-ban

1. Telepíts egy jelenleg támogatott Node.js LTS-verziót, ha még nincs a gépeden. Ezután indítsd újra a VS Code-ot.
2. Csomagold ki a ZIP-et, és a **jodoktor** mappát nyisd meg a VS Code-ban.
3. Nyiss terminált (Terminal → New Terminal), és futtasd:

```bash
npm install
npm run dev
```

4. Nyisd meg a terminálban megjelenő helyi címet (általában http://localhost:5173).
5. Leállítás: Ctrl+C a terminálban.

Az index.html dupla kattintásos megnyitása helyett a fenti fejlesztői szervert használd.

## Fájlok

- `index.html`: HTML alap és az oldal címe.
- `src/main.jsx`: a React alkalmazás indítása és a CSS betöltése.
- `src/App.jsx`: a teljes főoldal, a szakterületi lista és a keresés.
- `src/style.css`: az összes formázás, egyszerű, kommentelt szakaszokkal.
- `package.json`: a függőségek és az indítási parancsok.

## Mi működik?

- A menüpontok a főoldal megfelelő részéhez görgetnek.
- A szakterületkereső ékezet nélkül is szűr; nincs találat esetén üzenetet ad.
- A kártyák kijelölhetők; üzenet jelzi, hogy az orvosválasztó oldal még nem készült el.
- Billentyűzetes navigáció és jól látható fókuszjelölés.

A felületen megjelenő három lépés a tervezett foglalási folyamat bemutatása. Csak az első oldal készült el. Nincs valódi páciensadat, adatküldés, API vagy fizetés. Külső képeket, betűtípusokat és UI-keretrendszert nem használ.

## Módosítás

Új szakterülethez az App.jsx tetején található `szakteruletek` tömbhöz adj új objektumot. A fő szín a CSS-ben `#1261df`. A működés egyetlen React-komponensben maradt, hogy könnyű legyen követni.

## Build ellenőrzése

```bash
npm run build
npm run preview
```

A build eredménye a `dist` mappába kerül. A függőségeket az első telepítéshez internetről tölti le az npm; utána a főoldal nem kér külső szolgáltatásokat.
