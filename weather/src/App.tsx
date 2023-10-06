import React, { useState, useEffect } from 'react';
import './App.css';
import './Sidenav';

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

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          getWeatherData(lat, lon)
            .then(data => {
              setWeatherData(data);
            })
            .catch(error => {
              console.error(error);
            });
        },
        error => {
          console.error('Fehler bei der Standortermittlung:', error);
        }
      );
    } else {
      console.error('Geolocation wird vom Browser nicht unterstützt.');
    }
  }, []);

  // Funktion zum Abrufen der Wetterdaten
  async function getWeatherData(lat: number, lon: number): Promise<WeatherData> {
    const apiKey = '1db8eb155fb81f7fa50bc0975ec0fa2d';
    const lang = "de";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=${lang}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Netzwerkantwort war nicht in Ordnung');
      }

      const data: WeatherData = await response.json();
      return data;
    } catch (error) {
      console.error('Fehler beim Abrufen der Wetterdaten:', error);
      throw error;
    }
  }

  return (
    <div className="min-h-screen text-white font-sans font-bold">
      {/* Header */}
      <header className="rounded-t-lg p-4">
        <div className="mx-auto flex items-center justify-between">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <label htmlFor="my-drawer" className="btn btn-circle swap swap-rotate">
            <input type="checkbox" />
            <svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" /></svg>
            <svg className="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" /></svg>
          </label>
          <div className="text-2xl font-semibold">Wetter-App</div>
          {weatherData && (
            <div className="flex items-center">
              <div className="mr-4">{Math.ceil(weatherData.main.temp)}°C</div>
              <div>{weatherData.weather[0].description}</div>
            </div>
          )}
        </div>
      </header>

      {/* Hauptinhalt der App */}
      <main className="container mx-auto p-4 ">
        {weatherData && (
          <div className="grid grid-cols-1 sm:grid-cols-3 grid-rows-14 gap-10">
            <div className="row-span-2 col-span-2 backdrop-blur-md rounded-lg p-4 shadow-md">
              <a className="text-sky-400 after:content-['_↗'] ..." href="https://openweathermap.org/city" target="_blank">Temperatur</a>
              <p>{Math.ceil(weatherData.main.temp)}°C</p>
              <p>Gefühlt:{Math.ceil(weatherData.main.feels_like)}°C</p>
            </div>
            <div className="row-span-2 backdrop-blur-md rounded-lg p-4 shadow-md">
              <a className="text-sky-400 after:content-['_↗'] ..." href="https://openweathermap.org/city" target="_blank">Luftfeuchtigkeit</a>
              <p>{weatherData.main.humidity}%</p>
            </div>
            <div className="row-span-2 backdrop-blur-md rounded-lg p-4 shadow-md">
              <a className="text-sky-400 after:content-['_↗'] ..." href="https://openweathermap.org/city" target="_blank">Luftdruck</a>
              <p>{weatherData.main.pressure} hPa</p>
            </div>
            <div className="col-span-2 backdrop-blur-md rounded-lg p-4 shadow-md">
              <a className="text-sky-400 after:content-['_↗'] ..." href="https://openweathermap.org/city" target="_blank">Windgeschwindigkeit</a>
              <p>{weatherData.wind.speed} m/s</p>
            </div>
            <div className="backdrop-blur-md rounded-lg  p-4 shadow-md">
              <a className="text-sky-400 after:content-['_↗'] ..." href="https://openweathermap.org/city" target="_blank">Wetter</a>
              <p>{weatherData.weather[0].description}</p>
            </div>
            <div className="backdrop-blur-md rounded-lg  p-4 shadow-md">
              <a className="text-sky-400 after:content-['_↗'] ..." href="https://openweathermap.org/city" target="_blank">Regen</a>
              <p>{weatherData.rain?.["1h"] ?? 0} mm</p>
            </div>
            <div className="col-span-2 backdrop-blur-md rounded-lg p-4 shadow-md">
              <a className="text-sky-400 after:content-['_↗'] ..." href="https://openweathermap.org/city" target="_blank">Wetter</a>
              <p>{weatherData.weather[0].description}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
