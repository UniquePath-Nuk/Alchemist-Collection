# Alchemist — Supercar Markets

A React + Firebase website: a public supercar marketplace with an
authenticated admin dashboard for managing listings. Built with the same
architecture as your blog lab (Lab 11–13), applied to a car-listings theme —
this satisfies your "Website" scope: public info pages + admin dashboard with
Authentication (login/register/forgot password) + CRUD.

## Project structure

```
src/
├── lib/
│   └── firebaseClient.js     ← Firebase config + exports `auth` and `db`
├── data/                     ← (removed — car data now lives in Firestore)
├── components/
│   ├── Navbar.jsx            ← auth-aware nav (Login/Register vs Logout)
│   ├── Sidebar.jsx           ← admin-only nav (Overview / Manage Cars)
│   ├── Footer.jsx
│   ├── Marquee.jsx           ← decorative ticker, static content
│   ├── FeatureStrip.jsx      ← decorative marketing content, static
│   ├── Gallery.jsx           ← decorative showcase images, static
│   ├── Hero.jsx              ← shows the fastest car from live Firestore data
│   ├── Markets.jsx           ← live car table with working category filters
│   ├── Spotlight.jsx         ← shows the most recently added car
│   ├── DashboardComponents.jsx  ← StatCard, RecentCarsTable (admin overview)
│   ├── CarForm.jsx           ← create/edit form (used by CarsManager)
│   └── CarList.jsx           ← admin table with Update/Delete (used by CarsManager)
├── pages/
│   ├── HomePage.jsx          ← public homepage, fetches cars from Firestore
│   ├── CarDetailPage.jsx     ← /car/:id — full spec sheet for one listing
│   ├── AboutPage.jsx         ← static "About Us" info page
│   ├── ContactPage.jsx       ← contact form (UI only, not wired to a backend yet)
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── ForgotPasswordPage.jsx  ← uses Firebase sendPasswordResetEmail
│   ├── AdminPortalPage.jsx   ← /admin — dashboard overview with stats
│   └── CarsManager.jsx       ← /admin/cars — full CRUD for listings
├── App.jsx                   ← routes + auth session handling
└── main.jsx
```

## Setting it up

### 1. Install dependencies

```bash
npm install
```

### 2. Connect Firebase

You can **reuse the same Firebase project** you set up for your blog lab —
you don't need a second one. This project just adds a new Firestore
collection called `cars` alongside your existing `posts` collection.

Copy `.env.local.example` to `.env.local` and fill in your project's values
(the same six values from your blog lab's `.env.local`):

```bash
cp .env.local.example .env.local
```

### 3. Update your Firestore security rules

In the Firebase Console → Firestore Database → Rules, replace your rules
with the contents of `firestore.rules` in this project (it includes both
`posts` and `cars` so both projects keep working if you're sharing one
Firebase project).

### 4. Run it

```bash
npm run dev
```

## How the data flows

- **Public visitors** can browse `/`, click into any `/car/:id` detail page,
  and read `/about` and `/contact` — all without logging in.
- **Registering or logging in** takes you to `/admin`, a stats dashboard
  showing total listings, listings you've personally added, average top
  speed, and the most recent listing.
- **`/admin/cars`** is the full CRUD screen — add a new car, edit an
  existing one, or delete a listing. Every change writes straight to
  Firestore, so the public homepage reflects it immediately.
- **Forgot password** sends a real Firebase password-reset email to the
  address entered.

## Notes

- The Contact page's form doesn't currently save anywhere — it's a UI
  placeholder. If you want real message submissions, it could write to a
  new `messages` collection in Firestore the same way `cars` does.
- The Markets table's category filter pills (`Hypercar` / `GT` / `Track` /
  `Hybrid`) filter the live Firestore data client-side.
