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
import NaverMapView, {
  Align,
  MapType,
  Marker,
  MapOverlay,
} from 'react-native-nmap';
import {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {
  FlatList,
  GestureHandlerRootView,
  ScrollView,
  TextInput,
} from 'react-native-gesture-handler';
import {_getHeight, _getWidth} from 'constants/utils';
import StationCount from './Components/StationCount';
import StationListItem from './Components/StationListItem';
import BottomButton from '@components/BottomButton';
import NavModal from '@components/NavModal';
import SearchBox from './Components/SearchBox';
import {Shadow} from 'react-native-shadow-2';
import {commonTypes} from '@types';
import {RootState} from 'redux/store';
import {API} from 'api/API';
import {_postAPI} from 'api/apiModules';
import commonAPI from 'api/modules/commonAPI';
import FontList from 'constants/FontList';
import MyModal from '@components/MyModal';
import Loading from '@components/Loading';

const AroundMain = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const layout = useWindowDimensions();
  const nav = useNavigation<commonTypes.navi>();
  const res =
    useRoute<RouteProp<commonTypes.RootStackParamList, 'AroundMain'>>().params
      ?.res;
  const {currentUserLocation} = useSelector(
    (state: RootState) => state.locationReducer,
  );

  const [repair, setRepair] = useState(false);

  const [stationList, setStationList] = useState([]);
  const [clickedMarker, setClickedMarker] = useState({
    latitude: 37.5246544,
    longitude: 126.8881368,
    zoom: 10,
  });
  const [loading, setLoading] = useState(false);

  console.log('res route', res);
  console.log('currentUserLocation', currentUserLocation);

  const P0 = {latitude: 37.5246544, longitude: 126.8881368};
  // const P1 = {latitude: 37.565051, longitude: 126.978567};
  // const P2 = {latitude: 37.565383, longitude: 126.976292};

  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [data2, setData2] = useState([1]);

  const [visible, setVisible] = useState(false);

  // ref
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [pick, setPick] = useState<any>();
  // variables
  // /layout.height * 0.3 + 60
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
    const data = {
      minx: 36.51819266068017,
      miny: 125.88493806868793,
      maxx: 38.529050492873274,
      maxy: 127.89146555960178,
      currentXY: [37.5246544, 126.8881368],
      zcode: ['11', '50'],
      parkingFree: 'Y',
      busiId: ['ME'],
      chgerTypeInfo: ['AC완속'],
      offset: 0,
      limit: 30,
    };
    setLoading(true);
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
        }, 1200);
      });
  };

  const renderItem: ListRenderItem<any> = item => {
    return (
      <StationListItem
        item={item.item}
        setPick={setPick}
        pick={pick}
        style={{borderBottomWidth: pick ? 0 : 1}}
      />
    );
  };

  useEffect(() => {
    _getAroundStation();
  }, []);

  useEffect(() => {
    if (isFocused) {
      dispatch(setBottomIdx(1));
    }
  }, [isFocused]);

  const _getCenter = () => {
    if (clickedMarker.latitude && clickedMarker.longitude) {
      const coor = {
        latitude: Number(clickedMarker.latitude),
        longitude: Number(clickedMarker.longitude),
        zoom: 14,
      };
      console.log('coor', coor);
      return coor;
    } else return {...P0, zoom: 10};
  };

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
          <SearchBox />
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
        showsMyLocationButton={false}
        style={{
          flex: 1,
        }}
        zoomControl={false}
        scaleBar={false}
        // showsMyLocationButton={true}
        center={{...clickedMarker}}
        onTouch={(e: any) => console.log(e.navtiveEvent)}
        // onCameraChange={e =>
        //   console.log('onCameraChange', JSON.stringify(e))
        // }
        useTextureView={true}
        onMapClick={e => console.log('onMapClick', JSON.stringify(e))}>
        <Marker
          pinColor="blue"
          coordinate={{...P0}}
          image={require('@assets/my_location.png')}
          width={20}
          height={20}
          onClick={() => console.log('onClick! p0')}
        />
        {/* 파란색은 급속, 녹색은 완속, 회색은 충전불가를 나타냅니다. ?????*/}
        {stationList.map((item, index) => (
          <Marker
            key={index}
            width={32}
            height={37.7}
            onClick={() => {
              setClickedMarker({
                latitude: Number(item.location.lat),
                longitude: Number(item.location.lon),
                zoom: 14,
              });
              console.log('hi', item);
            }}
            coordinate={{
              latitude: Number(item.location.lat),
              longitude: Number(item.location.lon),
            }}>
            <ImageBackground
              source={require('@assets/marker_green.png')}
              style={{
                width: 32,
                height: 38,
                alignItems: 'center',
                justifyContent: 'center',
                paddingBottom: '20%',
              }}
              resizeMode="contain">
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontFamily: FontList.PretendardBold,
                }}>
                {item?.chargers.length > 9 ? '9+' : item?.chargers.length}
              </Text>
            </ImageBackground>
          </Marker>
        ))}
      </NaverMapView>
      <BottomSheetModal
        style={sheetStyle}
        ref={bottomSheetRef}
        animateOnMount={true}
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
              latitude: P0.latitude,
              longitude: P0.longitude,
              zoom: 14,
            });
          }}
          style={{alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={require('@assets/location.png')}
            style={{width: 20, height: 20}}
            resizeMode="contain"
          />
        </Pressable>
      </Shadow>

      {/* 주변 충전기 버튼 */}
      <StationCount bottomSheetRef={bottomSheetRef} stationList={stationList} />

      {/* 길안내 연결 모달 */}
      <NavModal visible={visible} setVisible={setVisible} title="길안내 연결" />

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
