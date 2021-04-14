import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux'
// reducers
import book from 'slices/book'
import snackbar from 'slices/snackbar'

/**
 * 모든 리듀서가 결합된 Root 리듀서
 */
const reducer = combineReducers({
	book,
	snackbar
});

export type RootState = ReturnType<typeof reducer>

/**
 * 공통 Store
 */
const store = configureStore({
	reducer,	
});

export default store