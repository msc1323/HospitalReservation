# Orvosi időpontfoglaló

Egyetemi projektmunka: **ASP.NET Core 8 + SQLite + React + Vite**.

## Mi van benne most?

A projekt át lett alakítva a kért szűkebb rendelési kínálatra:

- **Kardiológia** – 1 idősebb férfi szakorvos
- **Bőrgyógyászat** – 1 idősebb női szakorvos
- **Fogászat** – 1 fiatalabb fogorvos + 1 fiatalabb dentálhigiénikus
- **Gyermekgyógyászat** – 1 fiatalabb férfi + 1 fiatalabb női gyermekorvos

Összesen **6 szakember** jelenik meg a felületen, saját profilképekkel.

## Fő funkciók

- orvoslista és szakterület szerinti szűrés
- betegregisztráció és bejelentkezés
- szabad időpontok lekérdezése adott orvoshoz és dátumhoz
- időpontfoglalás 30 perces sávokban
- saját foglalások megtekintése
- jövőbeli foglalás lemondása
- admin felület (orvosok és betegek listázása, inaktiválása, új orvos felvétele)

---

## Fontos: kell külön adatbázist futtatni?

**Nem.**

A projekt **SQLite**-ot használ, tehát **nem kell külön adatbázis-szervert** indítani.
A backend induláskor:

1. automatikusan lefuttatja a migrációkat,
2. létrehozza a helyi `.db` fájlt, ha nincs,
3. betölti a 6 demo szakembert.

Tehát lokális futtatáshoz elég a backend és a frontend.

---

## Indítás VS Code-ban

Két terminál kell.

### 1. Backend indítása

A projekt gyökérmappájából:

```powershell
cd HospitalReservation
dotnet restore
dotnet run --launch-profile http
```

A backend címe:

```text
http://localhost:5193
```

### 2. Frontend indítása

Új terminálban:

```powershell
cd client
npm.cmd install --include=optional
npm.cmd run dev
```

A frontend jellemzően itt nyílik meg:

```text
http://127.0.0.1:5173
```

A Vite proxy továbbítja az `/api` és `/doctors` kéréseket a .NET backendhez.

---

## Hogyan teszteld lépésről lépésre?

### 1. Ellenőrizd, hogy betöltődnek-e az orvosok

Ha minden rendben van, a főoldalon meg kell jelennie a **6 szakembernek**.

Ha nem jelennek meg:
- valószínűleg a backend nem fut,
- vagy nem a `http` launch profile-lal indítottad.

### 2. Regisztráció tesztelése

- kattints a **Bejelentkezés / Regisztráció** gombra,
- válts **regisztrációra**,
- tölts ki minden mezőt,
- adj meg legalább **6 karakteres jelszót**,
- küldd el az űrlapot.

Sikeres regisztráció után automatikusan be is jelentkeztet.

### 3. Időpontfoglalás tesztelése

- válassz ki egy szakembert,
- kattints az **Időpontok** gombra,
- válassz dátumot,
- kattints egy szabad időpontra,
- opcionálisan írj megjegyzést,
- kattints az **Időpont lefoglalása** gombra.

### 4. Foglalás ellenőrzése

- kattints a **Fiókom / Foglalásaim** részre,
- ott látnod kell az új időpontot,
- a jövőbeli foglalás **Lemondás** gombbal törölhető.

---

## Ha a regisztráció most szerverhibát ír

Ez általában ezek közül valamelyik:

### A) A backend nincs elindítva
Megoldás:

```powershell
cd HospitalReservation
dotnet run --launch-profile http
```

### B) Régi / hibás SQLite fájl maradt a projektben
Ha korábbi verzióval próbálkoztál, lehet, hogy a régi adatbázis bekavar.

Töröld ezeket a fájlokat a `HospitalReservation` mappából, ha ott vannak:

- `HospitalReservation.db`
- `HospitalReservation.db-shm`
- `HospitalReservation.db-wal`

Utána indítsd újra a backendet. Az adatbázis automatikusan újra létrejön.

### C) Nincs megfelelő .NET SDK
Ehhez **.NET 8 SDK** kell.

Ellenőrzés:

```powershell
dotnet --version
```

### D) A frontend fut, de a backend nem a megfelelő porton megy
A frontend a `http://localhost:5193` címet várja.
Ezért fontos, hogy így indítsd:

```powershell
dotnet run --launch-profile http
```

---

## Admin tesztelése

Először regisztrálj egy felhasználót. Utána állítsd le a backendet, majd indítsd újra így:

```powershell
$env:HOSPITAL_ADMIN_EMAIL="sajatemail@example.com"
dotnet run --launch-profile http
```

Ez a regisztrált e-mail címet admin szerepkörhöz rendeli.
Ezután:
- jelentkezz be újra,
- megjelenik az admin felület,
- ott tudsz orvost hozzáadni, illetve orvost vagy beteget inaktiválni.

---

## Build

Ha a frontend módosításait át akarod másolni a .NET alkalmazás `wwwroot/dist` mappájába:

```powershell
cd client
npm.cmd run build
```

---

## Rövid összefoglaló a futtatáshoz

A projekt futásához elég:

1. **.NET backend futtatása**
2. **Vite frontend futtatása**

**Nem kell külön DB szerver.**
SQLite van beépítve.

---

## Megjegyzés

Ez továbbra is demonstrációs egyetemi projekt, nem éles egészségügyi rendszer.
