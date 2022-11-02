import {
  View,
  Text,
  Pressable,
  TextInput,
  Keyboard,
  Image,
  Modal,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import GlobalStyles from 'styles/GlobalStyles';
import BottomNav from '@components/BottomNav';
import {useNavigation} from '@react-navigation/native';
import {commonTypes} from '@types';
import {_getHeight} from 'constants/utils';
import FontList from 'constants/FontList';
import commonAPI from 'api/modules/commonAPI';
import {API} from 'api/API';

interface keywordParam {
  keywords: string;
  offset: number;
  limit: number;
}

const SearchMain = () => {
  const nav = useNavigation<commonTypes.navi>();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    '선릉역',
    '이마트 트레이더스',
    '코스트코',
  ]);
  const [recent, setRecent] = useState([
    '서울 강남구 역삼로168길',
    '신설설농탕 강남점',
    '서초 보건소',
    '서울 관악구 ',
  ]);
  const [modal, setModal] = useState(false);
  const layout = useWindowDimensions();

  const _getKeyword = async () => {
    setModal(true);

    if (input) {
      const data: keywordParam = {
        keywords: input,
        offset: 0,
        limit: 10,
      };

      commonAPI
        ._postAruondStation(data)
        .then(res => {
          console.log('res', res?.data.data);
          if (res?.data.data.length > 0) {
            nav.navigate('AroundMain', {});
          }
        })
        .catch(err => console.log('## ERROR', err))
        .finally(() =>
          setTimeout(() => {
            setModal(false);
          }, 1200),
        );
    }
  };

  const _delelteItem = (target: any[], setTarget: any, index: any) => {
    let temp = [...target];
    temp = target.filter((item, idx) => idx !== index);
    setTarget(temp);
  };

  return (
    <SafeAreaView style={{...GlobalStyles.safeAreaStyle}}>
      <View
        style={{
          marginTop: 15,
          paddingBottom: 17,
          borderBottomWidth: 4,
          borderColor: '#F6F6F6',
        }}>
        <View style={{marginHorizontal: 18}}>
          <View
            style={{flexDirection: 'row', width: '100%', alignItems: 'center'}}>
            <TextInput
              onSubmitEditing={() => {
                _getKeyword();
                Keyboard.dismiss();
              }}
              onChangeText={setInput}
              value={input}
              autoCapitalize="none"
              placeholder="목적지를 검색하세요"
              style={{
                flex: 1,
                height: 39,
                backgroundColor: '#F4F2F2',
                borderRadius: 3,
                paddingHorizontal: 10,
                marginRight: 6.5,
              }}
            />
            <Pressable
              hitSlop={10}
              onPress={() => {
                setInput('');
              }}>
              <Image
                source={require('@assets/search_close.png')}
                style={{width: 12, height: 12}}
                resizeMode="contain"
              />
            </Pressable>
          </View>
        </View>
      </View>
      {history.map((item, idx) => (
        <Pressable
          onPress={() => {
            _delelteItem(history, setHistory, idx);
          }}
          key={idx}
          style={{
            justifyContent: 'center',
            borderColor: '#F6F6F6',
            borderBottomWidth: idx === history.length - 1 ? 5 : undefined,
          }}>
          <View
            style={{
              height: _getHeight(48),
              marginHorizontal: 18,
              borderBottomWidth: 1,
              borderColor: '#F6F6F6',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('@assets/search.png')}
                style={{width: 14, height: 14, marginRight: 6}}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontFamily: FontList.PretendardMedium,
                  fontSize: 16,
                  color: '#333333',
                }}>
                {item}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  fontFamily: FontList.PretendardRegular,
                  color: '#C6C6C6',
                }}>
                10.01
              </Text>
              <Image
                source={require('@assets/search_close.png')}
                style={{
                  width: 12,
                  height: 12,
                  marginLeft: 10,
                  tintColor: '#959595',
                }}
                resizeMode="contain"
              />
            </View>
          </View>
        </Pressable>
      ))}
      <Text
        style={{
          lineHeight: 24,
          color: '#7A7A7A',
          marginHorizontal: 16,
          marginTop: 17.6,
        }}>
        최근 검색지
      </Text>
      {recent.length === 0 && (
        <Text
          style={{
            lineHeight: 24,
            color: '#7A7A7A',
            marginHorizontal: 16,
            marginTop: 17.6,
            fontSize: 13,
          }}>
          최근 검색지가 없습니다
        </Text>
      )}
      {recent.map((item, index) => (
        <Pressable
          onPress={() => {
            _delelteItem(recent, setRecent, index);
          }}
          key={index}
          style={{
            justifyContent: 'center',
            borderColor: '#F6F6F6',
            borderBottomWidth: 1,

            // borderBottomWidth: index === history.length - 1 ? 5 : undefined,
          }}>
          <View
            style={{
              marginHorizontal: 16,
              height: _getHeight(58),
              justifyContent: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    fontFamily: FontList.PretendardMedium,
                    fontSize: 16,
                    color: '#333333',
                  }}>
                  {item}
                </Text>
              </View>
              <Pressable
                onPress={() => {}}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    fontFamily: FontList.PretendardRegular,
                    color: '#C6C6C6',
                  }}>
                  10.01
                </Text>
                <Image
                  source={require('@assets/search_close.png')}
                  style={{
                    width: 12,
                    height: 12,
                    marginLeft: 10,
                    tintColor: '#959595',
                  }}
                  resizeMode="contain"
                />
              </Pressable>
            </View>

            <Text
              style={{
                lineHeight: 24,
                fontFamily: FontList.PretendardRegular,
                color: '#7A7A7A',
              }}>
              서울특별시 강남구 역삼로168길
            </Text>
          </View>
        </Pressable>
      ))}

      <BottomNav />
      <Modal
        transparent
        statusBarTranslucent={true}
        onRequestClose={() => {
          // setModal(!modal);
        }}
        visible={modal}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.3)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SearchMain;
