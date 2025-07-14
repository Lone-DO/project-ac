import { useEffect, useMemo, useRef } from 'react';
import Search from './WeatherForm.tsx';

import sunny from '@/assets/images/AC_App/weather-normal.svg';
import raining from '@/assets/images/AC_App/weather-raining.svg';
import winter from '@/assets/images/AC_App/weather-winter.svg';
import { useDispatch, useSelector } from 'react-redux';
import { geolocatorSelector, radioSelector, timerSelector, type AppDispatch } from '@/app/store.ts';
import { getNavigator } from '@/features/geolocator/geolocatorApi.ts';
import { load, type iLoadArg } from '@/features/radio/radioApi.ts';

const Player = () => {
	const dispatch = useDispatch<AppDispatch>();
	const playerRef = useRef<HTMLAudioElement>(null);
	const radio = useSelector(radioSelector);
	const timer = useSelector(timerSelector);
	const geolocator = useSelector(geolocatorSelector);
	const audioSrc = useMemo(() => String(radio.song).replace(/\/www/i, '/dl'), [radio.song]);
	useEffect(() => {
		if (audioSrc && playerRef) playerRef?.current?.load();
	}, [audioSrc]);

	const loadSong = (arg: iLoadArg) => dispatch(load(arg));
	return [
		<h4 key='Song Title'>
			{radio.album}, {timer.prettyName}, {geolocator.weather}
			{geolocator.location ? `, ${geolocator.location}` : ''}
		</h4>,
		<audio ref={playerRef} controls loop autoPlay id='player' key='player-audio' className='btn'>
			<source src={audioSrc} type='audio/mp3' className='audioSource' />
			Your browser does not support the audio element.
		</audio>,
		<div key='songDials' className='timeline'>
			<button className='btn timeline-item' onClick={() => loadSong({ album: 'Original' })}>
				Original
			</button>
			<button className='btn timeline-item' onClick={() => loadSong({ album: 'CityFolk' })}>
				City Folk
			</button>
			<button className='btn timeline-item' onClick={() => loadSong({ album: 'NewLeaf' })}>
				NewLeaf
			</button>
		</div>,
		<div key='controls'>
			<img
				onClick={() => loadSong({ theme: 'Raining' })}
				className='btn weatherIcon'
				alt='Change Weather to Rain Theme'
				src={raining}
			/>

			<img
				onClick={() => loadSong({ theme: 'Winter' })}
				className='btn weatherIcon'
				alt='Change Weather to Winter Theme'
				src={winter}
			/>

			<img
				onClick={() => loadSong({ theme: 'Normal' })}
				className='btn weatherIcon'
				alt='Change Weather to Normal Theme'
				src={sunny}
			/>

			<button onClick={() => dispatch(getNavigator())} className='btn weatherIcon geo'>
				<i className='fa-solid fa-location-dot' />
			</button>
		</div>,

		<Search key='WeatherForm' />,
	];
};

export default Player;
