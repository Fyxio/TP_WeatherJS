const apiKey = "f1c121af4385503efcdcac72ef9891f0";

export interface WeatherData {
  city: string;
  temperature: number;
  weather: string;
} 

export enum WeatherCondition{
  Clear = "clear",
  Rain = "rain",
  Clouds = "clouds",
  Snow = "snow",
  Mist = "mist",
  Fog = "fog",
  Other = "Other"
}

export function getWeatherCondition(apiMain :string): WeatherCondition{
  switch(apiMain.toLocaleLowerCase()){
    case "clear":
      return WeatherCondition.Clear;
    case "rain":
      return WeatherCondition.Rain;
    case "clouds":
      return WeatherCondition.Clouds;
    case "snow":
      return WeatherCondition.Snow;
    case "mist":
      return WeatherCondition.Mist;
    case "fog":
      return WeatherCondition.Fog;
    default:
      return WeatherCondition.Other
  }
}

export const getWeatherByCity = async (city: string): Promise<WeatherData> => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&appid=${apiKey}&lang=fr&units=metric`;

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
