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
import ChargerType from 'constants/ChargerType';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {useNavigation} from '@react-navigation/native';
import {commonTypes} from '@types';
import {RootState} from 'redux/store';
import commonAPI from 'api/modules/commonAPI';
import modules from 'constants/utils/modules';
interface props {
  item?: any;
  style?: StyleProp<ViewStyle>;
  bottomSheetRef?: React.RefObject<BottomSheetModalMethods>;
}

const PathBottomSheetItem = ({style, bottomSheetRef, item}: props) => {
  const [favorite, setFavorite] = useState(false);
  const dispatch = useDispatch();
  const nav = useNavigation<commonTypes.navi>();
  const {userInfo} = useSelector((state: RootState) => state.authReducer);
  const pathState = useSelector((state: RootState) => state.pathReducer);

  //   addr: "제주특별자치도 제주시 구좌읍 동김길 81"

  // bnm: "파킹클라우드"

  // busiCall: "1533-5783"

  // busiId: "PC"

  // busiNm: "파킹클라우드"

  // chargers: [Object, Object] (2)

  // delDetail: null

  // delYn: "N"

  // detailLocation: "야외주차장"

  // kind: "G0"

  // kindDetail: "G004"

  // limitDetail: "시설 상황에 따라 이용이 제한될 수 있음"

  // limitYn: "Y"

  // location: {lat: 33.5493999, lon: 126.7256273}

  // method: "단독"

  // note: null

  // output: "7"

  // parkingFree: "Y"

  // statId: "PC000035"

  // statNm: "제주 오렌지"

  // useTime: "09:00~18:00"

  // zcode: "50"

  // zscode: "50110"
  console.log('itemitem', item);

  const _sortChgerBySpeed = (item: any) => {
    let normal = 0;
    let fast = 0;
    console.log('sort', item);
    if (item) {
      item?.chargers.map((item, index) => {
        if (item.chgerTypeInfo === 'AC완속' || item.chgerTypeInfo === 'AC3상')
          normal++;
        else fast++;
      });
    }
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
    // if (isPath) return chgerImgTemp;
    let chgerImg = {
      dcCombo: false,
      dcDemo: false,
      ac3: false,
      ac5: false,
    };
    if (item) {
      item.chargers.map((item: any, index: number) => {
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
    }
    return chgerImg;
  };

  //   const _setUserStar = async () => {
  //     if (userInfo?.id) {
  //       const data = {
  //         user_id: userInfo.id,
  //         stat_id: item.statId,
  //       };
  //       await commonAPI
  //         ._postUserStar(data)
  //         .then(res => {
  //           modules._updateUserInfo(dispatch, userInfo);
  //           console.log('User Star RES', res.data);
  //         })
  //         .catch(err => console.log('err', err));

  //       console.log('data', data);
  //     }
  //   };

  //   const _delUserStar = async () => {
  //     if (userInfo?.id) {
  //       const data = {
  //         user_id: userInfo.id,
  //         stat_id: item.statId,
  //       };
  //       await commonAPI
  //         ._deleteUserStar(data)
  //         .then(res => console.log('User Star RES', res.data))
  //         .catch(err => console.log('err', err));

  //       console.log('data', data);
  //     }
  //   };

  //   const _onPressed = () => {
  //     if (userInfo?.id) {
  //       setFavorite(!favorite);
  //       if (!favorite) {
  //         _setUserStar();
  //       } else {
  //         _delUserStar();
  //       }
  //     } else {
  //       if (setNeedLogin) setNeedLogin(true);
  //     }
  //   };
  return (
    <Pressable
      onPress={() => {}}
      style={[
        {
          paddingHorizontal: _getWidth(24),
          width: '100%',
          backgroundColor: 'white',
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
              {item.name}
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
          onPress={() => {}}>
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
        <Pressable
          style={{
            marginLeft: 12,
            alignItems: 'center',
          }}
          hitSlop={10}
          onPress={() => {
            bottomSheetRef?.current?.close();
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
      </View>
      <View style={{marginTop: 10}}>
        <Text
          style={{
            includeFontPadding: false,
            fontFamily: FontList.PretendardRegular,
            color: '#959595',
          }}>
          {item.address}{' '}
        </Text>
      </View>

      {/* 무료주차 여부 */}
      {item?.statNm && item.parkingFree === 'Y' && (
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
      {item?.statNm && (
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
                  color: '#959595',
                }}>
                {modules._isClosed(item) ? '충전 가능' : '충전 불가'}{' '}
              </Text>
            </View>

            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontFamily: FontList.PretendardRegular,
                  color: '#333333',
                }}>
                급속 {_sortChgerBySpeed(item)?.fast}
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
                완속 {_sortChgerBySpeed(item)?.normal}
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
      )}
    </Pressable>
  );
};

export default PathBottomSheetItem;
