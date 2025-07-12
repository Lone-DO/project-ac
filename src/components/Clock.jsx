import React from 'react';
import Audio from './Audio';
import { useSelector } from 'react-redux';

function Clock() {
	const timer = useSelector((state) => state.timer);

	if (!timer.ready) return;
	return (
		<main>
			{timer.ready && (
				<div className='clock' key='time'>
					<img src={timer.imgSource} alt='Clock' />
					<div className='clock_time'>
						<i>{timer.hours}</i>
						<i>:{timer.minutes}</i>
					</div>
				</div>
			)}
			<Audio key='musicPlayer' />
		</main>
	);
}

export default Clock;
