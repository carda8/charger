import {View, Text, Image, Pressable} from 'react-native';
import React, {useState} from 'react';
import FontList from 'constants/FontList';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {_getWidth} from 'constants/utils';
import ChargerType from 'constants/ChargerType';
import {useDispatch} from 'react-redux';
import {setRecomendStationData} from 'redux/reducers/pathReducer';
interface props {
  pickReco: any;
  recoRef: React.RefObject<BottomSheetModalMethods>;
}
const PathBottomSheetReco = ({pickReco, recoRef}: props) => {
  const [favorite, setFavorite] = useState(false);
  const dispatch = useDispatch();

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
    }
    return chgerImg;
  };

  const _sortChgerBySpeed = (item: any) => {
    let normal = 0;
    let fast = 0;
    // console.log('sort', item);
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

  return (
    <View style={{flex: 1}}>
      <View style={{marginHorizontal: 16, marginTop: 10}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={require('@assets/icon_addr.png')}
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
                numberOfLines={1}
                style={{
                  fontFamily: FontList.PretendardMedium,
                  fontSize: 16,
                  color: '#333333',
                }}>
                {pickReco?.statNm}
                {'  '}
                <Text
                  style={{
                    fontFamily: FontList.PretendardRegular,
                    fontSize: 14,
                    color: '#333333',
                  }}>
                  {''}
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
              marginLeft: 0,
              alignItems: 'center',
            }}
            hitSlop={10}
            onPress={() => {
              recoRef?.current?.close();
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
        <Text
          style={{
            fontFamily: FontList.PretendardRegular,
            color: '#959595',
            marginTop: 10,
          }}>
          {pickReco?.addr}
        </Text>
        {pickReco?.statNm && pickReco.parkingFree === 'Y' && (
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
                급속 {_sortChgerBySpeed(pickReco).fast}
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
                완속 {_sortChgerBySpeed(pickReco).normal}
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
                borderColor: _getChgerImg(pickReco).dcCombo
                  ? '#6FCF24'
                  : '#C6C6C6',
                opacity: _getChgerImg(pickReco).dcCombo ? 1 : 0.3,
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
                borderColor: _getChgerImg(pickReco).dcDemo
                  ? '#6FCF24'
                  : '#C6C6C6',
                opacity: _getChgerImg(pickReco).dcDemo ? 1 : 0.3,
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
                borderColor: _getChgerImg(pickReco).ac3 ? '#6FCF24' : '#C6C6C6',
                opacity: _getChgerImg(pickReco).ac3 ? 1 : 0.3,
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
                borderColor: _getChgerImg(pickReco).ac5 ? '#6FCF24' : '#C6C6C6',
                opacity: _getChgerImg(pickReco).ac5 ? 1 : 0.3,
              }}>
              <Image
                source={ChargerType.chargerLogo[3]}
                style={{width: 33, height: 33}}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>
      </View>
      <View style={{flex: 1, marginHorizontal: 18}}>
        <Pressable
          onPress={() => {
            recoRef.current?.close();
            dispatch(setRecomendStationData(pickReco));
          }}
          style={{
            marginTop: 'auto',
            marginBottom: 22,
            width: '100%',
            height: 54,
            backgroundColor: '#00239C',
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontFamily: FontList.PretendardBold,
              fontSize: 16,
              color: 'white',
            }}>
            도착지 설정
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default PathBottomSheetReco;
