import { createAsyncThunk } from '@reduxjs/toolkit';
import { type iRadioState } from './radio';
import type { RootState } from '@/app/store';
import audioData, { type iAudioData } from '@/assets/common/audioData';

export interface iLoadArg {
	album?: string | null;
	theme?: string | null | void;
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const load = createAsyncThunk<void, iLoadArg | void, { state: { radio: iRadioState } }>(
	'radio/load',
	async (opts, thunkAPI) => {
		const state = thunkAPI.getState();
		try {
			if (!state.radio.ready || (!opts?.album && !opts?.theme)) {
				thunkAPI.dispatch({ type: 'geolocator/setWeather', payload: 'Normal' });
				thunkAPI.dispatch({ type: 'radio/albumUpdated', payload: 'Original' });
				thunkAPI.dispatch({ type: 'radio/isReady' });
			} else {
				if (opts.theme) thunkAPI.dispatch({ type: 'geolocator/setWeather', payload: opts.theme });
				if (opts.album) thunkAPI.dispatch({ type: 'radio/albumUpdated', payload: opts.album });
			}
		} catch (err) {
			thunkAPI.dispatch({ type: 'radio/onError', payload: err });
		} finally {
			/** @ts-expect-error: Undetermined Type Error for non-existent arg */
			await thunkAPI.dispatch(generateSong());
		}
	},
);

export const generateSong = createAsyncThunk<string, { cat?: string }, { state: RootState }>(
	'radio/generateSong',
	async (_, thunkAPI) => {
		const state = thunkAPI.getState();
		const chosenAlbum = (audioData[state.radio.album || ''] || {}) as iAudioData;
		const chosenTheme = (chosenAlbum[state.geolocator.weather || ''] || {}) as iAudioData;
		return chosenTheme[state.timer.prettyName || ''] as string;
	},
);
