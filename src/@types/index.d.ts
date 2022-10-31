import {NativeStackNavigationProp} from '@react-navigation/native-stack';

declare module commonTypes {
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
    StationDetailMain: undefined;
    StationReportPage: undefined;

    SearchMain: undefined;
    PathSearchMain: undefined;

    HomeMain: {addr?: string} | undefined;
    HomeSearch: {addr?: string} | undefined;
    HomePostCode: undefined;

    FavStationMain: undefined;

    AroundMain: undefined;
    AroundFilter: undefined;

    PathMain: {item?: boolean} | undefined;
    RecentMain: undefined;

    MyPageMain: undefined;
    MyPageConfigPage: undefined;
    MyPageMyCharger: undefined;
    MyPagePolicy: undefined;
    MyPageInfo: undefined;
    MyPageRetire: undefined;
  };
  type navi = NativeStackNavigationProp<RootStackParamList>;
  // export namespace helloo {
  //   type hello = 'hi';
  // }
}
