import {createSlice, PayloadAction} from '@reduxjs/toolkit';
interface chargers {
  chgerId: string;
  chgerType: string;
  chgerTypeInfo: string;
  lastTedt: string;
  lastTsdt: string;
  nowTsdt: string;
  stat: string;
  statInfo: string;
  statUpdDt: string;
}

interface loaction {
  lat: number;
  lon: number;
}

interface aroundKeyData {
  addr?: string;
  bnm?: string;
  busiCall?: string;
  busiId?: string;
  busiNm?: string;
  chargers?: chargers[];
  delDetail?: string;
  delYn?: string;
  detailLocation?: string;
  kind?: string;
  kindDetail?: string;
  limitDetail?: string;
  limitYn?: string;
  location?: loaction | undefined;
  method?: string;
  note?: string;
  output?: string;
  parkingFree?: string;
  statId?: string;
  statNm?: string;
  useTime?: string;
  zcode?: string;
  zscode?: string;
  name?: string;
  address?: string;
}
interface filter {
  canUse?: any;
  speed?: any;
  freePark?: any;
  company?: any;
  chgerType?: any;
}

interface aroundInit {
  aroundKey: string;
  aroundKeyData: aroundKeyData | undefined;
  filter: filter;
}

const initialState: aroundInit = {
  aroundKey: '',
  aroundKeyData: {
    addr: '',
    bnm: '',
    busiCall: '',
    busiId: '',
    busiNm: '',
    chargers: [],
    delDetail: '',
    delYn: '',
    detailLocation: '',
    kind: '',
    kindDetail: '',
    limitDetail: '',
    limitYn: '',
    location: undefined,
    method: '',
    note: '',
    output: '',
    parkingFree: '',
    statId: '',
    statNm: '',
    useTime: '',
    zcode: '',
    zscode: '',
  },
  filter: {
    canUse: '',
    speed: '',
    freePark: '',
    company: '',
    chgerType: '',
  },
};

const aroundSlice = createSlice({
  name: 'around',
  // path : 경로 입력된 값 출발 / 도착지 저장됨
  // goal 선택시 골 저장됨
  initialState,
  reducers: {
    setAroundKey: (state, action: PayloadAction<aroundInit>) => {
      state.aroundKey = action.payload.aroundKey;
    },
    removeAroundKey: state => {
      state.aroundKey = '';
    },
    setAroundKeyData: (
      state,
      action: PayloadAction<aroundKeyData | undefined>,
    ) => {
      state.aroundKeyData = action.payload;
    },
    setFilter: (state, action: PayloadAction<filter>) => {
      state.filter = action.payload;
    },
  },
});

const {actions, reducer} = aroundSlice;
export const {setAroundKey, removeAroundKey, setAroundKeyData, setFilter} =
  actions;
export const aroundReducer = reducer;
