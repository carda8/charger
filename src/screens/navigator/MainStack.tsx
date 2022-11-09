import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from '../login/Login';
import Account from 'screens/account/Account';
import {commonTypes} from '@types';
import AccountPolicy from '@screens/account/AccountPolicy';
import AccountPolicyDetail from '@screens/account/AccountPolicyDetail';
import AccountFinish from '@screens/account/AccountFinish';
import AccountCarInfo from '@screens/account/AccountCarInfo';
import AccountCarInfoFinish from '@screens/account/AccountCarInfoFinish';
import Home from '@screens/main/Home';
import AroundMain from '@screens/around/AroundMain';
import PathMain from '@screens/path/PathMain';
import RecentMain from '@screens/recent/RecentMain';
import MyPageMain from '@screens/mypage/MyPageMain';
import MyPageConfigPage from '@screens/mypage/MyPageConfigPage';
import MyPageMyCharger from '@screens/mypage/MyPageMyCharger';
import MyPagePolicy from '@screens/mypage/MyPagePolicy';
import MyPageInfo from '@screens/mypage/MyPageInfo';
import MyPageRetire from '@screens/mypage/MyPageRetire';
import AroundFilter from '@screens/around/AroundFilter';
import SearchMain from '@screens/search/SearchMain';
import PathSearchMain from '@screens/search/PathSearchMain';
import FavStationMain from '@screens/favStation/FavStationMain';
import HomeMain from '@screens/home/HomeMain';
import Notification from '@screens/main/Notification';
import HomeSearch from '@screens/home/HomeSearch';
import HomePostCode from '@screens/home/HomePostCode';
import StationDetailMain from '@screens/stationDetail/StationDetailMain';
import StationReportPage from '@screens/stationDetail/StationReportPage';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import NotificationDetail from '@screens/main/NotificationDetail';

const Stack = createNativeStackNavigator<commonTypes.RootStackParamList>();

const MainStack = () => {
  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{flex: 1}}>
        <BottomSheetModalProvider>
          <Stack.Navigator
            screenOptions={{headerShown: false, animation: 'default'}}
            initialRouteName={'Login'}>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{animation: 'slide_from_right'}}
            />
            {/* 약관, 계정연동, 차량 등록 */}

            {/* 계정 연동 */}
            <Stack.Screen
              name="Account"
              component={Account}
              options={{animation: 'slide_from_right'}}
            />
            {/* 이용 약관 */}
            <Stack.Screen name="AccountPolicy" component={AccountPolicy} />
            {/* 이용 약관 디테일 */}
            <Stack.Screen
              name="AccountPolicyDetail"
              component={AccountPolicyDetail}
              options={{animation: 'slide_from_bottom'}}
            />
            {/* 계정 연동 완료 */}
            <Stack.Screen name="AccountFinish" component={AccountFinish} />
            {/* 차량 등록 */}
            <Stack.Screen name="AccountCarInfo" component={AccountCarInfo} />
            {/* 차량 등록 완료 */}
            <Stack.Screen
              name="AccountCarInfoFinish"
              component={AccountCarInfoFinish}
            />

            {/* 홈 */}
            {/* 메인 */}
            <Stack.Screen name="Home" component={Home} />
            {/* 알림  */}
            <Stack.Screen name="Notification" component={Notification} />
            {/* 알림 상세 */}
            <Stack.Screen
              name="NotificationDetail"
              component={NotificationDetail}
            />
            {/* 충전소 상세 보기 */}
            <Stack.Screen
              name="StationDetailMain"
              component={StationDetailMain}
            />
            {/* 충전소 상세 고장 제보 */}
            <Stack.Screen
              name="StationReportPage"
              component={StationReportPage}
            />

            {/* 내 주변 검색 */}
            <Stack.Screen name="SearchMain" component={SearchMain} />
            {/* 경로 검색 */}
            <Stack.Screen name="PathSearchMain" component={PathSearchMain} />
            {/* 집으로 안내 */}
            <Stack.Screen name="HomeMain" component={HomeMain} />
            {/* 집 설정 */}
            <Stack.Screen name="HomeSearch" component={HomeSearch} />
            {/* 집 주소 검색(다음 우편 주소) */}
            <Stack.Screen name="HomePostCode" component={HomePostCode} />
            {/* 즐겨찾는 충전소*/}
            <Stack.Screen name="FavStationMain" component={FavStationMain} />

            {/* 내 주변 */}
            <Stack.Screen name="AroundMain" component={AroundMain} />
            <Stack.Screen name="AroundFilter" component={AroundFilter} />

            {/* 경로 */}
            <Stack.Screen name="PathMain" component={PathMain} />
            {/* 최근 충전 */}
            <Stack.Screen name="RecentMain" component={RecentMain} />
            {/* 마이페이지 */}
            <Stack.Screen name="MyPageMain" component={MyPageMain} />
            {/* 마이페이지 앱 설정 */}
            <Stack.Screen
              name="MyPageConfigPage"
              component={MyPageConfigPage}
            />
            {/* 마이페이지 마이차저 설정 */}
            <Stack.Screen name="MyPageMyCharger" component={MyPageMyCharger} />
            {/* 마이페이지 약관 */}
            <Stack.Screen name="MyPagePolicy" component={MyPagePolicy} />
            {/* 마이페이지 서비스 소개 */}
            <Stack.Screen name="MyPageInfo" component={MyPageInfo} />
            {/* 마이페이지 계정 탈퇴 완료 */}
            <Stack.Screen name="MyPageRetire" component={MyPageRetire} />
          </Stack.Navigator>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
};

export default MainStack;
