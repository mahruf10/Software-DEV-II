# BariLagbe: Client

React frontend for the BariLagbe real estate platform.

**Done so far:** home page, all properties, login and register (Firebase Authentication).

## Tech
React, Vite, React Router, TanStack Query, Axios, Tailwind CSS + daisyUI, Firebase Auth, Swiper

## Setup
```bash
npm install
cp .env.example .env     # fill the Firebase and imgbb values
npm run dev
```
The backend URL is `VITE_API_URL` (defaults to `http://localhost:5000`). Run the server repo first.

## Pages
| Route | Page |
|---|---|
| `/` | Home (slider, latest properties, reviews) |
| `/allProperties` | All properties from the API |
| `/login` | Sign in |
| `/register` | Sign up |
