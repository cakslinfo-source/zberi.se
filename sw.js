/* Zberi se — service worker se sam odstrani (med razvojem brez predpomnjenja,
   da so posodobitve vedno takoj vidne). Namestitev na domači zaslon še vedno deluje. */
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    try {
      const keys = await caches.keys();
      await Promise.all(keys.map(k => caches.delete(k)));
      await self.registration.unregister();
      const clients = await self.clients.matchAll();
      clients.forEach(c => { try { c.navigate(c.url); } catch (e) {} });
    } catch (e) {}
  })());
});
