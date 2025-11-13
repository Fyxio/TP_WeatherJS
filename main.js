const appID = `2f5a1799d225797f65692eec5248db12`;

const btnSearch = document.getElementById("search-btn");

btnSearch.addEventListener("click", () =>{
    const city = document.getElementById("site-search").value;
    console.log(city);
    showMeteo(city);
})

async function showMeteo(city) {
  const repons = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appID}`);
  const data = await repons.json();
  console.log(data);
  return data;
}

