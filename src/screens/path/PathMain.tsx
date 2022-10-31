import {
  View,
  StyleSheet,
  useWindowDimensions,
  Pressable,
  Text,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import GlobalStyles from 'styles/GlobalStyles';
import BottomNav from '@components/BottomNav';
import {useDispatch, useSelector} from 'react-redux';
import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {setBottomIdx} from 'redux/reducers/navReducer';
import NaverMapView, {Marker} from 'react-native-nmap';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import {_getHeight, _getWidth} from 'constants/utils';
import BottomButton from '@components/BottomButton';
import NavModal from '@components/NavModal';
import {commonTypes} from '@types';
import PathSearchBox from './components/PathSearchBox';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import StationListItem from '@screens/around/Components/StationListItem';
import {RootState} from 'redux/store';
import routertype from '@router/routertype';
import {Shadow} from 'react-native-shadow-2';
import {setGoal} from 'redux/reducers/pathReducer';
import FontList from 'constants/FontList';

const PathMain = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [showRecomend, setShowRecomend] = useState(false);
  const goal = useSelector((state: RootState) => state.pathReducer.goal);
  const recomendList = [1, 2, 3, 4, 5, 6];
  const [pickedRecomend, setPickedRecomend] = useState<number>();
  // const sheet = useBottomSheet<BottomSheetMethods & bO>();
  const layout = useWindowDimensions();
  const P0 = {latitude: 37.564362, longitude: 126.977011};

  const [visible, setVisible] = useState(false);
  // ref
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [pick, setPick] = useState(false);
  // variables
  const snapPoints = useMemo(() => ['40%'], []);

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
  useEffect(() => {
    if (isFocused) {
      dispatch(setBottomIdx(2));
    }
  }, [isFocused]);

  useEffect(() => {
    if (goal) {
      bottomSheetRef.current?.present();
    } else {
      bottomSheetRef.current?.close();
    }
    return () => {
      dispatch(setGoal(false));
    };
  }, [isFocused, goal]);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <SafeAreaView style={{...GlobalStyles.safeAreaStyle}}>
          <View
            style={{
              position: 'absolute',
              zIndex: 100,
              width: '100%',
            }}>
            <PathSearchBox />
          </View>
          <NaverMapView
            zoomControl={false}
            style={{
              width: '100%',
              height: layout.height - _getHeight(60),
            }}
            scaleBar={false}
            showsMyLocationButton={true}
            center={{...P0, zoom: 16}}
            onTouch={(e: any) => console.log(e.navtiveEvent)}
            useTextureView={true}
            // onCameraChange={e =>
            //   console.log('onCameraChange', JSON.stringify(e))
            // }
            // onMapClick={e => console.log('onMapClick', JSON.stringify(e))}
          >
            <Marker
              coordinate={P0}
              onClick={() => console.log('onClick! p0')}
            />
          </NaverMapView>
          {!showRecomend && (
            <BottomSheetModal
              style={sheetStyle}
              ref={bottomSheetRef}
              animateOnMount={true}
              footerComponent={() => (
                <BottomButton
                  setRecomend={setShowRecomend}
                  text="경로 설정"
                  style={{marginHorizontal: 16}}
                  setVisible={setVisible}
                />
              )}
              index={0}
              snapPoints={snapPoints}
              onChange={handleSheetChanges}>
              <StationListItem
                setPick={setPick}
                pick={pick}
                style={{borderBottomWidth: 0}}
                goal={goal}
              />
              {/* </View> */}
            </BottomSheetModal>
          )}

          {showRecomend && (
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                height: 196,
                zIndex: 100,
                // backgroundColor: 'pink',
              }}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                bounces={false}
                style={{flex: 1}}>
                <View style={{flexDirection: 'row', paddingTop: 4}}>
                  {recomendList.map((item, index) => (
                    <Shadow
                      key={index}
                      offset={[0, 1]}
                      distance={3}
                      style={{
                        width: 169,
                        height: 100,
                      }}
                      containerStyle={{
                        marginHorizontal: 8,
                      }}>
                      <Pressable
                        onPress={() => setPickedRecomend(index)}
                        key={index}
                        style={{
                          flex: 1,
                          backgroundColor: 'white',
                          borderRadius: 3,
                          borderWidth: 2,
                          borderColor:
                            index === pickedRecomend ? '#00C2FF' : 'white',
                          paddingLeft: 6,
                          paddingRight: _getWidth(18),
                          paddingVertical: 6.68,
                        }}>
                        <Text
                          style={{
                            fontFamily: FontList.PretendardBold,
                            color: 'black',
                          }}>
                          추천 충전기
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontFamily: FontList.PretendardRegular,
                              color: 'black',
                              lineHeight: 24,
                            }}>
                            낙동강 휴게소
                          </Text>
                          <Text
                            style={{
                              fontFamily: FontList.PretendardRegular,
                              fontSize: 12,
                              color: '#666666',
                            }}>
                            176.8km
                          </Text>
                        </View>
                        <Text
                          style={{
                            fontFamily: FontList.PretendardRegular,
                            fontSize: 12,
                            color: '#666666',
                            lineHeight: 24,
                          }}>
                          낙동강시 낙동강구
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                          }}>
                          <Text
                            style={{
                              fontFamily: FontList.PretendardRegular,
                              fontSize: 12,
                              color: '#C6C6C6',
                              lineHeight: 24,
                            }}>
                            {'급속 0  |'}
                          </Text>
                          <Text
                            style={{
                              fontFamily: FontList.PretendardRegular,
                              fontSize: 12,
                              color: '#666666',
                              lineHeight: 24,
                            }}>
                            {'  완속 1'}
                          </Text>
                        </View>
                      </Pressable>
                    </Shadow>
                  ))}
                </View>
              </ScrollView>
              <View
                style={{
                  backgroundColor: 'white',
                }}>
                <BottomButton
                  text="도착지 설정"
                  style={{marginHorizontal: 16, marginTop: 8}}
                  setVisible={setVisible}
                />
              </View>
            </View>
          )}

          <NavModal
            visible={visible}
            setVisible={setVisible}
            title="길안내 연결"
          />
          <BottomNav />
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default PathMain;
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
