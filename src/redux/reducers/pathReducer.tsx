import {createSlice} from '@reduxjs/toolkit';

const pathSlice = createSlice({
  name: 'path',
  initialState: {
    keywordList: [],
    lastRef: '',
    goalData: '',
    startData: '',
    isGoalFinish: false,
    isStartFinish: false,
    isSwitch: false,
  },
  reducers: {
    setKeywordList: (state, actions) => {
      state.keywordList = actions.payload;
    },
    setLastRef: (state, actions) => {
      state.lastRef = actions.payload;
    },
    setGoalData: (state, actions) => {
      state.isSwitch = false;
      state.goalData = actions.payload;
    },
    setStartData: (state, actions) => {
      state.isSwitch = false;
      state.startData = actions.payload;
    },
    setIsGoalFinish: (state, actions) => {
      state.isGoalFinish = actions.payload;
    },
    setIsStartFinish: (state, actions) => {
      state.isStartFinish = actions.payload;
    },
    switchPosition: (state, action) => {
      const copyStart = state.startData;
      const copyGoal = state.goalData;
      state.isSwitch = true;
      state.startData = copyGoal;
      state.goalData = copyStart;
    },
    resetPath: (state, action) => {
      state.goalData = '';
      state.startData = '';
      state.keywordList = [];
      state.lastRef = '';
      state.isStartFinish = false;
      state.isGoalFinish = false;
    },
  },
});

const {actions, reducer} = pathSlice;
export const {
  setKeywordList,
  setLastRef,
  setIsGoalFinish,
  setIsStartFinish,
  setGoalData,
  setStartData,
  switchPosition,
  resetPath,
} = actions;
export const pathReducer = reducer;
