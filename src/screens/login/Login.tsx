import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  Platform,
  Alert,
  BackHandler,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import GlobalStyles from '../../styles/GlobalStyles';
import SnsButton from './SnsButton';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {commonTypes} from '@types';
import SnsList from 'constants/SnsList';
import {_getHeight} from 'constants/utils';

const Login = () => {
  const navigation = useNavigation<commonTypes.navi>();
  const ref = useRef(false);

  useEffect(() => {
    const backAction = () => {
      let timeout;
      if (!ref.current) {
        ToastAndroid.show(
          '한번 더 뒤로가면 앱이 종료됩니다.',
          ToastAndroid.SHORT,
        );
        ref.current = true;

        timeout = setTimeout(() => {
          ref.current = false;
        }, 2000);
      } else {
        clearTimeout(timeout);
        BackHandler.exitApp();
      }

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={{...GlobalStyles.safeAreaStyle}}>
      <ScrollView>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: _getHeight(165),
            marginBottom: _getHeight(74),
          }}>
          <Image source={require('~/assets/logo.png')} resizeMode={'contain'} />
        </View>
        {SnsList.snsList.map((item, idx) => (
          <View key={idx}>
            {Platform.OS !== 'ios' && idx !== 3 && (
              <SnsButton
                text={SnsList.snsListText[idx]}
                snsType={item}
                navigation={navigation}
                idx={idx}
              />
            )}
          </View>
        ))}
        <Pressable
          onPress={() => {
            navigation.navigate('Home');
          }}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 14,
          }}>
          <Text style={{fontWeight: '400'}}>먼저 둘러보기</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
