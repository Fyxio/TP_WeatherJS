const apiKey = "f1c121af4385503efcdcac72ef9891f0";

document.addEventListener("DOMContentLoaded", () => {
  let resultCardDarkMode = false;

  // Récupérer les éléments principaux
  const resultCard = document.getElementById("result");
  const searchBtn = document.getElementById("search-btn");
  const geoBtn = document.getElementById("geo-btn");
  const resultCity = document.getElementById("city-name");
  const resultTemp = document.getElementById("temp");
  const resultEmoji = document.getElementById("emoji");
  const cityInput = document.getElementById("city-input");

  // Loader (créé dynamiquement)
  const loader = document.createElement("div");
  loader.id = "loader";
  loader.innerText = "Chargement...";
  loader.classList.add("hidden");
  document.body.appendChild(loader);

  // Conteneur pour l’historique
  const historyContainer = document.createElement("div");
  historyContainer.id = "history";
  historyContainer.classList.add("history-container");
  document.body.appendChild(historyContainer);

  // Chargement de l'historique depuis le localStorage
  let searchHistory = loadHistoryFromStorage();

  // Fonction pour récupérer la météo via API
  const getWeatherByCity = async (searchCity) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}&lang=fr&units=metric`;

    const response = await fetch(url);
    if (!response.ok && response.status === 404) {
      alert("La ville recherchée n'existe pas");
      return;
    }

    const res = await response.json();
    return {
      temperature: res.main.temp,
      weather: res.weather[0].main,
      city: res.name,
    };
  };
  // Fonction pour récupérer la méteo par latitude / longitude (géoloc navigateur)
  const getWeatherByCoords = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=fr&units=metric`;

    const response = await fetch(url);

    if (!response.ok) {
      alert("Erreur lors de la récupération de la météo via géolocalisation.");
    }

    const res = await response.json();
    return {
      temperature: res.main.temp,
      weather: res.weather[0].main,
      city: res.name,
    };
  };

  // Correspondance condition météo → emoji
  const getWeatherEmoji = (weather) => {
    weather = weather.toLowerCase();
    if (weather.includes("cloud")) return "☁️";
    if (weather.includes("rain")) return "🌧️";
    if (weather.includes("storm")) return "⛈️";
    if (weather.includes("snow")) return "❄️";
    if (weather.includes("clear")) return "☀️";
    if (weather.includes("mist") || weather.includes("fog")) return "🌫️";
    return "🌥️";
  };

  // Déterminer la couleur de fond selon la température
  const setBackgroundByTemperature = (temp) => {
    if (temp <= 0) {
      resultCard.style.background = "linear-gradient(#9bd, #fff)";
    } else if (temp < 20) {
      resultCard.style.background = "linear-gradient(#bde, #cdf)";
    } else {
      resultCard.style.background = "linear-gradient(#ffcc70, #ff8177)";
    }
  };

  // Afficher les résultats dans la carte
  const populateResult = (weather) => {
    resultCity.innerText = weather.city;
    resultTemp.innerText = `${Math.round(weather.temperature)}°C`;
    resultEmoji.innerText = getWeatherEmoji(weather.weather);
    setBackgroundByTemperature(weather.temperature);
  };

  // Charger l'historique depuis localStorage
  function loadHistoryFromStorage() {
    try {
      const raw = localStorage.getItem("weatherHistory");
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
      return [];
    } catch (e) {
      console.warn(
        "Impossible de charger l'historique depuis localStorage.",
        e
      );
      return [];
    }
  }

  // Sauvegarder l'historique dans localStorage
  const saveHistoryToStorage = () => {
    localStorage.setItem("weatherHistory", JSON.stringify(searchHistory));
  };

  // Ajouter une ville à l'historique (si pas déjà présente)
  const addToHistory = (city) => {
    if (!city) return;

    const alreadyIn = searchHistory.some(
      (existing) => existing.toLowerCase() === city.toLowerCase()
    );
    if (alreadyIn) return;

    searchHistory.unshift(city);

    if (searchHistory.length > 8) {
      searchHistory = searchHistory.slice(0, 8);
    }

    saveHistoryToStorage();
    renderHistoryButtons();
  };

  // Créer/rafraîchir les boutons d'historique
  const renderHistoryButtons = () => {
    // reset du container
    historyContainer.innerHTML = "";

    searchHistory.forEach((city) => {
      const btn = document.createElement("button");
      btn.textContent = city;
      btn.classList.add("history-btn");

      // clic sur une ville de l'historique = relance la recherche
      btn.addEventListener("click", () => {
        cityInput.value = city;
        search();
      });

      historyContainer.appendChild(btn);
    });
  };

  // Afficher l'historique au chargement
  renderHistoryButtons();

  // Afficher/Masquer le loader
  const showLoader = (show) => {
    if (show) loader.classList.remove("hidden");
    else loader.classList.add("hidden");
  };

  // Lancer la recherche météo
  const search = async () => {
    const searchCity = cityInput?.value?.trim();
    if (!searchCity) {
      console.error("Aucune ville recherchée");
      return;
    }

    showLoader(true);
    try {
      const weather = await getWeatherByCity(searchCity);
      if (weather) {
        populateResult(weather);
        resultCard.classList.remove("hidden");
        addToHistory(weather.city);
      }
    } catch (err) {
      console.error("Erreur lors de la recherche :", err);
      alert("Erreur réseau ou ville introuvable.");
    } finally {
      showLoader(false);
    }
  };
  // Gestion de la géolocalisation
  const searchByGeolocation = async () => {
    if (!navigator.geolocation) {
      alert("La géolocalisation n'est pas supportée par ce navigateur.");
      return;
    }

    showLoader(true);

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        const weather = await getWeatherByCoords(latitude, longitude);
        populateResult(weather);
        resultCard.classList.remove("hidden");
        addToHistory(weather.city);
      } catch (err) {
        console.error("Erreur météo géoloc :", err);
        alert("Impossible de récupérer la météo pour votre position.");
      } finally {
        showLoader(false);
      }
    });
  };

  // Gestion du dark mode sur la carte
  const toggleResultCardDarkMode = () => {
    resultCard.classList.toggle("result-card-darkmode");
    resultCardDarkMode = !resultCardDarkMode;
  };

  // Événements
  searchBtn.addEventListener("click", search);

  document.addEventListener("keydown", (event) => {
    if (event.code === "Enter") search();
  });

  resultCard.addEventListener("click", toggleResultCardDarkMode);

  // Bouton géoloc
  geoBtn.addEventListener("click", async () => await searchByGeolocation());
});
