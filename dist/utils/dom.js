import { WeatherCondition } from "./api";
const apiKey = "f1c121af4385503efcdcac72ef9891f0";
const historyContainer = document.createElement("div");
historyContainer.id = "history";
historyContainer.classList.add("history-container");
document.body.appendChild(historyContainer);
const cityInput = document.getElementById("city-input");
const resultCard = document.getElementById("result");
const searchBtn = document.getElementById("search-btn");
const geoBtn = document.getElementById("geo-btn");
const resultTemp = document.getElementById("temp");
const resultCity = document.getElementById("city-name");
const resultEmoji = document.getElementById("emoji");
export const getWeatherEmoji = (weather) => {
    weather = weather.toLowerCase();
    if (weather.includes("cloud"))
        return "☁️";
    if (weather.includes("rain"))
        return "🌧️";
    if (weather.includes("storm"))
        return "⛈️";
    if (weather.includes("snow"))
        return "❄️";
    if (weather.includes("clear"))
        return "☀️";
    if (weather.includes("mist") || weather.includes("fog"))
        return "🌫️";
    return "🌥️";
    switch (weather) {
        case WeatherCondition.Clear:
            return "☀️";
    }
};
export const setBackgroundByTemperature = (temp) => {
    if (temp <= 0) {
        resultCard.style.background = "linear-gradient(#9bd, #fff)";
    }
    else if (temp < 20) {
        resultCard.style.background = "linear-gradient(#bde, #cdf)";
    }
    else {
        resultCard.style.background = "linear-gradient(#ffcc70, #ff8177)";
    }
};
// Afficher les résultats dans la carte
export const populateResult = (weather) => {
    resultCity.innerText = weather.city;
    resultTemp.innerText = `${Math.round(weather.temperature)}°C`;
    resultEmoji.innerText = getWeatherEmoji(weather.weather);
    setBackgroundByTemperature(weather.temperature);
};
// Créer/rafraîchir les boutons d'historique
export const renderHistoryButtons = (history, onClick) => {
    historyContainer.innerHTML = "";
    history.forEach((city) => {
        const btn = document.createElement("button");
        btn.textContent = city;
        btn.classList.add("history-btn");
        btn.onclick = () => onClick(city);
        historyContainer.appendChild(btn);
    });
};
//# sourceMappingURL=dom.js.map