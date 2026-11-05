# joshway (touseway)

Vite + React site for **JOSHWAY**, a nonprofit connecting young people in the Lehigh Valley to programs, partners, and opportunities. Package name in `package.json` is `joshway`.

## Prerequisites

- **Node.js** `^20.19.0` or `>=22.12.0` (required by Vite 7)
- **npm** (comes with Node)

Check versions:

```bash
node -v
npm -v
```

## Setup

1. Clone the repo (or open the project folder).
2. **Change into the project directory** — the folder that contains `package.json` (this repo’s root is named `touseway`):

```bash
cd touseway
```

If you stay on your Desktop (or any parent folder), `npm run dev` fails with `Missing script: "dev"` because there is no `package.json` there.

Confirm you’re in the right place:

```bash
ls package.json
```

You should see `package.json` listed.

3. Install dependencies:

```bash
npm install
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Serve the production build locally |

These are the only scripts defined in `package.json`.

### Development

```bash
npm run dev
```

Vite is configured for port **5173** (`vite.config.js`). Open:

- http://localhost:5173  
- or http://127.0.0.1:5173  

Leave the terminal open while developing. Stop with `Ctrl+C`.

### Production build

```bash
npm run build
```

Output goes to `dist/`.

### Preview the build

```bash
npm run preview
```

Serves the contents of `dist/` so you can check the production build before deploying. Default Vite preview URL is typically http://localhost:4173 (check the terminal output).

## Troubleshooting

### `Missing script: "dev"`

You’re not in the project root. `cd` into `touseway` (the folder with `package.json`), then run `npm run dev` again.

### Port already in use

Something else is using 5173. Either stop that process, or start Vite on another port:

```bash
npx vite --port 5174
```

### Install / dependency weirdness

Clear and reinstall:

```bash
rm -rf node_modules
npm install
```

If that still fails, also remove the lockfile only as a last resort and reinstall (`rm package-lock.json && npm install`) — prefer keeping `package-lock.json` when possible.

### Wrong Node version

Vite 7 needs Node `^20.19.0` or `>=22.12.0`. Upgrade Node if `npm run dev` or `npm install` errors about the engine version.

## Local tip: Josh tour state

The in-site Josh guide stores progress in `sessionStorage` under the key `josh-guide`. To reset the tour during local testing, open DevTools → Application → Session Storage and delete `josh-guide`, or run in the console:

```js
sessionStorage.removeItem("josh-guide");
```

Then refresh the page.
