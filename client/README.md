# Orvosi időpontfoglaló főoldal

Egyszerű React főoldal magyar magyarázó kommentekkel, külön JSX- és CSS-fájllal.
Nincs backend, valódi időpontfoglalás, regisztráció vagy adatküldés.
Az orvosnevek és az időpontok kitalált bemutató adatok.

## Elindítás

A projekt mappájában futtasd:

```bash
npm install
npm run dev
```

Ha Windows PowerShellben az `npm` futtatását a szkript-házirend tiltja,
használd az `npm.cmd install` és `npm.cmd run dev` parancsokat.
Nyisd meg a terminálban megjelenő helyi címet.

## A fájlok szerepe

- `src/main.jsx`: elindítja a Reactet és betölti a CSS-t.
- `src/App.jsx`: összeállítja a főoldalt és kezeli a keresőmezőket.
- `src/data.js`: a 12 mintaorvos és a 6 szakterület adatai.
- `src/components/Header.jsx`: fejléc és mobilmenü.
- `src/components/Hero.jsx`: a nyitó szöveg és a helyőrző kép.
- `src/components/DoctorCard.jsx`: egy orvoskártya és a felugró időpontválasztó ablak.
- `src/components/Footer.jsx`: lábléc.
- `src/style.css`: az oldal színei, elrendezése és mobilnézete.
- `public/images/`: a képek helyét jelölő SVG-illusztrációk.
- `index.html`: a React alkalmazást betöltő HTML-fájl.

## Mit lehet kipróbálni?

- A keresőmezők módosításakor a lista azonnal szűkül szakterület és város alapján.
- Az „Időpontot keresek” gomb megmutatja az összes találatot, és a listához görget.
- A szakterületkártyákra kattintás ugyanúgy szűri az orvosokat.
- Az „Összes orvos” gomb megmutatja mind a 12 bemutató profilt, szakterületenként két mintaorvossal.
- Az „Időpontok” gomb felugró ablakot nyit, ahol napot és minta időpontot választhatsz. Nem szükséges előre dátumot megadni a keresőben.
- Az ablak az X gombbal, a „Rendben” gombbal, Escape-pel vagy a sötét háttérre kattintva zárható be.
- A dátum a bemutató időpont napját állítja be; valódi elérhetőségi naptár nincs.
- A mobilmenü nyitható és bezárható.

## Hogyan érdemes olvasni a React-kódot?

1. A `main.jsx` elindítja az `App` komponenst.
2. Az `App.jsx` `return` része mutatja az oldal felépítését. A nagybetűs elemek saját komponensek.
3. A `useState` megjegyez egy értéket; például a `setCity` átírja a kiválasztott várost.
4. Az `onChange` mezőmódosításra, az `onClick` kattintásra futtat egy függvényt.
5. A `filter` kiválogatja az orvosokat, a `map` kártyákat készít belőlük.
6. A `DoctorCard` a szülőtől kapja a `doctor`, `date` és `minimumDate` adatokat. Ezek a props-ok.
7. A HTML `dialog` elem `showModal()` függvénye nyitja, a `close()` függvénye zárja az ablakot. A kiválasztott napot és időt a `useState` jegyzi meg.

## Ikonok

Az ikonok a [Bootstrap Icons](https://icons.getbootstrap.com/) csomagból érkeznek.
A `main.jsx` betölti a csomag stíluslapját. A komponensekben közvetlenül
`i` elemek és `bi-*` CSS-osztályok jelenítik meg az ikonokat.

Például: `<i className="icon bi bi-heart" aria-hidden="true" />` egy szívet mutat.
A `bi-heart` osztály átírásával cserélheted az ikont; a méretet a `fontSize` adja meg.
A szakterületek ikonnevei a `data.js` fájl `icon` mezőiben szerepelnek.
A fogászathoz mosoly, az általános orvosi jelhez pulzusos szív került.
A csomag MIT licencű; a licenc másolata a `public/licenses` mappában található.

## Képek cseréje

A `public/images` mappába tegyél saját képet, majd a `Hero.jsx` vagy a `DoctorCard.jsx` megfelelő
`img` elemének `src` értékét írd át, például `/images/orvos.jpg` értékre.
Az egyes orvosok eltérő fotóihoz bővítsd a `data.js` fájlban található `doctors` tömb elemeit egy
`image` mezővel, és használd így: `src={doctor.image}`.

## Éles build

```bash
npm run build
```

A Vite a `dist` mappába készíti el a statikus oldalt.
