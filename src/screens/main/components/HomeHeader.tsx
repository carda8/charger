import {View, Text, Pressable, Image} from 'react-native';
import React from 'react';
import FontList from 'constants/FontList';
import {commonTypes} from '@types';
import {useNavigation} from '@react-navigation/native';
import {_getHeight, _getWidth} from 'constants/utils';

interface props {
  title?: string;
  subTitle?: string;
  // nav?: commonTypes.nav;
  goBack?: boolean;
  backTitle?: string;
}

const HomeHeader = ({title, subTitle, goBack, backTitle}: props) => {
  const nav = useNavigation<commonTypes.navi>();
  return (
    <View
      style={{
        width: '100%',
        height: _getHeight(204),
        paddingHorizontal: 18,
        paddingTop: 21,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('@assets/main_logo.png')}
            style={{width: 32, height: 32}}
            resizeMode="contain"
          />
          <Image
            source={require('@assets/main_logo_str.png')}
            style={{width: 71, height: 19}}
            resizeMode="contain"
          />
        </View>
        <Pressable
          hitSlop={10}
          onPress={() => {
            nav.navigate('Notification');
          }}>
          <Image
            source={require('@assets/notification.png')}
            style={{
              width: _getWidth(22),
              height: _getHeight(22),
            }}
            resizeMode="contain"
          />
        </Pressable>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 12,
          marginHorizontal: 18,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          // source={require('@assets/carinfo_false.png')}
          source={require('@assets/carinfo_true.png')}
          style={{width: _getWidth(89), height: _getHeight(89)}}
          resizeMode="contain"
        />
        <View style={{marginLeft: 24}}>
          <Text
            style={{fontFamily: FontList.PretendardLight, color: '#858585'}}>
            {/* 등록된 정보가 없습니다. */}
            반갑습니다
          </Text>
          <Text
            style={{
              fontFamily: FontList.PretendardMedium,
              color: '#333333',
              fontSize: 18,
            }}>
            박세라님
          </Text>
          <Pressable
            onPress={() => {
              nav.navigate('AccountCarInfo');
            }}
            style={{
              width: _getWidth(104),
              height: _getHeight(30),
              backgroundColor: '#EEEEEE',
              borderRadius: 31,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 8,
            }}>
            <Text
              style={{
                fontFamily: FontList.PretendardMedium,
                fontSize: 13,
                color: '#C6C6C6',
              }}>
              차량 등록하기
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default HomeHeader;
