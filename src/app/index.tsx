import { useEffect, useState } from 'react';

import '@/assets/styles/vendor/materialize/materialize.scss';
import './index.scss';

/** Components */
import Landing from '@/components/Clock';
import Header from '@/components/_header';
import Footer from '@/components/_footer';
// import audioData from '@/common/audioData';

import loadingGif from '@/assets/images/loading.gif';

function App() {
	const [isLoaded, setLoaded] = useState(false);
	function init() {
		/** TODO: MLabs was taken down years ago and merged into MongoDB, must rebuild database */
		// 	fetch(
		// 		'https://api.mlab.com/api/1/databases/lone-do/collections/albums?apiKey=9P6rUGDfq5OxFXag9RZYNkk3U2vF6IT0',
		// 	)
		// 		.then((res) => res.json())
		// 		.then((res) => this.setState({ videoData: res, isLoaded: true }));
		setLoaded(true);
	}

	useEffect(() => init(), [isLoaded]);
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
