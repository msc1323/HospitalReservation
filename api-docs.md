\### Új foglalás rögzítése

\* \*\*URL:\*\* `POST /api/booking/new`

\* \*\*Content-Type:\*\* `application/json`

\* \*\*Request Body:\*\*

&#x20; ```json

&#x20; {

&#x20; "patientId": 1,

&#x20; "doctorId": 1,

&#x20; "startTime": "2026-06-15T10:00:00",

&#x20; "finishTime": "2026-06-15T10:30:00",

&#x20; "comment": "Sürgős konzultáció erős fájdalom miatt"

}



\### Új doktor felvétele

\* \*\*URL:\*\* `POST /api/admin/new\_doctor`

\* \*\*Content-Type:\*\* `application/json`

\* \*\*Request Body:\*\*

&#x20; ```json

{

&#x20; "psInformation": {

&#x20;   "firstName": "Anna",

&#x20;   "lastName": "Kovács",

&#x20;   "dateOfBirth": "1985-06-15",

&#x20;   "gender": true

&#x20; },

&#x20; "profInformation": {

&#x20;   "specialization": "Kardiológus",

&#x20;   "licencNumber": "DOC12345",

&#x20;   "yearsOfExperience": 10,

&#x20;   "department": "Belgyógyászat",

&#x20;   "qualification": "Főorvos"

&#x20; },

&#x20; "cInformationDoctor": {

&#x20;   "email": "kovacs.anna@hospital.hu",

&#x20;   "phoneNumber": "+36301234567",

&#x20;   "officeAddress": "Budapest, Fő utca 1.",

&#x20;   "workingHours": "H-P: 08:00 - 16:00"

&#x20; },

&#x20; "systemField": {

&#x20;   "isActive": true

&#x20; }

}



\### Összes doktor lekérdezése

\* \*\*URL:\*\* `POST /doctors`

\* \*\*Content-Type:\*\* `application/json`



\### Új beteg felvétele

\* \*\*URL:\*\* `POST /api/patient/new`

\* \*\*Content-Type:\*\* `application/json`

\* \*\*Request Body:\*\*

&#x20; ```json

{

&#x20; "psInformation": {

&#x20;   "firstName": "Péter",

&#x20;   "lastName": "Nagy",

&#x20;   "dateOfBirth": "1990-05-12",

&#x20;   "gender": false

&#x20; },

&#x20; "prbInformation": {

&#x20;   "problem": "Erős fejfájás és szédülés",

&#x20;   "urgent": false,

&#x20;   "startedAt": "2026-06-10",

&#x20;   "severity": 1,

&#x20;   "hasWorsened": true,

&#x20;   "additionalInformation": "A fájdalom este fokozódik, fájdalomcsillapítóra nem reagál."

&#x20; },

&#x20; "cInformationPatient": {

&#x20;   "email": "nagy.peter@example.com",

&#x20;   "phoneNumber": "+36309876543",

&#x20;   "homeAddress": "Budapest, Kossuth Lajos utca 5."

&#x20; },

&#x20; "systemField": {

&#x20;   "isActive": true

&#x20; }

}

