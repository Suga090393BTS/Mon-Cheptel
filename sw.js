/* Service worker Cheptel — VOLONTAIREMENT SANS CACHE.
   ---------------------------------------------------------------------------
   Pourquoi il existe : Chromium (donc Chrome ET Brave) n'affiche le vrai bouton
   d'installation d'application que si le site déclare un service worker avec un
   gestionnaire « fetch ». Sans lui, on ne peut plus créer qu'un raccourci.
   Pourquoi il ne cache RIEN : la version précédente servait les fichiers depuis
   le cache, ce qui rendait les mises à jour invisibles (bug iPhone). Ici chaque
   requête part sur le réseau, telle quelle. Aucun risque de version périmée.
   Ne pas y ajouter de cache sans revoir ce compromis.                        */
const VERSION = "cheptel-sw-v7-sans-cache";

self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (e) => {
  e.waitUntil(
    // Purge des caches laissés par les anciens service workers (cheptel-v1…v6).
    caches.keys()
      .then((ks) => Promise.all(ks.map((k) => caches.delete(k))))
      .catch(() => {})
      .then(() => self.clients.claim())
  );
});

// Gestionnaire « fetch » réel (condition d'installabilité) mais 100 % réseau.
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(fetch(e.request));
});
