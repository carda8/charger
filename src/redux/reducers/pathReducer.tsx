import {createSlice} from '@reduxjs/toolkit';
interface pathData {
  address: string;
  location: {lat: number; lon: number};
  name: string;
}

interface init {
  keywordList: {data: any[]; focus: boolean};
  startData?: pathData;
  goalData?: pathData;
  lastRef: string;
  isGoalFinish: boolean;
  isStartFinish: boolean;
  isSwitch: boolean;
  recomendStationData: string;
  recoIndex: string;
  isHome: boolean;
  inputStart: string;
  inputGoal: string;
}

const initialState: init = {
  keywordList: {data: [], focus: true},
  lastRef: '',
  startData: undefined,
  goalData: undefined,
  isGoalFinish: false,
  isStartFinish: false,
  isSwitch: false,
  recomendStationData: '',
  recoIndex: '',
  isHome: false,
  inputStart: '',
  inputGoal: '',
};

const pathSlice = createSlice({
  name: 'path',
  initialState,
  reducers: {
    setKeywordList: (state, actions) => {
      state.keywordList = actions.payload;
    },
    setRecomendStationData: (state, actions) => {
      state.recomendStationData = actions.payload;
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
    switchPosition: state => {
      const copyStart = state.startData;
      const copyGoal = state.goalData;

      const copyStartTemp = state.inputStart;
      const copyGoalTemp = state.inputGoal;

      state.isSwitch = true;

      state.inputStart = copyGoalTemp;
      state.inputGoal = copyStartTemp;

      state.startData = copyGoal;
      state.goalData = copyStart;
    },
    setRecoIndex: (state, action) => {
      state.recoIndex = action.payload;
    },
    setIsHoem: (state, action) => {
      state.isHome = action.payload;
    },
    setInputStart: (state, action) => {
      state.inputStart = action.payload;
    },
    setInputGoal: (state, action) => {
      state.inputGoal = action.payload;
    },
    resetPath: state => {
      state.goalData = undefined;
      state.startData = undefined;
      state.keywordList = {data: [], focus: false};
      state.lastRef = '';
      state.isStartFinish = false;
      state.isGoalFinish = false;
      state.recomendStationData = '';
      state.recoIndex = '';
      state.inputGoal = '';
      state.inputStart = '';
    },
  },
});

const {actions, reducer} = pathSlice;
export const {
  setInputGoal,
  setInputStart,
  setKeywordList,
  setLastRef,
  setIsGoalFinish,
  setIsStartFinish,
  setGoalData,
  setStartData,
  switchPosition,
  setRecomendStationData,
  setIsHoem,
  resetPath,
  setRecoIndex,
} = actions;
export const pathReducer = reducer;
