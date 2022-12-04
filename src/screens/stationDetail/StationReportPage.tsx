import {View, Text, Pressable, Image} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import GlobalStyles from 'styles/GlobalStyles';
import HeaderCenter from '@components/HeaderCenter';
import FontList from 'constants/FontList';
import {_getHeight} from 'constants/utils';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import MyModal from '@components/MyModal';
import {useNavigation} from '@react-navigation/native';
import {commonTypes} from '@types';
import NavModal from '@components/NavModal';

const StationReportPage = () => {
  const list = [
    '커넥터연결오류',
    'LCD 이상',
    '통신 미연결',
    '프로그램 오류',
    '차단기 off',
    '기타',
  ];
  const [errNum, setErrNum] = useState<number>();
  const [modal, setModal] = useState(false);
  const nav = useNavigation<commonTypes.navi>();

  return (
    <SafeAreaView style={{...GlobalStyles.safeAreaStyle}}>
      <HeaderCenter
        title="충전소 고장제보"
        leftBack
        rightBack
        backTitle="닫기"
      />
      <ScrollView>
        <View style={{marginHorizontal: 16}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 15.4,
            }}>
            <Image
              source={require('@assets/icon_addr.png')}
              style={{width: 20, height: 20}}
              resizeMode="contain"
            />
            <Text
              style={{
                fontFamily: FontList.PretendardRegular,
                fontSize: 20,
                color: 'black',
              }}>
              판교테크노밸리
            </Text>
          </View>

          <Pressable
            onPress={() => {}}
            style={{
              marginTop: 12,
              height: _getHeight(50),
              borderWidth: 1,
              borderColor: '#D0D0D0',
              borderRadius: 4,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
            }}>
            <Text
              style={{
                fontFamily: FontList.PretendardRegular,
                fontSize: 16,
                lineHeight: 24,
                color: '#79747E',
              }}>
              충전기 번호
            </Text>
            <Image
              source={require('@assets/arrow_report.png')}
              style={{width: 16, height: 8.5}}
              resizeMode="contain"
            />
          </Pressable>

          <View style={{paddingHorizontal: 8, marginTop: 22.8}}>
            {list.map((item, index) => (
              <Pressable
                onPress={() => setErrNum(index)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: index === list.length - 1 ? 9 : _getHeight(24),
                }}>
                <View
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 16 / 2,
                    borderWidth: 1,
                    borderColor: errNum === index ? '#141414' : '#878686',
                    marginRight: 7,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {errNum === index && (
                    <View
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 8 / 2,
                        backgroundColor: '#1479D7',
                      }}></View>
                  )}
                </View>
                <Text
                  style={{
                    fontFamily: FontList.PretendardRegular,
                    fontSize: 16,
                    color: errNum === index ? '#141414' : '#878686',
                  }}>
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>

          <TextInput
            textAlignVertical="top"
            style={{
              backgroundColor: '#F9F9F9',
              height: _getHeight(141),
              borderRadius: 8,
              borderWidth: 1,
              borderColor: '#D4D4D4',
            }}
          />
          <Pressable
            onPress={() => setModal(!modal)}
            style={{
              height: 54,
              marginTop: 24,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#C4C4C4',
            }}>
            <Text
              style={{
                fontFamily: FontList.PretendardRegular,
                fontSize: 16,
                color: 'black',
              }}>
              제보하기
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      <MyModal
        title="준비중인 기능입니다"
        positive
        positiveTitle="확인"
        positivePress={() => nav.goBack()}
        setVisible={setModal}
        visible={modal}
      />
    </SafeAreaView>
  );
};

export default StationReportPage;
