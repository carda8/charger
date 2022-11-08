import {NativeStackNavigationProp} from '@react-navigation/native-stack';

declare module commonTypes {
  type item = {
    addr?: string;
    statNm?: string;
    parkingFree?: boolean;
  };
  //Stack Navigation Types
  type RootStackParamList = {
    Login: undefined;
    Account: undefined;
    AccountPolicy: undefined;
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
    PathSearchMain: undefined;

    HomeMain: {addr?: string} | undefined;
    HomeSearch: {addr?: string} | undefined;
    HomePostCode: undefined;

    FavStationMain: undefined;

    AroundMain: {res?: any[]} | undefined;
    AroundFilter: undefined;

    PathMain: {item?: item; goal?: string; start?: string} | undefined;
    RecentMain: undefined;

    MyPageMain: undefined;
    MyPageConfigPage: undefined;
    MyPageMyCharger: undefined;
    MyPagePolicy: undefined;
    MyPageInfo: undefined;
    MyPageRetire: undefined;
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
  };
  // export namespace helloo {
  //   type hello = 'hi';
  // }
}
