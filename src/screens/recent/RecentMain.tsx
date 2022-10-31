import {View, Text, ListRenderItem} from 'react-native';
import React, {useEffect} from 'react';
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
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 23, 4];
  useEffect(() => {
    if (isFocused) {
      dispatch(setBottomIdx(3));
    }
  }, [isFocused]);

  const renderItem: ListRenderItem<any> = item => {
    return (
      <View>
        <RecentMainItem item={item} />
      </View>
    );
  };

  return (
    <SafeAreaView style={{...GlobalStyles.safeAreaStyle}}>
      <HeaderCenter title="최근 충전소" />
      <FlatList
        data={data}
        keyExtractor={(item, index) => String(index)}
        renderItem={item => renderItem(item)}
        style={{marginBottom: 60}}
      />
      <BottomNav />
    </SafeAreaView>
  );
};

export default RecentMain;
