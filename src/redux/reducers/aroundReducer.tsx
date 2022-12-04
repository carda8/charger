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
  speed?: any[];
  freePark?: any[];
  company?: any[];
  chgerType?: any[];
  chgerFree?: any[];
  area?: any[];
  road?: any[];
  pickAll?: boolean;
}

interface aroundInit {
  aroundKey: string;
  aroundKeyData: aroundKeyData | undefined;
  filter: filter;
  isFilterSaved: boolean;
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
    canUse: false,
    speed: [],
    freePark: [],
    company: [],
    chgerType: [],
    chgerFree: [],
    area: [],
    road: [],
    pickAll: false,
  },
  isFilterSaved: false,
};

const aroundSlice = createSlice({
  name: 'around',
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
    setFreePark: (state, action) => {
      let temp = [];
      if (state.filter.freePark?.includes(action.payload)) {
        temp = state.filter.freePark?.filter(item => item !== action.payload);
        state.filter.freePark = temp;
      } else {
        state.filter.freePark?.push(action.payload);
      }
    },
    setChgerFree: (state, action) => {
      let temp = [];
      if (state.filter.chgerFree?.includes(action.payload)) {
        temp = state.filter.chgerFree?.filter(item => item !== action.payload);
        state.filter.chgerFree = temp;
      } else {
        state.filter.chgerFree?.push(action.payload);
      }
    },
    setArea: (state, action) => {
      let temp = [];
      if (state.filter.area?.includes(action.payload)) {
        temp = state.filter.area?.filter(item => item !== action.payload);
        state.filter.area = temp;
      } else {
        state.filter.area?.push(action.payload);
      }
    },
    setRoad: (state, action) => {
      let temp = [];
      if (state.filter.road?.includes(action.payload)) {
        temp = state.filter.road?.filter(item => item !== action.payload);
        state.filter.road = temp;
      } else {
        state.filter.road?.push(action.payload);
      }
    },
    setSpeed: (state, action) => {
      let temp = [];
      if (state.filter.speed?.includes(action.payload)) {
        temp = state.filter.speed?.filter(item => item !== action.payload);
        state.filter.speed = temp;
      } else {
        state.filter.speed?.push(action.payload);
      }
    },
    setCanUse: state => {
      state.filter.canUse = !state.filter.canUse;
    },
    setCompany: (state, action) => {
      let temp = [];
      if (state.filter.company?.includes(action.payload)) {
        temp = state.filter.company?.filter(item => item !== action.payload);
        state.filter.company = temp;
      } else {
        state.filter.company?.push(action.payload);
      }
    },
    setChgerType: (state, action) => {
      let temp = [];
      if (state.filter.chgerType?.includes(action.payload)) {
        temp = state.filter.chgerType?.filter(item => item !== action.payload);
        state.filter.chgerType = temp;
      } else {
        state.filter.chgerType?.push(action.payload);
      }
    },
    setPickall: state => {
      state.filter.company = [];
      state.filter.pickAll = !state.filter.pickAll;
    },
    setIsSaved: state => {
      state.isFilterSaved = true;
    },
    setReset: state => {
      state.filter = {
        canUse: false,
        speed: [],
        freePark: [],
        company: [],
        chgerType: [],
        chgerFree: [],
        area: [],
        road: [],
        pickAll: false,
      };
    },
  },
});

const {actions, reducer} = aroundSlice;
export const {
  setAroundKey,
  removeAroundKey,
  setAroundKeyData,
  setFilter,
  setChgerType,
  setFreePark,
  setChgerFree,
  setArea,
  setRoad,
  setSpeed,
  setCanUse,
  setCompany,
  setPickall,
  setReset,
  setIsSaved,
} = actions;
export const aroundReducer = reducer;
