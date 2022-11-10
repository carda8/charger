import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ListRenderItem,
  useWindowDimensions,
  Image,
  ImageBackground,
  Keyboard,
  Dimensions,
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
import {BottomSheetFlatList, BottomSheetModal} from '@gorhom/bottom-sheet';
import {ScrollView} from 'react-native-gesture-handler';
import {_getHeight, _getWidth} from 'constants/utils';
import StationCount from './Components/StationCount';
import StationListItem from './Components/StationListItem';
import BottomButton from '@components/BottomButton';
import NavModal from '@components/NavModal';
import SearchBox from './Components/SearchBox';
import {Shadow} from 'react-native-shadow-2';
import {commonTypes} from '@types';
import {RootState} from 'redux/store';
import {_postAPI} from 'api/apiModules';
import commonAPI from 'api/modules/commonAPI';
import FontList from 'constants/FontList';
import MyModal from '@components/MyModal';
import Loading from '@components/Loading';
import modules from 'constants/utils/modules';

const AroundMain = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const layout = useWindowDimensions();
  const nav = useNavigation<commonTypes.navi>();
  const res =
    useRoute<RouteProp<commonTypes.RootStackParamList, 'AroundMain'>>().params
      ?.res;
  console.log(':::::::::: res', res);
  const coverRef = useRef(0);

  const {currentUserLocation} = useSelector(
    (state: RootState) => state.locationReducer,
  );
  const [reload, setReload] = useState(false);
  const [reloadCover, setReloadCover] = useState<any>();

  const [repair, setRepair] = useState(false);

  const [stationList, setStationList] = useState([]);
  const [clickedMarker, setClickedMarker] = useState<any>({
    latitude: currentUserLocation.latitude
      ? Number(currentUserLocation.latitude)
      : 37.5666805,
    longitude: currentUserLocation.longitude
      ? Number(currentUserLocation.longitude)
      : 126.9784147,
    zoom: 14,
  });

  useEffect(() => {
    if (res) {
      setClickedMarker({
        latitude: res.location.lat,
        longitude: res.location.lon,
        zoom: 16,
      });
    }
  }, [res]);

  const [loading, setLoading] = useState(false);

  // console.log('res route', res);
  // console.log('currentUserLocation', currentUserLocation);
  const [covering, setCovering] = useState<any>();

  const [visible, setVisible] = useState(false);

  // ref
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [pick, setPick] = useState<any>();
  // variables
  const snapPoints = useMemo(() => [pick ? '40%' : '80%'], [pick]);

  // callbacks
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

  const _getAroundStation = async () => {
    setLoading(true);

    const data = {
      minx: covering[0].latitude,
      miny: covering[0].longitude,
      maxx: covering[2].latitude,
      maxy: covering[2].longitude,
      currentXY: [currentUserLocation.latitude, currentUserLocation.longitude],
      // zcode: ['11', '50'],
      // parkingFree: 'Y',
      // busiId: ['ME'],
      // chgerTypeInfo: ['AC완속'],
      offset: 0,
      limit: 30,
    };
    console.log('#### current xy', data);
    await commonAPI
      ._postSearchStationCoor(data)
      .then(res => {
        setStationList(res?.data.data);
        console.log('res', res?.data);
      })
      .catch(err => console.log('err', err))
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
  };

  const renderItem: ListRenderItem<any> = item => {
    console.log('## item', item);
    return (
      <StationListItem
        setClickedMarker={setClickedMarker}
        bottomSheetRef={bottomSheetRef}
        item={item.item}
        setPick={setPick}
        pick={pick}
        style={{borderBottomWidth: pick ? 0 : 1}}
      />
    );
  };

  useEffect(() => {
    if (covering) {
      console.log('## cover', covering);
      _getAroundStation();
    }
    coverRef.current = coverRef.current + 1;
    if (coverRef.current === 3) reloadRef.current = reloadRef.current + 2;
    else reloadRef.current = reloadRef.current + 1;
  }, [covering]);

  useEffect(() => {
    if (isFocused) {
      dispatch(setBottomIdx(1));
    }
  }, [isFocused]);

  useEffect(() => {
    if (pick && isFocused) {
      bottomSheetRef.current?.present();
    }
  }, [pick]);

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

  const reloadRef = useRef(0);

  const arrFliter = ['충전속도', '충전소 유무료', '주차요금', '현재이용가능'];

  return (
    <SafeAreaView style={{...GlobalStyles.safeAreaStyle}}>
      <View
        style={{
          zIndex: 100,
          alignSelf: 'center',
          position: 'absolute',
          width: layout.width,
        }}>
        <View style={{marginHorizontal: 10}}>
          <SearchBox bottomSheetRef={bottomSheetRef} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 10,
          }}>
          <Pressable
            onPress={() => {
              nav.navigate('AroundFilter');
            }}
            style={{marginRight: 5}}>
            <Image
              source={require('@assets/filter.png')}
              style={{width: 18, height: 18}}
              resizeMode="contain"
            />
          </Pressable>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            overScrollMode={'never'}
            contentContainerStyle={{paddingVertical: 10}}>
            <View style={{flexDirection: 'row'}}>
              {arrFliter.map((item, idx) => (
                <Shadow
                  key={idx}
                  stretch={true}
                  distance={2}
                  containerStyle={{
                    marginHorizontal: 4,
                  }}>
                  <Pressable
                    onPress={() => {
                      setRepair(!repair);
                    }}
                    key={idx}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingHorizontal: 14,
                      height: 30,
                      backgroundColor: 'white',
                      borderRadius: 53,
                    }}>
                    <Text>{item}</Text>
                  </Pressable>
                </Shadow>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
      <NaverMapView
        compass={false}
        tiltGesturesEnabled={false}
        rotateGesturesEnabled={false}
        showsMyLocationButton={false}
        style={{
          flex: 1,
        }}
        useTextureView={true}
        zoomControl={false}
        scaleBar={false}
        center={clickedMarker ? clickedMarker : undefined}
        onInitialized={() => {}}
        onCameraChange={e => {
          console.log('############### camera cha', e);
          setReloadCover(e.coveringRegion);
          if (reloadRef.current > 3) setReload(true);
          console.log('rerere', reloadRef.current);
          if (coverRef.current < 3) setCovering(e.coveringRegion);
          if (clickedMarker) setClickedMarker(undefined);
        }}
        onMapClick={e => bottomSheetRef.current?.close()}>
        <Marker
          pinColor="blue"
          zIndex={100}
          coordinate={currentUserLocation}
          image={require('@assets/my_location.png')}
          width={20}
          height={20}
          onClick={() => console.log('onClick! p0')}
        />
        {stationList?.map((item, index) => (
          <Marker
            key={index}
            width={32}
            height={48}
            // animated={true}
            onClick={() => {
              console.log('## station info ::', item);
              setPick([item]);
              setClickedMarker({
                latitude: Number(item.location.lat),
                longitude: Number(item.location.lon),
                zoom: 16,
              });
            }}
            coordinate={{
              latitude: Number(item.location.lat),
              longitude: Number(item.location.lon),
            }}>
            <ImageBackground
              source={_getMarkerImg(item)}
              style={{
                width: 32,
                height: 48,
                alignItems: 'center',
                justifyContent: 'center',
                paddingBottom: '42%',
              }}
              resizeMode="contain">
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontFamily: FontList.PretendardBold,
                }}>
                {loading
                  ? ''
                  : item?.chargers.length > 9
                  ? '9+'
                  : item?.chargers.length}
              </Text>
            </ImageBackground>
          </Marker>
        ))}
      </NaverMapView>
      <BottomSheetModal
        style={sheetStyle}
        ref={bottomSheetRef}
        footerComponent={() =>
          pick ? (
            <BottomButton
              text="도착지 설정"
              style={{marginHorizontal: 16}}
              setVisible={setVisible}
            />
          ) : (
            <></>
          )
        }
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <BottomSheetFlatList
          showsVerticalScrollIndicator={true}
          data={pick ? pick : stationList}
          keyExtractor={(item, idx) => String(idx) + String(item)}
          renderItem={item => renderItem(item)}
          style={{marginBottom: pick ? undefined : 60}}
        />
        {!pick && <BottomNav />}
      </BottomSheetModal>

      <Shadow
        distance={3}
        containerStyle={{
          position: 'absolute',
          zIndex: 100,
          bottom: 173,
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
          style={{alignItems: 'center', justifyContent: 'center'}}
          onPress={() => {
            nav.navigate('FavStationMain');
          }}>
          <Image
            source={require('@assets/star_off.png')}
            style={{width: 20, height: 20}}
            resizeMode="contain"
          />
        </Pressable>
      </Shadow>

      <Shadow
        distance={3}
        containerStyle={{
          position: 'absolute',
          zIndex: 100,
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
          onPress={() => {
            setClickedMarker({
              latitude: Number(currentUserLocation.latitude),
              longitude: Number(currentUserLocation.longitude),
              zoom: 14,
            });
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

      {/* 주변 충전기 버튼 */}
      {!reload ? (
        <StationCount
          bottomSheetRef={bottomSheetRef}
          stationList={stationList}
          setPick={setPick}
        />
      ) : (
        <View
          style={{
            alignSelf: 'center',
            position: 'absolute',
            bottom: _getHeight(70),
            // backgroundColor: 'gray',
          }}>
          <Shadow
            distance={4}
            stretch={true}
            style={{
              width: _getWidth(149),
              height: _getHeight(40),
            }}
            containerStyle={{
              flex: 1,
            }}>
            <Pressable
              onPress={() => {
                setCovering(reloadCover);
                setReload(false);
              }}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: _getWidth(149),
                height: _getHeight(40),
                borderRadius: 46,
                backgroundColor: '#00239C',
                zIndex: 1000,
              }}>
              <Text
                style={{
                  includeFontPadding: false,
                  fontFamily: FontList.PretendardRegular,
                  fontSize: 16,
                  color: 'white',
                }}>
                주변 충전소 보기
              </Text>
            </Pressable>
          </Shadow>
        </View>
      )}

      {/*       
<Pressable
          onPress={() => {
            setCovering(reloadCover);
            setReload(false);
          }}
          style={{
            position: 'absolute',
            bottom: 60,
            width: 100,
            height: 100,
            backgroundColor: 'teal',
          }}></Pressable> */}

      {/* 길안내 연결 모달 */}
      <NavModal
        visible={visible}
        setVisible={setVisible}
        title="길안내 연결"
        coor={clickedMarker}
      />

      {/* 빠른 필터 모달 */}
      <MyModal
        title="준비중인 기능입니다"
        positive
        positiveTitle="확인"
        visible={repair}
        setVisible={setRepair}
      />

      <Loading visible={loading} />

      <BottomNav
        style={{position: 'relative'}}
        shadowStyle={{position: 'relative'}}
      />
    </SafeAreaView>
  );
};

export default AroundMain;
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
