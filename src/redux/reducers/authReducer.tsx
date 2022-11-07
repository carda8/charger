import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface userInfo {
  id?: string;
  name?: string;
  favorites?: string[];
  histories?: string[];
  car_brand?: string;
  car_model?: string;
  chgerType?: string[];
}

interface initialState {
  userInfo?: userInfo;
  autoLogin?: false;
  fcmToken?: string;
  isGuest?: false;
}

const initialState: initialState = {
  userInfo: {
    id: '',
    name: '',
    favorites: [''],
    histories: [''],
    car_brand: '',
    car_model: '',
    chgerType: [''],
  },
  autoLogin: false,
  fcmToken: '',
  isGuest: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<initialState>) => {
      state.userInfo = action.payload.userInfo;
    },
    setFcmToken: (state, action) => {
      state.fcmToken = action.payload;
    },
    setAutoLogin: (state, action) => {
      state.autoLogin = action.payload;
    },
    setIsGuest: (state, action) => {
      state.isGuest = action.payload;
    },
  },
});

const {actions, reducer} = authSlice;
export const {setUserInfo, setFcmToken, setAutoLogin, setIsGuest} = actions;
export const authReducer = reducer;
