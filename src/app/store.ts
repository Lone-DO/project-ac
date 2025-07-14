import { configureStore } from '@reduxjs/toolkit';
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

export default store;
