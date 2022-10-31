import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import GlobalStyles from 'styles/GlobalStyles';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {commonTypes} from '@types';
import Header from '@components/Header';

const AccountPolicyDetail = () => {
  const navi = useNavigation<commonTypes.navi>();
  const route =
    useRoute<RouteProp<commonTypes.RootStackParamList, 'AccountPolicyDetail'>>()
      .params?.target;

  return (
    <SafeAreaView style={{...GlobalStyles.safeAreaStyle}}>
      <Header title={'약관동의'} goBack backTitle="닫기" />
      <Text>{route}</Text>
    </SafeAreaView>
  );
};

export default AccountPolicyDetail;
