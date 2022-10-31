import {createSlice} from '@reduxjs/toolkit';

const pathSlice = createSlice({
  name: 'auth',
  initialState: {goal: false},
  reducers: {
    setGoal: (state, action) => {
      state.goal = action.payload;
    },
    removeGodal: (state, action) => {
      state.goal = action.payload;
    },
  },
});

const {actions, reducer} = pathSlice;
export const {setGoal, removeGodal} = actions;
export const pathReducer = reducer;
