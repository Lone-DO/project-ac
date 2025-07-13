import { useMemo, useState } from 'react';

import { default as Player } from './_player.tsx';
import { default as audioData, type iAudioData } from '@/assets/common/audioData';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/app/store';

function Audio() {
	const geolocator = useSelector((state: RootState) => state.geolocator);
	const timer = useSelector((state: RootState) => state.timer);
	/** State */
	const dispatch = useDispatch();
	const [isReady, setReady] = useState<boolean>(false);
	const [album, setAlbum] = useState<string | null>(null);

	const song = useMemo(() => {
		const chosenAlbum = (audioData[album || ''] || {}) as iAudioData;
		const chosenTheme = (chosenAlbum[geolocator.weather || ''] || {}) as iAudioData;
		return chosenTheme[timer.prettyName || ''] as string;
	}, [album, geolocator.weather, timer.prettyName]);

	const playerProps = useMemo(
		() => ({
			album,
			isReady,
			song,
		}),
		[album, isReady, song],
	);

	function loadSong(opts?: { playlist?: string | null; theme?: string | null }) {
		try {
			if (!isReady || (!opts?.playlist && !opts?.theme)) {
				dispatch({ type: 'geolocator/setWeather', payload: 'Normal' });
				setAlbum('Original');
				setReady(true);
			} else {
				if (opts.theme) dispatch({ type: 'geolocator/setWeather', payload: opts.theme });
				if (opts.playlist) setAlbum(opts.playlist);
			}
		} catch (err) {
			alert(`Issue has occurred while loading Audio... > ${err}`);
		}
	}

	if (timer.ready) {
		return <Player {...playerProps} loadSong={loadSong} />;
	}
	return <span>Loading Audio...</span>;
}

export default Audio;
