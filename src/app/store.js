import { configureStore } from "@reduxjs/toolkit";
import WeatherData from '../features/data'

const store = configureStore({
  reducer: {
    weatherapp: WeatherData,
  }
});

export default store;
