import {
  View,
  Text,
  Image,
  Pressable,
  ListRenderItem,
  StyleSheet,
} from 'react-native';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import GlobalStyles from 'styles/GlobalStyles';
import HeaderCenter from '@components/HeaderCenter';
import FontList from 'constants/FontList';
import {_getHeight, _getWidth} from 'constants/utils';
import DashBoard from './components/DashBoard';
import ReportButton from './components/ReportButton';
import {
  FlatList,
  GestureHandlerRootView,
  ScrollView,
} from 'react-native-gesture-handler';
import BottomNav from '@components/BottomNav';
import {BottomSheetProvider} from '@gorhom/bottom-sheet/lib/typescript/contexts';
import {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import NavModal from '@components/NavModal';
import {commonTypes} from '@types';
import ChargerType from 'constants/ChargerType';
import {RouteProp, useRoute} from '@react-navigation/native';

const StationDetailMain = () => {
  const dataFee = [1, 2, 3, 4, 5, 6, , 6, 7, 8];
  const [modal, setModal] = useState(false);
  const routeItem =
    useRoute<RouteProp<commonTypes.RootStackParamList, 'StationDetailMain'>>()
      .params?.item;
  console.log('routeItem', routeItem);
  const coor = {
    latitude: routeItem.location.lat,
    longitude: routeItem.location.lon,
  };
  const _isClosed = (stat: any) => {
    if (stat === '충전중' || stat === '충전대기') return false;
    else return true;
  };

  const _getChgerType = (type: any) => {
    // console.log('############', type);
    if (type === 'AC완속' || type === 'AC3상') {
      return '완속1';
    } else return '급속1';
  };

  const _getChgerImg = (item: any) => {
    // console.log('233123123', item);
    let chgerImg = {
      dcCombo: false,
      dcDemo: false,
      ac3: false,
      ac5: false,
    };
    if (item === 'DC차데모+AC3상+DC콤보') {
      chgerImg.ac3 = true;
      chgerImg.dcCombo = true;
      chgerImg.dcDemo = true;
    }
    if (item === 'AC완속') {
      chgerImg.ac5 = true;
    }
    if (item === 'DC콤보') {
      chgerImg.dcCombo = true;
    }
    if (item === 'DC차데모+DC콤보') {
      chgerImg.dcCombo = true;
      chgerImg.dcDemo = true;
    }
    if (item === 'DC차데모+AC3상') {
      chgerImg.dcDemo = true;
      chgerImg.ac3 = true;
    }
    if (item === 'AC3상') {
      chgerImg.ac3 = true;
    }
    if (item === 'DC차데모') {
      chgerImg.dcDemo = true;
    }

    return chgerImg;
  };

  const renderItem: ListRenderItem<any> = item => {
    return (
      <>
        <Pressable
          style={{
            borderWidth: 1,
            borderColor: '#B4B4B4',
            height: _getHeight(88),
            borderRadius: 7,
          }}>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              paddingLeft: 16,
              paddingRight: 19.7,
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 41,
              }}>
              <Text
                style={{
                  fontFamily: FontList.PretendardSemiBold,
                  color: '#333333',
                }}>
                {_getChgerType(item.item.chgerTypeInfo)}
              </Text>
              <Text
                style={{
                  fontFamily: FontList.PretendardMedium,
                  fontSize: 16,
                  color: _isClosed(item.item.statInfo) ? '#878686' : '#6FCF24',
                  marginVertical: _getHeight(4),
                }}>
                {_isClosed(item.item.statInfo) ? '충전불가' : '충전가능'}
              </Text>
              <Text
                style={{
                  fontFamily: FontList.PretendardRegular,
                  fontSize: 12,
                  color: '#333333 ',
                }}>
                지하2층
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                flex: 1,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: _getChgerImg(item.item.chgerTypeInfo).dcCombo
                    ? 1
                    : 0.3,
                }}>
                <Image
                  source={ChargerType.chargerLogo[0]}
                  style={{
                    width: _getWidth(40),
                    height: _getHeight(40),
                    marginBottom: _getHeight(6),
                  }}
                  resizeMode="contain"
                />
                <Text
                  numberOfLines={2}
                  style={{
                    textAlign: 'center',
                    fontFamily: FontList.PretendardRegular,
                    fontSize: 12,
                    color: 'black',
                    width: 48,
                  }}>
                  DC콤보
                </Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: _getChgerImg(item.item.chgerTypeInfo).dcDemo
                    ? 1
                    : 0.3,
                }}>
                <Image
                  source={ChargerType.chargerLogo[1]}
                  style={{
                    width: _getWidth(40),
                    height: _getHeight(40),
                    marginBottom: _getHeight(6),
                  }}
                  resizeMode="contain"
                />
                <Text
                  numberOfLines={2}
                  style={{
                    textAlign: 'center',
                    fontFamily: FontList.PretendardRegular,
                    fontSize: 12,
                    color: 'black',
                    width: 48,
                  }}>
                  DC차데모
                </Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: _getChgerImg(item.item.chgerTypeInfo).ac3 ? 1 : 0.3,
                }}>
                <Image
                  source={ChargerType.chargerLogo[2]}
                  style={{
                    width: _getWidth(40),
                    height: _getHeight(40),
                    marginBottom: _getHeight(6),
                  }}
                  resizeMode="contain"
                />
                <Text
                  numberOfLines={2}
                  style={{
                    textAlign: 'center',
                    fontFamily: FontList.PretendardRegular,
                    fontSize: 12,
                    color: 'black',
                    width: 48,
                  }}>
                  AC3상
                </Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: _getChgerImg(item.item.chgerTypeInfo).ac5 ? 1 : 0.3,
                }}>
                <Image
                  source={ChargerType.chargerLogo[3]}
                  style={{
                    width: _getWidth(40),
                    height: _getHeight(40),
                    marginBottom: _getHeight(6),
                  }}
                  resizeMode="contain"
                />
                <Text
                  numberOfLines={2}
                  style={{
                    textAlign: 'center',
                    fontFamily: FontList.PretendardRegular,
                    fontSize: 12,
                    color: 'black',
                    width: 48,
                  }}>
                  완속
                </Text>
              </View>
            </View>
          </View>
        </Pressable>
      </>
    );
  };

  const renderSheetItem: ListRenderItem<any> = item => {
    return (
      <View
        style={{flexDirection: 'row', marginBottom: 24, alignItems: 'center'}}>
        {/* <View
          style={{
            width: 18,
            height: 18,
            backgroundColor: '#D9D9D9',
            marginRight: 4,
          }}></View> */}
        <Image
          source={require('@assets/icon_addr.png')}
          style={{width: 20, height: 20}}
          resizeMode="contain"
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1,
          }}>
          <Text style={{lineHeight: 24}}>환경부</Text>
          <Text style={{lineHeight: 24}}>360.0원/kWh</Text>
        </View>
      </View>
    );
  };

  // ref
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  // variables
  // /layout.height * 0.3 + 60
  const snapPoints = useMemo(() => ['67%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    // console.log('handleSheetChanges', index);
  }, []);

  const sheetStyle = useMemo(
    () => ({
      ...styles.sheetContainer,
      shadowColor: 'black',
    }),
    ['linen'],
  );

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <SafeAreaView style={{...GlobalStyles.safeAreaStyle}}>
          <HeaderCenter title="상세보기" leftBack />
          <View style={{marginHorizontal: 16, flex: 1}}>
            <FlatList
              data={routeItem.chargers}
              keyExtractor={(item, index) => String(index)}
              renderItem={item => renderItem(item)}
              showsVerticalScrollIndicator={false}
              style={{marginBottom: _getHeight(65)}}
              ListHeaderComponent={
                <>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {/* <View
                      style={{
                        width: 20,
                        height: 20,
                        backgroundColor: '#D9D9D9',
                        marginRight: 4,
                      }}
                    /> */}
                    <Image
                      source={require('@assets/main_bt_union2.png')}
                      style={{width: 20, height: 20}}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        fontFamily: FontList.PretendardRegular,
                        fontSize: 20,
                        color: 'black',
                      }}>
                      {routeItem?.statNm}
                    </Text>
                  </View>
                  <View style={{marginTop: 10}}>
                    <Text
                      style={{
                        fontFamily: FontList.PretendardMedium,
                        color: '#959595',
                      }}>
                      {routeItem?.addr}
                    </Text>
                  </View>
                  <DashBoard bottomSheetRef={bottomSheetRef} item={routeItem} />
                  <ReportButton modal={modal} setModal={setModal} />
                </>
              }
              ItemSeparatorComponent={() => (
                <View style={{marginBottom: 6}}></View>
              )}
            />
          </View>

          <BottomSheetModal
            style={sheetStyle}
            ref={bottomSheetRef}
            animateOnMount={true}
            index={0}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}>
            <BottomSheetFlatList
              data={dataFee}
              keyExtractor={(item, idx) => String(idx) + String(item)}
              renderItem={item => renderSheetItem(item)}
              contentContainerStyle={{paddingHorizontal: 16}}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={
                <View
                  style={{
                    marginBottom: 15,
                    borderBottomWidth: 4,
                    paddingBottom: 20,
                    borderColor: '#F6F6F6',
                  }}>
                  <View
                    style={{
                      height: 32,
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        fontFamily: FontList.PretendardMedium,
                        fontSize: 16,
                        color: '#333333',
                      }}>
                      충전요금
                    </Text>
                    <Pressable
                      hitSlop={10}
                      onPress={() => bottomSheetRef.current?.close()}>
                      <Image
                        source={require('@assets/close_star.png')}
                        style={{width: 14, height: 14}}
                        resizeMode="contain"
                      />
                    </Pressable>
                  </View>
                </View>
              }
            />
            <View
              style={{
                marginVertical: 12,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  lineHeight: 24,
                  color: '#959595',
                  fontFamily: FontList.PretendardRegular,
                  fontSize: 13,
                }}>
                2022년 7월 업데이트
              </Text>
            </View>
            <View
              style={{
                paddingHorizontal: 16,
                height: _getHeight(99),
                backgroundColor: '#EEEEEE',
                // alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontFamily: FontList.PretendardMedium,
                  fontSize: 13,
                  lineHeight: 24,
                  color: '#959595',
                }}>
                안내사항
              </Text>
              <Text
                style={{
                  fontFamily: FontList.PretendardRegular,
                  lineHeight: 24,
                  fontSize: 13,
                  color: '#959595',
                }}>
                · 위 금액은 1kWh 기준 충전 가격입니다
              </Text>
              <Text
                style={{
                  fontFamily: FontList.PretendardRegular,
                  lineHeight: 24,
                  fontSize: 13,
                  color: '#959595',
                }}>
                · 정확한 금액은 해당 충전기 홈페이지에서 확인 가능합니다
              </Text>
            </View>
          </BottomSheetModal>
          <BottomNav />
          <NavModal
            title="길안내 연결"
            visible={modal}
            setVisible={setModal}
            goalCoor={coor}
          />
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default StationDetailMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },

  sheetContainer: {
    // height: 100,
    backgroundColor: 'white',
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.75,
    shadowRadius: 16.0,
    elevation: 30,
  },
});
