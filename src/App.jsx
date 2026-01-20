import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WeatherFunc } from './features/data';
import './App.css';
import Input from './Input';

function App() {
  const { weatheritems, loading, error } = useSelector((state) => state.weatherapp);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(WeatherFunc()); // default Karachi
  }, [dispatch]);

  if (loading) return <h2 className="loading">Loading...</h2>;
  if (error) return <h2 className="error">Error: {error}</h2>;

  return (
    <div className='main-container'>
      <div className="main-card">
        <h2 className='city-name'>{weatheritems?.address}</h2>
        
        {/* Search Bar */}
        <Input/>

        {/* Weather Icon */}
        {weatheritems?.currentConditions?.icon && (
          <img 
            src={`https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/2nd%20Set%20-%20Color/${weatheritems?.currentConditions?.icon}.png`} 
            alt={weatheritems?.currentConditions?.conditions} 
            className="weather-icon"
          />
        )}

        {/* Current Conditions */}
        <div className="current-conditions">
          <h3>🌡️ Temp: {weatheritems?.currentConditions?.temp}°C</h3>
          <h3>🌬️ Wind Speed: {weatheritems?.currentConditions?.windspeed} km/h</h3>
          <h3>🧭 Wind Direction: {weatheritems?.currentConditions?.winddir}°</h3>
          <h3>💨 Wind Gust: {weatheritems?.currentConditions?.windgust} km/h</h3>
          <h3>☁️ Condition: {weatheritems?.currentConditions?.conditions}</h3>
        </div>
      </div>

      {/* 7-day forecast */}
      <div className='forecast-cards'>
        {weatheritems?.days?.slice(0,7).map((day, index) => (
          <div className='forecast-card' key={index}>
            <h3>{day.datetime}</h3>
            <p>Min: {day.tempmin}°C</p>
            <p>Max: {day.tempmax}°C</p>
            <p>Humidity: {day.humidity}%</p>
            <p>Condition: {day.conditions}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
