import React, { useState, useEffect } from 'react';
import './App.css';

// Definiere die Schnittstelle für die Wetterdaten
interface WeatherData {
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
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

   
    const body = document.body;
    let position = 0;

    
    function animateBackground() {
      position += 1; 

      body.style.backgroundPosition = position + "px 50%";

      
      requestAnimationFrame(animateBackground);
    }

    
    animateBackground();
  }, []);

  // Funktion zum Abrufen der Wetterdaten
  async function getWeatherData(lat: number, lon: number): Promise<WeatherData> {
    const apiKey = '1db8eb155fb81f7fa50bc0975ec0fa2d'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

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
    <div className="min-h-screen text-white font-sans">
      {/* Header */}
      <header className="rounded-t-lg p-4">
        <div className="container mx-auto flex items-center justify-between">
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
      <main className="container mx-auto p-4">
        {weatherData && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="rounded-lg bg-gray-900 p-4 shadow-md transition-transform transform hover:translate-y-1 hover:scale-1.02">
              <h2 className="text-xl font-semibold mb-2">Temperatur</h2>
              <p>{Math.ceil(weatherData.main.temp)}°C</p>
            </div>
            <div className="rounded-lg bg-gray-900 p-4 shadow-md transition-transform transform hover:translate-y-1 hover:scale-1.02">
              <h2 className="text-xl font-semibold mb-2">Luftfeuchtigkeit</h2>
              <p>{weatherData.main.humidity}%</p>
            </div>
            <div className="rounded-lg bg-gray-900 p-4 shadow-md transition-transform transform hover:translate-y-1 hover:scale-1.02">
              <h2 className="text-xl font-semibold mb-2">Luftdruck</h2>
              <p>{weatherData.main.pressure} hPa</p>
            </div>
            <div className="rounded-lg bg-gray-900 p-4 shadow-md transition-transform transform hover:translate-y-1 hover:scale-1.02">
              <h2 className="text-xl font-semibold mb-2">Windgeschwindigkeit</h2>
              <p>{weatherData.wind.speed} m/s</p>
            </div>
            <div className="rounded-lg bg-gray-900 p-4 shadow-md transition-transform transform hover:translate-y-1 hover:scale-1.02">
              <h2 className="text-xl font-semibold mb-2">Wetter</h2>
              <p>{weatherData.weather[0].description}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
