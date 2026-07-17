# Zberi se

Športna aplikacija za organizacijo skupnih dejavnosti (kolo, golf, tek, badminton ...).
Odpri dogodek, določiš šport, koliko oseb rabiš, lokacijo, uro in trajanje — drugi se prijavijo.

## Zagon
To je statična PWA aplikacija. Za objavo jo je dovolj postaviti na kateri koli
statični gostitelj (Vercel, Netlify, GitHub Pages).

- `index.html` — celotna aplikacija
- `manifest.json`, `sw.js`, `icon-*.png` — PWA (namestitev na domači zaslon, offline)

### Vercel
1. Naloži to mapo v GitHub repozitorij.
2. Na vercel.com → New Project → izberi repozitorij → Deploy.
3. Vsak `git push` samodejno objavi novo različico.

### Namestitev na telefon
Odpri objavljeno povezavo v brskalniku → Deli → "Dodaj na začetni zaslon".

## Opomba
Podatki se trenutno shranjujejo lokalno na napravi (localStorage). Za skupne dogodke
med uporabniki je potreben zaledni del (baza) — naslednji korak.
