export declare enum WeatherCondition {
    Clear = "clear",
    Rain = "rain",
    Cloud = "cloud",
    Snow = "snow",
    Mist = "mist",
    Other = "other"
}
export interface WeatherData {
    city: string;
    temperature: number;
    weather: string;
}
export declare const getWeatherByCity: (city: string) => Promise<WeatherData>;
//# sourceMappingURL=api.d.ts.map