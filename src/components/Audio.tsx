import { useMemo, useState } from 'react';

import Player from './_player';
import config from '@/assets/common/config';
import { default as audioData, type iAudioData } from '@/assets/common/audioData';

interface iWeatherItem {
	description: string;
	icon: string;
	id: number;
	main: string;
}

interface iWeatherData {
	base: string;
	clouds: { [key: string]: number | string | object };
	coord: { lat: number; lon: number };
	weather: iWeatherItem[];
	[key: string]: number | string | object;
}

function Audio(props: { time: { hours: string; period: string }; isLoaded: boolean }) {
	const unit = 'metric';
	/** State */
	const [isBusy, setBusy] = useState<boolean>(false);
	const [isReady, setReady] = useState<boolean>(false);
	const [album, setAlbum] = useState<string | null>(null);
	const [weather, setWeather] = useState<string | null>(null);
	const [location, setLocation] = useState<string | null>('');
	const [prevHour, setPrevHour] = useState<string | null>(null);
	const [weatherData, setWeatherData] = useState<iWeatherData | null>(null);
	const [cords, setCords] = useState<{ lon: number | null; lat: number | null }>({
		lon: null,
		lat: null,
	});

	const title = useMemo(() => {
		const { hours, period } = props.time;
		const title =
			Number(hours) < 10 && hours.indexOf('0') > -1
				? hours.replace('0', '') + period
				: hours + period;
		if (title === '12PM') return 'Noon';
		else if (hours === '00') return 'Midnight';
		return title;
	}, [props.time]);

	const song = useMemo(() => {
		const chosenAlbum = (audioData[album || ''] || {}) as iAudioData;
		const chosenTheme = (chosenAlbum[weather || ''] || {}) as iAudioData;
		return chosenTheme[title || ''] as string;
	}, [title, album, weather]);

	const playerProps = useMemo(
		() => ({ weather, title, album, location, isReady, song }),
		[weather, title, album, location, isReady, song],
	);

	function loadSong(playlist?: string | null, theme?: string | null) {
		try {
			if (!isReady || !playlist || !theme) {
				setWeather('Normal');
				setAlbum('Original');
				setReady(true);
			} else {
				setWeather(theme);
				setAlbum(playlist);
			}
		} catch (err) {
			alert(`Issue has occurred while loading Audio... > ${err}`);
		} finally {
			setPrevHour(props?.time?.hours || null);
		}
	}

	function updateLocation(event: Event) {
		event.preventDefault();
		const { value }: { value: string } = event.target as unknown as { name: string; value: string };
		setLocation(value);
	}

	async function loadWeather(event: Event, type: string, newCords?: { lon: number; lat: number }) {
		if (isBusy) return;
		setBusy(true);
		let apiUrl = '';
		event?.preventDefault();
		const { lon, lat } = newCords || cords;

		try {
			if (type === 'search') {
				apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=${config.weatherKey}`;
			}
			if (type === 'geo') {
				apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${config.weatherKey}`;
			}
			const _res = await fetch(apiUrl).catch((err) => err);
			if (_res.status !== 200) throw Error(`Location Not Found, ${_res.statusText}`);
			const res = (await _res.json()) as unknown as iWeatherData;
			setWeatherData(res);
			setLocation(res?.name as string);
			const currentWeather = res?.weather[0] || ({} as iWeatherItem);
			switch (currentWeather?.main) {
				case 'Rain':
				case 'Drizzle':
				case 'Thunderstorm':
					return setWeather('Raining');
				case 'Snow':
					return setWeather('Winter');
				default:
					return setWeather('Normal');
			}
		} catch (err) {
			alert(err);
			setLocation('');
		} finally {
			setBusy(false);
		}
	}

	function loadGeolocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(pos) => {
					const value = {
						lat: pos?.coords?.latitude || 0,
						lon: pos?.coords?.longitude || 0,
					};
					setCords(value);
					loadWeather(new Event('mock'), 'geo', value);
				},
				() => {
					alert('Location Denied');
				},
			);
		}
	}

	function renderContent() {
		switch (props.isLoaded) {
			case null:
				return;
			case true:
				return (
					<Player
						props={props}
						state={playerProps}
						loadSong={loadSong}
						loadGeolocation={loadGeolocation}
						loadWeather={loadWeather}
						handleChange={updateLocation}
					/>
				);

			default:
				return 'Loading Audio...';
		}
	}
	return renderContent();
}

export default Audio;
