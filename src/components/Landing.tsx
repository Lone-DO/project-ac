import { useDispatch, useSelector } from 'react-redux';
import Player from './Player';
import Clock from './Clock';
import { type AppDispatch } from '@/app/store';
import { load, type iLoadArg } from '@/features/radio/radioApi';
import { radioSelector } from '@/features/radio/radio';

export default function Landing() {
	console.log('Landing');
	const dispatch = useDispatch<AppDispatch>();
	const radio = useSelector(radioSelector);
	const loadSong = (arg: iLoadArg) => dispatch(load(arg));

	/** IF App NOT Started, Render Start Menu */
	/** IF App Started, Render Application */
	return (
		<main>
			<Clock />
			{radio.ready && <Player />}
			{!radio.ready && (
				<button className='btn' onClick={() => loadSong({})}>
					Start
				</button>
			)}
		</main>
	);
}
