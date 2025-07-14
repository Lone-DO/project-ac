import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
	getWeather,
	type iWeatherData,
	type iWeatherItem,
	navigatorRejected,
} from './geolocatorApi';
import type { RootState } from '@/app/store';

export interface iGeoLocatorState {
	error: string | null | Error;
	busy: boolean;
	weather: string | null;
	location: string | null;
	weatherData: iWeatherData | null;
	currentWeather: iWeatherItem | null;
	coordinates: { lon: number | null; lat: number | null };
}

export const initialState: iGeoLocatorState = {
	error: null,
	busy: false,
	weather: null,
	location: null,
	weatherData: null,
	currentWeather: null,
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
				state.weather = action.payload.weather;
				state.location = action.payload.location;
				state.weatherData = action.payload.weatherData;
				state.coordinates = action.payload.weatherData.coord;
				state.currentWeather = action.payload.currentWeather;
			})
			.addCase(navigatorRejected.fulfilled, (state, action) => {
				state.coordinates = action.payload;
			});
	},
});

export const geolocatorSelector = (state: RootState) => state.geolocator;
export const useGeoStore = createSelector(geolocatorSelector, (geo) => geo);

export const { setBusy, setNavigator, setLocation, setWeather } = geolocatorSlice.actions;

export default geolocatorSlice.reducer;
