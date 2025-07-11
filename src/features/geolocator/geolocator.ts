import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { getWeather, type iWeatherData, type iWeatherItem } from './geolocatorApi';

export interface iGeoLocatorState {
	error: string | null | Error;
	busy: boolean;
	weather: string | null;
	location: string | null;
	weatherData: iWeatherData | null;
	coordinates: { lon: number | null; lat: number | null };
}

export const initialState: iGeoLocatorState = {
	error: null,
	busy: false,
	weather: null,
	location: null,
	weatherData: null,
	coordinates: { lon: null, lat: null },
};

const geolocatorSlice = createSlice({
	name: 'geolocator',
	initialState,
	reducers: {
		setBusy: (state, action: PayloadAction<boolean>) => {
			state.busy = action.payload;
		},
		setLocation: (state, action: PayloadAction<string>) => {
			state.location = action.payload;
		},
		setWeather: (state, action: PayloadAction<string>) => {
			state.weather = action.payload;
		},
		setNavigator: (state, action) => {
			state.coordinates = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getWeather.pending, (state) => {
				state.busy = true;
			})
			.addCase(getWeather.rejected, (state, action) => {
				state.busy = false;
				state.error = action.payload as string;
			})
			.addCase(getWeather.fulfilled, (state, action) => {
				state.busy = false;
				state.weatherData = action.payload as unknown as iWeatherData;
				state.location = state.weatherData?.name as string;
				const currentWeather = state.weatherData?.weather[0] || ({} as iWeatherItem);
				if (['Rain', 'Drizzle', 'Thunderstorm'].includes(currentWeather?.main))
					state.weather = 'Raining';
				else if (currentWeather?.main === 'Snow') state.weather = 'Snowing';
				else state.weather = 'Normal';
			})
			.addCase('geolocator/setNavigator', (state) => {
				console.log(state.coordinates);
			});
	},
});

export const { setBusy, setNavigator, setLocation, setWeather } = geolocatorSlice.actions;

export default geolocatorSlice.reducer;
