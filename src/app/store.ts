import { configureStore } from '@reduxjs/toolkit';
import geolocatorReducer from '@/features/geolocator/geolocator';
// import timer from '@/features/timer';

export const store = configureStore({
	reducer: {
		// time,
		geolocator: geolocatorReducer,
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
