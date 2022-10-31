import {View, Text, Pressable, Modal} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import GlobalStyles from 'styles/GlobalStyles';
import FontList from 'constants/FontList';
import BottomButton from '@components/BottomButton';
import {useNavigation} from '@react-navigation/native';
import {commonTypes} from '@types';
import routertype from '@router/routertype';
import FastImage from 'react-native-fast-image';
import {_getHeight, _getWidth} from 'constants/utils';

const AccountFinish = () => {
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
            계정연동 완료
          </Text>
        </View>
        <View style={{marginTop: _getHeight(51)}}>
          <Text
            style={{
              fontFamily: FontList.PretendardRegular,
              fontSize: 18,
              color: '#333333',
              textAlign: 'center',
            }}>
            계정연동이 성공적으로{'\n'} 완료되었습니다!
          </Text>
        </View>
        <FastImage
          source={require('@assets/success_anime.gif')}
          style={{width: _getWidth(316), height: _getHeight(316)}}
          resizeMode="contain"
        />
      </View>
      <BottomButton
        screen={routertype.AccountCarInfo}
        text="확인"
        style={{marginHorizontal: 16}}
      />
    </SafeAreaView>
  );
};

export default AccountFinish;
