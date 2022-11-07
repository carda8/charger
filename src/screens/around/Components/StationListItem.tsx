import {
  View,
  Text,
  Pressable,
  Image,
  ListRenderItem,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React, {useState, Dispatch, SetStateAction} from 'react';
import {_getHeight, _getWidth} from 'constants/utils';
import FontList from 'constants/FontList';
import {useDispatch} from 'react-redux';
import {setGoal} from 'redux/reducers/pathReducer';
import ChargerType from 'constants/ChargerType';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
interface props {
  item?: any;
  pick?: boolean;
  setPick?: Dispatch<SetStateAction<any>>;
  style: StyleProp<ViewStyle>;
  goal?: string;
  isRecent?: boolean;
  clickedMarker?: any;
  setClickedMarker?: Dispatch<SetStateAction<any>>;
  bottomSheetRef?: React.RefObject<BottomSheetModalMethods>;
}

const StationListItem = ({
  item,
  pick,
  setPick,
  style,
  goal,
  bottomSheetRef,
  clickedMarker,
  setClickedMarker,
  isRecent,
}: props) => {
  const [favorite, setFavorite] = useState(false);
  const dispatch = useDispatch();

  return (
    <Pressable
      onPress={() => {
        if (item) {
          console.log('item', item);
          console.log('2', item.location);
          setClickedMarker &&
            setClickedMarker({
              latitude: Number(item.location.lat),
              longitude: Number(item.location.lon),
              zoom: 16,
            });
          setPick && setPick([item]);
        }
      }}
      style={[
        {
          paddingHorizontal: _getWidth(24),
          width: '100%',
          backgroundColor: 'white',
          borderBottomWidth: 1,
          borderBottomColor: '#F5F5F5',
          paddingVertical: 18,
          // height: _getHeight(),
        },
        style,
      ]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          source={require('@assets/main_bt_union2.png')}
          style={{width: 20, height: 20}}
          resizeMode="contain"
        />
        <View
          style={{
            marginLeft: 4,
            marginRight: 6,
            flexDirection: 'row',
            flex: 1,
          }}>
          <View style={{flex: 4}}>
            <Text
              style={{
                fontFamily: FontList.PretendardMedium,
                fontSize: 16,
                color: '#333333',
              }}>
              {item?.statNm ? item?.statNm : '서문여자고등학교'}
              {'  '}
              <Text
                style={{
                  fontFamily: FontList.PretendardRegular,
                  fontSize: 14,
                  color: '#333333',
                }}>
                1.5km
              </Text>
            </Text>
          </View>
        </View>
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
        {(pick || goal) && (
          <Pressable
            style={{
              marginLeft: 12,
              alignItems: 'center',
            }}
            hitSlop={10}
            onPress={() => {
              setPick && setPick(false);
              if (goal) {
                dispatch(setGoal(''));
                bottomSheetRef?.current?.close();
              }
            }}>
            <Image
              source={
                favorite
                  ? require('@assets/close_star.png')
                  : require('@assets/close_star.png')
              }
              style={{
                width: 17,
                height: 17,
                tintColor: favorite ? undefined : '#959595',
                marginLeft: 12,
              }}
              resizeMode="contain"
            />
          </Pressable>
        )}
      </View>
      <View style={{marginTop: 10}}>
        <Text
          style={{
            includeFontPadding: false,
            fontFamily: FontList.PretendardRegular,
            color: '#959595',
          }}>
          {item?.addr ? item?.addr : '강남구 서초동 방배로 33-3'}
        </Text>
      </View>
      {item?.parkingFree && (
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <View
            style={{
              marginRight: 4,
              width: 54,
              height: 20,
              backgroundColor: '#07B3FD',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 3,
            }}>
            <Text
              style={{
                fontFamily: FontList.PretendardRegular,
                fontSize: 12,
                color: 'white',
              }}>
              무료주차
            </Text>
          </View>
        </View>
      )}

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
              완속 1
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1,
          }}>
          <View
            style={{
              width: _getWidth(40),
              height: _getHeight(40),
              borderRadius: _getWidth(40) / 2,
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: '#6FCF24',
            }}>
            <Image
              source={ChargerType.chargerLogo[0]}
              style={{width: _getWidth(35), height: _getHeight(35)}}
              resizeMode="contain"
            />
          </View>
          <View
            style={{
              width: _getWidth(40),
              height: _getHeight(40),
              borderRadius: _getWidth(40) / 2,
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: '#6FCF24',
            }}>
            <Image
              source={ChargerType.chargerLogo[1]}
              style={{width: _getWidth(30), height: _getHeight(30)}}
              resizeMode="contain"
            />
          </View>
          <View
            style={{
              width: _getWidth(40),
              height: _getHeight(40),
              borderRadius: _getWidth(40) / 2,
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: '#6FCF24',
            }}>
            <Image
              source={ChargerType.chargerLogo[2]}
              style={{width: _getWidth(30), height: _getHeight(30)}}
              resizeMode="contain"
            />
          </View>
          <View
            style={{
              opacity: 0.3,
              width: _getWidth(40),
              height: _getHeight(40),
              borderRadius: _getWidth(40) / 2,
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: '#C6C6C6',
            }}>
            <Image
              source={ChargerType.chargerLogo[3]}
              style={{width: _getWidth(33), height: _getHeight(33)}}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default StationListItem;
