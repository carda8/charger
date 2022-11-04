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
interface props {
  item?: any;
  // pick?: boolean;
  // setPick?: Dispatch<SetStateAction<boolean>>;
  style?: StyleProp<ViewStyle>;
  // goal?: boolean;
  // isRecent?: boolean;
  recentData?: any;
  setRecentData?: Dispatch<SetStateAction<any>>;
  index?: number;
}

const RecentMainItem = ({
  item,
  style,
  recentData,
  setRecentData,
  index,
}: props) => {
  const [favorite, setFavorite] = useState(false);
  const dispatch = useDispatch();

  const _deleteItem = (target: any[], setTarget: any, index: any) => {
    console.log('index', index);
    let temp = [...target];
    temp = target.filter((item, idx) => idx !== index);
    console.log('temp', temp);
    setTarget(temp);
  };

  return (
    <Pressable
      hitSlop={15}
      onPress={() => {}}
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
        {/* <View
          style={{
            width: _getWidth(20),
            height: _getHeight(20),
            backgroundColor: '#D9D9D9',
          }}
        /> */}
        <Image
          source={require('@assets/main_bt_union2.png')}
          style={{width: 20, height: 20}}
          resizeMode="contain"
        />
        <View style={{marginLeft: 4, marginRight: 6}}>
          <Text
            style={{
              fontFamily: FontList.PretendardMedium,
              fontSize: 16,
              color: '#333333',
            }}>
            {item}
          </Text>
        </View>
        <Text>1.5km</Text>
        <View style={{marginLeft: 'auto', marginRight: 8}}>
          <Text
            style={{fontFamily: FontList.PretendardRegular, color: '#C6C6C6'}}>
            10.01
          </Text>
        </View>
        <Pressable
          style={{
            alignItems: 'center',
          }}
          hitSlop={10}
          onPress={() => _deleteItem(recentData, setRecentData, index)}>
          <Image
            source={require('@assets/close_star.png')}
            style={{
              width: 14,
              height: 14,
              tintColor: '#959595',
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

export default RecentMainItem;
