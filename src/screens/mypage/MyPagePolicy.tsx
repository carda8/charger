import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import GlobalStyles from 'styles/GlobalStyles';
import HeaderCenter from '@components/HeaderCenter';

const MyPagePolicy = () => {
  return (
    <SafeAreaView style={{...GlobalStyles.safeAreaStyle}}>
      <HeaderCenter title="이용약관 및 정책" leftBack />
      <ScrollView contentContainerStyle={{paddingHorizontal: 16}}>
        <Text>약관 내용...</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyPagePolicy;
