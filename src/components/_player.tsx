import { useEffect, useMemo, useRef } from 'react';
import Search from './WeatherForm.tsx';

import sunny from '@/assets/images/AC_App/weather-normal.svg';
import raining from '@/assets/images/AC_App/weather-raining.svg';
import winter from '@/assets/images/AC_App/weather-winter.svg';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/app/store.ts';

export interface iPlayerProps {
	song: string;
	isReady: boolean;
	album: string | null;
	loadSong: (playlist?: string | null, theme?: string | null) => void;
}

const Player = (props: iPlayerProps) => {
	const geolocator = useSelector((state: RootState) => state.geolocator);
	const timer = useSelector((state: RootState) => state.timer);
	const dispatch = useDispatch();
	const playerRef = useRef(null);
	const audioSrc = useMemo(() => String(props.song).replace(/\/www/i, '/dl'), [props.song]);
	useEffect(() => {
		if (audioSrc && playerRef) playerRef?.current?.load();
	}, [audioSrc]);

	function getGeoLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(pos) => {
					const payload = {
						lat: pos?.coords?.latitude || 0,
						lon: pos?.coords?.longitude || 0,
					};
					dispatch({ type: 'geolocator/setNavigator', payload });
				},
				() => {
					alert('Location Denied');
				},
			);
		}
	}
	if (props.isReady) {
		return [
			<h4 key='Song Title'>
				{props.album}, {timer.prettyName}, {geolocator.weather}
				{geolocator.location ? `, ${geolocator.location}` : ''}
			</h4>,
			<audio ref={playerRef} controls loop autoPlay id='player' key='player-audio' className='btn'>
				<source src={audioSrc} type='audio/mp3' className='audioSource' />
				Your browser does not support the audio element.
			</audio>,
			<div key='songDials' className='timeline'>
				<button className='btn timeline-item' onClick={() => props.loadSong('Original')}>
					Original
				</button>
				<button className='btn timeline-item' onClick={() => props.loadSong('CityFolk')}>
					City Folk
				</button>
				<button className='btn timeline-item' onClick={() => props.loadSong('NewLeaf')}>
					NewLeaf
				</button>
			</div>,
			<div key='controls'>
				<img
					onClick={() => props.loadSong(props.album, 'Raining')}
					className='btn weatherIcon'
					alt='Change Weather to Rain Theme'
					src={raining}
				/>

				<img
					onClick={() => props.loadSong(props.album, 'Winter')}
					className='btn weatherIcon'
					alt='Change Weather to Winter Theme'
					src={winter}
				/>

				<img
					onClick={() => props.loadSong(props.album, 'Normal')}
					className='btn weatherIcon'
					alt='Change Weather to Normal Theme'
					src={sunny}
				/>

				<button onClick={getGeoLocation} className='btn weatherIcon geo'>
					<i className='fa-solid fa-location-dot' />
				</button>
			</div>,

			<Search key='WeatherForm' />,
		];
	} else {
		return (
			<button className='btn' onClick={() => props.loadSong()}>
				Start
			</button>
		);
	}
};

export default Player;
