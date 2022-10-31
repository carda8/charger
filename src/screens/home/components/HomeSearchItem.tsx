import {View, Text, Pressable, StyleProp, ViewStyle, Image} from 'react-native';
import React, {Dispatch, SetStateAction, useState} from 'react';
import {_getHeight, _getWidth} from 'constants/utils';
import FontList from 'constants/FontList';

interface props {
  style?: StyleProp<ViewStyle>;
  visible?: boolean;
  setVisible?: Dispatch<SetStateAction<boolean>>;
}

const HomeSearchItem = ({setVisible, visible}: props) => {
  const [favorite, setFavorite] = useState(false);
  return (
    <Pressable
      onPress={() => {
        if (setVisible) setVisible(!visible);
      }}
      style={({pressed}) => [
        {
          paddingHorizontal: 16,
          width: '100%',
          // opacity: pressed ? 0.5 : 1,
          backgroundColor: 'white',
          borderBottomWidth: 1,
          borderBottomColor: '#F5F5F5',
          paddingVertical: 18,
        },
      ]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: _getWidth(20),
            height: _getHeight(20),
            backgroundColor: '#D9D9D9',
          }}
        />
        <View style={{marginLeft: 4, marginRight: 6}}>
          <Text
            style={{
              fontFamily: FontList.PretendardMedium,
              fontSize: 16,
              color: '#333333',
            }}>
            강남역 12번 출구
          </Text>
        </View>
        <Text>1.5km</Text>
        <Pressable
          style={{
            marginLeft: 'auto',
            alignItems: 'center',
          }}
          hitSlop={10}
          onPress={() => setFavorite(!favorite)}>
          <Image
            source={
              favorite
                ? require('@assets/star_on.png')
                : require('@assets/star_off.png')
            }
            style={{
              width: 20,
              height: 20,
              tintColor: favorite ? undefined : '#959595',
            }}
            resizeMode="contain"
          />
        </Pressable>
      </View>
      <View style={{marginTop: 10}}>
        <Text
          style={{
            includeFontPadding: false,
            fontFamily: FontList.PretendardRegular,
            color: '#959595',
          }}>
          {'경기도 성남시 분당구 판교로227번길 6'}
        </Text>
      </View>

      <View
        style={{
          marginTop: 10,
          paddingVertical: 12,
          paddingLeft: 16,
          paddingRight: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            alignItems: 'center',
            alignSelf: 'flex-start',
            marginRight: _getWidth(36),
          }}>
          <View style={{marginBottom: 2}}>
            <Text
              style={{
                fontFamily: FontList.PretendardMedium,
                fontSize: 16,
                color: '#6FCF24',
              }}>
              충전가능
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontFamily: FontList.PretendardRegular,
                color: '#333333',
              }}>
              급속 1
            </Text>
            <Text
              style={{
                fontFamily: FontList.PretendardRegular,
                color: '#333333',
              }}>
              {' | '}
            </Text>
            <Text
              style={{
                fontFamily: FontList.PretendardRegular,
                color: '#333333',
              }}>
              완속 3
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1,
          }}>
          <Image
            source={require('@assets/station_type_1.png')}
            style={{width: _getWidth(40), height: _getHeight(40)}}
          />
          <Image
            source={require('@assets/station_type_2.png')}
            style={{width: _getWidth(40), height: _getHeight(40)}}
          />
          <Image
            source={require('@assets/station_type_3.png')}
            style={{width: _getWidth(40), height: _getHeight(40)}}
          />

          <Image
            source={require('@assets/station_type_4.png')}
            style={{width: _getWidth(40), height: _getHeight(40)}}
          />
        </View>
      </View>
    </Pressable>
  );
};

export default HomeSearchItem;
