import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
// types
import Snackbar from 'types/snackbar'


const RefEvent: number[] = [];


/* 
	Thunks
*/
export const newSnackbar = createAsyncThunk(
	'snackbar/newSnackbar',
	async (
		{ text, type }: SnackbarState, 
		{ dispatch }
	) => {
		if(RefEvent.length !== 0) {
			let event = RefEvent.shift();
			clearTimeout(event);
		}
		dispatch(SnackbarSlice.actions.deleteSnackbar());
		await setTimeout(function() {
			dispatch(SnackbarSlice.actions.appendSnackbar({ text, type: type ? type: "INFO" }));
			let event = window.setTimeout(function() {
				dispatch(SnackbarSlice.actions.deleteSnackbar());
			}, 4000);
			RefEvent.push(event);
		}, 50);
	}
);

/* 
	Initial State
*/

const initialState: SnackbarState = {
	text: "",
	type: "INFO"
}


/* 
	Slice
*/
const SnackbarSlice = createSlice({
	name: 'snackbar',
	initialState,
	reducers: {
		/** 스낵바 갱신 @dispatch */
		appendSnackbar(state, action: PayloadAction<SnackbarState>) {
			state.text = action.payload.text;
			state.type = action.payload.type;
		},
		/** 스낵바 초기화 @dispatch */
		deleteSnackbar(state) {
			state.text = "";
			state.type = "INFO"
		}
	}
});


export interface SnackbarState {
	text: string;
	type: Snackbar;
}

export const {
	appendSnackbar,
	deleteSnackbar
} = SnackbarSlice.actions

export default SnackbarSlice.reducer