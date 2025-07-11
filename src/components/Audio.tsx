import { useMemo, useState } from 'react';

import { default as Player, type iPlayerProps } from './_player.tsx';
import { default as audioData, type iAudioData } from '@/assets/common/audioData';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/app/store';

function Audio(props: { time: { hours: string; period: string }; isLoaded: boolean }) {
	const geolocator = useSelector((state: RootState) => state.geolocator);
	/** State */
	const dispatch = useDispatch();
	const [isReady, setReady] = useState<boolean>(false);
	const [album, setAlbum] = useState<string | null>(null);

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
		const chosenTheme = (chosenAlbum[geolocator.weather || ''] || {}) as iAudioData;
		return chosenTheme[title || ''] as string;
	}, [title, album, geolocator.weather]);

	const playerProps = useMemo(
		() => ({
			weather: geolocator.weather,
			title,
			album,
			location: geolocator.location,
			isReady,
			song,
		}),
		[geolocator.weather, title, album, geolocator.location, isReady, song],
	);

	function loadSong(playlist?: string | null, theme?: string | null) {
		try {
			if (!isReady || !playlist || !theme) {
				dispatch({ type: 'geolocator/setWeather', payload: 'Normal' });
				setAlbum('Original');
				setReady(true);
			} else {
				dispatch({ type: 'geolocator/setWeather', payload: theme });
				setAlbum(playlist);
			}
		} catch (err) {
			alert(`Issue has occurred while loading Audio... > ${err}`);
		}
	}

	function renderContent() {
		switch (props.isLoaded) {
			case null:
				return;
			case true:
				return <Player {...playerProps} loadSong={loadSong} />;

			default:
				return 'Loading Audio...';
		}
	}
	return renderContent();
}

export default Audio;
