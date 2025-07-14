import { createSlice } from '@reduxjs/toolkit';
import { sync } from './timerApi';

export const prepend = (str: string) => (str.length < 2 ? `0${str}` : str);

export interface iTimerState {
	ready: boolean;
	busy: boolean;
	error: string | null | Error;
	/** General */
	/** computed */
	hours: string | null;
	period: string | null;
	minutes: string | null;
	imgSource: string | null;
	prettyName: string | null;
}

export const initialState: iTimerState = {
	error: null,
	ready: false,
	busy: false,
	/** general */
	/** computed */
	hours: null,
	period: null,
	minutes: null,
	imgSource: null,
	prettyName: null,
};

const timerSlice = createSlice({
	name: 'timer',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(sync.fulfilled, (state) => {
			const date = new Date();
			const hoursRaw = date.getHours();
			const hoursAdjusted = String(hoursRaw - (hoursRaw > 12 ? 12 : 0));

			state.period = hoursRaw < 12 ? 'AM' : 'PM';
			state.minutes = prepend(date.getMinutes().toString());
			state.hours = prepend(hoursAdjusted);
			state.imgSource = `/images/AC_App/Timeline/(${prepend(String(hoursRaw))}00).png`;
			let prettyName = `${hoursAdjusted}${state.period}`;
			if (hoursRaw === 0) prettyName = 'Midnight';
			else if (hoursRaw === 12) prettyName = 'Noon';
			state.prettyName = prettyName;
			state.ready = true;
		});
	},
});

export default timerSlice.reducer;
