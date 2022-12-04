import {View, Text, Image, Pressable, Linking} from 'react-native';
import React from 'react';
import {_getHeight, _getWidth} from 'constants/utils';
import FontList from 'constants/FontList';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';

interface props {
  bottomSheetRef: React.RefObject<BottomSheetModalMethods>;
  item?: any;
}

const DashBoard = ({bottomSheetRef, item}: props) => {
  return (
    <View>
      <View
        style={{
          height: _getHeight(164),
          backgroundColor: '#F4F4F4',
          borderRadius: 5,
          marginTop: _getHeight(29),
        }}>
        <View style={{flexDirection: 'row', flex: 1}}>
          <View
            style={{
              flex: 1,
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                flexDirection: 'row',
              }}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Pressable
                  onPress={() => {
                    bottomSheetRef.current?.present();
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: FontList.PretendardRegular,
                      color: '#4A4A4A',
                    }}>
                    충전요금
                  </Text>
                  <Image
                    source={require('@assets/icon_info.png')}
                    style={{width: 13.3, height: 13.3, marginLeft: 5.3}}
                    resizeMode="contain"
                  />
                </Pressable>
                <Text
                  style={{
                    fontFamily: FontList.PretendardMedium,
                    includeFontPadding: false,
                    marginTop: _getHeight(11),
                    fontSize: 16,
                    color: 'black',
                  }}>
                  350원/kWh
                </Text>
              </View>
              <View
                style={{
                  height: _getHeight(43),
                  width: 1,
                  backgroundColor: '#D4D4D4',
                }}></View>
            </View>

            <View
              style={{
                width: _getWidth(121),
                height: 1,
                marginTop: 'auto',
                backgroundColor: '#D4D4D4',
                alignSelf: 'center',
              }}></View>
          </View>

          <View
            style={{
              flex: 1,
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: FontList.PretendardRegular,
                    color: '#4A4A4A',
                  }}>
                  주차요금
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: FontList.PretendardMedium,
                  includeFontPadding: false,
                  marginTop: _getHeight(11),
                  fontSize: 16,
                  color: 'black',
                }}>
                {item?.parkingFree === 'Y' ? '주차무료' : '주차유료'}
              </Text>
            </View>
            <View
              style={{
                width: _getWidth(121),
                height: 1,
                marginTop: 'auto',
                backgroundColor: '#D4D4D4',
                alignSelf: 'center',
              }}></View>
          </View>
        </View>

        <View style={{flexDirection: 'row', flex: 1}}>
          <View
            style={{
              flex: 1,
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                flexDirection: 'row',
              }}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: FontList.PretendardRegular,
                      color: '#4A4A4A',
                    }}>
                    운영시간
                  </Text>
                </View>
                <Text
                  style={{
                    fontFamily: FontList.PretendardMedium,
                    includeFontPadding: false,
                    marginTop: _getHeight(11),
                    fontSize: 16,
                    color: 'black',
                  }}>
                  {item?.useTime ? item?.useTime : '정보없음'}
                </Text>
              </View>
              <View
                style={{
                  height: _getHeight(43),
                  width: 1,
                  backgroundColor: '#D4D4D4',
                }}></View>
            </View>
          </View>

          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text
              style={{
                fontFamily: FontList.PretendardRegular,
                color: '#4A4A4A',
              }}>
              운영기관
            </Text>
            <Pressable
              hitSlop={10}
              onPress={() => Linking.openURL(`tel:${item?.busiCall}`)}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: _getHeight(11),
                }}>
                <Text
                  style={{
                    fontFamily: FontList.PretendardMedium,
                    includeFontPadding: false,

                    fontSize: 16,
                    color: 'black',
                  }}>
                  {item?.busiNm}
                </Text>
                <Image
                  source={require('@assets/icon_phone.png')}
                  style={{width: 15, height: 15, marginLeft: 1}}
                  resizeMode="contain"
                />
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DashBoard;
