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
import {useDispatch, useSelector} from 'react-redux';
import {setGoal} from 'redux/reducers/pathReducer';
import ChargerType from 'constants/ChargerType';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import modules from 'constants/utils/modules';
import {useNavigation} from '@react-navigation/native';
import {commonTypes} from '@types';
import {RootState} from 'redux/store';
import commonAPI from 'api/modules/commonAPI';
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
  isPath?: boolean;
  setNeedLogin?: Dispatch<SetStateAction<any>> | undefined;
}

const StationListItem = ({
  item,
  pick,
  setPick,
  style,
  goal,
  bottomSheetRef,
  setClickedMarker,
  isPath,
  setNeedLogin,
}: props) => {
  const [favorite, setFavorite] = useState(false);
  const dispatch = useDispatch();
  const isClosed = isPath ? false : modules._isClosed(item);
  const nav = useNavigation<commonTypes.navi>();
  const {userInfo} = useSelector((state: RootState) => state.authReducer);

  const _sortChgerBySpeed = (item: any) => {
    //  현 데이터에서 chgerTypeInfo 는 총 7개가 있
    //  고 일반적으로 DC는 급속, AC는 완속으로 나누어 집니다
    //  다만 충전기 타입에서 급속과 같이 완속도 지원하는 충전기도 있습니다.
    //  (chgerType=03, DC차데모+AC3상, 또는 chgerType=06) 예시로 statId = "CPTEST01" 경우가 참고가 되실것 같습니다
    //  03, 06인 경우
    //  dc는 급속, ac는 완속

    let normal = 0;
    let fast = 0;

    item?.chargers.map((item, index) => {
      if (item.chgerTypeInfo === 'AC완속' || item.chgerTypeInfo === 'AC3상')
        normal++;
      else fast++;
    });

    const res = {
      normal,
      fast,
    };
    return res;
  };

  const _getChgerImg = (item: any) => {
    let chgerImgTemp = {
      dcCombo: false,
      dcDemo: false,
      ac3: false,
      ac5: false,
    };
    if (isPath) return chgerImgTemp;
    let chgerImg = {
      dcCombo: false,
      dcDemo: false,
      ac3: false,
      ac5: false,
    };
    item.chargers.map((item, index) => {
      if (item.chgerTypeInfo === 'DC차데모+AC3상+DC콤보') {
        chgerImg.ac3 = true;
        chgerImg.dcCombo = true;
        chgerImg.dcDemo = true;
      }
      if (item.chgerTypeInfo === 'AC완속') {
        chgerImg.ac5 = true;
      }
      if (item.chgerTypeInfo === 'DC콤보') {
        chgerImg.dcCombo = true;
      }
      if (item.chgerTypeInfo === 'DC차데모+DC콤보') {
        chgerImg.dcCombo = true;
        chgerImg.dcDemo = true;
      }
      if (item.chgerTypeInfo === 'DC차데모+AC3상') {
        chgerImg.dcDemo = true;
        chgerImg.ac3 = true;
      }
      if (item.chgerTypeInfo === 'AC3상') {
        chgerImg.ac3 = true;
      }
      if (item.chgerTypeInfo === 'DC차데모') {
        chgerImg.dcDemo = true;
      }
    });
    return chgerImg;
  };

  const _setUserStar = async () => {
    if (userInfo?.id) {
      const data = {
        user_id: userInfo.id,
        stat_id: item.statId,
      };
      await commonAPI
        ._postUserStar(data)
        .then(res => console.log('User Star RES', res.data))
        .catch(err => console.log('err', err));

      console.log('data', data);
    }
  };

  const _delUserStar = async () => {
    if (userInfo?.id) {
      const data = {
        user_id: userInfo.id,
        stat_id: item.statId,
      };
      await commonAPI
        ._deleteUserStar(data)
        .then(res => console.log('User Star RES', res.data))
        .catch(err => console.log('err', err));

      console.log('data', data);
    }
  };

  const _onPressed = () => {
    if (userInfo?.id) {
      setFavorite(!favorite);
      if (!favorite) {
        _setUserStar();
      } else {
        _delUserStar();
      }
    } else {
      if (setNeedLogin) setNeedLogin(true);
    }
  };
  return (
    <Pressable
      onPress={() => {
        if (pick) {
          bottomSheetRef?.current?.close();
          nav.navigate('StationDetailMain', {item: item});
        }

        if (item) {
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
              {item?.statNm ? item?.statNm : ''}
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
          onPress={() => _onPressed()}>
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
              bottomSheetRef?.current?.close();
              // setPick && setPick(false);
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
          {item?.addr ? item?.addr : ''}
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
                color: isClosed ? '#6FCF24' : '#959595',
              }}>
              {isClosed ? '충전가능' : '충전불가'}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontFamily: FontList.PretendardRegular,
                color: '#333333',
              }}>
              급속 {isPath ? 1 : _sortChgerBySpeed(item).fast}
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
              완속 {isPath ? 1 : _sortChgerBySpeed(item).normal}
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
              width: 40,
              height: 40,
              borderRadius: _getWidth(40) / 2,
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: _getChgerImg(item).dcCombo ? '#6FCF24' : '#C6C6C6',
              opacity: _getChgerImg(item).dcCombo ? 1 : 0.3,
            }}>
            <Image
              source={ChargerType.chargerLogo[0]}
              style={{width: 35, height: 35}}
              resizeMode="contain"
            />
          </View>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: _getWidth(40) / 2,
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: _getChgerImg(item).dcDemo ? '#6FCF24' : '#C6C6C6',
              opacity: _getChgerImg(item).dcDemo ? 1 : 0.3,
            }}>
            <Image
              source={ChargerType.chargerLogo[1]}
              style={{width: 30, height: 30}}
              resizeMode="contain"
            />
          </View>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: _getWidth(40) / 2,
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: _getChgerImg(item).ac3 ? '#6FCF24' : '#C6C6C6',
              opacity: _getChgerImg(item).ac3 ? 1 : 0.3,
            }}>
            <Image
              source={ChargerType.chargerLogo[2]}
              style={{width: 30, height: 30}}
              resizeMode="contain"
            />
          </View>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: _getWidth(40) / 2,
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: _getChgerImg(item).ac5 ? '#6FCF24' : '#C6C6C6',
              opacity: _getChgerImg(item).ac5 ? 1 : 0.3,
            }}>
            <Image
              source={ChargerType.chargerLogo[3]}
              style={{width: 33, height: 33}}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default StationListItem;
