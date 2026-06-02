import React from "react";
import { WeatherInfo } from "../types";
import { Sun, Cloud, CloudRain, CloudLightning, Wind, Droplets, AlertTriangle } from "lucide-react";

interface WeatherWidgetProps {
  weather: WeatherInfo;
}

export default function WeatherWidget({ weather }: WeatherWidgetProps) {
  const getWeatherIcon = (cond: typeof weather.condition) => {
    switch (cond) {
      case "Sunny":
        return <Sun className="w-8 h-8 text-[#D4A017] animate-spin-slow" id="icon-sun" />;
      case "Cloudy":
        return <Cloud className="w-8 h-8 text-slate-400" id="icon-cloud" />;
      case "Light Rain":
        return <CloudRain className="w-8 h-8 text-[#F28C28]" id="icon-rain" />;
      case "Mist":
        return <Cloud className="w-8 h-8 text-slate-300 animate-pulse" id="icon-mist" />;
      case "Thunderstorm":
        return <CloudLightning className="w-8 h-8 text-amber-600 animate-bounce" id="icon-thunder" />;
    }
  };

  const conditionsInBahasa: Record<string, string> = {
    Sunny: "Cerah",
    Cloudy: "Berawan",
    "Light Rain": "Gerimis",
    Mist: "Kabut",
    Thunderstorm: "Badai Petir"
  };

  return (
    <div
      id="bontolojong-weather-container"
      className="p-5 rounded-2xl bg-[#FFF8EF]/95 backdrop-blur-md border border-[#D4A017]/25 shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-[#F28C28]/40"
    >
      <div className="flex justify-between items-center mb-3">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#7A4E2D]">Status Iklim Mikro</span>
          <h4 className="text-lg font-sans font-bold text-slate-950">Lembah Bontolojong</h4>
        </div>
        <div className="p-2 bg-white rounded-full shadow-inner border border-[#D4A017]/10">
          {getWeatherIcon(weather.condition)}
        </div>
      </div>

      <div className="flex items-baseline space-x-2 my-2">
        <span className="text-4xl font-display font-medium text-slate-900 tracking-tight">{weather.temperature}°C</span>
        <span className="text-sm font-medium text-[#7A4E2D]">{conditionsInBahasa[weather.condition] || weather.condition}</span>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-200 text-xs font-mono">
        <div className="flex items-center space-x-1 text-slate-600">
          <Droplets className="w-3.5 h-3.5 text-sky-500" />
          <span>Kelembapan: {weather.humidity}%</span>
        </div>
        <div className="flex items-center space-x-1 text-slate-600">
          <Wind className="w-3.5 h-3.5 text-teal-600" />
          <span>Angin: {weather.windSpeed} km/jam</span>
        </div>
      </div>

      {weather.alert && (
        <div className="mt-4 p-2.5 bg-amber-50 rounded-lg border border-amber-200 flex items-start space-x-2 text-[11px] text-amber-800 font-sans leading-relaxed">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p>{weather.alert}</p>
        </div>
      )}
    </div>
  );
}
