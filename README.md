# FlowFit (local)

Run a local preview of this static SPA.

- With Node (recommended):

```bash
npm run start
```

(This uses `npx serve` and requires an internet connection the first time.)

- With Python (if installed):

```bash
python -m http.server 8000
```

Open http://localhost:8000 in your browser.

Notes:
- Data files were moved to `/data/*.json` and `app.js` loads them at runtime.
- If you plan to deploy, bundle/minify assets and enable caching headers on the server.
