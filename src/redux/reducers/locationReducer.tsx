import {createSlice, PayloadAction} from '@reduxjs/toolkit';
interface loactionState {
  currentUserLocation: {latitude: number; longitude: number} | undefined;
}
const initialState: loactionState = {
  currentUserLocation: undefined,
};
const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setCurrentUserLocation: (state, action: PayloadAction<loactionState>) => {
      state.currentUserLocation = action.payload.currentUserLocation;
    },
  },
});

const {actions, reducer} = locationSlice;
export const {setCurrentUserLocation} = actions;
export const locationReducer = reducer;
