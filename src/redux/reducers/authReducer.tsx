import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {commonTypes} from '@types';

interface userInfo {
  id?: string;
  name?: string;
  favorites?: string[];
  histories?: string[];
  car_brand?: string;
  car_model?: string;
  car_image_url?: string;
  chgerType?: string[];
  addressInfo?: commonTypes.userAddr;
}

interface initialState {
  userInfo?: userInfo | undefined;
  autoLogin?: false;
  fcmToken?: string;
  isGuest?: false;
}

const initialState: initialState = {
  userInfo: {
    id: '',
    name: '',
    favorites: [],
    histories: [],
    car_brand: '',
    car_model: '',
    car_image_url: '',
    chgerType: [],
  },
  autoLogin: false,
  fcmToken: '',
  isGuest: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<userInfo>) => {
      state.userInfo = action.payload;
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
    resetUserInfo: state => {
      state.userInfo = undefined;
    },
  },
});

const {actions, reducer} = authSlice;
export const {
  setUserInfo,
  setFcmToken,
  setAutoLogin,
  setIsGuest,
  resetUserInfo,
} = actions;
export const authReducer = reducer;
