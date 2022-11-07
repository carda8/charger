import {
  View,
  StyleSheet,
  useWindowDimensions,
  Pressable,
  Text,
  ImageBackground,
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
  const {goal, start} = useSelector((state: RootState) => state.pathReducer);
  const recomendList = [1, 2, 3, 4];
  const [pickedRecomend, setPickedRecomend] = useState<number>();
  const layout = useWindowDimensions();
  const P0 = {latitude: 37.564362, longitude: 126.977011};

  const P1 = {
    latitude: 37.573563090476725,
    longitude: 126.98308669525267,
    zoom: 15,
  };
  const P2 = {
    latitude: 37.561682976455955,
    longitude: 126.99405480283474,
    zoom: 15,
  };
  const P3 = {
    latitude: 37.54731262277241,
    longitude: 126.96262053836222,
    zoom: 15,
  };
  const P4 = {
    latitude: 37.66135049861896,
    longitude: 126.86227420843852,
    zoom: 15,
  };
  const [showOnlyMap, setShowOnlyMap] = useState(false);

  const [center, setCenter] = useState<any>({
    latitude: 37.564362,
    longitude: 126.977011,
    zoom: 16,
  });

  const route =
    useRoute<RouteProp<commonTypes.RootStackParamList, 'PathMain'>>().params
      ?.item;

  console.log('route', route);
  console.log('goal', goal);
  console.log('start', start);

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
    [],
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
  }, [isFocused]);

  useEffect(() => {
    switch (pickedRecomend) {
      case 0:
        return setCenter(P1);
      case 1:
        return setCenter(P2);
      case 2:
        return setCenter(P3);
      case 3:
        return setCenter(P4);
      default:
        return;
    }
  }, [pickedRecomend]);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <SafeAreaView style={{...GlobalStyles.safeAreaStyle}}>
          {!showOnlyMap && (
            <View
              style={{
                position: 'absolute',
                zIndex: 100,
                width: '100%',
              }}>
              <PathSearchBox
                showOnlyMap={showOnlyMap}
                setShowOnlyMap={setShowOnlyMap}
                sheetRef={bottomSheetRef}
              />
            </View>
          )}

          <NaverMapView
            compass={false}
            onMapClick={e => {
              console.log('coor', e);
              if (showOnlyMap) {
                setShowOnlyMap(!showOnlyMap);
                if (start && goal) bottomSheetRef.current?.present();
              }
            }}
            zoomControl={false}
            useTextureView={true}
            style={{
              width: '100%',
              height: layout.height - _getHeight(60),
            }}
            scaleBar={false}
            showsMyLocationButton={false}
            tiltGesturesEnabled={false}
            center={center}
            onTouch={(e: any) => console.log(e.navtiveEvent)}>
            <Marker
              pinColor="blue"
              coordinate={{...P0}}
              image={require('@assets/my_location.png')}
              width={20}
              height={20}
              onClick={() => console.log('onClick! p0')}
            />

            {showRecomend && (
              <>
                <Marker
                  coordinate={{...P1}}
                  width={32}
                  height={37.7}
                  onClick={() => console.log('onClick! p0')}>
                  <ImageBackground
                    source={require('@assets/marker_green.png')}
                    style={{
                      width: 32,
                      height: 38,
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingBottom: '20%',
                    }}
                    resizeMode="contain"></ImageBackground>
                </Marker>
                <Marker
                  coordinate={{...P2}}
                  width={32}
                  height={37.7}
                  onClick={() => console.log('onClick! p0')}>
                  <ImageBackground
                    source={require('@assets/marker_green.png')}
                    style={{
                      width: 32,
                      height: 38,
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingBottom: '20%',
                    }}
                    resizeMode="contain"></ImageBackground>
                </Marker>
                <Marker
                  coordinate={{...P3}}
                  width={32}
                  height={37.7}
                  onClick={() => console.log('onClick! p0')}>
                  <ImageBackground
                    source={require('@assets/marker_green.png')}
                    style={{
                      width: 32,
                      height: 38,
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingBottom: '20%',
                    }}
                    resizeMode="contain"></ImageBackground>
                </Marker>
                <Marker
                  coordinate={{...P4}}
                  width={32}
                  height={37.7}
                  onClick={() => console.log('onClick! p0')}>
                  <ImageBackground
                    source={require('@assets/marker_green.png')}
                    style={{
                      width: 32,
                      height: 38,
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingBottom: '20%',
                    }}
                    resizeMode="contain"></ImageBackground>
                </Marker>
              </>
            )}
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
                bottomSheetRef={bottomSheetRef}
                item={route}
                setPick={setPick}
                pick={pick}
                goal={goal}
                style={{borderBottomWidth: 0}}
              />
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
                            낙동강 휴게소 {index}
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
