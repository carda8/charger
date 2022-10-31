import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import GlobalStyles from 'styles/GlobalStyles';
import HeaderCenter from '@components/HeaderCenter';

const MyPageInfo = () => {
  return (
    <SafeAreaView style={{...GlobalStyles.safeAreaStyle}}>
      <HeaderCenter title="서비스 소개" leftBack />
      <ScrollView contentContainerStyle={{paddingHorizontal: 16}}>
        <Text>서비스 소개 내용...</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyPageInfo;
