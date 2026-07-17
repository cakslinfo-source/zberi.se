/* Zberi se — service worker za offline delovanje */
const CACHE = "zberi-se-v1";
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
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
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
  // Ne predpomni vremenskega API-ja — vedno naj gre v splet.
  if (req.url.includes("open-meteo.com")) return;
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
