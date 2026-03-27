# 10 — Testing and quality

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local dev server |
| `npm run build` | Production build + typecheck |
| `npm run lint` | ESLint (Next config) |

## Known constraints

- **Hydration**: Do not use `navigator.onLine` in `useState` initializers — pattern documented in `useGeoSync`.
- **Geolocation**: Browsers may stall `getCurrentPosition`; **hard timeouts** implemented in `QuickLogFab`.
- **Mapbox**: Large client bundle — map loaded via **`dynamic(..., { ssr: false })`**.

## Dependencies

- Run `npm audit` periodically; some transitive deps may report vulnerabilities — evaluate `npm audit fix` with care (breaking changes).

## Accessibility

- Bottom nav uses semantic `<nav>` with `aria-label="Primary"`.
- Map container has `role="application"` and `aria-label="GeoStrike map"`.
- Layer toggles use **`title`** tooltips for compact hints.
