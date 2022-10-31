import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import GlobalStyles from 'styles/GlobalStyles';
import FontList from 'constants/FontList';
import BottomButton from '@components/BottomButton';
import routertype from '@router/routertype';
import FastImage from 'react-native-fast-image';
import {_getHeight, _getWidth} from 'constants/utils';

const AccountCarInfoFinish = () => {
  return (
    <SafeAreaView style={{...GlobalStyles.safeAreaStyle}}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <View>
          <Text
            style={{
              fontFamily: FontList.PretendardBold,
              fontSize: 24,
              color: '#333333',
              marginTop: 139,
            }}>
            차량등록 완료
          </Text>
        </View>
        <View style={{marginTop: _getHeight(51)}}>
          <Text
            style={{
              fontFamily: FontList.PretendardRegular,
              fontSize: 18,
              color: 'black',
              textAlign: 'center',
            }}>
            {'차량등록이 완료되었습니다.\n마이차저를 이용해주세요'}
          </Text>
        </View>
        <FastImage
          source={require('@assets/success_anime.gif')}
          style={{width: _getWidth(316), height: _getHeight(316)}}
          resizeMode="contain"
        />
      </View>
      <BottomButton
        screen={routertype.Home}
        text="완료"
        style={{marginHorizontal: 16}}
      />
    </SafeAreaView>
  );
};

export default AccountCarInfoFinish;
