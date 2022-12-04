import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import GlobalStyles from 'styles/GlobalStyles';
import Header from '@components/Header';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  Image,
} from 'react-native';
import FontList from 'constants/FontList';
import BottomButton from '@components/BottomButton';
import ServiceString from '@components/ServiceString';
import routertype from '@router/routertype';

const Account = () => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  return (
    <SafeAreaView style={{...GlobalStyles.safeAreaStyle}}>
      <Header title="계정연동을 진행해주세요" goBack backTitle="취소" />
      <View style={{paddingHorizontal: 16, flex: 1}}>
        <ServiceString />
        <View style={{marginTop: 40}}>
          <Text
            style={{
              ...styles.title,
            }}>
            이름
          </Text>
          <TextInput
            placeholder="이름을 입력해주세요"
            style={{
              ...styles.input,
              marginTop: 8,
            }}
          />

          <View style={{marginTop: 27}}>
            <Text
              style={{
                ...styles.title,
              }}>
              휴대폰 인증
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 8,
              }}>
              <View style={{flex: 1, marginRight: 9}}>
                <TextInput
                  placeholder="휴대폰 번호를 -없이 입력하세요"
                  style={{
                    ...styles.input,
                  }}
                />
              </View>
              {/* Send Button */}
              <Pressable style={{...styles.btnCheck}}>
                <Text
                  style={{
                    fontFamily: FontList.PretendardRegular,
                    color: '#BDBDBD',
                  }}>
                  확인
                </Text>
              </Pressable>
            </View>
            {/* Sended String */}
            <View style={{marginTop: 3}}>
              <Text
                style={{
                  fontFamily: FontList.PretendardRegular,
                  fontSize: 13,
                  color: 'black',
                }}>
                입력하신 휴대폰 번호로 인증번호가 발송되었습니다
              </Text>
            </View>
          </View>

          <View style={{marginTop: 12}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 8,
              }}>
              <View style={{flex: 1, marginRight: 9}}>
                <TextInput
                  placeholder="인증번호입력"
                  style={{
                    ...styles.input,
                  }}
                />
              </View>
              {/* Send Button */}
              <Pressable style={{...styles.btnCheck}}>
                <Text
                  style={{
                    fontFamily: FontList.PretendardRegular,
                    color: '#BDBDBD',
                  }}>
                  확인
                </Text>
              </Pressable>
            </View>
            <View
              style={{
                marginTop: 3,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={require('@assets/warn_code.png')}
                style={{width: 16, height: 16, marginRight: 4}}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontFamily: FontList.PretendardRegular,
                  fontSize: 13,
                  color: '#EC1C24',
                }}>
                인증번호가 유효하지 않습니다
              </Text>
            </View>
          </View>
        </View>
        <BottomButton text="다음" screen={routertype.AccountPolicy} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: FontList.PretendardRegular,
    fontSize: 16,
  },
  btnCheck: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    width: 81,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 5,
    paddingHorizontal: 16,
    height: 48,
  },
});

export default Account;
