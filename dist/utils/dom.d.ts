import type { WeatherData } from "./api";
export declare const getWeatherEmoji: (weather: string) => "☁️" | "🌧️" | "⛈️" | "❄️" | "☀️" | "🌫️" | "🌥️";
export declare const setBackgroundByTemperature: (temp: number) => void;
export declare const populateResult: (weather: WeatherData) => void;
export declare const renderHistoryButtons: (history: string[], onClick: (city: string) => void) => void;
//# sourceMappingURL=dom.d.ts.map