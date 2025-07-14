import config from '@/assets/common/config';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { type iGeoLocatorState } from './geolocator';
import { generateSong } from '@/features/radio/radioApi';

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
	{ location: string; weather: string; weatherData: iWeatherData; currentWeather: iWeatherItem },
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
	const weatherData = (await _res.json()) as unknown as iWeatherData;
	const location = weatherData?.name as string;
	const currentWeather = weatherData?.weather[0] || ({} as iWeatherItem);

	let weather = 'Normal';
	if (['Rain', 'Drizzle', 'Thunderstorm'].includes(currentWeather?.main)) weather = 'Raining';
	else if (currentWeather?.main === 'Snow') weather = 'Snowing';

	return { location, weather, weatherData, currentWeather };
});

export const navigatorApproved = createAsyncThunk<
	{ geolocator: iGeoLocatorState },
	{ coords: { latitude: number; longitude: number } },
	{ state: { geolocator: iGeoLocatorState } }
>('geolocator/navigatorApproved', async (pos, thunkAPI) => {
	const coordinates = {
		lat: pos?.coords?.latitude || 0,
		lon: pos?.coords?.longitude || 0,
	};
	await thunkAPI.dispatch(getWeather({ type: 'geo', coordinates }));
	/** @ts-expect-error: Undetermined Type Error for non-existent arg */
	await thunkAPI.dispatch(generateSong());
	return thunkAPI.getState();
});

export const navigatorRejected = createAsyncThunk<
	{ lat: number; lon: number },
	unknown,
	{ state: { geolocator: iGeoLocatorState } }
>('geolocator/navigatorRejected', () => ({ lat: 0, lon: 0 }));

export const getNavigator = createAsyncThunk<
	null | void,
	void,
	{ state: { geolocator: iGeoLocatorState } }
>('geolocator/getNavigator', async (_, thunkAPI) => {
	if (navigator.geolocation) {
		return navigator.geolocation.getCurrentPosition(
			(arg) => thunkAPI.dispatch(navigatorApproved(arg)),
			(err) => thunkAPI.dispatch(navigatorRejected(err)),
		);
	}
	return null;
});
