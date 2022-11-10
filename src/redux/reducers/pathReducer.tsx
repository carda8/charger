import {createSlice} from '@reduxjs/toolkit';

const pathSlice = createSlice({
  name: 'auth',
  // path : 경로 입력된 값 출발 / 도착지 저장됨
  // goal 선택시 골 저장됨
  initialState: {goal: '', start: '서울특별시 중구 태평로2가', path: ''},
  reducers: {
    setGoal: (state, action) => {
      state.goal = action.payload;
    },
    setStart: (state, action) => {
      state.start = action.payload;
    },
    setPath: (state, action) => {
      state.start = action.payload;
    },
    removeGoal: (state, action) => {
      state.goal = action.payload;
    },
    removeStart: (state, action) => {
      state.start = action.payload;
    },
  },
});

const {actions, reducer} = pathSlice;
export const {setGoal, removeGoal, setStart, removeStart, setPath} = actions;
export const pathReducer = reducer;
