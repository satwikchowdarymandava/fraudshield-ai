# FraudShield AI

Modern React frontend for a credit card fraud detection dashboard. It includes authentication screens, dashboard analytics, prediction workflow, dataset upload analysis, transaction history, notifications, 10-minute fraud email digests, settings, CSV export, Recharts visualizations, Framer Motion animations, and a resilient Axios service that falls back to mock data when dummy endpoints are unavailable.

## Tech Stack

- React.js with functional components and hooks
- Vite
- Tailwind CSS
- React Router
- Context API
- Axios
- Framer Motion
- Lucide React
- Recharts

## Setup

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Production Build

```bash
npm run build
npm run preview
```

The app is ready to deploy on Vercel or Netlify. Use `npm run build` as the build command and `dist` as the output directory.

## Authentication

Use the Signup page to create an account. The frontend stores demo credentials in browser local storage and validates login attempts against them. For production authentication, connect these screens to a backend auth service.

## API Endpoints

The frontend calls:

- `POST /predict`
- `GET /transactions`
- `POST /notify-email`

If those endpoints are not available, the app automatically uses realistic mock responses so the UI remains fully usable for demos and portfolio reviews. Email notifications use `/notify-email` when available and show a demo success state otherwise.
