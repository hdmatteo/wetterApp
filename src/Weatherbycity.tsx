import React, { useState, useEffect } from "react";
import "./App.css";
import "./Sidenav";
import { useTranslation } from "react-i18next";
import { City } from "./App";
import classNames from "classnames";
import i18n from "./i18n";

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
    pressure: number;
    feels_like: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
  rain: {
    "1h": number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
}

type Props = {
  city: City;
};

export function Weatherbycity({ city }: Props) {
  const { t } = useTranslation();
  const lang = i18n.language;

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    getWeatherData()
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [city, lang]);

  async function getWeatherData(): Promise<WeatherData> {
    const apiKey = "1db8eb155fb81f7fa50bc0975ec0fa2d";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=${lang}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Netzwerkantwort war nicht in Ordnung");
      }

      const data: WeatherData = await response.json();
      return data;
    } catch (error) {
      console.error("Fehler beim Abrufen der Wetterdaten:", error);
      throw error;
    }
  }

  function getCityUrl(city: City) {
    switch (city) {
      case "Dubai":
        return "https://openweathermap.org/city/292223";
        break;
      case "Madrid":
        return "https://openweathermap.org/city/3117735";
        break;
      case "Singapur":
        return "https://openweathermap.org/city/1880252";
        break;
      case "Frankfurt":
        return "https://openweathermap.org/city/2925533";
        break;
    }
  }

  return (
    <div
      className={classNames(
        "min-h-screen text-white font-sans font-bold bg-no-repeat bg-cover bg-center",
        { "bg-Madrid": city === "Madrid" },
        { "bg-Dubai": city === "Dubai" },
        { "bg-Singapur": city === "Singapur" },
        { "bg-Frankfurt": city === "Frankfurt" }
      )}>
      {/* Header */}
      <header className="rounded-t-lg p-4">
        <div className="mx-auto flex items-center justify-between">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <label
            htmlFor="my-drawer"
            className="btn btn-circle swap swap-rotate">
            <input type="checkbox" />
            <svg
              className="swap-off fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512">
              <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
            </svg>
            <svg
              className="swap-on fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512">
              <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
            </svg>
          </label>
          <div className="flex items-center mr-4 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-5 h-5 ">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 11.25l1.5 1.5.75-.75V8.758l2.276-.61a3 3 0 10-3.675-3.675l-.61 2.277H12l-.75.75 1.5 1.5M15 11.25l-8.47 8.47c-.34.34-.8.53-1.28.53s-.94.19-1.28.53l-.97.97-.75-.75.97-.97c.34-.34.53-.8.53-1.28s.19-.94.53-1.28L12.75 9M15 11.25L12.75 9"
              />
            </svg>{" "}
            <h1 className="p-2">{city}</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 ">
        {weatherData && (
          <div className="grid grid-cols-1 sm:grid-cols-3 grid-rows-14 gap-10">
            <div className="row-span-2 col-span-3 backdrop-blur-md rounded-lg p-4 shadow-md">
              <a
                className="text-sky-400 after:content-['_↗'] ..."
                href={ getCityUrl(city)}
                target="_blank">
                {t("temperature")}
              </a>
              <p>{Math.ceil(weatherData.main.temp)}°C</p>
              <p>
                {t("feelsLike")}
                {Math.ceil(weatherData.main.feels_like)}°C
              </p>
            </div>
            <div className="col-span-2 backdrop-blur-md rounded-lg p-4 shadow-md">
              <a
                className="text-sky-400 after:content-['_↗'] ..."
                href={ getCityUrl(city)}
                target="_blank">
                {t("humidity")}
              </a>
              <p>{weatherData.main.humidity}%</p>
            </div>
            <div className=" col-span-1 backdrop-blur-md rounded-lg  p-4 shadow-md">
              <a
                className="text-sky-400 after:content-['_↗'] ..."
                href={ getCityUrl(city)}
                target="_blank">
                {t("rain")}
              </a>
              <p>{weatherData.rain?.["1h"] ?? 0} mm</p>
            </div>
            <div className="row-span-3 col-span-3 backdrop-blur-md rounded-lg p-4 shadow-md">
            <a
                className="text-sky-400 after:content-['_↗'] ..."
                href={ getCityUrl(city)}
                target="_blank">
                Sonne
              </a>
              <p>{t("sunrise")}{new Date(weatherData.sys.sunrise*1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
              <p>{t("sunset")}{new Date(weatherData.sys.sunset).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
              
            </div>
            <div className="col-span-3 backdrop-blur-md rounded-lg p-4 shadow-md">
              <a
                className="text-sky-400 after:content-['_↗'] ..."
                href={ getCityUrl(city)}
                target="_blank">
                {t("windSpeed")}
              </a>
              <p>{weatherData.wind.speed} m/s</p>
            </div>
            <div className="col-span-1 backdrop-blur-md rounded-lg  p-4 shadow-md">
              <a
                className="text-sky-400 after:content-['_↗'] ..."
                href={ getCityUrl(city)}
                target="_blank">
                {t("weather")}
              </a>
              <p>{weatherData.weather[0].description}</p>
            </div>

            <div className="col-span-2 backdrop-blur-md rounded-lg p-4 shadow-md">
            <a
                className="text-sky-400 after:content-['_↗'] ..."
                href={ getCityUrl(city)}
                target="_blank">
                {t("pressure")}
              </a>
              <p>{weatherData.main.pressure} hPa</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}


export default Weatherbycity;
