import {View, Text, Pressable, Image} from 'react-native';
import React from 'react';
import SnsList from 'constants/SnsList';
import {commonTypes} from '@types';
import {_getHeight, _getWidth} from 'constants/utils';

interface props {
  text: string;
  snsType: string;
  navigation: commonTypes.navi;
  idx: number;
}

const SnsButton = ({text, snsType, navigation, idx}: props) => {
  const _getColor = (type: string) => {
    if (type === SnsList.apple || type === SnsList.naver) return 'white';
    if (type === SnsList.kakao) return '#392020';
    return '#040404';
  };
  const _getBGcolor = (type: string) => {
    if (type === SnsList.naver) return '#5AC466';
    if (type === SnsList.kakao) return '#FAE64C';
    if (type === SnsList.google) return '#F0F0F0';
    if (type === SnsList.apple) return '#040404';
  };
  const logo = [
    require('@assets/naver.png'),
    require('@assets/kakao.png'),
    require('@assets/google.png'),
    require('@assets/apple.png'),
  ];

  const _onPressLogin = (snsType: string) => {};

  return (
    <>
      <Pressable
        onPress={() => navigation.navigate('Account')}
        style={{
          height: 46,
          marginHorizontal: 24,
          marginBottom: snsType !== SnsList.apple ? 16 : 0,
          borderRadius: 61,
          backgroundColor: _getBGcolor(snsType),
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <Image
          source={logo[idx]}
          style={{
            width: _getWidth(24),
            height: _getHeight(24),
            marginRight: 10,
          }}
          resizeMode="contain"
        />
        <Text
          style={{
            fontWeight: '400',
            fontSize: 16,
            color: _getColor(snsType),
          }}>
          {text}
        </Text>
      </Pressable>
    </>
  );
};

export default SnsButton;
