import type { AppDispatch, RootState } from '@/app/store';
import { getWeather } from '@/features/geolocator/geolocatorApi';
import { useState, type FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const WeatherForm = () => {
	const dispatch: AppDispatch = useDispatch();
	const geolocator = useSelector((state: RootState) => state.geolocator);
	const [value, setValue] = useState<string>((geolocator.location || '') as string);
	function submit(event: FormEvent) {
		event.preventDefault();
		dispatch({ type: 'geolocator/setLocation', payload: value });
		dispatch(getWeather({ type: 'search' }));
	}

	return (
		<form id='weatherForm' onSubmit={submit}>
			<input
				type='text'
				name='location'
				onChange={(evt) => setValue(evt.currentTarget.value)}
				value={value}
				placeholder='Location'
				required
			/>
			<button className='btn'>Check Weather</button>
		</form>
	);
};

export default WeatherForm;
