const appID = `2f5a1799d225797f65692eec5248db12`;

const btnSearch = document.getElementById("search-btn");

btnSearch.addEventListener("click", async () => {
    const city = document.getElementById("site-search").value;
    const data = await showMeteo(city);

    if (!data) {
        displayError("Ville inconnue");
        return;
    }

    const meteoDTO = createWeatherDTO(data);
    displayWeather(meteoDTO);

    saveToHistory(meteoDTO.city);

    console.log(meteoDTO);
});

async function showMeteo(city) {
  const repons = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appID}&units=metric&lang=fr`);
  const data = await repons.json();

  if (data.cod === "404"){
    return null;
  }

  return data;
} 

function createWeatherDTO(data){
  const weatherMain = data.weather[0].main;

  return {
    city: data.name,
    temperature: Math.round(data.main.temp) + "°C",
    weather: weatherMain, 
    emoji: getWeatherEmoji(weatherMain)
  };
}

function getWeatherEmoji(weather) {

  switch (weather) {
    case "Clear":
      return "☀️";         

    case "Clouds":
      return "☁️";        

    case "Rain":
      return "🌧️";        

    case "Drizzle":
      return "🌦️";        

    case "Thunderstorm":
      return "⛈️";        

    case "Snow":
      return "❄️";         

    default:
      return "🌍";       
  }
}

/*------------------------------------------------------

AFFICHAGE HTML

------------------------------------------------------*/

function displayWeather(meteo){
  document.getElementById("city").textContent = meteo.city;
  document.getElementById("temperature").textContent = meteo.temperature;
  document.getElementById("weather").textContent = `${meteo.emoji} ${meteo.weather}`;
  document.getElementById("weather-container").classList.remove("hidden");
  document.getElementById("weather-container").classList.add("show");
}

function displayError(message){
  const container = document.getElementById("weather-container");

  document.getElementById("city").textContent = "";
  document.getElementById("temperature").textContent = "";
  document.getElementById("weather").textContent = message;

  container.classList.remove("hidden");
  container.classList.add("show");
}


function loadHistory() {
  return JSON.parse(localStorage.getItem("cityHistory")) || [];
}

function saveToHistory(city) {
  let history = loadHistory();

  if (!history.includes(city)) {
    history.unshift(city);
  }

  if (history.length > 5) {
    history = history.slice(0, 5);
  }

  localStorage.setItem("cityHistory", JSON.stringify(history));

  displayHistory();
}

function displayHistory() {
  const history = loadHistory();
  const container = document.getElementById("history-container");

  container.innerHTML = "";

  history.forEach(city => {
    const btn = document.createElement("button");
    btn.className = "history-btn";
    btn.textContent = city;

    btn.addEventListener("click", () => {
      document.getElementById("site-search").value = city;
      btnSearch.click();
    });

    container.appendChild(btn);
  });
}

// ---- Affichage initial
displayHistory();