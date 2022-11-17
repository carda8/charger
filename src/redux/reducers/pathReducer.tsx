import {createSlice} from '@reduxjs/toolkit';

const pathSlice = createSlice({
  name: 'path',
  // path : 경로 입력된 값 출발 / 도착지 저장됨
  // goal 선택시 골 저장됨
  initialState: {},
  reducers: {},
});

const {actions, reducer} = pathSlice;
export const {} = actions;
export const pathReducer = reducer;
