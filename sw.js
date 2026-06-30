/* Service worker Cheptel — cache l'app pour un fonctionnement hors-ligne de base.
   Navigations : réseau d'abord (pour récupérer les mises à jour), cache si hors-ligne.
   Autres ressources (icônes, librairies CDN) : cache d'abord.
   IMPORTANT : le cloud (Supabase) n'est JAMAIS mis en cache → données/auth toujours en direct. */
const CACHE = "cheptel-v5";
const ASSETS = ["./", "./index.html", "./manifest.json", "./icon-192.png", "./icon-512.png", "./icon.svg"];

self.addEventListener("install", (e) => {
  // On ne fait PAS skipWaiting ici : le nouveau SW reste « en attente » → l'app affiche le
  // bandeau « Mettre à jour ». Le clic envoie SKIP_WAITING (ci-dessous) pour l'activer.
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
});

// Activation à la demande (clic « Mettre à jour » dans l'app)
self.addEventListener("message", (e) => {
  if (e.data && e.data.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  // JAMAIS de cache pour le cloud Supabase (données + authentification) : toujours en direct.
  // (corrige le bug « les saisies du téléphone ne s'enregistrent pas » dû à des lectures cloud en cache)
  if (req.url.indexOf("supabase") !== -1) return;
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then((res) => { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); return res; })
        .catch(() => caches.match(req).then((r) => r || caches.match("./index.html")))
    );
  } else {
    e.respondWith(
      caches.match(req).then((cached) => cached || fetch(req).then((res) => {
        const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); return res;
      }).catch(() => cached))
    );
  }
});
