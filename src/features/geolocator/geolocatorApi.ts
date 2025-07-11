import { createAsyncThunk } from '@reduxjs/toolkit';
import { type iGeoLocatorState } from './geolocator';

import config from '@/assets/common/config';

export interface iWeatherItem {
	description: string;
	icon: string;
	id: number;
	main: string;
}

export interface iWeatherData {
	base: string;
	clouds: { [key: string]: number | string | object };
	coord: { lat: number; lon: number };
	weather: iWeatherItem[];
	[key: string]: number | string | object;
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const getWeather = createAsyncThunk<
	number,
	{ type: string; coordinates?: { lon: number; lat: number }; location?: string },
	{ state: { geolocator: iGeoLocatorState } }
>('geolocator/getWeather', async (args, thunkApi) => {
	let apiUrl = '';
	const state = thunkApi.getState().geolocator;
	if (args.type === 'search') {
		const unit = 'metric';
		const location = args.location || state.location;
		apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=${config.weatherKey}`;
	}
	if (args.type === 'geo') {
		const { lon, lat } = args.coordinates || state.coordinates;
		apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${config.weatherKey}`;
	}
	const _res = await fetch(apiUrl).catch((err) => err);
	if (_res.status !== 200) throw Error(`Location Not Found, Error: ${_res.statusText}`);
	return _res.json();
});
