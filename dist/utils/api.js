const apiKey = "f1c121af4385503efcdcac72ef9891f0";
export var WeatherCondition;
(function (WeatherCondition) {
    WeatherCondition["Clear"] = "clear";
    WeatherCondition["Rain"] = "rain";
    WeatherCondition["Cloud"] = "cloud";
    WeatherCondition["Snow"] = "snow";
    WeatherCondition["Mist"] = "mist";
    WeatherCondition["Other"] = "other";
})(WeatherCondition || (WeatherCondition = {}));
export const getWeatherByCity = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&lang=fr&units=metric`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Erreur lors de la récupération de la météo");
    }
    const res = await response.json();
    return {
        city: res.name,
        temperature: res.main.temp,
        weather: res.weather[0].main
    };
};
//# sourceMappingURL=api.js.map