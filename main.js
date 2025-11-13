const appID = `2f5a1799d225797f65692eec5248db12`;

const btnSearch = document.getElementById("search-btn");

btnSearch.addEventListener("click", async () => {
    const city = document.getElementById("site-search").value;

    const data = await showMeteo(city);
    const meteoDTO = createWeatherDTO(data);

    console.log(meteoDTO);
});

async function showMeteo(city) {
  const repons = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appID}&units=metric&lang=fr`);
  const data = await repons.json();
  return data;
}

function createWeatherDTO(data){
  return {
    city: data.name,
    temperature: data.main.temp,
    weather: data.weather[0].main, 
  };
}
