import {View, Text, Image, Pressable} from 'react-native';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import GlobalStyles from 'styles/GlobalStyles';
import BottomNav from '@components/BottomNav';
import {useDispatch} from 'react-redux';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {setBottomIdx} from 'redux/reducers/navReducer';
import Header from '@components/Header';
import HeaderCenter from '@components/HeaderCenter';
import FontList from 'constants/FontList';
import {_getHeight, _getWidth} from 'constants/utils';
import {commonTypes} from '@types';

const MyPagePolicy = () => {
  const nav = useNavigation<commonTypes.navi>();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const myPageItems = [
    '개인정보 수집 및 이용 동의',
    '위치정보 수집 및 이용 동의',
    '서비스 이용 동의',
  ];

  const _route = (idx: number) => {
    switch (idx) {
      case 0:
        return nav.navigate('PolicyPersonal');
      case 1:
        return nav.navigate('PolicyLocation');
      case 2:
        return nav.navigate('PolicyUse');
      default:
        return;
    }
  };

  useEffect(() => {
    if (isFocused) {
      dispatch(setBottomIdx(4));
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={{...GlobalStyles.safeAreaStyle}}>
      <View style={{flex: 1}}>
        <HeaderCenter title="서비스 이용 동의" leftBack />
        <View style={{paddingLeft: 16, paddingRight: 21}}>
          {myPageItems.map((item, idx) => (
            <Pressable
              key={idx}
              onPress={() => {
                _route(idx);
              }}
              style={{
                paddingVertical: 20,
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  fontFamily: FontList.PretendardMedium,
                  fontSize: 17,
                  color: 'black',
                }}>
                {item}
              </Text>
              <Image
                source={require('@assets/mypage_arrow.png')}
                style={{width: _getWidth(8), height: _getHeight(16)}}
                resizeMode="contain"
              />
            </Pressable>
          ))}
        </View>
      </View>
      <BottomNav />
    </SafeAreaView>
  );
};

export default MyPagePolicy;
