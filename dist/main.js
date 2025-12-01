import { getWeatherByCity, } from "./utils/api";
import { populateResult, renderHistoryButtons } from "./utils/dom";
import { loadHistoryFromStorage, saveHistoryToStorage } from "./utils/storage";
const apiKey = "f1c121af4385503efcdcac72ef9891f0";
const cityInput = document.getElementById("city-input");
const resultCard = document.getElementById("result");
const searchBtn = document.getElementById("search-btn");
const geoBtn = document.getElementById("geo-btn");
const resultTemp = document.getElementById("temp");
const resultCity = document.getElementById("city-name");
const resultEmoji = document.getElementById("emoji");
// Chargement de l'historique depuis le localStorage
let searchHistory = loadHistoryFromStorage();
const updateHistory = (city) => {
    if (!city)
        return;
    if (searchHistory.includes(city))
        return;
    searchHistory.unshift(city);
    searchHistory = searchHistory.slice(0, 8);
    saveHistoryToStorage(searchHistory);
    renderHistoryButtons(searchHistory, searchCityWeather);
};
const searchCityWeather = async (city) => {
    const searchCity = city ?? cityInput.value.trim();
    if (!searchCity)
        return;
    const weather = await getWeatherByCity(searchCity);
    updateHistory(weather.city);
};
renderHistoryButtons(searchHistory, searchCityWeather);
//# sourceMappingURL=main.js.map