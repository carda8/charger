import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import GlobalStyles from 'styles/GlobalStyles';
import HeaderCenter from '@components/HeaderCenter';
import FontList from 'constants/FontList';
import {ScrollView} from 'react-native-gesture-handler';

const NotificationDetail = () => {
  return (
    <SafeAreaView style={{...GlobalStyles.safeAreaStyle}}>
      <HeaderCenter leftBack />
      <ScrollView>
        <View style={{marginHorizontal: 19}}>
          <View style={{marginTop: 13}}>
            <Text
              style={{
                fontFamily: FontList.PretendardMedium,
                fontSize: 16,
                color: '#3C3C3C',
              }}>
              [공지]충전요금 인상 안내
            </Text>
            <Text
              style={{
                fontFamily: FontList.PretendardRegular,
                lineHeight: 16,
                marginTop: 12,
                marginBottom: 45,
                color: '#959595',
              }}>
              2022-11-05
            </Text>
            <Text
              style={{
                fontFamily: FontList.PretendardRegular,
                lineHeight: 16,
                color: '#3C3C3C',
              }}>
              {`안녕하세요 마이차저입니다.

물가상승으로 인해 GS칼텍스 충전기 충전요금이 아래와 같이 변경되었음을 알려드립니다.

(현재)259원 >> (변경)299원
적용시기: 22년 11월 10일 0시

궁금한 사항은 언제든지 고객센터로 연락주세요

감사합니다`}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationDetail;
