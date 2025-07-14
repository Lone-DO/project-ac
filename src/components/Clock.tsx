import { useTimerStore } from '@/features/timer/timer';
import { useSelector } from 'react-redux';

function Clock() {
	console.log('Clock');
	const timer = useSelector(useTimerStore);
	if (!timer.ready) return;
	return (
		<div className='clock' key='time'>
			<img src={timer.imgSource as string} alt='Clock' />
			<div className='clock_time'>
				<i>{timer.hours}</i>
				<i>:{timer.minutes}</i>
			</div>
		</div>
	);
}

export default Clock;
