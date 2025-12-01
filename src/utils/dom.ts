import type { WeatherData } from "./api";
import { getWeatherCondition, WeatherCondition } from "./api";

const apiKey = "f1c121af4385503efcdcac72ef9891f0";

const historyContainer = document.createElement("div");
historyContainer.id = "history";
historyContainer.classList.add("history-container");
document.body.appendChild(historyContainer);

const cityInput = document.getElementById("city-input") as HTMLInputElement;
const resultCard = document.getElementById("result") as HTMLElement;
const searchBtn = document.getElementById("search-btn") as HTMLButtonElement;
const geoBtn = document.getElementById("geo-btn") as HTMLButtonElement;
const resultTemp = document.getElementById("temp") as HTMLElement;
const resultCity = document.getElementById("city-name") as HTMLElement;
const resultEmoji = document.getElementById("emoji") as HTMLElement;

export const getWeatherEmoji = (weather : WeatherCondition): string => {
    switch (weather){
      case WeatherCondition.Clear :
        return "☀️";
      case WeatherCondition.Clouds : 
        return "☁️";
      case WeatherCondition.Rain :
        return "🌧️";
      case WeatherCondition.Snow :
        return "❄️";
      case WeatherCondition.Mist || WeatherCondition.Fog :
        return "🌫️";
      default :
        return "🌥️";
    }
};



export const setBackgroundByTemperature = (temp : number) => {
    if (temp <= 0) {
      resultCard.style.background = "linear-gradient(#9bd, #fff)";
    } else if (temp < 20) {
      resultCard.style.background = "linear-gradient(#bde, #cdf)";
    } else {
      resultCard.style.background = "linear-gradient(#ffcc70, #ff8177)";
    }
};

// Afficher les résultats dans la carte
export const populateResult = (weather : WeatherData) => {
    resultCity.innerText = weather.city;
    resultTemp.innerText = `${Math.round(weather.temperature)}°C`;

    const condition: WeatherCondition = getWeatherCondition(weather.weather);

    resultEmoji.innerText = getWeatherEmoji(condition);
    setBackgroundByTemperature(weather.temperature);
};

// Créer/rafraîchir les boutons d'historique
export const renderHistoryButtons = (
  history: string[],
  onClick: (city: string) => void
) => {
  historyContainer.innerHTML = "";
  history.forEach((city) => {
    const btn = document.createElement("button");
    btn.textContent = city;
    btn.classList.add("history-btn");
    btn.onclick = () => onClick(city);
    historyContainer.appendChild(btn);
  });
};