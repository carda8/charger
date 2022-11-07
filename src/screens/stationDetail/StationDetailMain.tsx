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

const StationDetailMain = () => {
  const data = [1, 2, 3, 4, 5, 5];
  const dataFee = [1, 2, 3, 4, 5, 6, , 6, 7, 8];
  const [modal, setModal] = useState(false);

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
                급속2
              </Text>
              <Text
                style={{
                  fontFamily: FontList.PretendardMedium,
                  fontSize: 16,
                  color: '#6FCF24',
                  marginVertical: _getHeight(4),
                }}>
                충전가능
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
                  opacity: 0.3,
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
                  DC차데모
                </Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0.3,
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
                  AC3상
                </Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0.3,
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
        <View
          style={{
            width: 18,
            height: 18,
            backgroundColor: '#D9D9D9',
            marginRight: 4,
          }}></View>
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
    console.log('handleSheetChanges', index);
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
              data={data}
              keyExtractor={(item, index) => String(index)}
              renderItem={item => renderItem(item)}
              showsVerticalScrollIndicator={false}
              style={{marginBottom: _getHeight(65)}}
              ListHeaderComponent={
                <>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        backgroundColor: '#D9D9D9',
                        marginRight: 4,
                      }}
                    />
                    <Text
                      style={{
                        fontFamily: FontList.PretendardRegular,
                        fontSize: 20,
                        color: 'black',
                      }}>
                      판교테크노밸리
                    </Text>
                  </View>
                  <View style={{marginTop: 10}}>
                    <Text
                      style={{
                        fontFamily: FontList.PretendardMedium,
                        color: '#959595',
                      }}>
                      경기도 성남시 분당구 판교로227번길 6
                    </Text>
                  </View>
                  <DashBoard bottomSheetRef={bottomSheetRef} />
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

          <NavModal title="길안내 연결" visible={modal} setVisible={setModal} />
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
