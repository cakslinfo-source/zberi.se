/* Zberi se — service worker (network-first za posodobitve, offline fallback) */
const CACHE = "zberi-se-v2";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-512-maskable.png",
  "./apple-touch-icon.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(()=>{}));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  if (req.url.includes("open-meteo.com")) return; // vreme naj gre vedno v splet

  // Network-first za HTML/navigacijo → posodobitve so vedno vidne, ko si na spletu
  if (req.mode === "navigate" || req.destination === "document") {
    e.respondWith(
      fetch(req).then(resp => {
        const copy = resp.clone();
        caches.open(CACHE).then(c => c.put("./index.html", copy)).catch(()=>{});
        return resp;
      }).catch(() => caches.match("./index.html"))
    );
    return;
  }

  // Cache-first za statične vire (ikone, manifest)
  e.respondWith(
    caches.match(req).then(cached =>
      cached || fetch(req).then(resp => {
        const copy = resp.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(()=>{});
        return resp;
      }).catch(() => caches.match("./index.html"))
    )
  );
});
