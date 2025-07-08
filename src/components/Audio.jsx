import React, { Component } from 'react';

import Player from './_player';
import audioData from '@/assets/common/audioData';

class Audio extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hasStarted: false,
			weather: '',
			weatherData: {},
			/** TODO: Stash secrets in .env */
			weatherKey: 'c818f18fb44cfccea6436940f6cea5f8',
			setAlbum: '',
			location: '',
			cords: {},
			prevHour: '',
			unit: 'metric',
			song: '',
			title: '',
		};
		this.loadSong = this.loadSong.bind(this);
		this.loadWeather = this.loadWeather.bind(this);
		this.loadGeolocation = this.loadGeolocation.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	loadSong(playlist = this.state.setAlbum, weather = this.state.weather) {
		let { hours, period } = this.props.time;

		let title =
			hours < 10 && hours.indexOf('0') > -1 ? hours.replace('0', '') + period : hours + period;
		if (title === '12PM') {
			title = 'Noon';
		} else if (hours === '00') {
			title = 'Midnight';
		}

		try {
			const defaultSong = () => {
				this.setState({
					song: audioData.Original.Normal[title],
					title: title,
					weather: 'Normal',
					setAlbum: 'Original',
					prevHour: hours,
					hasStarted: true,
				});
			};

			const setSong = () => {
				this.setState({
					song: audioData[playlist][weather][title],
					title: title,
					weather: weather,
					prevHour: hours,
					setAlbum: playlist,
				});
			};

			if (playlist === '' && !this.state.hasStarted) {
				defaultSong();
			} else if (playlist !== '' && this.state.song !== audioData[playlist][weather][title]) {
				setSong();
			}
		} catch (err) {
			alert(`Issue has occurred while loading Audio... > ${err.message}`);
		}
	}

	handleChange(event) {
		event.preventDefault();
		const { name, value } = event.target;
		this.setState({ [name]: value });
	}

	loadWeather(event, type) {
		try {
			let { weatherKey, location, cords, unit } = this.state;
			let { lat, lon } = cords;
			let apiUrl = '';

			let checkSpam = () => {
				this.setState((prevState) => {
					console.log(prevState.location, location);
				});
				// to be configured later...
				return true;
			};

			if (type === 'search' && checkSpam()) {
				event.preventDefault();
				apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=${weatherKey}`;
			}
			if (type === 'geo' && checkSpam()) {
				apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherKey}`;
			}
			fetch(apiUrl)
				.then((res) => res.json())
				.then((res) => this.setState({ weatherData: res, location: res?.name || '' }))
				.then(() => {
					try {
						let { weatherData, setAlbum } = this.state;
						/** TODO: Add validation for API Error Objects */
						switch (weatherData.weather['0'].main) {
							case 'Rain':
							case 'Thunderstorm':
								return this.loadSong(setAlbum, 'Raining');

							case 'Snow':
								return this.loadSong(setAlbum, 'Winter');
							default:
								return this.loadSong(setAlbum, 'Normal');
						}
					} catch (err) {
						alert('City Not Found, Please try again...', err);
					}
				});
		} catch (err) {
			alert(err.message);
		}
	}

	loadGeolocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(pos) => {
					this.setState({
						cords: {
							lat: pos?.coords?.latitude || 0,
							lon: pos?.coords?.longitude || 0,
						},
					});
					this.loadWeather(Event, 'geo');
				},
				() => {
					alert('Location Denied');
				},
			);
		}
	}

	componentDidUpdate(prevProps) {
		if (this.state.prevHour !== prevProps.time.hours && this.state.hasStarted) {
			this.loadSong();
		}
	}

	renderContent() {
		switch (this.props.isLoaded) {
			case null:
				return;
			case true:
				return (
					<div className='Player'>
						<Player
							props={this.props}
							state={this.state}
							loadSong={this.loadSong}
							loadGeolocation={this.loadGeolocation}
							loadWeather={this.loadWeather}
							handleChange={this.handleChange}
						/>
					</div>
				);

			default:
				return 'Loading Audio...';
		}
	}

	render() {
		return this.renderContent();
	}
}

export default Audio;
