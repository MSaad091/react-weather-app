import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const WeatherFunc = createAsyncThunk(
  'weather/fetchWeather',
  async (city = "Karachi") => {
    const res = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=HGFA6AK3HTZNSGBXFDEG96KPN&contentType=json`
    );
    const data = await res.json();
    // console.log("Weather API Data:", data);
    return data;
  }
);

const WeatherData = createSlice({
  name: 'weatherapp',
  initialState: {
    weatheritems: {},
    loading: false,
    error: null,
    search: ''
  },
  reducers: {
    searchItem: (state, action) => {
      state.search = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(WeatherFunc.pending, (state) => {
        state.loading = true;
      })
      .addCase(WeatherFunc.fulfilled, (state, action) => {
        state.weatheritems = action.payload;
        state.loading = false;
      })
      .addCase(WeatherFunc.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { searchItem } = WeatherData.actions;
export default WeatherData.reducer;
