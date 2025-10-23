import { useEffect, useState } from "react";
import {
  getCurrentWeather,
  getCurrentWeatherByCoords,
  getWeatherForecast,
} from "../services/weatherAPI";

export const useWeather = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [foreCast, setForeCast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnits] = useState("C");

  //   Fetch Weather By city
  const fetchWeatherByCity = async (city) => {
    setLoading(true);
    setError(null);

    try {
      const [weatherData, foreCast] = await Promise.all([
        getCurrentWeather(city),
        getWeatherForecast(city),
      ]);

      setCurrentWeather(weatherData);
      setForeCast(foreCast);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  //   Fetch Weather By location
  const fetchWeatherByLocation = async () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const weatherData = await getCurrentWeatherByCoords(
            latitude,
            longitude
          );
          setCurrentWeather(weatherData);

          // fetch forecast for the current location
          const forecastData = await getWeatherForecast(weatherData.name);
          setForeCast(forecastData);
        } catch (err) {
          setError(
            err instanceof Error ? err.message : "Failed to fetch weather data."
          );
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        setError("Unable to retreive your location.");
        setLoading(false);
      }
    );
  };

  const toggleUnit = () => {
    setUnits(unit === "C" ? "F" : "C");
  };

  // load default weather on mount
  useEffect(() => {
    fetchWeatherByCity("Ho Chi Minh");
  }, []);

  return {
    currentWeather,
    foreCast,
    loading,
    error,
    unit,
    fetchWeatherByCity,
    fetchWeatherByLocation,
    toggleUnit,
  };
};
