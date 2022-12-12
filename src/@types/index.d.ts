import {NativeStackNavigationProp} from '@react-navigation/native-stack';

declare module commonTypes {
  type item = {
    addr?: string;
    statNm?: string;
    parkingFree?: boolean;
  };
  type userAddr = {
    address: string;
    name: string;
    location: {
      lon: number;
      lat: number;
    };
  };
  //Stack Navigation Types
  type RootStackParamList = {
    Login: undefined;
    Account: undefined;
    AccountPolicy: {snsType: string};
    AccountPolicyDetail: {target?: string} | undefined;
    AccountFinish: undefined;
    AccountCarInfo: undefined;
    AccountCarInfoFinish: undefined;

    Home: undefined;
    Notification: undefined;
    NotificationDetail: undefined;
    StationDetailMain: {item?: any} | undefined;
    StationReportPage: undefined;

    SearchMain: undefined;
    PathSearchMain:
      | undefined
      | {
          setCenter: any;
          startBottomRef: React.RefObject<BottomSheetModalMethods>;
          goalBottomRef: React.RefObject<BottomSheetModalMethods>;
          userStarRef: React.RefObject<BottomSheetModalMethods>;
        };

    HomeMain: {addr?: userAddr} | undefined;
    HomeSearch: {addr?: string} | undefined;
    HomePostCode: undefined;

    FavStationMain: undefined;

    AroundMain: {res?: any[]; isFavorite?: boolean} | undefined;
    AroundFilter: undefined;

    PathMain: {item?: item; goal?: string; start?: string} | undefined;
    RecentMain: undefined;

    MyPageMain: undefined;
    MyPageConfigPage: undefined;
    MyPageMyCharger: undefined;
    MyPagePolicy: undefined;
    MyPageInfo: undefined;
    MyPageRetire: undefined;

    PolicyPersonal: undefined;
    PolicyLocation: undefined;
    PolicyUse: undefined;
  };
  type navi = NativeStackNavigationProp<RootStackParamList>;

  type RootApiType = {
    postAruondStation: stirng;
  };

  type saveUserDB = {
    user_id?: string;
    name?: string;
    car_brand?: string;
    car_model?: string;
    chgerType?: string[];
    car_image_url?: string;
  };
  // export namespace helloo {
  //   type hello = 'hi';
  // }
}
