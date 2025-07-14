import { createAsyncThunk } from '@reduxjs/toolkit';
import { type iTimerState } from './timer';

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const sync = createAsyncThunk<number, void, { state: { timer: iTimerState } }>(
	'timer/sync',
	async () => Date.now(),
);
