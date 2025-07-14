import { configureStore, createSelector } from '@reduxjs/toolkit';
import geolocatorReducer from '@/features/geolocator/geolocator';
import timerReducer from '@/features/timer/timer';
import radioReducer from '@/features/radio/radio';
export const store = configureStore({
	reducer: {
		timer: timerReducer,
		geolocator: geolocatorReducer,
		radio: radioReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export type AppThunk<ReturnType = void> = ThunkAction<
// 	ReturnType,
// 	RootState,
// 	unknown,
// 	Action<string>
// >;

export const radioSelector = (state: RootState) => state.radio;
export const timerSelector = (state: RootState) => state.timer;
export const geolocatorSelector = (state: RootState) => state.geolocator;
export const useRadioStore = createSelector(radioSelector, (radio) => radio);
export const useTimerStore = createSelector(timerSelector, (timer) => {
	const { ready, hours, period, minutes, imgSource } = timer;
	return { ready, hours, period, minutes, imgSource };
});
export const useGeoStore = createSelector(geolocatorSelector, (geo) => geo);

export default store;
