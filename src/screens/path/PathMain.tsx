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
import {RouteProp, useIsFocused, useRoute} from '@react-navigation/native';
import NaverMapView, {
  Align,
  Marker,
  Path,
  Polygon,
  Polyline,
} from 'react-native-nmap';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import {_getHeight, _getWidth} from 'constants/utils';
import BottomButton from '@components/BottomButton';
import NavModal from '@components/NavModal';
import {commonTypes} from '@types';
import PathSearchBox from './components/PathSearchBox';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import StationListItem from '@screens/around/Components/StationListItem';
import {RootState} from 'redux/store';
import {Shadow} from 'react-native-shadow-2';
import FontList from 'constants/FontList';
import commonAPI from 'api/modules/commonAPI';
import {setGoal, setStart} from 'redux/reducers/pathReducer';
import Loading from '@components/Loading';
import modules from 'constants/utils/modules';

const PathMain = () => {
  const dispatch = useDispatch();
  const [showRecomend, setShowRecomend] = useState(false);
  const {goal, start} = useSelector((state: RootState) => state.pathReducer);
  const {currentUserLocation} = useSelector(
    (state: RootState) => state.locationReducer,
  );
  const [pickedRecomend, setPickedRecomend] = useState<number>();
  const [recomandList, setRecomandList] = useState([]);
  const [lineData, setLineData] = useState([]);
  const layout = useWindowDimensions();
  const [modal, setModal] = useState(false);
  const P0 = {latitude: 37.564362, longitude: 126.977011};

  const [showOnlyMap, setShowOnlyMap] = useState(false);

  const [center, setCenter] = useState<any>({
    latitude: currentUserLocation.latitude,
    longitude: currentUserLocation.longitude,
    zoom: 16,
  });

  const route =
    useRoute<RouteProp<commonTypes.RootStackParamList, 'PathMain'>>().params
      ?.item;

  const [visible, setVisible] = useState(false);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [pick, setPick] = useState(false);
  const snapPoints = useMemo(() => [_getHeight(layout.height * 0.57)], []);

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

  const goalCoor = {
    latitude: 37.498418405021695,
    longitude: 127.02862499003908,
    zoom: 16,
  };

  const _getRecomand = async () => {
    let data = {
      route: [
        [currentUserLocation.latitude, currentUserLocation.longitude],
        [37.498418405021695, 127.02862499003908],
      ],
      distance: 1,
    };
    await commonAPI
      ._postPathRecommend(data)
      .then(res => {
        console.log('path recomand res', res.data.data);
        setRecomandList(res.data.data);
      })
      .catch(err => console.log('path recomand  ERR ', err));
  };

  // 경로 표시
  const _getPath = async () => {
    setModal(true);
    let data = {
      start: `${currentUserLocation.longitude},${currentUserLocation.latitude}`,
      end: '127.02862499003908,37.498418405021695',
    };

    if (center) {
      data = {
        start: `${currentUserLocation.longitude},${currentUserLocation.latitude}`,
        end: `${center.longitude},${center.latitude}`,
      };
    }
    console.log('_getPath', data);
    await commonAPI
      ._getPathLine(data)
      .then(res => {
        if (res.data.route) {
          let temp = [
            {
              latitude: currentUserLocation.latitude,
              longitude: currentUserLocation.longitude,
            },
          ];
          res.data.route.map((item, index) => {
            temp.push({latitude: item[1], longitude: item[0]});
          });
          console.log('temp', temp);
          setLineData(temp);
        }
      })
      .catch(err => console.log('paht ERR', err));
  };

  useEffect(() => {
    if (route) {
      setCenter({
        latitude: goalCoor.latitude,
        longitude: goalCoor.longitude,
        zoom: 16,
      });
      bottomSheetRef.current?.present();
    }
  }, [route]);

  useEffect(() => {
    if (showRecomend) {
      _getRecomand();
    }
  }, [showRecomend]);

  // useEffect(() => {
  //   _getPath();
  // }, []);

  useEffect(() => {
    if (center && showRecomend) {
      _getPath();
    }
  }, [center]);

  const _getAddrByCoor = async () => {
    const param = {
      x: currentUserLocation.longitude,
      y: currentUserLocation.latitude,
    };
    await commonAPI
      ._getAddrByCoor(param)
      .then(res => {
        if (res?.data?.documents?.length > 0) {
          dispatch(setStart(res.data.documents[0].address_name));
        }
        console.log('add res', res.data.documents);
      })
      .catch(err => console.log('add err', err));
  };

  useEffect(() => {
    if (currentUserLocation) {
      _getAddrByCoor();
    }
  }, []);

  useEffect(() => {
    if (lineData?.length > 0) {
      setTimeout(() => {
        mapRef?.current?.animateToCoordinates(lineData, {
          top: 500,
          bottom: 500,
          left: 275,
          right: 275,
        });
        setModal(false);
      }, 200);
    }
  }, [lineData]);

  const _getMarkerImg = (item: any) => {
    let isAc = false;
    let isDc = false;
    let close = modules._isClosed(item);

    // console.log('is CLOSED? ::', close);
    item.chargers.map((item, index) => {
      if (
        item.chgerTypeInfo === 'DC차데모+AC3상+DC콤보' ||
        item.chgerTypeInfo === 'DC차데모+AC3상'
      ) {
        isAc = true;
        isDc = true;
      }

      if (item.chgerTypeInfo === 'AC완속' || item.chgerTypeInfo === 'AC3상')
        isAc = true;
      else isDc = true;
    });
    if (!item) return;
    if (!close) return require('@assets/marker_close.png');
    if (isAc && isDc) return require('@assets/marker_mix.png');
    if (isAc && !isDc) return require('@assets/marker_normal.png');
    if (isDc && !isAc) return require('@assets/marker_fast.png');
    if (!isAc && !isDc) return require('@assets/marker_normal.png');
  };

  const mapRef = useRef();

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
            ref={mapRef}
            compass={false}
            rotateGesturesEnabled={false}
            onMapClick={e => {
              console.log('coor', e);
              if (showOnlyMap) {
                setShowOnlyMap(!showOnlyMap);
              }
            }}
            zoomControl={false}
            useTextureView={true}
            style={{
              // flex: 1,
              // width: '100%',
              height: layout.height - 60,
            }}
            onCameraChange={e => console.log('changed', e)}
            scaleBar={false}
            showsMyLocationButton={false}
            tiltGesturesEnabled={false}
            center={center}>
            <Marker
              width={32}
              height={65}
              caption={{
                text: '출발',
                align: Align.Center,
                haloColor: '16B112',
                textSize: 13,
                color: 'ffffff',
              }}
              zIndex={100}
              image={require('@assets/marker_normal.png')}
              coordinate={currentUserLocation}
            />
            {/* 도착지 마커 */}
            {route && (
              <Marker
                width={32}
                height={65}
                onClick={() => {
                  setCenter({
                    latitude: 37.498418405021695,
                    longitude: 127.02862499003908,
                    zoom: 14,
                  });
                }}
                caption={{
                  text: '도착',
                  align: Align.Center,
                  haloColor: '166DF0',
                  textSize: 13,
                  color: 'ffffff',
                }}
                image={require('@assets/marker_fast.png')}
                coordinate={{
                  latitude: 37.498418405021695,
                  longitude: 127.02862499003908,
                }}
              />
            )}
            {/* 도착지 목적지 라인 */}
            {lineData.length > 0 && showRecomend && (
              <Path
                coordinates={lineData}
                width={1.5}
                color={'red'}
                outlineColor={'red'}
              />
            )}
            {/* 추천 중전기 마커들 */}
            {recomandList.length > 0 &&
              recomandList.map((item, index) => (
                <Marker
                  key={index}
                  width={32}
                  height={65}
                  onClick={() => {
                    console.log('item', item);
                    setCenter({
                      latitude: item.location.lat,
                      longitude: item.location.lon,
                      zoom: 14,
                    });
                  }}
                  caption={{
                    text:
                      item.chargers.length > 9
                        ? '9+'
                        : String(item.chargers.length),
                    align: Align.Center,
                    haloColor: 'A6A6A6',
                    textSize: 15,
                    color: 'ffffff',
                  }}
                  image={_getMarkerImg(item)}
                  coordinate={{
                    latitude: Number(item.location.lat),
                    longitude: Number(item.location.lon),
                  }}
                />
              ))}
          </NaverMapView>
          <BottomSheetModal
            style={sheetStyle}
            ref={bottomSheetRef}
            animateOnMount={true}
            footerComponent={() => (
              <Pressable
                onPress={() => {
                  setShowRecomend(true);
                  bottomSheetRef.current?.close();
                }}
                style={[
                  {
                    height: 54,
                    backgroundColor: '#00239C',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 8,
                    marginTop: 'auto',
                    marginBottom: 22,
                    marginHorizontal: 16,
                  },
                ]}>
                <Text
                  style={{
                    fontFamily: FontList.PretendardBold,
                    fontSize: 16,
                    color: 'white',
                  }}>
                  경로 설정
                </Text>
              </Pressable>
            )}
            index={0}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}>
            <StationListItem
              style={{borderBottomWidth: 0}}
              bottomSheetRef={bottomSheetRef}
              setPick={setPick}
              item={route}
              pick={pick}
              goal={goal}
              isPath={true}
            />
          </BottomSheetModal>

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
                  {recomandList.map((item, index) => (
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
                        onPress={() => {
                          setPickedRecomend(index);
                          dispatch(setGoal(item.addr));
                          setCenter({
                            latitude: item.location.lat,
                            longitude: item.location.lon,
                            zoom: 14,
                          });
                        }}
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
                            numberOfLines={1}
                            style={{
                              flex: 1,
                              fontFamily: FontList.PretendardRegular,
                              color: 'black',
                              lineHeight: 24,
                            }}>
                            {item?.statNm}
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
                          numberOfLines={1}
                          style={{
                            fontFamily: FontList.PretendardRegular,
                            fontSize: 12,
                            color: '#666666',
                            lineHeight: 24,
                          }}>
                          {item?.addr}
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
            coor={
              recomandList.length > 0 &&
              pickedRecomend && {
                latitude: recomandList[pickedRecomend].location.lat,
                longitude: recomandList[pickedRecomend].location.lon,
              }
            }
            visible={visible}
            setVisible={setVisible}
            title="길안내 연결"
          />
          <BottomNav />
          <Loading visible={modal} />
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
