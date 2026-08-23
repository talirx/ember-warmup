# Ember — Email Warm-up

POC → producto de calentamiento de buzones (email warm-up) para subir la reputación de envío antes de campañas en frío.

## Stack

- **Frontend**: React 18 + TypeScript (strict) + Tailwind CSS v4 (Vite 6)
- **Auth**: Firebase Auth (email/password + Google)
- **Datos**: Firestore (namespaced `ember_users/...`)
- **Backend**: Vercel serverless functions (`api/`)
- **Envío/lectura**: nodemailer (SMTP) + imapflow (IMAP)
- **Pagos**: Stripe (fase 5)

## Arquitectura

```
src/                → SPA (login, dashboard, sliders, reportes)
api/health.ts       → healthcheck
api/mailbox.ts      → test de conexión SMTP/IMAP
api/warmup.ts       → motor de warm-up (envío por lotes)
api/_lib/mail.ts    → SMTP send + IMAP connect/reply-count
api/_lib/engine.ts  → generador de lote aleatorio (sujeto/cuerpo/destinatario)
api/_lib/crypto.ts  → cifrado AES-256-GCM de credenciales de buzón
firestore.rules     → reglas de seguridad (aislamiento por usuario)
```

## Config (env)

Copia `.env.example` a `.env` con las claves `VITE_FIREBASE_*` del proyecto Firebase de Ember.
El backend usa además: `EMBER_CRYPTO_KEY` (32+ bytes, base64) para cifrar credenciales de buzón, y una cuenta de servicio Firebase Admin (variable `FIREBASE_SERVICE_ACCOUNT` o `GOOGLE_APPLICATION_CREDENTIALS`).

## Estado

- ✅ Frontend completo (auth real, sliders persistidos, reportes, paywall)
- ✅ Backend motor de warm-up (SMTP/IMAP + cifrado + aleatoriedad)
- ⏳ Bloqueado: crear proyecto Firebase dedicado (`ember-warmup`) — cuota de GCP agotada
- ⏳ Pendiente: activar envío real (verificación de idToken + lookup de buzón al tener el proyecto)

## Scripts

- `npm run dev` — servidor local Vite
- `npm run build` — typecheck + build de producción
- `npm run preview` — preview del build

## Modelo de negocio

- **Free Forever**: 20 correos/día, 1 buzón, prueba 14 días
- **Scale** ($29/mes): hasta 250/día, buzones ilimitados
- Paywall se dispara al arrastrar el slider de volumen por encima del límite gratuito.
