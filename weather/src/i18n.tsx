import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      // Hier füge Übersetzungen für verschiedene Sprachen hinzu
      en: {
        translation: {
            feelsLike : "Feels like ",
            currentPosition: "Current Position",
            temperature: "Temperature",
            humidity: "Humidity",
            pressure: "Pressure",
            windSpeed: "Wind Speed",
            weather: "Weather",
            rain: "Rain",
            sunset: "Sunset ",
            sunrise: "Sunrise ",
        },
      },
      de: {
        translation: {
            feelsLike : "Gefühlt ",
            currentPosition: "Aktuelle Position",
            temperature: "Temperatur",
            humidity : "Luftfeuchtigkeit",
            pressure: "Luftdruck",
            windSpeed: "Windgeschwindigkeit",
            weather: "Wetter",
            rain: "Regen",
            sunset: "Sonnenuntergang ",
            sunrise: "Sonnenaufgang ",
        },
      },
      // Füge weitere Sprachen hinzu, falls benötigt
    },
    lng: 'de', // Standardmäßig Englisch
    fallbackLng: 'de', // Verwende Englisch, wenn die Übersetzung für die ausgewählte Sprache nicht verfügbar ist
    interpolation: {
      escapeValue: false, // React-Elemente in Übersetzungen nicht escapen
    },
  });

export default i18n;