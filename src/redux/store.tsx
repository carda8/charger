import {configureStore} from '@reduxjs/toolkit';
import {authReducer} from './reducers/authReducer';
import {navReducer} from './reducers/navReducer';
import {pathReducer} from './reducers/pathReducer';

const store = configureStore({
  reducer: {authReducer, navReducer, pathReducer},
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
