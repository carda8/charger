import {configureStore} from '@reduxjs/toolkit';
import {aroundReducer} from './reducers/aroundReducer';
import {authReducer} from './reducers/authReducer';
import {locationReducer} from './reducers/locationReducer';
import {navReducer} from './reducers/navReducer';
import {pathReducer} from './reducers/pathReducer';

const store = configureStore({
  reducer: {
    authReducer,
    navReducer,
    pathReducer,
    locationReducer,
    aroundReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
