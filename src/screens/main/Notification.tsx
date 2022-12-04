import {View, Text, ListRenderItem, Image, Pressable} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import GlobalStyles from 'styles/GlobalStyles';
import HeaderCenter from '@components/HeaderCenter';
import {FlatList} from 'react-native-gesture-handler';
import {_getHeight} from 'constants/utils';
import FontList from 'constants/FontList';
import {useNavigation} from '@react-navigation/native';
import {commonTypes} from '@types';

const Notification = () => {
  const data = [1, 2, 3, 4, 5, 6, 6, 7, 8, 657, 5, 56, 5, 5, 5, 5, 5];
  const nav = useNavigation<commonTypes.navi>();
  const renderItem: ListRenderItem<any> = item => {
    return (
      <Pressable
        onPress={() => {
          nav.navigate('NotificationDetail');
        }}
        style={{
          height: _getHeight(88),
          paddingHorizontal: 16,
          justifyContent: 'center',
          borderTopWidth: 1,
          borderColor: '#F6F6F6',
        }}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginBottom: 8}}>
          <Image
            source={require('@assets/noti_icon.png')}
            style={{width: 12, height: 11, marginRight: 6}}
            resizeMode="contain"
          />
          <Text
            numberOfLines={2}
            style={{fontFamily: FontList.PretendardMedium, color: '#3C3C3C'}}>
            {item.index % 2 === 0
              ? '[공지] 삼성카드 시스템 개선을 위한 서비스 일시중지 안내'
              : '[공지] 충전요금 인상 안내'}
          </Text>
        </View>
        <Text
          style={{
            fontFamily: FontList.PretendardRegular,
            fontSize: 12,
            color: '#959595',
          }}>
          12월 25일
        </Text>
      </Pressable>
    );
  };
  return (
    <SafeAreaView style={{...GlobalStyles.safeAreaStyle}}>
      <HeaderCenter
        title="알림"
        leftBack
        rightBack
        backTitle="닫기"
        backTitleStyle={{fontSize: 16, fontFamily: FontList.PretendardRegular}}
      />
      <FlatList
        data={data}
        keyExtractor={(item, index) => String(index)}
        renderItem={item => renderItem(item)}
      />
    </SafeAreaView>
  );
};

export default Notification;
