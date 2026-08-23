# Ember — Email Warm-up

POC de una app de warm-up de correos. React + TypeScript + Tailwind CSS v4.

## Stack
- Vite 6 + React 18 + TypeScript (strict)
- Tailwind CSS v4 (plugin `@tailwindcss/vite`)
- Sin backend: la lógica de auth/pago es simulada (POC)

## Features
- **Mascota flama viva** estilo Calcifer (`FlameMascot`) — SVG en capas con flicker, glow, parpadeo y brasas.
- **Fondo ad-hoc** (`EmberBackground`) — resplandores cálidos + brasas ascendentes.
- Login convencional + conexión de buzón (Gmail / Outlook·IMAP).
- Panel de control: sliders de volumen diario, umbral de respuesta y aleatoriedad.
- Reportes: tasa de apertura/respuesta, correos enviados, fecha estimada de finalización, barra de progreso y actividad reciente.
- Monetización: plan Free Forever (20 correos/día) + paywall al exceder el tope → plan Scale ($29/mes).

## Dev
```bash
npm install
npm run dev       # local
npm run build     # typecheck + build de producción (dist/)
npm run preview   # sirve dist/
```

## Notas
- Los datos de reportes son simulados (POC).
- El checkout del paywall no está conectado.
