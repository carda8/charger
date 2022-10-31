import {createSlice} from '@reduxjs/toolkit';

const navSlice = createSlice({
  name: 'auth',
  initialState: {bottomIdx: 0},
  reducers: {
    setBottomIdx: (state, action) => {
      state.bottomIdx = action.payload;
    },
  },
});

const {actions, reducer} = navSlice;
export const {setBottomIdx} = actions;
export const navReducer = reducer;
