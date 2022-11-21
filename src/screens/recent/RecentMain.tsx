import {View, Text, ListRenderItem} from 'react-native';
import React, {useEffect, useState} from 'react';
import BottomNav from '@components/BottomNav';
import {SafeAreaView} from 'react-native-safe-area-context';
import GlobalStyles from 'styles/GlobalStyles';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {setBottomIdx} from 'redux/reducers/navReducer';
import Header from '@components/Header';
import HeaderCenter from '@components/HeaderCenter';
import {FlatList} from 'react-native-gesture-handler';
import StationListItem from '@screens/around/Components/StationListItem';
import RecentMainItem from './components/RecentMainItem';
import {RootState} from 'redux/store';

const RecentMain = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const {userInfo} = useSelector((state: RootState) => state.authReducer);
  const [recent, setRecent] = useState<any>();

  const _getHistory = () => {
    console.log('userinfo', userInfo);
    if (userInfo?.histories?.length > 0) {
      const temp = [...userInfo?.histories].reverse();
      setRecent(temp);
    }
  };

  useEffect(() => {
    if (isFocused) {
      dispatch(setBottomIdx(3));
    }
  }, [isFocused]);

  useEffect(() => {
    _getHistory();
  }, []);

  const renderItem: ListRenderItem<any> = item => {
    return (
      <RecentMainItem
        item={item.item}
        index={item.index}
        recentData={recent}
        setRecentData={setRecent}
      />
    );
  };

  return (
    <SafeAreaView style={{...GlobalStyles.safeAreaStyle}}>
      <HeaderCenter title="최근 충전소" />
      <FlatList
        data={recent}
        ListEmptyComponent={
          <View style={{margin: 16, alignItems: 'center'}}>
            <Text style={{fontSize: 16, color: '#959595'}}>
              최근 충전소가 없습니다
            </Text>
          </View>
        }
        keyExtractor={(item, index) => String(index)}
        renderItem={item => renderItem(item)}
        style={{marginBottom: 60}}
      />
      <BottomNav />
    </SafeAreaView>
  );
};

export default RecentMain;
