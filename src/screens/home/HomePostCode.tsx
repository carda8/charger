import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import GlobalStyles from 'styles/GlobalStyles';
import Postcode from '@actbase/react-daum-postcode';
import {useNavigation} from '@react-navigation/native';
import {commonTypes} from '@types';

const HomePostCode = () => {
  const nav = useNavigation<commonTypes.navi>();

  return (
    <SafeAreaView style={{...GlobalStyles.safeAreaStyle}}>
      <Postcode
        style={{flex: 1}}
        jsOptions={{animation: true}}
        onSelected={data => {
          console.log('data', data);
          nav.navigate('HomeSearch', {
            addr: data.roadAddress ? data.roadAddress : data.autoRoadAddress,
          });
        }}
        onError={err => console.warn(err)}
      />
    </SafeAreaView>
  );
};

export default HomePostCode;
