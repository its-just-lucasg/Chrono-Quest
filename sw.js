// ============================================================================
// REBECCA'S CHRONO-QUEST — ANDROID PWA SERVICE WORKER
// Network-first with offline cache fallback so future DLC updates (like
// Christmas 2026!) automatically download when online while working 100% offline!
// ============================================================================

const CACHE_NAME = "rebecca-chrono-quest-v1.0.2"; // Update this version number to force cache refresh on new releases
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./audio.js",
  "./story.js",
  "./dlc.js",
  "./game.js",
  "./photos-data.js",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request)
      .then(networkResponse => {
        const clone = networkResponse.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, clone);
        });
        return networkResponse;
      })
      .catch(() => caches.match(event.request))
  );
});
