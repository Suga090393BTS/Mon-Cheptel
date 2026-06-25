# 📓 JOURNAL DE BORD — Cheptel

> Historique daté des conversations et décisions. Le plus récent en haut.

---

## 2026-06-26

### Échange 50 — PWA (installable « écran d'accueil » + hors-ligne) + hébergement GitHub Pages
- **But** : utiliser l'app sur téléphone. Hébergement choisi = **GitHub Pages** (comme le budget).
- **Fichiers créés** (à mettre à la racine du dépôt) : `icon.svg`, `icon-192.png`, `icon-512.png`
  (poule blanche sur fond emerald, générés via `qlmanage` depuis le SVG), `manifest.json`
  (name/short_name, start_url ".", display standalone, theme #059669), `sw.js` (service worker :
  navigations réseau-d'abord pour récupérer les MAJ, ressources/CDN cache-d'abord).
- **index.html** : `<head>` enrichi (link manifest, theme-color, apple-touch-icon + metas
  apple/mobile-web-app, viewport-fit=cover) + enregistrement du service worker (sans effet en
  file://). Chemins relatifs → marche sous le sous-dossier `/cheptel/` de GitHub Pages.
- **Vérif preview** (localhost = contexte sécurisé) : manifest OK (4 icônes), icônes 192/512
  accessibles, SW enregistré + actif (scope /), app charge normalement, 0 erreur console.
- **À faire par l'utilisatrice** : créer le dépôt GitHub `cheptel`, **uploader les 6 fichiers app**
  (PAS les .md privés), activer Pages, puis sur le tel « Ajouter à l'écran d'accueil ».
- **Rappel MAJ** : ré-uploader `index.html` (+ fichiers modifiés) ; SW navig. réseau-d'abord → les
  mises à jour s'affichent.
- **Fichiers** : `index.html`, `manifest.json`, `sw.js`, `icon.svg`, `icon-192.png`, `icon-512.png`.

## 2026-06-25

### Échange 49 — Barre latérale : bloc sauvegarde compact (priorité aux onglets)
- **Demande** : réduire le bloc sauvegarde/export/import pour donner la priorité aux onglets.
- `SaveIndicator` compacté : pastille de statut + une seule ligne « 💾 Sauvegarder » + ⬇️ (export)
  + ⬆️ (import) en icônes. Suppression du titre « Sauvegarde des données », des 2 gros boutons
  pleine largeur et de la note → le bloc bas tient en ~2 lignes. Export/import déplacés dans
  `SaveIndicator`.
- **Supabase** : aucune migration. **Vérif preview** : footer = [💾 Sauvegarder, ⬇️, ⬆️], note/anciens
  boutons absents, 0 erreur.
- **Téléphone** : interface déjà adaptée (éch. 48 : menu ☰ + cartes). Reste à décider l'hébergement
  (mettre `index.html` en ligne pour y accéder depuis le tel) et option PWA « ajouter à l'écran
  d'accueil » — proposé à l'utilisatrice.
- **Fichier** : `index.html`.

### Échange 48 — Sauvegarde visible, masquage d'onglets, mobile (cartes + menu repliable)
- **Demande** : améliorations sauvegarde + simplicité/facilité. Choisies : indicateur de sauvegarde,
  masquage d'onglets, affichage mobile en cartes.
- **Indicateur de sauvegarde** : pub/sub `_syncState` + hook `useSyncState` ; statuts gérés dans
  `pushCloud`/`pullCloud`/`pushCloudDiffere` (local / pending / saving / saved / error).
  Composant `SaveIndicator` dans la barre latérale : pastille « ✓ Sauvegardé il y a X / ⏳
  Enregistrement… / ⚠️ Hors-ligne / 💾 Sur cet appareil » + bouton « Sauvegarder maintenant »
  (cloud si connecté, sinon « Télécharger une sauvegarde » = export). Helper `tempsRelatif`.
  `connecte` basé sur l'auth réelle (la lib peut être chargée sans compte = mode local).
- **Masquage d'onglets** : `config.ongletsMasques` (ids) ; nav filtre les pages masquées (Réglages
  toujours visible) ; éditeur dans Réglages → Général → « Onglets du menu » (case Afficher par
  onglet, Réglages verrouillé). mergeConfig absorbe la clé.
- **Mobile** : (1) composant `Table` rendu responsive — `<table>` (hidden sm:block) sur ordinateur,
  **cartes libellé/valeur** (sm:hidden) sur téléphone, sans défilement horizontal. (2) Barre latérale
  repliable : barre du haut avec ☰ sur mobile, `aside` en overlay coulissant + voile, fermeture au
  choix d'un onglet ; `sm:translate-x-0` garde le comportement desktop inchangé. `main` p-4 sm:p-8.
- **Supabase** : aucune migration.
- **Vérif preview** : mode local → « Sur cet appareil » + bouton export ; masquage Catalogue OK
  (`ongletsMasques:["catalogue"]`) ; mobile 375px → table en cartes, menu ☰ coulisse, contenu pleine
  largeur ; desktop 1280px → barre latérale + table classiques ; 0 erreur console.
- **Fichier** : `index.html`.

### Échange 47 — Onglets internes sur les autres pages
- **Demande** : organiser les autres pages en onglets, comme la Base de données / inventaires.
- **Gestion poulailler** : onglets **🩺 Soins du jour** / **🔔 Rappels · N** (rappels à traiter +
  à planifier + nettoyages à prévoir + rappels manuels) / **📜 Journal** (dernières actions).
- **Récolte des œufs** : onglets **🥚 Récoltes** (défaut) / **🐣 Lots en couveuse**. État nommé
  `ongletL` (le composant a déjà une variable locale `vue`). Graphiques restent en modale.
- **Historique** : résumé de période gardé visible, onglets **🥚 Récoltes** / **🐣 Lots terminés** /
  **🔧 Matériel remplacé**.
- **Laissés tels quels** : Tableau de bord (déjà en sections déroulantes), Poussins & Reproducteurs
  (déjà en sous-onglets), Suivi journalier / Catalogue / Animaux consommation (vue unique).
- **Supabase** : aucune migration. Aucune logique/donnée changée.
- **Vérif preview** : chaque onglet n'affiche que ses sections (h2 ciblés) ; 0 erreur.
- **Fichier** : `index.html`.

### Échange 46 — Inventaires rangés en onglets internes (comme la Base de données)
- **Demande** : organiser les pages Inventaire consommables & matériel en onglets, comme Réglages.
- **Consommables** : résumé chiffré (4 cartes) gardé toujours visible, puis onglets internes
  (`const [vue]=useState("stock")`) : **📦 Stock** (à racheter + stock par article),
  **🔁 Mouvements** (mouvements de stock), **💶 Dépenses** (graphique + tableau par mois).
- **Matériel** : résumé (cartes) gardé visible, onglets **🔧 Parc** (tableau) /
  **🛠️ À traiter · N** (listes à réparer / remplacer / hors service).
- Boutons d'action (Entrée/Sortie, Ajouter) et modales restent hors des gardes.
- **Supabase** : aucune migration. Aucune logique/donnée changée, juste l'agencement.
- **Vérif preview** : chaque onglet n'affiche que ses sections (h2 ciblés) ; 0 erreur ; capture OK.
- **Fichier** : `index.html`.

### Échange 45 — « espace poussins » ≡ « poussins » (abreuvoirs jeunes)
- **Retour** : pas besoin de différencier « espace poussins » (zone) et « poussins » (type),
  ni « espace cailleteaux » et « cailleteaux/cailletaux » — mêmes valeurs.
- **Fix** : `volumeAbreuvoirJeune` matche désormais par **mot-clé** dans le type OU le nom de zone
  (« poussin » / « caillet » — ce dernier couvre cailleteaux/cailletaux/cailleteau). Peu importe
  lequel est rempli, la même valeur de volume/dose est utilisée. Note explicative ajoutée dans
  Réglages → Abreuvoirs / volumes.
- **Supabase** : aucune migration.
- **Vérif preview** : abreuvoir nommé seulement « poussins » (type vide), 2 L → lot poussin trouve
  « 2 L → 1,2 ml » ✓ ; 0 erreur.
- **Fichier** : `index.html`.

### Échange 44 — Achats reproducteurs détaillés par lot
- **Besoin** : détailler les achats par lot (ex. 5 lots de 4 cailles = 3♀+1♂ à 24 €/lot →
  coût total auto + coût/animal).
- **Supabase** : aucune migration (snapshot). Champs additifs sur `breederPurchases` :
  `nbLots`, `femellesParLot`, `malesParLot`, `prixParLot` (en plus de `nombre`/`prixTotal`/`remise`
  conservés et désormais dérivés).
- **`BreederPurchaseForm`** : remplacé « nombre + prix total » par **nb de lots × (femelles+mâles)/lot**
  et **prix par lot**. Récap calculé : total animaux = lots×(F+M), coût total = lots×prix/lot,
  prix payé = total−remise, **coût/animal** = payé/total. Rétro-compat : prixParLot init =
  ancien prixTotal ; si pas de composition (ancien achat), total animaux = ancien `nombre`.
- **`AchatsReproducteurs`** : colonne « Animaux (détail) » = total + « X lots × Y · a♀/b♂ » +
  description ; colonne Prix payé = payé + « ≈ €/animal » ; nouvelle carte **Coût moyen/animal**
  (totalPayé/totalAnimaux) + sous-titre « N lot(s) » sur Animaux achetés.
- **Vérif preview** : 5 lots×4 (3♀/1♂) à 24 € → 20 animaux (15♀/5♂), 120 €, 6 €/animal ✓ ;
  ancien achat (369→313,65 / 3) → 104,55 €/animal ✓ ; coût moyen global 18,85 € ✓ ; 0 erreur.
- **Fichier** : `index.html`.

### Échange 43 — Réglages / Base de données rangés en onglets internes
- **Demande** : page Réglages trop longue → mieux organiser.
- **Solution** : barre d'onglets internes dans `Reglages` (`const [cat,setCat]=useState("general")`),
  gardes `{cat === "X" && <>…</>}` placées aux frontières des sections existantes (aucun contenu
  réécrit, aucune logique changée). 6 onglets :
  - **⚙️ Général** : Cloud (Supabase), Titres des onglets, Cheptel (effectifs), Prix de l'œuf.
  - **📋 Listes** : toutes les `EditeurListe` (zones, actions, produits, unités, catégories,
    statuts, espèces, fournisseurs, types d'achat).
  - **🥚 Couvaison & jeunes** : Suivi poussins/cailleteaux, Normes de couvaison.
  - **🩺 Soins & rappels** : fréquence nettoyage, fréquence traitements, abreuvoirs/dose/freqJeunes,
    rappels produits, restes interdits, zones de jeunes.
  - **🧺 Inventaire** : mémoire inventaire (articles).
  - **🐓 Reproducteurs** : seuils d'âge.
  - Pied de page « sauvegarde automatique » reste toujours visible.
- **Supabase** : aucune migration.
- **Vérif preview** : chaque onglet n'affiche que ses `<h2>` ; 0 erreur console ; capture OK.
- **Fichier** : `index.html`.

### Échange 42 — Rappel « à venir » du nettoyage des lots de jeunes au tableau de bord
- **Problème signalé** : après avoir coché le nettoyage d'un lot dans Poussins & cailleteaux,
  aucun rappel à venir n'apparaissait (le badge existait dans la carte du lot, mais rien au
  tableau de bord).
- **Cause** : les rappels des lots de jeunes (`soinsJeuneLot`) n'étaient pas remontés dans
  « ✅ Actions du jour » du tableau de bord (seuls les reproducteurs l'étaient).
- **Fix** (Dashboard, boucle `jeunesActifs`) : nettoyage + Fortiferm/Cocciferm/Vermiferm de
  chaque lot actif poussés dans `enRetard` / `aFaire` / `aVenir` selon le code (retard /
  aujourd'hui / avenir), préfixés « 🐥 » et avec la dose pour les traitements. `aVenir` trié.
  Nettoyage retiré de la liste « manque » J1-J10 (anti-doublon, géré par les rappels de lot).
  « jamais fait » reste hors retard.
- **Supabase** : aucune migration (snapshot).
- **Vérif preview** : lot nettoyé aujourd'hui → « 🐥 Nettoyer · lot (demain) » dans Prochains
  rappels ; lot nettoyé il y a 2 j → en retard ; lot jamais nettoyé → pas en retard ; 0 erreur.
- **Fichier** : `index.html`.

### Échange 41 — Titres des onglets personnalisables (par l'utilisatrice)
- **Contexte** : l'utilisatrice veut gérer elle-même les titres des onglets (ne plus que je les
  change / surcharge). → Plus aucun renommage d'onglet imposé de ma part à l'avenir.
- **Supabase** : aucune migration (snapshot). Clé `config.titresOnglets = { [pageId]: "titre" }`.
- **Nav** : `App` lit `store.config.titresOnglets` ; `titreOnglet(p)=override.trim()||p.label`.
- **Réglages** : nouvelle section « Titres des onglets » (un champ par page, placeholder = titre
  par défaut, vide = défaut, bouton « ↺ défaut »). L'icône ne change pas.
- **Vérif preview** : renommage « Gestion poulailler » → « Mes poules » répercuté dans la barre ;
  ↺ défaut restaure ; 0 erreur console.
- **Fichier** : `index.html`.

### Échange 40 — Nombre (lot) dans la fiche reproducteur
- **Supabase** : aucune migration (snapshot). Champ additif `nombre` sur les lignes `reproducteurs`
  (défaut 1, rétro-compatible).
- **Besoin** : pouvoir enregistrer un lot acheté (ex. « 3 poules Marans ») en une seule fiche.
- **`ReproducteurForm`** : champ « Nombre (lot) » (min 1, défaut 1) ; **Nom rendu facultatif**
  (placeholder « ex. Cléo ou Lot Marans »). `rec.nombre = max(1, Number||1)`.
- **Tableau Reproducteurs** : colonne **« Nb »** (mise en valeur si > 1) ; nom vide → « (lot sans nom) » ;
  compteur passe à « X animal(aux) · Y ligne(s) » (somme des `nombre`).
- **Dashboard** : « Reproducteurs actifs » = somme des `nombre` des actifs (au lieu du nb de lignes).
- **Vérif preview** : lot de 3 sans nom enregistré (nombre=3) ; compteur 5 animaux / 3 lignes
  (2 seeds comptés 1 chacun) ; 0 erreur console.
- **Fichier** : `index.html`.

### Échange 39 — Rappels utiles, doses auto F/C/V, consommables urgents, séparation repro/jeunes
- **Supabase** : AUCUNE migration SQL (snapshot). Nouvelles clés `config` : `articlesUrgents`,
  `doseRule` (3 ml/5 L), `abreuvoirs` (zone/type/volume/actif/obs), `freqJeunes`. Champ additif
  `traitements{fortiferm,cocciferm,vermiferm}` sur les lots `poussins`. Aucune donnée supprimée.
- **M1 Urgent** : case « ⭐ Urgent » dans `ConsommableForm` + bouton bascule ☆/⭐ dans
  « Stock par article ». Urgence stockée par nom normalisé dans `config.articlesUrgents`
  (helpers `articleEstUrgent`/`toggleArticleUrgent`). Seuls les articles **bas ET urgents**
  remontent en « Alertes importantes » ; les autres restent dans l'inventaire.
- **M2 Dédoublonnage dashboard** : « Stocks à racheter » et « Matériel à réparer/remplacer/HS »
  ne sont plus listés dans les sections Stocks/Matériel (remplacés par une note de renvoi) ;
  ils restent uniquement dans « Alertes importantes ». Stats (valeur stock/parc, dépenses) gardées.
- **M3 Doses** : `doseTraitement(config, volumeL) = volumeL × doseRule.ml / doseRule.parLitres`
  (défaut 3/5). `formatMl`. Vérifié : 30 L→18 ml, 18 L→10,8 ml, 1 L→0,6 ml. Affichée dans le
  Soin du jour (repro) et les cartes de soins par lot (jeunes). Bouton « modifier la dose »
  non imposé (règle éditable en Réglages).
- **M4 Abreuvoirs** : section Réglages « Abreuvoirs / volumes » (zone/type/volume/actif/obs +
  colonne dose calculée), éditeur règle de dose, éditeur fréquences jeunes. Défauts : poules 30 L,
  cailles 18 L, poussins 1 L, cailleteaux volume à compléter. Helpers `volumeAbreuvoirZone`/
  `volumeAbreuvoirType`/`volumeAbreuvoirJeune`.
- **M5/M10 Libellés** : « Gestion poulailler — reproducteurs » (plus « adultes ») dans la page
  et le dashboard. (Les noms internes `zonesAdultes`/commentaires restent, non visibles.)
- **M6/M9 Jeunes par lot** : nouveau sous-onglet « Soins & traitements » dans Poussins.
  `soinsJeuneLot(p, config)` calcule par lot (statut « en croissance » ET âge ≤ nS sem) :
  nettoyage (quotidien) + Fortiferm/Cocciferm/Vermiferm selon `freqJeunes`, avec dose selon
  l'abreuvoir du type. Boutons « donné aujourd'hui » (`marquerTraitement`, re-clic = annuler) +
  « Nettoyage du jour ». Au-delà de S{nS} ou hors croissance → carte grisée, plus de rappel.
  Les traitements en retard/du jour des lots remontent dans « Tâches du jour (jeunes) » du dashboard.
- **M7/M8 Rappels** : « jamais fait » N'EST PLUS un retard/alerte → bloc discret « À planifier »
  dans Gestion poulailler, retiré des « En retard » du dashboard. Eau/nourriture toujours sans
  rappel. Repro : nettoyage 15 j + F/C/V 30 j inchangés (config). Jeunes gérés par lot, plus via
  zones → pas de rappel « cailleteaux » sans lot.
- **Vérif preview** (mode local, /tmp) : 0 erreur console ; doses OK ; urgent → seul l'article
  bas+urgent en alerte ; dédoublonnage OK ; soins lot poussin 1 L→0,6 ml, cailleteau « à régler » ;
  traitement enregistré (Fortiferm → prochaine échéance +30 j).
- **Fichier** : `index.html` uniquement.

### Échange 38 — Normes unifiées, promotions, listes auto, conditionnement, mémoire seuils, achats reproducteurs
- **Supabase** : AUCUNE migration SQL (modèle snapshot). Nouvelles données dans `config`
  (`fournisseurs`, `memoireArticles`, `typesAchatRepro`) + nouvelle collection snapshot
  `STORE_KEYS.breederPurchases` (`cheptel_breeder_purchases_v1`). Tout est sérialisé
  automatiquement (export/import/cloud bouclent sur `STORE_KEYS`). Aucune donnée supprimée.
- **M1 Normes** : suppression de l'éditeur « Normes de couvaison (par espèce) » (table phases).
  La donnée `config.normes` (durée + params mirages/retournement) est CONSERVÉE (toujours lue
  par les calculs) ; son édition est déplacée dans l'en-tête de la section conservée
  « Normes de couvaison (température / humidité) » : durée totale, mirage 1, mirage 2, arrêt
  retournement, ventilation + table T°/H% par plage de jours. Un seul bouton « Restaurer les
  normes officielles » restaure `normes` + `normesCouvaison`. Helpers retirés : `setPhase`,
  `addPhase`, `delPhase`, `restaurerNormes`.
- **M2 Promotions** : champ `remise` (€ libre) sur consommables ET matériel. Valeur réelle =
  qté×PU (visible), prix payé = max(0, valeur réelle − remise). Dépenses (`statsConsommables`
  depMois/depAnnee, `statsMateriel` depAnnee) calculées sur le prix payé ; « valeur réelle »
  conservée (valeurStock conso, valeurTotale parc). Tables : valeur réelle barrée + prix payé
  si remise > 0.
- **M3 Listes auto** : `config.fournisseurs` (datalists partout) + `config.memoireArticles`
  (clé = nom normalisé). Éditeurs dans Réglages : « Fournisseurs (liste auto) »,
  « Types d'achat reproducteurs », table « Mémoire inventaire (articles) » (modif/suppr).
- **M4 Conditionnement** : unité consommables par défaut = « pièce » ; champ informatif
  `conditionnement` (20 kg, 4 kg…) qui n'entre PAS dans le calcul de prix.
- **M5 Mémoire seuils** : mini-agent `suggererArticle(config, nom)` (exact normalisé sinon
  inclusion la plus proche) → propose seuil/unité/conditionnement/catégorie/fournisseur
  (remplit les champs vides, non intrusif) ; `memoriserArticle`/`memoriserFournisseur`
  upsert à l'enregistrement.
- **M6 Achats reproducteurs** : sous-onglets « 🐔 Animaux » / « 🛒 Achats » dans Reproducteurs
  (tableau principal inchangé). `BreederPurchaseForm` + `AchatsReproducteurs` : date,
  fournisseur/éleveur, type d'achat, espèce, nombre, description, prix total, remise, prix payé,
  obs. Stats : dépenses année, animaux achetés, lots.
- **Vérif preview** (mode local, /tmp) : compile sans erreur console ; achat 369−55,35=313,65 ✓ ;
  conso 2×18−2=34 ✓ ; mémoire « Granulé poussin 20 kg » (seuil 2) re-proposée sur « granulé
  poussin » ✓ ; fournisseurs mémorisés ✓ ; ancienne section normes absente, nouvelle présente ✓.
- **Fichier** : `index.html` uniquement.

### Échange 37 — Séparation adultes / jeunes (poulailler vs poussins)
- **Supabase** : aucune migration (snapshot). Ajout `config.zonesJeunes` (liste). Historique préservé.
- **Modèle** : `config.zonesJeunes = ["espace poussins"]` ; helpers `estZoneJeune(zone,config)` +
  `zonesAdultes(config)`. Les zones de jeunes sont exclues de Gestion poulailler.
- **Gestion poulailler = adultes uniquement** : `nettoyagesAPrevoir`, `rappelsIntelligents`,
  « Soin du jour » et le menu déroulant Zone du `PoulaillerForm` excluent les zones de jeunes
  (en édition d'une ancienne ligne « jeune », la zone reste disponible pour ne pas la perdre).
  Titre → « Gestion des poulaillers — adultes ». Les anciennes lignes zone=poussins restent
  visibles dans « Dernières actions » (historique).
- **Poussins & cailleteaux** : déjà le foyer complet du soin des jeunes (Lots, J1-J10, S1-S8
  quotidien repliable, eau/nourriture/nettoyage/temp/humidité/vivants/morts/obs/comportement).
  Sous-titre clarifié.
- **Tableau de bord** : section « 🏠 Gestion poulailler — adultes » (sans poussins, car np filtré)
  + section « 🐥 Poussins et cailleteaux » séparée (déjà existante). Pas de mélange.
- **Navigation** : l'ordre demandé == ordre actuel → inchangé.
- **Suivi journalier** : analysé = suivi de COUVAISON (relevés/mirages/éclosions des couveuses),
  PAS un doublon des soins adultes/jeunes → conservé.
- **Réglages** : nouvelle section « Zones de jeunes (gérées dans Poussins & cailleteaux) »
  (cases à cocher, comme restesInterdits).
- Vérifié (preview /tmp, 0 erreur) : Soin du jour + Nettoyages = 2 zones adultes seulement ;
  form Zone sans « espace poussins » ; Réglages « espace poussins » coché en zone jeune ;
  dashboard « Gestion poulailler — adultes » sans carte poussins + section jeunes séparée ;
  historique poussins conservé dans Dernières actions.

### Échange 36 — Gestion poulailler : encart scrollable, rappels simplifiés, traitements
- **Supabase** : aucune migration (snapshot). Ajouts additifs : `quantites`/`unitesProd` sur
  les lignes poulailler, `config.freqTraitements` (par zone). Préservé.
- **Modal** global rendu scrollable (`max-h-[90vh]`, header fixe, corps `overflow-y-auto`).
- **Vitamines supprimé** → mappé sur **Fortiferm** partout (`LEGACY_ACTION_MAP`,
  `actionsDeLigne` remap `vitamines→fortiferm`, `cochesInit`). « Contrôle général » retiré.
  ACTIONS_COCHES = eau, nourriture, nettoyage, litière, restes, fortiferm, cocciferm, vermiferm.
- **Quantités par traitement** : `PoulaillerForm` affiche un champ quantité+unité par
  traitement coché ; stockés dans `quantites{}`/`unitesProd{}`. Déduction stock par produit.
  Champ « problème particulier » supprimé (→ Observation). Champs produit/quantité globaux et
  rappel manuel retirés du formulaire.
- **Rappels** : `rappelsIntelligents` ne gère plus eau/nourriture ; seulement nettoyage
  (`intervalleNettoyage` par zone) + fortiferm/cocciferm/vermiferm (`freqTraitements` par zone,
  défaut 30 j). Défauts nettoyage : poules/cailles repro 15 j, poussins 1 j.
- **« jamais - jamais »** : venait de l'écart Vitamines (suivi par les rappels) vs Fortiferm
  (coché par l'utilisateur) + eau/nourriture « jamais » sur chaque zone. Corrigé par le mapping
  + suppression eau/nourriture. `nettoyagesAPrevoir` : code « fait » si dernier===today →
  pastille « ✓ fait aujourd'hui ». Libellés : en retard / à faire aujourd'hui / jamais fait.
- **Réglages** : section « Fréquence des soins » (eau/nourriture/vitamines) remplacée par
  « Fréquence des traitements (jours par zone) » (table Fortiferm/Cocciferm/Vermiferm × zones).
- **Dernières actions** : colonnes Produit/Qté/Rappel → une colonne « Quantités » (par traitement).
- Vérifié (preview /tmp, 0 erreur) : form (8 actions, sans vitamines/contrôle/problème/rappel,
  scrollable) ; 2 quantités séparées Fortiferm/Vermiferm ; enregistrement → « Fortiferm 2 ·
  Vermiferm 1 » dans Dernières actions + disparition du rappel Fortiferm/nettoyage poules repro ;
  carte nettoyage « ✓ fait aujourd'hui » ; aucun « jamais-jamais » ; pas de rappel eau ; Réglages OK.

### Échange 35 — Normes couvaison détaillées (min/max par jour) : graphes, suivi, alertes
- **Supabase** : aucune migration (snapshot). Nouvelle clé `config.normesCouvaison` (absorbée
  par `mergeConfig`). Pas de table `incubation_norms` SQL — équivalent dans le snapshot.
- **Modèle** : `config.normesCouvaison[espece] = [{jDebut,jFin,tempCible,tempMin,tempMax,
  humMin,humMax,phase,actif,obs}]`. Défauts = spec exacte : caille J1-13 45-50% / J14-17
  65-75% ; poule J1-17 45-55% / J18-21 65-75% ; 37,5°C (tol. 37,2-37,8) partout.
- **Helpers** : `normeJour(config,esp,j)`, `dureeEspece`, `statutIntervalle`, `bornesTemp`,
  `serieBande`/`serieCible`, `alertesCouvaison`, `PastilleStatut`.
- **Graphes** (`LineChart`) : ajout `band` (aire min/max verte) + `ligne` (cible pointillée) ;
  courbe réelle au-dessus (plus épaisse). Temp = bande tol + cible ; humidité = bande min/max.
- **Suivi** (`IncubatorCard`) : table comparaison relevés vs norme du jour (T° cible, H% min-max,
  statut OK/trop bas/haut/à vérifier via `PastilleStatut`) + bloc alertes du lot.
- **Alertes** (Mission 5) : temp/hum trop bas/haut, norme non trouvée, jour hors durée — par
  espèce (durée 17/21).
- **Tableau de bord** : `suivis` ajouté ; table couvaison enrichie (J, T°/H° dernier, statut
  norme) ; tuile « Couvaison hors normes » (incluse dans nbAlertes).
- **Réglages** : nouvelle section éditable « Normes détaillées température/humidité (par jour) »
  (add/del plage, actif, phase, obs) + bouton « Restaurer les normes officielles » ; l'ancienne
  section « Normes (par espèce) » reste pour durée + repères (mirages/retournement).
- **QA vérifiée (preview /tmp, 0 erreur)** : injection lot caille J14 + poule J18 → comparaison
  caille J13=45-50 OK / J14=65-75 trop bas ; poule J17=45-55 OK / J18=65-75, 39°=trop haut ;
  alertes dashboard exactes ; table couvaison enrichie OK ; éditeur Réglages OK.

### Échange 34 — Séparation race / couleur (catalogue + reproducteurs)
- **Supabase** : aucune migration (snapshot). Ajouts additifs : `couleur` (string) sur
  reproducteur, `couleurs` (array) + `noteperso` sur race.
- Helpers : `COULEURS_PAR_RACE` (variétés courantes ~21 races, sourcées web : APA/British
  Leghorn Club, Orpington Club FR, marans.eu, Holistic Hen pour Coturnix), `MOTS_COULEUR`,
  `splitRaceCouleur(nom)→{base,couleur}` (mots FR en fin de nom), `couleursDeRace(r)`
  (champ saisi sinon référence).
- **ReproducteurForm** : Race = `input list` cherchable sur **noms de base** dédupliqués
  (vide = inconnue) ; champ **Couleur / variété** séparé (datalist depuis la race choisie,
  vide = à identifier). `couleur` stocké ; affiché sous la race dans le tableau.
- **Catalogue** : carte cliquable → **FicheRace** (infos + couleurs/variétés éditables
  add/remove + note perso, `patchLigne("races")`) ; puce 🎨 sur les cartes ; bannière +
  bouton **« Séparer race / couleur »** = migration non destructive (`splitRaceCouleur` →
  renomme en base + fusionne couleur avec variétés connues).
- Seed nettoyé : « Leghorn blanche »→« Leghorn », « Andalouse bleue »→« Andalouse ».
- Vérifié (preview /tmp, 0 erreur) : fiche Leghorn (couleurs réf.), migration (banner→0,
  Leghorn blanche→Leghorn), form repro (46 bases propres, suggestions Sussex OK), création
  coq « Albir » race=Leghorn / couleur=blanc doré séparés et persistés.

### Échange 33 — Fiche de référence + bilan auto + alerte écart 4 j
- **Fiche de référence couvaison** : `calendrierCouvaison(norme)` génère le calendrier
  jour par jour depuis `config.normes` (T°/H% + actions M1/M2/arrêt retournement/arrêt
  ouverture/perçages/éclosion/séchage). Composant `FicheCouvaison` (calendriers poule+caille
  côte à côte + signes de mirage + causes d'échec + conservation des œufs), affiché dans une
  `Section` repliable de la **section Couvaison du tableau de bord** (le composant `Couveuses`
  n'est branché nulle part — dashboard affiche les `IncubatorCard` directement). Vérifié :
  poule M2 J+14 / arrêt J+18 / éclo J+21 ; caille M2 J+10 / arrêt J+14 / éclo J+17 ; humidité
  → 70% au jour d'arrêt du retournement (conforme spec).
- **Bilan de couvée auto** : `recapSuivi` renvoie `tauxGlobal` (nés/incubés). `StatsDetaillees`
  gagne un récap **« Bilan de couvée par espèce »** (fertilité/éclosion/réussite globale agrégées)
  + colonne « Réussite » par lot.
- **Alerte écart 4 j** : sur le tableau de bord, paires lot poule/caille « en couveuse » à
  < 4 jours d'écart de `dateDebut` → tuile « Écart couvaison poule/caille ». Seed = 4 j → OK.
- Vérifié via preview (/tmp), 0 erreur console.

### Échange 32 — Normes de couvaison alignées sur la spec officielle
- L'utilisateur fournit les paramètres officiels. Corrections `configDefaut.normes` :
  température 37,5°C constante (incub.+éclosion), humidité 50% (45-55) → 70% (65-75),
  **caille mirage2 J13 → J10** (poule J14 inchangé). Phases boundaries (arrêt retournement
  J18 poule / J14 caille) déjà bonnes.
- Comme `mergeConfig` préfère la config sauvegardée, ajout d'un bouton **« Restaurer les
  normes recommandées »** (Réglages) → `restaurerNormes()` réécrit `config.normes.poule/caille`
  depuis `configDefaut` sans toucher au reste. Vérifié (preview) : 14/10, 37,5, 50/70.
- Reste proposé à l'utilisateur (en attente de réponse) : fiche de référence (calendriers
  jour/jour, signes mirage, causes d'échec, conservation œufs), bilan de couvée auto
  (fertilité/éclosion/réussite global), alerte écart 4 j poule/caille.

### Échange 31 — Refonte modules (multi-actions, rappels intelligents, S1-S8 quotidien, âges repro)
- **Supabase** : AUCUNE migration (modèle snapshot 1 ligne jsonb). Tout additif/rétro-compatible.
- **Mission 1/3 — Poulailler multi-actions** : `PoulaillerForm` passe en **cases à cocher**
  (`ACTIONS_COCHES` : eau, nourriture, nettoyage, litière, restes, vitamines, fortiferm,
  cocciferm, vermiferm, contrôle) + température + humidité + produit/qté + observation +
  problème. Restes **désactivés** sur zones `restesInterdits`. Nouveau format
  `{date, zone, coches:{...}, temperature, humidite, ...}`. Ancien format (`action` texte)
  lu via `LEGACY_ACTION_MAP` + helpers `actionsDeLigne`/`ligneFaitAction`. Panneau
  **« Soin du jour »** : coche rapide eau/nourriture/nettoyage(+restes) par zone (crée/maj
  la ligne du jour).
- **Mission 2/6 — Rappels intelligents** : `rappelsIntelligents()` calcule par zone×action
  la dernière fois faite (depuis les coches) + prochaine échéance selon fréquence
  (`config.freqSoins` eau/nourriture/vitamines/vermiferm + `intervalleNettoyage` pour
  nettoyage). Codes retard/aujourdhui/avenir/jamais. Branché sur Gestion poulailler +
  Tableau de bord (en retard / aujourd'hui / à venir). `nettoyagesAPrevoir` reconnaît
  aussi le nouveau format coché.
- **Mission 4** : `SuiviJourForm` (J1-J10) enrichi : eau/nourriture/nettoyage cochables +
  humidité + comportement + changement alimentation + problème.
- **Mission 5 — S1-S8 quotidien** : sous-onglet « Suivi S1-S8 » devient **semaines pliables**
  (`semOuvertes`), chaque semaine affiche ses 7 jours (réutilise `p.jours`, `majJour`, `chk`,
  `SuiviJourForm`). Ancien `p.semaines` conservé mais plus affiché (non destructif).
- **Mission 7 — Âges reproducteurs** : `config.agesRepro` (mois, par espèce) ; `alerteAgeRepro`
  + `BadgeAgeRepro` ; colonne **« Stade repro »** dans le tableau Reproducteurs ; alertes
  (trop jeune / âgé) sur le tableau de bord.
- **Réglages** : éditeurs « Fréquence des soins » + « Seuils d'âge reproducteurs ».
- **Vérifié** (serveur /tmp + preview MCP, Desktop bloqué par TCC) : compilation OK, 0 erreur
  console ; testés poulailler (coche rapide + form + règle restes cailles), S1-S8 (sem 3 =
  J15-J21, coches OK), reproducteurs (badges optimal), Réglages (éditeurs), tableau de bord.

### Échange 30 — Nettoyage « jamais » sur les 3 zones (robustesse)
- Les 3 zones affichaient « jamais nettoyé » alors que cailles + poussins faits.
  Cause systématique probable : noms de zone des saisies ≠ clés de
  `intervalleNettoyage` (casse/accents/espaces, ou zones renommées en Réglages
  sans mettre à jour les clés de fréquence).
- **Refactor `nettoyagesAPrevoir`** : ajout `normLibelle` (trim + lowercase + NFD
  sans accents + espaces compactés). On parcourt désormais **`config.zones`** (pas
  les clés de fréquence) ; fréquence trouvée par lookup normalisé ; lignes
  matchées par zone+action **normalisées**. `.filter` : on n'affiche que les zones
  avec une fréquence OU au moins un nettoyage enregistré.
- **Réglages → Fréquence de nettoyage** : itère `config.zones` (une ligne par zone
  réelle), valeur vide si non définie. Aligne les clés sur les vraies zones.
- À confirmer côté données : si ça persiste, lire colonnes Zone/Action du tableau
  « Dernières actions » (l'action doit être exactement « nettoyage »).

### Échange 29 — Connexion : mot de passe refusé + reset page blanche
- **Symptômes** : « mot de passe incorrect » à la connexion ; le lien de reset
  Supabase ouvre une **page blanche** (idem app budget) car l'email redirige vers
  une Site URL sans page qui traite le token de récupération (l'app n'a pas de
  handler de recovery).
- **Corrections code (LoginEcran)** :
  - Email envoyé en `.trim().toLowerCase()` ; `autoCapitalize/autoCorrect/spellCheck`
    off sur email + mot de passe (corrige majuscule/espace auto sur mobile).
  - Case **« Afficher le mot de passe »** (`voirMdp`).
  - Bouton **« Continuer en mode local (sans cloud) »** (`onLocal` → `setPhase("app")`)
    pour ne plus être bloqué dehors. `pushCloud` retourne déjà `false` sans session
    → mode local sans erreur.
- **Procédure conseillée (sans email)** : entrer en mode local → Export JSON
  (sauvegarde) → dans Supabase, supprimer + recréer l'utilisateur (Add user, mot de
  passe connu, Auto Confirm) → se reconnecter **sur l'appareil qui a les données**
  (1er login → pullCloud vide → pushCloud renvoie le local). Ne PAS « Récupérer le
  cloud » (écraserait le local avec du vide).

### Échange 28 — Fix rappels nettoyage poulaillers
- **Symptôme** : « espace poussins : jamais nettoyé » alors qu'un nettoyage a été
  saisi, et le rappel du nettoyage apparaissait dans la section « Rappels
  (vermifuge / vitamines / autres) ».
- **Cause** : `nettoyagesAPrevoir` ne compte que les lignes `action === "nettoyage"`
  avec zone exacte ; la section « Rappels » affichait **toute** ligne ayant un
  `rappel`, quelle que soit l'action. La ligne du poussin avait une action ≠
  `nettoyage` (probablement `vitamines`) → non comptée comme nettoyage + rappel
  rangé chez les vitamines. (Donnée de saisie, pas un bug de calcul.)
- **Corrections code** :
  - `nettoyagesAPrevoir` calcule désormais `prochainProgramme` = rappel futur le
    plus proche posé sur une ligne `nettoyage` de la zone.
  - Les cartes « Nettoyages à prévoir » (Gestion poulaillers + Tableau de bord)
    affichent « ⏰ Prochain programmé : … ».
  - La section « Rappels (vermifuge / vitamines / autres) » **exclut** les lignes
    `nettoyage` (elles vivent maintenant dans la section nettoyage).
- **Reste à faire côté utilisateur** : éditer la ligne du nettoyage poussin et
  mettre **Action = nettoyage** pour qu'elle soit comptée.

### Échange 27 — Module Poussins & cailleteaux complet (J1-J10 + S1-S8)
- **Onglet unique** « Poussins & cailleteaux » avec **3 sous-onglets internes** (state `sub`) :
  Lots/naissances · Suivi J1–J10 · Suivi S1–S8.
- **Données embarquées dans le lot** (pas de nouvelle table) : champs optionnels `id`
  (n° lot naissance via `genPoussinId` → 26PN01), `nes`, `jours` (map J1→{temp,eau,
  nourriture,nettoyage,vivants,morts,comportement,obs}), `semaines` (map S1→{vivants,
  morts,croissance,alimentation,nettoyage,obs}). Rétro-compatible (anciens lots sans
  id → libellé de repli ; tout reste lu).
- **Section J1-J10** : sélection du lot, table des N premiers jours, cases 💧/🌾/🧹
  cochables inline, ✏️ (SuiviJourForm : temp/vivants/morts/comportement/obs), obs au clic.
- **Section S1-S8** : table des N semaines, ✏️ (SuiviSemForm : vivants/morts/croissance/
  alimentation/nettoyage/obs).
- **Statut auto** par âge conservé (EtapeJeune). **Fin de suivi** (>S8) : boutons
  →Repro / →Conso (crée une ligne abattoir) / Archiver dans la section Lots.
- **Réglages** : `config.jeunes` (suiviJours 10, suiviSemaines 8, tempDémarrage, tempFin)
  éditable → pilote le nombre de lignes J/S.
- **Tableau de bord** : section jeunes enrichie d'une liste **« Tâches du jour »**
  (lots en période détaillée dont eau/nourriture/nettoyage non cochés) + alertes existantes
  (mortalité, lot très jeune, fin de suivi, prêt à transférer, date incohérente).
- **Supabase** : aucune migration (snapshot JSON ; nouveaux champs imbriqués + config).
- ✅ Vérifié navigateur : 3 sous-onglets OK, lot réel né 22/06 → âge J 3 (date réelle),
  étape « démarrage sensible » auto, stats poussins/cailleteaux. Équilibrage OK, HTTP 200.

### Échange 26 — Fix « J -4 » (date du jour réelle) + poussins/cailleteaux séparés
- **Bug J -4 corrigé** : `AUJOURDHUI` était **figé à 2026-06-20** → tout lot démarré après
  donnait un jour négatif. Désormais `AUJOURDHUI` = **vraie date du jour** (date locale,
  minuit UTC) + helper `joursDepuis()` (diff jour-à-jour, sans dérive de fuseau).
  `joursEcoules` s'appuie dessus. Garde anti-erreur : `infoIncub(lot)` affiche **« à venir »**
  si la date de mise en couveuse est future (jamais « J -4 ») ; `ProgressBar` clampé ≥ 0.
  Appliqué aux tableaux de lots (tableau de bord couvaison + onglet Récolte) et IncubatorCard
  (déjà clampé). Distinction des dates rappelée : couvaison = depuis mise en couveuse ;
  jeunes = depuis naissance ; lot de stock garde ses dates de récolte.
- **Poussins/cailleteaux** : helper `ageJeune(birthDate)` → « J5 », « J12 · S2 », **étape auto**
  (J0-10 démarrage sensible · J11-S4 croissance · S5-S8 développement · >S8 prêt à transférer)
  via `ETAPES_JEUNE` + composant `EtapeJeune`. Champ **`morts`** ajouté à `PoussinForm`
  (optionnel, défaut 0). Onglet : colonnes Lot/Type/Naissance/Âge/Vivants/Morts/Étape/Statut,
  stats vivants poussins vs cailleteaux séparés. `labelJeune` (caille→cailleteau).
- **Tableau de bord — section Poussins & cailleteaux** : **séparés** (table poussins + table
  cailleteaux : lot, naissance, âge, vivants, morts, étape) + total général après + **alertes**
  (J0-10, mortalité, fin de suivi S7-S8, prêt à transférer >S8, date incohérente/âge négatif).
- **Supabase** : aucune migration (snapshot JSON ; `morts` = clé optionnelle). Données conservées.
- ✅ Vérif statique : équilibrage OK, refs OK, plus de date figée, HTTP 200. Vérif live non
  faite (navigateur de l'utilisatrice sur son app Budget).

### Échange 25 — Calculs œufs ventilés poule / caille (+ totaux)
- **`statsOeufs(collectes, lotsStock, lots, config)`** : ajout de la ventilation par espèce
  pour consommation (consoPoule/Caille), stock actif (stockPoule/Caille) et couveuse
  (couvPoule/Caille) + totaux. **Changement clé** : « en couveuse » = somme `nbOeufs` des
  **lots d'incubation** `statut "en couveuse"` (plus depuis les collectes) → évite le
  double comptage avec les lots de stock « mis en couveuse ». Stock actif = collectes
  « stock » d'un lot « en stock » uniquement. Conso = collectes destination « consommation ».
- Les 2 appels de `statsOeufs` mis à jour (passent `lots`).
- Composant **`OeufsBloc`** (total + 🐔 poules / 🐦 cailles).
- **Tableau de bord → section Œufs** : 3 blocs par espèce (Consommés / Stock actif / En
  couveuse) + conso mois/an + économie + **liste des lots en cours de stockage** (id,
  espèce, total, période) + **liste des lots en couvaison** (id, espèce, nbOeufs, date).
- **Onglet Récolte** : cartes résumé passées en `OeufsBloc` (par espèce).
- **Supabase** : aucune migration — on lit des champs existants (`espece`, `destination`,
  `lotStock`, statut des lots/lotsStock, `nbOeufs`). Données conservées.
- ✅ Vérif statique : équilibrage OK, signatures cohérentes, refs OK, HTTP 200. Vérif live
  non faite (navigateur de l'utilisatrice actif sur son app Budget).

### Échange 24 — Lots de stock d'œufs (récolte multi-jours → lot → couvaison)
- **Nouvelle collection `lotsStock`** (egg batches) : { id 26P001, espece, statut
  (en stock/mis en couveuse/terminé/archivé), dateCouvaison, lotCouvaison, obs }.
  `STORE_KEYS.lotsStock`, seed, `genLotStockId` (3 chiffres, distinct des lots couveuse
  2 chiffres), helper `agregLotStock` (total + période depuis les collectes liées).
- **Récolte** : destination = **consommation** ou **stock** (plus de « couvaison »).
  Si stock → choisir un lot existant OU créer un nouveau (`CollecteForm` crée le lot
  de stock à la volée). Champ `lotStock` sur la collecte.
- **Mise en couvaison** depuis un lot de stock : `CouvaisonDepuisStockForm` +
  `mettreLotEnCouvaison` (crée le lot d'incubation `lots` avec le total, passe le lot
  de stock à « mis en couveuse » + `lotCouvaison`). Les œufs quittent le stock actif.
- **statsOeufs(collectes, lotsStock, config)** : anti-double-comptage via statut du lot
  (stock actif = destination "stock" dont le lot est "en stock" ; "mis en couveuse" → en
  couveuse). Rétro-compatible (anciennes lignes recoltes/conso/stockes + destination
  "couvaison"). `evtsOeufs` renvoie `lotStock`.
- **Onglet Récolte des œufs** : vue par **lots de stock** (cartes : total, période, âges,
  statut, boutons Mettre en couvaison / Archiver / Supprimer + détail dépliable), puis
  table de toutes les récoltes. Badge `StatutLotStock`.
- **Tableau de bord** Œufs : + lots de stock actifs / prêts / déjà en couvaison.
- **Historique** : table récoltes avec **statut final** (consommé/en stock/mis en couveuse/archivé).
- **H — Reproducteurs** : barre de recherche (nom/espèce/race/statut/obs) + filtres
  (tous/actifs/décédés/poules/coqs/cailles ♀/♂), index d'origine préservé pour edit/delete.
- **Supabase** : AUCUNE migration SQL (snapshot JSON) ; ajout clé `lotsStock` dans le
  snapshot. Données conservées.
- ✅ Vérif statique : équilibrage {}/()/[] OK, refs OK, statsOeufs(.,lotsStock,.) partout,
  HTTP 200. Vérif live limitée (navigateur de l'utilisatrice sur d'autres projets).

### Échange 23 — Logique des œufs par destination (conso / couvaison / stock)
- **Modèle collecte** : nouveau champ `destination` ("consommation"|"couvaison"|"stock")
  + `nombre` (au lieu du triple compteur recoltes/consommation/stockes). `CollecteForm`
  refait : nombre + destination, champs conditionnels (lot si couvaison, temp/hum si stock).
- **Anti-double-comptage** : helpers `evtsOeufs` (normalise ancien ET nouveau modèle) +
  `statsOeufs` → **stock actif = destination "stock" uniquement** ; consommés et couvaison
  n'y figurent plus. Calculs : récoltés/consommés/couvaison du jour, consommés mois/an,
  **économie estimée** (= consommés an × `config.prixOeuf`), stock actif, en couvaison.
- **Réglages** : champ **prix moyen d'un œuf** (`config.prixOeuf`, défaut 0,35 €).
- **Récolte des œufs** : table par destination (badge `DestBadge`), 4 cartes résumé,
  graphiques récoltés/consommés/stock/couvaison.
- **Tableau de bord** section Œufs : aujourd'hui (récoltés/consommés/couveuse) + bilan
  (stock actif, consommés mois/an, économie, en couveuse). Ouvert par défaut.
- **Historique** : table « Historique des récoltes » (lecture).
- **Supabase** : AUCUNE migration — snapshot JSON, ajout d'un champ `destination` aux
  nouvelles lignes ; anciennes lignes lues via `evtsOeufs`. Données conservées.
- ✅ Vérifié navigateur avec données réelles : stock actif 17 (12+5, consommés exclus),
  consommés 2026 = 38, économie 13,30 €, anciennes lignes « conso/stock » bien interprétées.
  Aucune erreur de compilation.

### Échange 22 — Cheptel modifiable + résumé d'historique automatique
- **Cheptel (effectifs) modifiable** : déplacé dans `config.cheptel` (défaut = const
  `cheptel`), fusion dans `mergeConfig`. Section « Cheptel (effectifs) » dans Réglages
  (4 champs nombre). Dashboard « Animaux » lit `config.cheptel` (fallback const).
- **Agent historique = résumé automatique** (sans IA, déterministe) dans l'onglet
  Historique : sélecteur de période (7/30/90/365 j/tout) + lignes calculées depuis les
  données (œufs récoltés/consommés/stockés, lots mis en couveuse, éclosions nés/non éclos,
  actions poulailler par type, dépenses consommables). Version « vraie IA » (API Claude)
  laissée pour plus tard (clé + coût).
- ✅ Vérif statique : équilibrage OK, refs OK, HTTP 200. Vérif navigateur live non faite
  (utilisatrice en train de saisir dans son Google Sheets source).

### Échange 21 — Normes de couvaison enrichies (phases + espèces + paramètres)
- **Structure des normes refaite** dans `config.normes[esp]` : `duree` + `phases`
  (liste « jusqu'au jour J → temp/hum », autant qu'on veut) + `params`
  (retournementJusqua, mirage1, mirage2, ventilation). Ajout `config.especes` (liste éditable).
- **Migration automatique** (`migrerNormeEspece` + `mergeConfig` réécrit) : l'ancienne
  forme {jourEclosion,tempIncub,…} de la config déjà enregistrée (cloud+local) est
  convertie en 2 phases au chargement → **aucune perte des réglages utilisateur**.
- `normeTemp/normeHum` → `phaseDuJour` (phase couvrant le jour j). `serieNorme` inchangé.
- **Réglages** : éditeur de normes par espèce = durée + tableau de phases (ajout/suppr) +
  paramètres ; + EditeurListe « Espèces ». Repères (retournement/mirages/ventilation)
  affichés sous les graphiques de couvaison (IncubatorCard).
- ✅ Vérifié navigateur : page Réglages s'affiche avec les **personnalisations réelles de
  l'utilisatrice intactes** (zones/actions/catégories custom), connectée Supabase, migration
  OK (aucun crash). Confirme que modifier le code n'écrase pas les données/réglages.
- Rappel utilisateur : « Réinitialiser » est le seul bouton qui remet les défauts.

### Échange 20 — Réorg onglets + tableau de bord unifié (sections déroulantes)
- **Onglets réordonnés** (12, ordre demandé) : Tableau de bord, Gestion poulailler,
  Récolte des œufs, Suivi journalier, Poussins et cailleteaux, Animaux reproducteurs,
  Animaux consommation, Inventaire consommables, Inventaire matériel, Catalogue des races,
  Réglages / Base de données, Historique.
- **Renommages (visuels only, aucun changement Supabase)** : « Lots & œufs » → « Récolte
  des œufs » ; « Gestion poulaillers » → « Gestion poulailler » ; « Catalogue races » →
  « Catalogue des races » ; « Réglages (BDD) » → « Réglages / Base de données ».
- **Onglets retirés du menu** : Couveuses et Statistiques → leur contenu est **intégré au
  tableau de bord** (les composants restent, juste plus dans la nav).
- **Tableau de bord = page unique à sections déroulantes** (`Section` via `<details>`):
  1 Actions du jour (ouvert), 2 Alertes (ouvert), 3 Gestion poulailler, 4 Œufs/récolte,
  5 Couvaison (IncubatorCard×2 + lots), 6 Poussins, 7 Animaux, 8 Stocks, 9 Matériel,
  10 Statistiques détaillées (`StatsDetaillees`, ex-onglet Statistiques sans en-tête).
- **Supabase** : AUCUNE modif de table/clé. Changements 100% interface (libellés + ordre +
  regroupement). Couche données (snapshot localStorage↔cloud) et `STORE_KEYS` inchangés →
  les appels Supabase ne sont pas affectés. Données conservées.
- **Réglages** : inchangé, déjà éditable (zones, actions, produits, unités, catégories,
  statuts, normes, fréquences nettoyage, rappels). Manquent encore : espèces & seuils de
  stock éditables (volontairement laissé simple, à compléter après usage réel).
- ✅ Vérif statique : 12 onglets bon ordre, 0 réf cassée, accolades équilibrées, HTTP 200.
  Vérif navigateur live non faite cet échange (navigateur de l'utilisateur occupé sur un
  autre projet) — à confirmer d'un coup d'œil.

### Échange 19 — Branchement Supabase (cloud + connexion, hybride)
- Backend **Supabase** branché (projet créé par l'utilisateur). URL
  `https://efyxufdtrgcgzpfhrmwh.supabase.co`, clé **publishable** (publique navigateur).
- Schéma : table unique `cheptel_data (id, user_id, type, data jsonb, updated_at)` + RLS
  (chacun ne voit que ses lignes via `auth.uid()`). SQL fourni à l'utilisateur.
- Approche **hybride snapshot** (pas de refonte du data layer local) : tout le localStorage
  est sérialisé dans 1 ligne `type='snapshot'`. `pushCloud`/`pullCloud`/`pushCloudDiffere`
  (auto-push différé 1,5 s après toute modif via effet dans DataProvider).
- **Auth email/mot de passe** : composant `Root` (loading→login→sync→app), `LoginEcran`,
  session persistée par supabase-js. À la connexion : pull du cloud (sinon push du local).
  Repli **mode local** si la lib ne charge pas. CDN `@supabase/supabase-js@2` ajouté.
- Réglages : carte **☁️ Cloud** (état/email, ⬆️ Synchroniser, ⬇️ Récupérer le cloud, Déconnexion).
- Export/Import JSON conservés comme sauvegarde de secours.
- ✅ Vérifié : écran de connexion s'affiche, app compile, lib Supabase chargée. Reste à
  tester par l'utilisateur : connexion réelle + synchro multi-appareils (je ne saisis pas
  ses identifiants). Note : si erreur de clé, repli possible sur la clé `anon` (JWT) legacy.

### Échange 18 — Base de données modifiable, dashboard actions, réorg onglets
- **Base de données / Réglages** (nouvel onglet ⚙️) : objet `config` persistant
  (`STORE_KEYS.config`, fusionné via `mergeConfig` avec `configDefaut`). Éditable
  dans l'app : zones, actions, produits/traitements/vitamines, unités, catégories
  conso & matériel, statuts reproducteurs, **normes de couvaison** (jour éclosion +
  temp/hum incubation/éclosion par espèce), fréquences de nettoyage par zone,
  rappels produits (jours), restes interdits par zone. Composant `EditeurListe`
  (chips supprimables + ajout). Bouton Réinitialiser. Inclus dans l'export/import.
- **Normes en BDD (plus en dur)** : `normeTemp/normeHum/serieNorme` lisent `config.normes` ;
  `IncubatorCard` passe `config`. Courbes vert clair toujours sous les courbes réelles.
- **Tableau de bord orienté actions** : sections « À faire » (🔴 en retard / 🟠 aujourd'hui-bientôt /
  🔵 à venir, calculées depuis poulaillers : nettoyages + rappels) et « Alertes »
  (stocks à racheter, matériel à traiter), puis compteurs cheptel + lots en couvaison.
  Helpers partagés `statutNettoyage` / `nettoyagesAPrevoir` (réutilisés par GestionPoulaillers).
- **Réorganisation des onglets** (10 → 14) : quotidien en haut (Tableau de bord, Suivi,
  Gestion poulaillers, Lots & œufs, Couveuses, Poussins/cailloutaux), élevage
  (Reproducteurs, Animaux consommation [ex-Abattoir renommé], Catalogue), inventaires
  (Consommables, Matériel), bas (Statistiques, Réglages BDD, Historique). Barre latérale
  **défilante** (h-screen sticky + nav overflow-y-auto).
- **Nouveaux modules** : Poussins/cailloutaux (collection `poussins`, CRUD) ;
  Statistiques (taux fécondation/éclosion par lot via `recapSuivi`, dépenses/an) ;
  Historique (lots terminés + matériel remplacé, suppression).
- Formulaires (poulailler/conso/matériel) câblés sur les listes de la config
  (zones/actions/unités/produits via datalist/catégories).
- ✅ Vérifié navigateur : Réglages éditable, dashboard actions (retard/bientôt/à venir +
  alertes), couveuses normes config, sidebar réorganisée+scroll. Aucune erreur compilation.

### Échange 17 — Normes graphiques, CRUD partout, module Poulaillers
- **Graphiques couvaison** : courbe de **norme** (vert clair) ajoutée sous les courbes
  réelles (temp + hum), via `normeTemp`/`normeHum`/`serieNorme` (varient selon
  espèce et jour : baisse à l'éclosion J19-21 poule / J15-17 caille). `LineChart`
  accepte un prop `norme`. Légende « — norme ». Courbes réelles toujours visibles.
- **CRUD générique** : `useCollection` renvoie son setter ; `DataProvider` expose
  `majLigne` / `patchLigne` / `supprimerLigne` (clé + index). Composant `RowActions`
  (✏️/🗑 avec confirmation) ajouté sur **tous** les tableaux (lots, collectes, suivi
  [relevé/mirage/éclosion via _src/_idx], reproducteurs, abattoir, consommables,
  matériel, poulaillers). Tous les formulaires acceptent `initial`+`onSave` (mode
  édition). `ObsCell` devient éditable (clic = voir **et** modifier ; « + note »
  pour ajouter après coup) câblé partout via `patchLigne`.
- **Inventaire consommables** : liste « À racheter » (articles exacts) intégrée dans
  la page. Édition/suppression des mouvements. Sortie rapide conservée.
- **Inventaire matériel** : états enrichis (+ « à remplacer », « remplacé » terminal) ;
  listes À réparer / À remplacer / Hors service intégrées ; actions rapides ✓ réparé
  / ↻ remplacé (sort des listes) + modifier/supprimer. « remplacé » masqué du tableau.
- **Nouveau module « Gestion poulaillers »** (collection `poulaillers`, nav 🏠) :
  saisie date/zone/action/produit/quantité/obs/rappel ; restes interdits aux cailles ;
  rappel auto Vermiferm/vitamines (+30 j) ; déduction stock consommable optionnelle ;
  cartes « Nettoyages à prévoir » (poussins 1 j / cailles 10 j / poules 30 j, alerte
  retard) + « Rappels » + journal des actions. Helpers `INTERVALLE_NETTOYAGE`,
  `RAPPEL_JOURS`, `AlerteNettoyage`.
- **Export/Import** : `poulaillers` ajouté à `STORE_KEYS` → inclus automatiquement.
- ✅ Vérifié navigateur : normes affichées ; poulaillers (alertes retard/bientôt/ok,
  rappel Vermiferm) ; matériel listes + actions ✓/↻ ; conso liste à racheter. Nav 11
  → **12 onglets**. Aucune erreur de compilation.

## 2026-06-22

### Échange 16 — Finition ergonomie (listes, obs au clic, sortie rapide, âges)
- **Tableau de bord** : les compteurs « à racheter / à réparer » deviennent de
  vraies **listes** (composant `DashListe`) : consommables à racheter, matériel à
  réparer, matériel hors service. Dépenses/valeurs conservées (StatCard).
  `statsMateriel` renvoie désormais les tableaux `aReparer` / `horsService`.
- **Observations ouvrables au clic** : composant réutilisable `ObsCell` (bouton
  « 👁 Voir » → modale) utilisé dans Suivi journalier, Reproducteurs, Mouvements
  de stock et Matériel. Plus de texte long dans les tableaux.
- **Reproducteurs** : colonne unique **« Naissance / arrivée »** (naissance sinon
  arrivée, tag « (arrivée) » si pas de naissance) ; **« Décès / retrait »** gardée
  à part ; âge inchangé (depuis naissance/arrivée, figé au décès).
- **Inventaire consommables** : sortie de stock simplifiée → bouton **« ↘ Sortir »**
  par article (`SortieRapideForm` : article pré-sélectionné, on saisit juste la
  quantité + date/obs facultatives ; enregistré comme mouvement « sortie »). Les
  boutons « + Entrée / + Sortie » détaillés restent. Ajout d'un **graphique** des
  dépenses mensuelles (`SeriesChart`). Obs en « Voir ».
- **Inventaire matériel** : « durée estimée » remplacée par **âge depuis l'achat**
  (`ageMateriel`, helper partagé `dureeTexte`), figé à `dateHorsService` si l'état
  est « hors service » (champ conditionnel dans le formulaire). Colonne « Durée »
  → « Âge ». Obs en « Voir ». Seed nettoyé (dureeAns → dateHorsService).
- **Export/Import JSON** : déjà complet — `STORE_KEYS` couvre les 10 collections
  (lots, suivis, mirages, eclosions, races, reproducteurs, abattoir, collectes,
  consommables, materiel) ; l'export contient donc tout (animaux, lots, couveuses,
  suivi, catalogue, inventaires, mouvements de stock).
- ✅ Vérifié navigateur : listes dashboard (granulé / mangeoire / aucun) ; suivi
  « Voir » ; reproducteurs colonne fusionnée ; consommables « Sortir » + graphique ;
  matériel âge (3 mois / 4 mois / 1 an / 2 ans 2 mois). Aucune erreur de compilation.

### Échange 15 — Inventaires consommables & matériel (+ résumé tableau de bord)
- **2 nouveaux onglets principaux** (9 → 11 onglets) : 🧺 Inventaire consommables,
  🔧 Inventaire matériel. Onglets existants non modifiés (sauf résumé dashboard).
- **Consommables** (`consommables`, mouvements entrée/sortie) : champs date, article,
  catégorie, mouvement, quantité, unité (kg/sac/litre/pièce/autre), prix unitaire,
  coût auto, seuil d'alerte, fournisseur, obs. Boutons « + Entrée » / « + Sortie ».
  Helper `statsConsommables` : stock par article (entrées−sorties), valeur du stock
  (stock × dernier prix), dépenses par mois et par an (seules les entrées comptent),
  articles « à racheter » (stock ≤ seuil). 3 tableaux : stock / dépenses mois / mouvements.
- **Matériel** (`materiel`, achats durables) : date d'achat, article, catégorie,
  quantité, prix u., coût auto, état (neuf/bon/à surveiller/à réparer/hors service),
  durée estimée, fournisseur, obs. Bouton « + Ajouter ». **État modifiable inline**
  (select dans le tableau → `majMaterielEtat` via `setMateriel` exposé par useCollection).
  Helper `statsMateriel` : coût **rattaché à l'année d'achat uniquement** (jamais
  recompté), valeur totale du parc, nb à réparer/hors service.
- **Tableau de bord** : section « Inventaires » (carte) = valeur conso en stock,
  dépenses conso année, dépenses matériel année, nb conso à racheter, nb matériel
  à réparer. Résumé seulement, détails dans les onglets.
- **Sauvegarde** : 2 collections ajoutées à `STORE_KEYS` → incluses automatiquement
  dans l'export/import JSON. `useCollection` renvoie désormais aussi `setData`.
- ✅ Vérifié navigateur : conso (valeur 46,30 € / dépenses 2026 62,50 € / à racheter 1,
  granulé 7 kg en rouge) ; matériel (dépenses 2026 = 228 € = couveuse 180 + thermo 48,
  lampe 2025 & mangeoire 2024 NON recomptées ; parc 310 € ; 1 à réparer) ; résumé
  dashboard cohérent. Aucune erreur de compilation.

### Échange 14 — Suivi par espèce + mini-récap dans Couveuses
- **Suivi journalier** : ajout d'un sélecteur **🐔 Poules / 🐦 Cailles** (state `esp`,
  défaut poule) qui filtre le tableau unifié selon l'espèce du lot lié
  (`evtsFiltres`). Pas de nouvel onglet du menu, pas de duplication : même tableau,
  même formulaires (+), juste un filtre d'affichage. Écriture « J n » conservée.
- **Couveuses** : nouveau helper `recapSuivi(lot, mirages, eclosions)` qui calcule
  depuis le suivi (aucune ressaisie) : œufs en couveuse, clairs (somme mirages),
  retirés (somme), fécondés (dernier mirage), nés / non éclos (somme éclosions),
  **taux de fécondation** (fécondés / œufs) et **taux d'éclosion** (nés / fécondés).
  Affiché dans un encart de chaque `IncubatorCard`, au-dessus des graphiques (qui
  restent). Se met à jour automatiquement (state React) à l'ajout d'un mirage/éclosion.
- ✅ Vérifié navigateur : filtre Poules n'affiche que 26P01 ; récap Couveuse 1
  = 110/clairs 12/retirés 12/fécondés 98 → fécondation 89 % ; Couveuse 2 = 200/220
  → 91 %. Graphiques conservés. Aucune erreur de compilation.

### Échange 13 — Optimisation UI, graphiques, sauvegarde (export/import JSON)
- **Tableau de bord** : retrait des blocs Couveuse 1 / Couveuse 2 et de leurs
  graphiques (surcharge). Gardé : stats cheptel + lots en cours + petite note
  renvoyant vers l'onglet Couveuses. `CouveuseResume` supprimé (code mort).
- **Couveuses** : courbes désormais **lisses** (Bézier Catmull-Rom via `smoothPath`)
  au lieu de segments. Toujours J 0 → J 21 (poule) / J 0 → J 17 (caille).
- **Règle d'écriture** : « J 1 » avec espace partout (ProgressBar, LineChart,
  IncubatorCard, Lots, Suivi, textes).
- **Lots de couvaison** : bouton « 📈 Graphiques » à côté des « + », ouvrant une
  modale large avec 5 courbes issues des collectes (récoltés, consommés, stockés,
  temp. stockage, humidité stockage) via nouveau composant `SeriesChart`. Tableau
  inchangé. Boutons « + couvaison » et « + collecte » conservés.
- **Reproducteurs** : libellés sans parenthèses (« Race », « Observations »),
  ajout champ **Date d'arrivée** + colonnes Arrivée et **Âge** (helper `ageAnimal`
  : depuis naissance sinon arrivée, figé à la date de décès ; « ≈ » si calculé
  depuis l'arrivée). Race toujours issue du catalogue.
- **Catalogue** : images en `object-contain` (animal entier, centré, fond clair)
  + **clic pour agrandir** (visionneuse plein écran avec nom + source). Les 10
  races sans photo restent en null : recherche Commons API refaite → pas de
  fichier fiablement étiqueté (résultats = type sauvage générique ou autres
  espèces). Laissées « à valider » comme autorisé (pas d'URL inventée).
- **Sauvegarde** : confirmé que localStorage persiste déjà entre sessions. Clés
  centralisées dans `STORE_KEYS`. Ajout **Export JSON** + **Import JSON** (bloc en
  bas de la barre latérale, pas de nouvel onglet). Import = écrit localStorage +
  recharge. L'utilisateur pourra m'envoyer l'export pour reprendre l'état exact.
- **Abattoir** : non touché (demandé).
- ✅ Vérifié en navigateur (Brave) : dashboard allégé, courbes lisses, modale
  graphiques OK (5 courbes), âge reproducteurs exact (Cléo 1 an 8 mois, Daphnis
  1 an), photos catalogue centrées. Aucune erreur de compilation. Export/import
  et lightbox non cliquables en lecture seule mais code vérifié statiquement.

### Échange 12 — Réorganisation : fusion Mirages + Éclosions dans Suivi journalier
- Demande : réorganiser couveuses / suivi / œufs sans surcharger le tableau de
  bord ni multiplier les onglets. Graphiques temp/hum par couveuse, suivi en
  tableau simple, gestion des œufs (récoltés/conso/stockés), regrouper mirages
  et éclosions dans le suivi, garder Catalogue/Reproducteurs/Abattoir séparés.
- Constat : l'essentiel était **déjà en place** — l'onglet Couveuses est déjà un
  mini-dashboard (lot, espèce, jour J, temp, hum + 2 courbes J0→J21/J17 issues du
  suivi) ; l'onglet Lots gère déjà lots **+** collecte/stockage des œufs (parties
  A & B avec leurs boutons « + »). Tableau de bord déjà sobre (résumé couveuses).
- Vrai travail fait : **fusion** des onglets « Mirages » et « Éclosion » dans
  « Suivi journalier ». Tableau unifié (Date, Couveuse, Lot, Espèce, Jour, Type
  d'événement, Temp., Hum., Clairs, Fécondés, Retirés, Nés, Non éclos, Obs),
  trié du plus récent au plus ancien. Nouveau composant `EventBadge` (relevé /
  mirage 1 / mirage 2 / éclosion). 3 boutons « + » (Relevé / Mirage / Éclosion)
  réutilisant les formulaires existants (`SuiviForm`, `MirageForm`, `EclosionForm`).
- Données : **inchangées** — les 3 collections (`suivis`, `mirages`, `eclosions`)
  restent séparées en localStorage, fusionnées seulement à l'affichage (espèce et
  couveuse déduites du lot ; jour d'incubation calculé pour mirages/éclosions).
- Nav : **9 → 7 onglets** (suppression des entrées Mirages & Éclosion ; pages
  `Mirages()`/`Eclosion()` retirées, formulaires conservés).
- ✅ Vérifié en navigateur (Brave, serveur lancé via Bash car le preview MCP n'a
  pas l'accès TCC au dossier Desktop) : tableau de bord OK, **7 onglets** (plus de
  Mirages/Éclosion), et l'onglet Suivi journalier affiche le **tableau fusionné**
  relevés + mirages, trié récent→ancien, avec espèce/couveuse déduites du lot et
  jour d'incubation calculé (mirage 15/06 sur 26P01 = J7 ✓, 17/06 sur 26C01 = J5 ✓),
  badges de type colorés, « — » sur les colonnes non applicables. Aucun bug.

## 2026-06-20

### Échange 11 — MISSION 5 : corriger les images du catalogue
- Demande : remplacer les liens « Category: » (non affichables) par de vraies
  images directes Special:FilePath, sans inventer de fichier ni utiliser une
  photo d'une autre race ; null si rien de fiable.
- Méthode : script Python interrogeant l'API Wikipédia (`pageimages`, image de
  tête de l'article) avec repli sur la catégorie Commons, retries + backoff
  contre le throttling. Vérification des noms de fichiers réels.
- Résultat : **49 images directes** (Special:FilePath) + **10 sans image (null)** :
  9 variétés de couleur de caille japonaise (Pharaoh, Texas A&M, English White,
  Manchurian, Italian, Tibetan, Rosetta, Tuxedo, Celadon) + Javanaise naine.
- image_url tous en Special:FilePath, source_image = lien page fichier Commons
  (ou catégorie d'origine pour les null). 0 occurrence de « Category: » dans image_url.
- Clé localStorage races → **v3** (recharge la base corrigée). Lien « Source »
  affiché aussi quand pas de photo (« voir Wikimedia »). lazy-loading retiré.
- ✅ Vérifié : 59 cartes, 49 <img>, 0 cassée, photos réelles affichées.

### Échange 10 — MISSION 4 : vraie base du catalogue races
- Demande : remplacer les 2 exemples par une base complète (59 races poules/coqs/
  cailles) avec images, filtres espèce + catégorie, recherche, et liaison race→
  reproducteurs filtrée par espèce.
- Fait : `racesSeed` = 59 races (structure id, espece, race, categorie,
  ponte_moyenne_an, poids_femelle_kg, poids_male_kg, qualite_mere, aptitude_chair,
  signes_reconnaissance, image_url, source_image, notes). Clé localStorage races
  passée à **v2** (recharge la nouvelle base par-dessus l'ancienne).
- Catalogue refait en **cartes avec image** + filtres (espèce poule/coq/caille,
  catégorie ponte/chair/mixte/ornement) + recherche par nom. RaceForm adapté à la
  nouvelle structure. ReproducteurForm : race filtrée (poule&coq → races poules ;
  caille → races cailles).
- Images : helper `imageAffichable()` convertit les liens `File:` Wikimedia en
  image directe (`Special:FilePath`) ; les liens **Catégorie** → vignette emoji +
  lien « Source Wikimedia » cliquable (pas d'URL devinée, pas d'image IA).
  → 4 races ont une photo directe (Rhode Island Red, Leghorn, Plymouth Rock,
  Caille japonaise), les autres ont la vignette + source.
- ✅ Vérifié : 59 races, images chargées, recherche/filtres OK (Caille=13,
  Coq=46=races poules), reproducteur poule↔caille OK, 0 erreur console.
- ⚠️ Limite assumée : la plupart des liens fournis sont des catégories Wikimedia
  (pas des images directes) → vignette + lien. Pour de vraies photos partout, il
  faudrait choisir un fichier précis par race.

### Échange 9 — MISSION 3 : bouton « + » sur toutes les pages de gestion
- Demande : un bouton « + Ajouter » propre à chaque page de gestion, ouvrant un
  formulaire adapté ; pas de « + » global. + 3 nouvelles pages.
- Couche données généralisée : hook `useCollection(clé, graine)` + persistance
  localStorage pour 7 collections (lots, suivis, mirages, eclosions, races,
  reproducteurs, abattoir). Helper `genLotId(espèce, date)` → n° de lot auto
  (26P01, 26P02… / 26C01…). Pages existantes branchées sur `useData()`.
- Formulaires ajoutés : Couvaison (n° auto), Mirage, Éclosion, Race,
  Reproducteur (date décès/retrait conditionnelle, race liée au catalogue),
  Abattoir. (Suivi déjà fait à l'échange 8.)
- Nouvelles pages + nav : Catalogue races 📖, Reproducteurs 🐓, Abattoir 🍗.
- Tableau de bord & Couveuses : pas de « + » (volontaire, non modifiés).
- ✅ Vérifié : 9 pages, bons boutons partout, ajout couvaison → 26P02 généré et
  visible dans les listes déroulantes des autres pages, ajout race + reproducteur
  OK, persistance OK, 0 erreur console.

### Échange 8 — MISSION 2 : saisie des données (Suivi journalier)
- Demande : bouton « + » sur les pages importantes ouvrant un formulaire pour
  saisir les données du jour, enregistrées dans l'app. Champs : lot, date, jour
  d'incubation, température, humidité, observations.
- Fait : page Suivi journalier → bouton « + Ajouter un relevé » + modale + form.
  Le jour d'incubation se pré-remplit automatiquement (date − date de mise en
  couveuse du lot). Colonne « Date » ajoutée au tableau.
- **Couche données** introduite : Context `DataProvider` + persistance
  **localStorage** (clé `cheptel_suivis_v1`). C'est le point d'ancrage prévu pour
  brancher Supabase plus tard (les pages utilisent `useData()`).
- ⚠️ localStorage = par navigateur/appareil, pas encore synchronisé (Supabase fera ça).
- ✅ Vérifié : modale OK, enregistrement OK, persistance après rechargement OK.
- Reste à faire (proposé) : répliquer le « + » sur Lots, Mirages, Éclosion.

### Échange 7 — MISSION 1 : correction du tableau de bord
- Demande : sur le tableau de bord, retirer la carte « Couveuses », et dans
  « Lots en cours » afficher les **numéros de lot** au lieu d'un compteur.
  Garder le design et l'avancement des couvaisons.
- Nouveau format de numéro de lot : `<année><P|C><compteur par espèce>`
  → 26P01, 26P02… (poules) et 26C01, 26C02… (cailles). Compteur séparé par espèce.
- Fait : carte « Couveuses » supprimée ; carte « Lots en cours » affiche
  « 26P01 · 26C01 » ; ids des lots + références (suivis, mirages) mis au nouveau format.
- ✅ Vérifié dans l'aperçu : 5 cartes, contenu correct, avancement conservé.

### Échange 6 — Choix backend & périmètre
- Backend retenu : **Supabase**. Confirmé à l'utilisateur : fonctionne sur
  téléphone (PWA), pilotable depuis ordi + téléphone, synchro via le cloud
  (internet requis, temps réel possible). Le compte sera créé par l'utilisateur.
- Périmètre : l'utilisateur met d'abord ses données à jour → on **reste en
  données fictives** pour l'instant. Import du Sheets plus tard, en une fois.
- Prochaine étape : formulaires de saisie (mock) + isoler une couche données
  pour brancher Supabase sans tout réécrire.

### Échange 5 — Lecture du Google Sheets « FERME TAVERNY 2026 »
- Demande : lire toutes les feuilles (même masquées) du Sheets du Drive, faire un
  état de la situation (sans rien modifier), proposer un backend pour piloter
  l'app au lieu de l'Excel.
- Fait : lecture intégrale (103 k caractères). Résultat consigné dans
  `DONNEES_SHEETS.md` (~11 feuilles : calendrier œufs, synthèse, protocole
  incubation, fiches lot mirages/éclosion + taux, registre cheptel, inventaires
  matériel/consommables/santé, prix).
- Écarts relevés : effectif réel ≠ 7 poules ; 1 couveuse en stock vs 2 ; fichier
  pas à jour ; sens de CONSO/RÉCOLTE à confirmer.
- En attente : confirmation utilisateur sur l'intégration + choix du backend.

### Échange 4 — Mise en place de la mémoire projet
- Demande : créer des fichiers `.md` de mémoire dans le dossier pour pouvoir
  travailler sur plusieurs jours / plusieurs conversations sans perdre le fil.
- Fait : création de `MEMOIRE.md`, `JOURNAL.md`, `ROADMAP.md`.
- Convention adoptée : Claude lit ces fichiers en début de conversation et les
  met à jour à chaque échange.

### Échange 3 — « Rien ne s'affiche » → debug
- Problème : page blanche.
- Cause trouvée (en testant dans un vrai navigateur) : Babel compilait en
  runtime JSX "automatique" → `import "react/jsx-runtime"` non résolu sans bundler.
- Corrections : compilation Babel en runtime "classic" ; affichage des erreurs
  à l'écran ; couleurs Tailwind en classes complètes.
- ✅ Vérifié : les 6 pages s'affichent, navigation testée et OK.

### Échange 2 — Lancement en local
- Demande : lancer l'app en local.
- Fait : serveur statique Python sur le port 8000 + `server.py`.

### Échange 1 — Création de la V1 frontend
- Demande : proposer une structure frontend claire (pages, composants,
  navigation, données) puis une première version du code. Pas de backend.
- Fait : structure proposée + `index.html` complet (React/Tailwind/Babel via CDN)
  avec 6 pages et données mock.
- Décision : 1 seul fichier HTML pour la V1, migration possible vers Vite plus tard.
