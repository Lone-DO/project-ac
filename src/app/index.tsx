import { useCallback, useEffect, useRef, useState } from 'react';

import '@/assets/styles/vendor/materialize/materialize.scss';
import './index.scss';

/** Components */
import Landing from '@/components/Landing';
import Header from '@/components/_header';
import Footer from '@/components/_footer';
// import audioData from '@/common/audioData';

import loadingGif from '@/assets/images/loading.gif';
import { useDispatch } from 'react-redux';
import { sync } from '@/features/timer/timerApi';
import type { AppDispatch } from './store';

function App() {
	const isClosed = false;
	const dispatch = useDispatch<AppDispatch>();
	const [isLoaded, setLoaded] = useState(false);

	const debounce = useRef<NodeJS.Timeout | string | number>('');
	/** TODO: ClearTimeout on component closure */
	if (isClosed) {
		clearTimeout(debounce.current);
	}
	const startCycle = useCallback(() => {
		debounce.current = setTimeout(() => {
			dispatch(sync());
			return startCycle();
		}, 3000);
	}, [dispatch]);
	useEffect(() => {
		if (!isLoaded) {
			/** TODO: MLabs was taken down years ago and merged into MongoDB, must rebuild database */
			// 	fetch(
			// 		'https://api.mlab.com/api/1/databases/lone-do/collections/albums?apiKey=9P6rUGDfq5OxFXag9RZYNkk3U2vF6IT0',
			// 	)
			// 		.then((res) => res.json())
			// 		.then((res) => this.setState({ videoData: res, isLoaded: true }));
			setLoaded(true);
			dispatch(sync());
			startCycle();
		}
	}, [dispatch, isLoaded, startCycle]);
	return (
		<div className='App'>
			<div className='App-body ACTunes_body'>
				<Header />
				{!isLoaded && [
					<img key='loadingGif' alt='loading assets gif' src={loadingGif} />,
					<h3 key='loadingTxt'>Loading...</h3>,
				]}
				{isLoaded && [<Landing key='landing' />, <Footer key='footer' />]}
			</div>
		</div>
	);
}

export default App;
