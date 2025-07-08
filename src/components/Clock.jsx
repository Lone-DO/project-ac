import React, { useState, useMemo } from 'react';
import Audio from './Audio';

function Clock() {
	const [isLoaded, setLoaded] = useState(false);
	const [date, setDate] = useState(new Date());
	const prepend = (value) => (value = value < 10 ? `0${value}` : value);

	const period = useMemo(() => (date.getHours() < 12 ? 'AM' : 'PM'), [date]);
	const hours = useMemo(
		() =>
			prepend(
				date.getHours() > 12 ? (date.getHours() - 12).toString() : date.getHours().toString(),
			),
		[date],
	);
	const minutes = useMemo(() => prepend(date.getMinutes().toString()), [date]);
	const seconds = useMemo(() => prepend(date.getSeconds().toString()), [date]);

	let interval;

	function timer() {
		clearInterval(interval);
		interval = setInterval(() => {
			setDate(new Date());
			if (!isLoaded) setLoaded(true);
		}, 1000);
	}
	timer();
	return (
		<main>
			<Audio key='musicPlayer' isLoaded={isLoaded} time={{ period, hours, minutes, seconds }} />
		</main>
	);
}

export default Clock;
