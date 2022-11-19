import {View, Text, Pressable, Image} from 'react-native';
import React, {useState} from 'react';
import {_getHeight, _getWidth} from 'constants/utils';
import {useNavigation} from '@react-navigation/native';
import {commonTypes} from '@types';
import FontList from 'constants/FontList';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'redux/store';
import {setBottomIdx} from 'redux/reducers/navReducer';
import {Shadow} from 'react-native-shadow-2';

const BottomNav = () => {
  const nav = useNavigation<commonTypes.navi>();
  const {bottomIdx} = useSelector((state: RootState) => state.navReducer);
  const dispatch = useDispatch();

  return (
    <>
      <Shadow
        distance={1}
        style={{width: '100%', height: 60}}
        containerStyle={{
          width: '100%',
          // position: 'absolute',
          // bottom: 0,
        }}>
        <View
          style={{
            // position: 'absolute',
            // bottom: 0,
            width: '100%',
            backgroundColor: 'white',
            height: 60,
            flexDirection: 'row',
          }}>
          <Pressable
            onPress={() => {
              // setIndex(0);
              dispatch(setBottomIdx(0));
              nav.navigate('Home');
            }}
            style={{flex: 1,alignItems: 'center', justifyContent: 'center'}}>
            <Image
              source={
                bottomIdx === 0
                  ? require('@assets/main_bt_home2.png')
                  : require('@assets/main_bt_home.png')
              }
              style={{
                marginBottom: 5,
                width: _getWidth(24),
                height: _getHeight(24.6),
              }}
              resizeMode="contain"
            />
            <Text style={{fontFamily: FontList.PretendardMedium, fontSize: 12}}>
              홈
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              dispatch(setBottomIdx(1));
              nav.navigate('AroundMain');
            }}
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Image
              source={
                bottomIdx === 1
                  ? require('@assets/main_bt_near2.png')
                  : require('@assets/main_bt_near.png')
              }
              style={{
                marginBottom: 5,
                width: _getWidth(24),
                height: _getHeight(24),
                // tintColor: bottomIdx === 1 ? '#0C34C1' : undefined,
              }}
              resizeMode="contain"
            />
            <Text style={{fontFamily: FontList.PretendardMedium, fontSize: 12}}>
              내 주변
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              dispatch(setBottomIdx(2));
              nav.navigate('PathMain');
            }}
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Image
              source={
                bottomIdx === 2
                  ? require('@assets/main_bt_onroad2.png')
                  : require('@assets/main_bt_onroad.png')
              }
              style={{
                marginBottom: 5,
                width: _getWidth(24),
                height: _getHeight(24),
                // tintColor: bottomIdx === 2 ? '#0C34C1' : undefined,
              }}
              resizeMode="contain"
            />
            <Text style={{fontFamily: FontList.PretendardMedium, fontSize: 12}}>
              경로
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              dispatch(setBottomIdx(3));
              nav.navigate('RecentMain');
            }}
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Image
              source={
                bottomIdx === 3
                  ? require('@assets/main_bt_union2.png')
                  : require('@assets/main_bt_union.png')
              }
              style={{
                marginBottom: 5,
                width: _getWidth(24.3),
                height: _getHeight(24.5),
                // tintColor: bottomIdx === 3 ? '#0C34C1' : undefined,
              }}
              resizeMode="contain"
            />
            <Text style={{fontFamily: FontList.PretendardMedium, fontSize: 12}}>
              최근충전
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              dispatch(setBottomIdx(4));
              nav.navigate('MyPageMain');
            }}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={
                bottomIdx === 4
                  ? require('@assets/main_bt_mypage2.png')
                  : require('@assets/main_bt_mypage.png')
              }
              style={{
                marginBottom: 5,
                width: _getWidth(24),
                height: _getHeight(24),
                // tintColor: bottomIdx === 4 ? '#0C34C1' : undefined,
              }}
              resizeMode="contain"
            />
            <Text style={{fontFamily: FontList.PretendardMedium, fontSize: 12}}>
              마이페이지
            </Text>
          </Pressable>
        </View>
      </Shadow>
    </>
  );
};

export default BottomNav;
