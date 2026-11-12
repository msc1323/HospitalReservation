# Medical Appointment Booking

A simple React for booking medical appointments to different doctors.
The doctor names and appointment times are fictional, placeholder data.

## Getting Started

In the project folder, run:

```bash
npm install
npm run dev
```

If running `npm` in Windows PowerShell is blocked by the script execution policy,
use the commands `npm.cmd install` and `npm.cmd run dev`.
Open the local URL displayed in the terminal.

## What can you try out?

- As you modify the search fields, the list is filtered immediately based on medical specialty and city.
- The "Find an appointment" button displays all results and scrolls to the list.
- Clicking on the specialty cards filters the list of doctors in the same way.
- The "All doctors" button displays all 12 demo profiles, featuring two sample doctors for each specialty.
- The "Appointments" button opens a pop-up window where you can select a day and a sample appointment time. You do not need to specify a date in the search fields beforehand.
- The window can be closed by clicking the "X" button, the "OK" button, pressing the Escape key, or clicking on the dark background.
- The date selection determines the day for the demo appointment; there is no actual availability calendar.
- The mobile menu can be opened and closed.

## How should you read the React code?

1. `main.jsx` initializes the `App` component.
2. The `return` section of `App.jsx` defines the structure of the page. Elements starting with a capital letter are custom components.
3. `useState` stores a value; for example, `setCity` updates the selected city.
4. The `onChange` event triggers a function when a field value changes, while `onClick` triggers one upon a click.
5. The `filter` method selects the doctors, and `map` creates cards from them.
6. The `DoctorCard` component receives `doctor`, `date`, and `minimumDate` data from its parent; these are known as "props."
7. The HTML `dialog` element uses the `showModal()` function to open the window and the `close()` function to close it. The selected date and time are tracked using `useState`.

## Icons

The icons are provided by the [Bootstrap Icons](https://icons.getbootstrap.com/) library.
The `main.jsx` file loads the library's stylesheet. Within the components, icons are rendered directly using `i` elements and `bi-*` CSS classes.

## Production build

```bash
npm run build
```

Vite generates the static site in the `dist` folder.
