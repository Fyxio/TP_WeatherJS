# 🌦 Emoji Weather App

## Contexte
L’objectif est de créer une petite application web : une **météo en emojis**
Ce TP permettra de :
- manipuler le **DOM** en JavaScript,
- interagir avec une **API externe (OpenWeather)**,
- et donner vie à une page web avec du **CSS et des effets visuels**.

Ce TP prépare à comprendre les principes que nous utiliserons ensuite avec **React + TypeScript**.

---

## Objectifs pédagogiques

- Structurer une page HTML sémantique.
- Gérer les événements (`click`, `hover`, `keyup`...).
- Faire une requête HTTP avec `fetch` et traiter une réponse JSON.
- Modifier le DOM en fonction des données reçues.
- Ajouter des effets de style dynamiques avec CSS.

---

## Technologies utilisées

- **HTML5**
- **CSS3**
- **JavaScript (ES6)**
- **API :** [OpenWeather - Current Weather Data](https://openweathermap.org/current)

---

## Étapes du TP

### 1️⃣ Structure de base (HTML + CSS)
Créer les fichiers :
- `index.html`
- `style.css`
- `script.js`

La page doit contenir :
- Un champ texte pour saisir une ville 
- Un bouton pour lancer la recherche 
- Une carte météo qui affiche, celle-ci doit être par défaut cachée (elle sera affichée quand la recherche sera faite) :
  - le nom de la ville,
  - la température,
  - un emoji correspondant au temps actuel.

---

### 2️⃣ Interactions avec le DOM
Ajouter des interactions simples :

- Quand on clique sur le bouton "Rechercher" → afficher un message dans la console pour lancer la recherche.  
- Quand la recherche est lancée afficher la card de résultat
- Quand on survole l’emoji météo → il grandit.  
- Quand on sort de l’emoji → il revient à la taille normale.  
- Quand on clique sur la carte → elle passe en “mode sombre” (changer les couleurs).  
- Quand on appuie sur **Entrée** → lancer la recherche (pour l'instant en affichant un message dans la console)

---

### 3️⃣ Requête à l’API OpenWeather
1. Créer une clé gratuite sur [openweathermap.org](https://openweathermap.org).
2. Récuperer la **température**, le **nom de la ville**, et la **description du temps**.
3. Afficher ces informations dans ta carte.
4. Transformer la description météo en emoji.

⚠️ Si la ville n’existe pas, afficher une alerte avec un message d’erreur.

--- 

### 4️⃣ Améliorations UX et DOM dynamique

Ajouter des petits bonus pour rendre l’app plus vivante :

- Loader : affiche “Chargement...” pendant la requête, puis cache-le à la fin.
- Historique : garde la liste des dernières villes recherchées et crée des boutons cliquables pour les relancer.
- Fond dynamique : change la couleur du fond selon la température :
* < 0°C → bleu 
* 0–20°C → gris clair
* 20°C → orange/jaune

### Bonus (Pour aller plus loin)
- Sauvegarder l’historique dans localStorage.
- Ajouter un bouton “🌍 Autour de moi” qui utilise la géolocalisation

### Liens utiles

[Documentation OpenWeather API](https://openweathermap.org/current)

[MDN - fetch()](https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch)

[MDN - addEventListener()](https://developer.mozilla.org/fr/docs/Web/API/EventTarget/addEventListener)

[MDN - transition CSS](https://developer.mozilla.org/fr/docs/Web/CSS/transition)


