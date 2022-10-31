import {View, Text} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {commonTypes} from '@types';
import {SafeAreaView} from 'react-native-safe-area-context';
import GlobalStyles from 'styles/GlobalStyles';
import BottomButton from '@components/BottomButton';
import routertype from '@router/routertype';
import FontList from 'constants/FontList';

const MyPageRetire = () => {
  //   const nav = useNavigation<commonTypes.navi>();
  return (
    <SafeAreaView style={{...GlobalStyles.safeAreaStyle}}>
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Text
          style={{
            fontFamily: FontList.PretendardBold,
            fontSize: 24,
            color: '#333333',
          }}>
          계정 탈퇴 완료
        </Text>
        <View style={{marginTop: 50}}>
          <Text
            style={{
              fontFamily: FontList.PretendardMedium,
              fontSize: 18,
              color: '#333333',
            }}>
            다시 볼날을 기다리고있을게요!
          </Text>
        </View>
      </View>
      <BottomButton
        screen={routertype.Login}
        text="확인"
        style={{marginHorizontal: 16}}
      />
    </SafeAreaView>
  );
};

export default MyPageRetire;
