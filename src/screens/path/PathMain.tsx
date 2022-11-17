import {
  View,
  StyleSheet,
  useWindowDimensions,
  Pressable,
  Text,
  Image,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import GlobalStyles from 'styles/GlobalStyles';
import BottomNav from '@components/BottomNav';
import {useDispatch, useSelector} from 'react-redux';
import NaverMapView, {Align, Marker} from 'react-native-nmap';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {_getHeight, _getWidth} from 'constants/utils';
import PathSearchBox from './components/PathSearchBox';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {RootState} from 'redux/store';
import {Shadow} from 'react-native-shadow-2';
import FontList from 'constants/FontList';
import commonAPI from 'api/modules/commonAPI';
import Loading from '@components/Loading';
import modules from 'constants/utils/modules';
import {setBottomIdx} from 'redux/reducers/navReducer';
import Geolocation from 'react-native-geolocation-service';
import {setCurrentUserLocation} from 'redux/reducers/locationReducer';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import {commonTypes} from '@types';
import {PERMISSIONS} from 'react-native-permissions';

interface coor {
  latitude: number;
  longitude: number;
  zoom: number;
}

const PathMain = () => {
  const dispatch = useDispatch();
  const nav = useNavigation<commonTypes.navi>();

  const {currentUserLocation} = useSelector(
    (state: RootState) => state.locationReducer,
  );
  console.log('currentUserLocation,', currentUserLocation);

  const [lineData, setLineData] = useState([]);
  const layout = useWindowDimensions();
  const [modal, setModal] = useState(false);

  const [showOnlyMap, setShowOnlyMap] = useState(false);

  const [center, setCenter] = useState<coor>();
  const [startCoor, setStartCoor] = useState<coor | undefined>();

  // 길안내모달
  const [visible, setVisible] = useState(false);

  // map ref
  const mapRef = useRef();

  // ########## 바텀 시트 ##########
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => [300], []);
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
  // ########## END 바텀시트 ##########

  // 추천 목록 가져오기
  const _getRecomand = async () => {
    let data;
    //현재가 아닌 도착지와 목적지로
    // data = {
    //   route: [
    //     [currentUserLocation.latitude, currentUserLocation.longitude],
    //     [goalData.location.lat, goalData.location.lon],
    //   ],
    //   distance: 1,
    // };

    await commonAPI
      ._postPathRecommend(data)
      .then(res => {
        console.log('path recomand res', res.data.data);
      })
      .catch(err => console.log('path recomand  ERR ', err));
  };

  // 경로 표시
  const _getPath = async () => {
    //위와 동일 현재 아니고 도착지로
    setModal(true);
    // let data = {
    //   start: `${currentUserLocation.longitude},${currentUserLocation.latitude}`,
    //   end: `${pickedRec.longitude},${pickedRec.latitude}`,
    // };
    let data = {};
    await commonAPI
      ._getPathLine(data)
      .then(res => {
        if (res.data.route) {
          let temp;
          if (currentUserLocation) {
            temp = [
              {
                latitude: currentUserLocation.latitude,
                longitude: currentUserLocation.longitude,
              },
            ];
          }
          res.data.route.map((item: any, index: number) => {
            temp.push({latitude: item[1], longitude: item[0]});
          });
          console.log('temp', temp);
          // setLineData(temp);
        }
      })
      .catch(err => console.log('paht ERR', err));
  };

  const _getAddrByCoor = async () => {
    const param = {
      x: currentUserLocation.longitude,
      y: currentUserLocation.latitude,
    };
    await commonAPI
      ._getAddrByCoor(param)
      .then(res => {
        if (res?.data?.documents?.length > 0) {
          // dispatch(setStart(res.data.documents[0].address_name));
        }
        console.log('add res', res.data.documents);
      })
      .catch(err => console.log('add err', err));
  };

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

  const _onPressMyLocation = () => {
    if (currentUserLocation) {
      setCenter({
        latitude: currentUserLocation.latitude,
        longitude: currentUserLocation.longitude,
        zoom: 16,
      });
    } else {
    }
  };

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

  useEffect(() => {
    if (currentUserLocation) {
      _getAddrByCoor();
      setCenter({
        latitude: currentUserLocation.latitude,
        longitude: currentUserLocation.longitude,
        zoom: 16,
      });
    }
    dispatch(setBottomIdx(2));
  }, []);

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
            onMapClick={e => {}}
            zoomControl={false}
            useTextureView={true}
            style={{
              height: layout.height - 60,
            }}
            onCameraChange={e => {}}
            scaleBar={false}
            showsMyLocationButton={false}
            tiltGesturesEnabled={false}
            center={center ? center : undefined}>
            {/* 현재 위치 마커 */}
            {/* <Marker
              width={35}
              height={35}
              zIndex={100}
              image={require('@assets/my_location.png')}
              coordinate={currentUserLocation}
            /> */}

            {/* 출발지 마커 */}
            {currentUserLocation && (
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
                onClick={() => _onClickStart()}
                coordinate={{
                  latitude: Number(currentUserLocation.latitude),
                  longitude: Number(currentUserLocation.longitude),
                }}
              />
            )}

            {/* 도착지 마커 */}
            {/* <Marker
              width={32}
              height={65}
              onClick={() => {
                setCenter({
                  latitude: goalData.location.lat,
                  longitude: goalData.location.lon,
                  zoom: 14,
                });
                bottomSheetRef.current?.present();
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
                latitude: goalData.location.lat,
                longitude: goalData.location.lon,
              }}
            /> */}

            {/* 도착지 목적지 라인 */}
            {/* <Path
                coordinates={lineData}
                width={7}
                color={'#07B3FD'}
                outlineColor={'#07B3FD'}
                pattern={require('@assets/top_ic_history_w3.png')}
                patternInterval={25}
              /> */}

            {/* 추천 중전기 마커들 */}
            {/* <Marker
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
            /> */}
          </NaverMapView>
          <BottomSheetModal
            style={sheetStyle}
            ref={bottomSheetRef}
            footerComponent={() => (
              <Pressable
                onPress={() => {}}
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
                  위치 설정
                </Text>
              </Pressable>
            )}
            index={0}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}>
            <View></View>
          </BottomSheetModal>

          <Shadow
            distance={3}
            containerStyle={{
              position: 'absolute',
              zIndex: 500,
              bottom: 131,
              right: 16,
            }}
            style={{
              width: 36,
              height: 36,
              borderRadius: 36 / 2,
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Pressable
              hitSlop={5}
              onPress={() => {
                _onPressMyLocation();
              }}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('@assets/location.png')}
                style={{width: 20, height: 20}}
                resizeMode="contain"
              />
            </Pressable>
          </Shadow>
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
