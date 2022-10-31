import {View, Text, Pressable, TextInput, Keyboard, Image} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import GlobalStyles from 'styles/GlobalStyles';
import BottomNav from '@components/BottomNav';
import {useNavigation} from '@react-navigation/native';
import {commonTypes} from '@types';
import {_getHeight} from 'constants/utils';
import FontList from 'constants/FontList';

const SearchMain = () => {
  const nav = useNavigation<commonTypes.navi>();
  const history = ['선릉역', '이마트 트레이더스', '코스트코', '퍼시브 커피'];
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
              onSubmitEditing={() => Keyboard.dismiss()}
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
            <Image
              source={require('@assets/search_close.png')}
              style={{width: 12, height: 12}}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
      {history.map((item, idx) => (
        <Pressable
          style={{
            width: '100%',
            height: _getHeight(48),
            paddingHorizontal: 18,
            borderWidth: 1,
            borderColor: '#F6F6F6',
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('@assets/search_history.png')}
                style={{width: 16, height: 16, marginRight: 6}}
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

      <BottomNav />
    </SafeAreaView>
  );
};

export default SearchMain;
