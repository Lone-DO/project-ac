import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { generateSong } from './radioApi';
import type { RootState } from '@/app/store';

export interface iRadioState {
	error: string | null | Error;
	busy: boolean;
	ready: boolean;
	album: string | null;
	song: string | null;
	geoWeather: string | null;
}

export const initialState: iRadioState = {
	error: null,
	busy: false,
	ready: false,
	album: null,
	song: null,
	geoWeather: null,
};

const radioSlice = createSlice({
	name: 'radio',
	initialState,
	reducers: {
		albumUpdated: (state, action: PayloadAction<string | null>) => {
			state.album = action.payload;
		},
		isReady: (state) => {
			state.ready = true;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(generateSong.fulfilled, (state, action) => {
			state.song = action.payload;
		});
	},
});

export const radioSelector = (state: RootState) => state.radio;
export const useRadioStore = createSelector(radioSelector, (radio) => radio);

export const { albumUpdated } = radioSlice.actions;

export default radioSlice.reducer;
