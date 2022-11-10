import {View, Text, ListRenderItem} from 'react-native';
import React, {useEffect, useState} from 'react';
import BottomNav from '@components/BottomNav';
import {SafeAreaView} from 'react-native-safe-area-context';
import GlobalStyles from 'styles/GlobalStyles';
import {useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {setBottomIdx} from 'redux/reducers/navReducer';
import Header from '@components/Header';
import HeaderCenter from '@components/HeaderCenter';
import {FlatList} from 'react-native-gesture-handler';
import StationListItem from '@screens/around/Components/StationListItem';
import RecentMainItem from './components/RecentMainItem';

const RecentMain = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [recent, setRecent] = useState([
    '선릉역',
    '강남역 1번 출구',
    '서면역',
    '강남역 12번 출구',
    '강남역 12번 출구 ',
    '코스트코',
    '트레이더스',
    '이케아',
    '홈플러스',
    '한화포레나 3단지',
  ]);
  useEffect(() => {
    if (isFocused) {
      dispatch(setBottomIdx(3));
    }
  }, [isFocused]);

  const renderItem: ListRenderItem<any> = item => {
    return (
      <View>
        <RecentMainItem
          item={item.item}
          index={item.index}
          recentData={recent}
          setRecentData={setRecent}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={{...GlobalStyles.safeAreaStyle}}>
      <HeaderCenter title="최근 충전소" />
      <FlatList
        data={recent}
        keyExtractor={(item, index) => String(index)}
        renderItem={item => renderItem(item)}
        style={{marginBottom: 60}}
      />
      <BottomNav />
    </SafeAreaView>
  );
};

export default RecentMain;
