import {View, Text, Pressable, Image, useWindowDimensions} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import FontList from 'constants/FontList';
import {commonTypes} from '@types';
import {useNavigation} from '@react-navigation/native';
import {_getHeight, _getWidth} from 'constants/utils';
import {Shadow} from 'react-native-shadow-2';
import {useSelector} from 'react-redux';
import {RootState} from 'redux/store';

interface props {
  title?: string;
  subTitle?: string;
  // nav?: commonTypes.nav;
  goBack?: boolean;
  backTitle?: string;
  setModalCar?: Dispatch<SetStateAction<boolean>>;
  setModalLogin?: Dispatch<SetStateAction<boolean>>;
}

const HomeHeader = ({
  title,
  subTitle,
  goBack,
  backTitle,
  setModalCar,
  setModalLogin,
}: props) => {
  const nav = useNavigation<commonTypes.navi>();
  const {userInfo} = useSelector((state: RootState) => state.authReducer);
  const layout = useWindowDimensions();
  const _convert = (userInfoCar: string) => {
    console.log('userInfo car', userInfo);
    switch (userInfoCar) {
      case '현대자동차':
        return '현대';
      case '기아자동차':
        return '기아';
      case 'BENZ':
        return '벤츠';
      case 'AUDI':
        return '아우디';
      case 'Genesis':
        return '제네시스';
      case 'TESLA':
        return '테슬라';
      case 'GM':
        return '쉐보레';
      case 'BMW':
        return 'BMW';
      default:
        return userInfo?.car_brand;
    }
  };
  return (
    <>
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
              source={require('@assets/notification_on.png')}
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
            source={
              userInfo?.car_brand
                ? require('@assets/carinfo_true.png')
                : require('@assets/carinfo_false.png')
            }
            style={{width: _getWidth(89), height: _getHeight(89)}}
            resizeMode="contain"
          />
          <View style={{marginLeft: 24}}>
            <Text
              style={{
                fontFamily: FontList.PretendardRegular,
                color: '#858585',
              }}>
              {userInfo?.name ? '반갑습니다' : '등록된 정보가 없습니다.'}
            </Text>
            {userInfo?.name && (
              <Text
                style={{
                  fontFamily: FontList.PretendardMedium,
                  color: '#333333',
                  fontSize: 18,
                }}>
                {userInfo?.name && userInfo?.name + '님'}
              </Text>
            )}

            {userInfo?.car_brand ? (
              <View style={{flexDirection: 'row'}}>
                <Text
                  numberOfLines={1}
                  style={{
                    width: layout.width * 0.6,
                    fontFamily: FontList.PretendardMedium,
                    fontSize: 14,
                    color: '#858585',
                  }}>
                  {_convert(userInfo?.car_brand)} {userInfo?.car_model} {' | '}
                  {userInfo?.chgerType?.join(' ')}
                </Text>
              </View>
            ) : (
              <Pressable
                onPress={() => {
                  if (!userInfo?.id && setModalLogin) {
                    return setModalLogin(true);
                  }
                  if (userInfo?.id && setModalCar) {
                    return setModalCar(true);
                  }
                  // nav.navigate('AccountCarInfo');
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
            )}
          </View>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          height: 1,
          elevation: 1,
          position: 'absolute',
          zIndex: 100,
          top: _getHeight(203),
        }}
      />
    </>
  );
};

export default HomeHeader;
