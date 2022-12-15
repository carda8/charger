import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ListRenderItem,
  useWindowDimensions,
  Image,
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
import NaverMapView, {Align, Marker} from 'react-native-nmap';
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
import {
  setAroundKeyData,
  setCanUse,
  setChgerFree,
  setFreePark,
  setReset,
  setSpeed,
} from 'redux/reducers/aroundReducer';
import RenderItem from '@screens/favStation/components/RenderItem';
import {setUserInfo} from 'redux/reducers/authReducer';

const AroundMain = () => {
  const dispatch = useDispatch();
  const {aroundKeyData} = useSelector(
    (state: RootState) => state.aroundReducer,
  );
  const {currentUserLocation} = useSelector(
    (state: RootState) => state.locationReducer,
  );
  const {userInfo} = useSelector((state: RootState) => state.authReducer);
  const {filter} = useSelector((state: RootState) => state.aroundReducer);
  const AroudRouteProps =
    useRoute<RouteProp<commonTypes.RootStackParamList, 'AroundMain'>>().params;

  const layout = useWindowDimensions();
  const nav = useNavigation<commonTypes.navi>();

  const [reload, setReload] = useState(false);
  const [reloadCover, setReloadCover] = useState<any>();

  const [repair, setRepair] = useState(false);
  const [filterBtn, setFilterBtn] = useState('');
  const [needLogin, setNeedLogin] = useState(false);

  const [stationList, setStationList] = useState([]);
  const [userStar, setUserStar] = useState([]);
  const [clickedMarker, setClickedMarker] = useState<any>();

  const [loading, setLoading] = useState(false);

  const [covering, setCovering] = useState<any>();

  const [visible, setVisible] = useState(false);
  const [pick, setPick] = useState<any>();

  // ref
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const bottomSheetStarRef = useRef<BottomSheetModal>(null);
  const bottomSheetAddr = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => [pick ? 300 : '80%'], [pick]);
  const snapPointsStar = useMemo(() => ['82%'], []);
  const snapPointAddr = useMemo(() => [200], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    // console.log('handleSheetChanges', index);
  }, []);

  const sheetStyle = useMemo(
    () => ({
      ...styles.sheetContainer,
      shadowColor: 'black',
    }),
    [],
  );

  const [starFilter, setStarFilter] = useState('1');
  const [sltdFilter, setSltdFilter] = useState(0);
  const [sltdSpeed, setSltdSpeed] = useState([]);
  const [sltdFee, setSltdFee] = useState([]);
  const [sltdPark, setSltdPark] = useState([]);
  const [showStarFilter, setShowStarFilter] = useState(false);

  const _getUserStars = async () => {
    if (userInfo?.id) {
      const data = {
        user_id: userInfo.id,
        currentXY: `${currentUserLocation.latitude},${currentUserLocation.longitude}`,
        order_by:
          starFilter === '1' ? '' : starFilter === '2' ? 'distance' : 'name',
      };
      await commonAPI
        ._getUserStar(data)
        .then(res => {
          console.log('_getUserStar ## ', res);
          setUserStar(res.data);
        })
        .catch(err => console.log('err', err));
    }
  };

  useEffect(() => {
    _getUserStars();
  }, [starFilter]);

  const chgerSpeed = ['완속', '급속', '초고속'];
  const chgerFee = ['유료 충전소', '무료 충전소'];
  const chgerPark = ['무료주차', '입주민 전용'];
  const chgerCanuse = [''];

  const _convert = () => {
    // if (filter.chgerType) {
    const res = filter?.chgerType?.filter(
      item => item !== '수퍼차저' && item !== '데스티네이션',
    );
    console.log('res chgerTypechgerTypechgerType', res);
    if (filter.speed?.includes('완속')) {
      if (!res.includes('AC완손')) res.push('AC완속');
    }
    if (filter.speed?.includes('급속') || filter.speed?.includes('초고속')) {
      if (!res.includes('DC콤보')) res.push('DC콤보');
      if (!res.includes('DC차데모')) res.push('DC차데모');
      if (!res.includes('AC3상')) res.push('AC3상');
    }
    return res;
    // }
  };

  const _getAroundStation = async () => {
    const parkingFilter = filter?.freePark;
    setLoading(true);
    const data = {
      minx: covering[0].latitude,
      miny: covering[0].longitude,
      maxx: covering[2].latitude,
      maxy: covering[2].longitude,
      currentXY: [currentUserLocation.latitude, currentUserLocation.longitude],
      // zcode: ['11', '50'],
      parkingFree:
        parkingFilter?.length === 0 || parkingFilter?.length === 2
          ? ''
          : parkingFilter[0] === '무료주차'
          ? 'Y'
          : 'N',
      statInfo: filter.canUse ? ['충전대기'] : [],
      // busiId: ['ME'],
      // chgerTypeInfo: filter.chgerType?.length === 0 ? [] : _convert(),
      chgerTypeInfo: _convert(),
      offset: 0,
      limit: 100,
    };
    console.log('#### current xy', data);

    // return;
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

  const initRef = useRef(0);

  const _init = () => {
    if (currentUserLocation?.latitude) {
      _getAroundStation();
    }
  };

  useEffect(() => {
    return () => {
      dispatch(setReset());
    };
  }, []);

  useEffect(() => {
    if (initRef.current > 1) _init();
  }, [covering]);

  useEffect(() => {
    // console.log(33);
    if (aroundKeyData?.location) {
      bottomSheetAddr.current?.present();
      setClickedMarker({
        latitude: Number(aroundKeyData.location?.lon),
        longitude: Number(aroundKeyData.location?.lat),
        zoom: 16,
      });
    } else if (currentUserLocation?.latitude) {
      setClickedMarker({
        latitude: currentUserLocation.latitude,
        longitude: currentUserLocation.longitude,
        zoom: 16,
      });
    }
  }, [aroundKeyData, filter]);

  useEffect(() => {
    return () => {
      dispatch(setAroundKeyData(undefined));
    };
  }, []);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (!isFocused) {
      bottomSheetAddr.current?.dismiss();
    }
  }, [isFocused]);

  useEffect(() => {
    dispatch(setBottomIdx(1));
    if (AroudRouteProps?.isFavorite) {
      bottomSheetStarRef.current?.present();
    }
  }, []);

  const _getMarkerImg = (item: any) => {
    if (item === aroundKeyData) {
      return require('@assets/Marker_add.png');
    }
    let isAc = false;
    let isDc = false;
    let close = modules._isClosed(item);

    // console.log('is CLOSED? ::', close);
    item.chargers.map((item: any, index: number) => {
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

  // const reloadRef = useRef(0);

  const arrFliter = ['충전속도', '충전소 유무료', '주차요금', '현재이용가능'];

  const renderItem: ListRenderItem<any> = item => {
    return (
      <StationListItem
        setClickedMarker={setClickedMarker}
        bottomSheetRef={bottomSheetRef}
        item={item.item}
        setPick={setPick}
        pick={pick}
        style={{borderBottomWidth: pick ? 0 : 1}}
        setNeedLogin={setNeedLogin}
      />
    );
  };
  const [starMarker, setStarMarker] = useState<any>();

  useEffect(() => {
    if (starMarker) {
      setPick([starMarker]);
      console.log('hi');
      bottomSheetRef.current?.present();
      bottomSheetStarRef.current?.dismiss();
    }
  }, [starMarker]);

  useEffect(() => {
    setReload(true);
  }, [filter]);

  const _fetchUserInfo = async () => {
    const id = {user_id: userInfo?.id};
    const res = await commonAPI
      ._getUserInfo(id)
      .then(res => {
        if (res.data) {
          dispatch(setUserInfo(res.data));
        }
        return res.data;
      })
      .catch(err => {
        console.log('err', err);
      });
    if (res) return res;
  };

  const renderItemStar: ListRenderItem<any> = item => {
    return (
      <RenderItem
        item={item}
        list={userStar}
        bottomSheetRef={bottomSheetStarRef}
        setCenter={setClickedMarker}
        setUserStar={setUserStar}
        setStarMarker={setStarMarker}
      />
    );
  };

  const btnRef = useRef<any>([]);
  useEffect(() => {
    console.log('ref', btnRef?.current);
  }, [btnRef.current]);

  useEffect(() => {
    console.log('filter', filter);
    // console.log('filter', filter.freePark?.includes('무료주차'));
  }, [filter]);

  return (
    <SafeAreaView style={{...GlobalStyles.safeAreaStyle}}>
      <View
        style={{
          zIndex: 100,
          alignSelf: 'center',
          position: 'absolute',
          width: layout.width,
        }}>
        <View style={{marginHorizontal: 10, marginTop: 20}}>
          <SearchBox bottomSheetRef={bottomSheetRef} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'baseline',
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
            contentContainerStyle={{paddingVertical: 10, height: 100}}>
            <View style={{flexDirection: 'row'}}>
              {arrFliter.map((item, idx) => (
                <Shadow
                  key={idx}
                  stretch={true}
                  distance={1}
                  containerStyle={{
                    marginHorizontal: 4,
                  }}>
                  <Pressable
                    ref={el =>
                      el?.measure((fx, fy, width, height, px, py) => {
                        // console.log('X offset to page: ' + px);
                        if (btnRef.current[3] === undefined)
                          btnRef.current[idx] = px;
                      })
                    }
                    onPress={() => {
                      if (idx === 3) {
                        dispatch(setCanUse());
                        setSltdFilter(idx + 1);
                      } else {
                        if (sltdFilter === idx + 1) {
                          setSltdFilter(0);
                        } else setSltdFilter(idx + 1);
                      }
                    }}
                    key={idx}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingHorizontal: 14,
                      height: 30,
                      backgroundColor:
                        idx === 3
                          ? filter.canUse
                            ? '#C7EEFF'
                            : 'white'
                          : idx + 1 === sltdFilter
                          ? '#C7EEFF'
                          : 'white',
                      borderWidth:
                        idx === 3
                          ? filter.canUse
                            ? 1
                            : 0
                          : idx + 1 === sltdFilter
                          ? 1
                          : 0,
                      borderColor: '#07B3FD',
                      borderRadius: 53,
                    }}>
                    <Text
                      style={{
                        // color: idx + 1 === sltdFilter ? '#07B3FD' : undefined,
                        color:
                          idx === 3
                            ? filter.canUse
                              ? '#07B3FD'
                              : undefined
                            : idx + 1 === sltdFilter
                            ? '#07B3FD'
                            : undefined,
                      }}>
                      {item}
                    </Text>
                  </Pressable>
                </Shadow>
              ))}
              <View
                style={{
                  flexDirection: 'row',
                  marginRight: 10,
                  top: 37,
                  left:
                    btnRef.current[0] > 0 && sltdFilter > 0
                      ? btnRef.current[sltdFilter - 1] - 36
                      : 0,
                  position: 'absolute',
                }}>
                {sltdFilter === 1 &&
                  chgerSpeed.map((item, index) => (
                    <Shadow
                      key={index}
                      distance={1}
                      stretch={true}
                      containerStyle={{
                        marginHorizontal: 4,
                      }}>
                      <Pressable
                        onPress={() => {
                          dispatch(setSpeed(item));
                        }}
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: filter.speed?.includes(item)
                            ? '#C7EEFF'
                            : 'white',
                          borderWidth: filter.speed?.includes(item) ? 1 : 0,
                          borderColor: filter.speed?.includes(item)
                            ? '#07B3FD'
                            : '#333333',
                          paddingHorizontal: 14,
                          height: 30,
                          zIndex: 100,
                          borderRadius: 53,
                        }}>
                        <Text
                          style={{
                            color: filter.speed?.includes(item)
                              ? '#07B3FD'
                              : undefined,
                          }}>
                          {item}
                        </Text>
                      </Pressable>
                    </Shadow>
                  ))}
                {sltdFilter === 2 &&
                  chgerFee.map((item, index) => (
                    <Shadow
                      key={index}
                      distance={1}
                      stretch={true}
                      containerStyle={{
                        marginHorizontal: 4,
                      }}>
                      <Pressable
                        onPress={() => {
                          dispatch(setChgerFree(item));
                        }}
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: filter.chgerFree?.includes(item)
                            ? '#C7EEFF'
                            : 'white',
                          borderWidth: filter.chgerFree?.includes(item) ? 1 : 0,
                          borderColor: filter.chgerFree?.includes(item)
                            ? '#07B3FD'
                            : '#333333',
                          paddingHorizontal: 14,
                          height: 30,
                          zIndex: 100,
                          borderRadius: 53,
                        }}>
                        <Text
                          style={{
                            color: filter.chgerFree?.includes(item)
                              ? '#07B3FD'
                              : undefined,
                          }}>
                          {item}
                        </Text>
                      </Pressable>
                    </Shadow>
                  ))}
                {sltdFilter === 3 &&
                  chgerPark.map((item, index) => (
                    <Shadow
                      key={index}
                      distance={1}
                      stretch={true}
                      containerStyle={{
                        marginHorizontal: 4,
                      }}>
                      <Pressable
                        onPress={() => {
                          dispatch(setFreePark(item));
                        }}
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: filter.freePark?.includes(item)
                            ? '#C7EEFF'
                            : 'white',
                          borderWidth: filter.freePark?.includes(item) ? 1 : 0,
                          borderColor: filter.freePark?.includes(item)
                            ? '#07B3FD'
                            : '#333333',
                          paddingHorizontal: 14,
                          height: 30,
                          zIndex: 100,
                          borderRadius: 53,
                        }}>
                        <Text
                          style={{
                            color: filter.freePark?.includes(item)
                              ? '#07B3FD'
                              : undefined,
                          }}>
                          {item}
                        </Text>
                      </Pressable>
                    </Shadow>
                  ))}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
      <NaverMapView
        compass={false}
        scaleBar={false}
        zoomControl={false}
        useTextureView={true}
        tiltGesturesEnabled={false}
        rotateGesturesEnabled={false}
        showsMyLocationButton={false}
        style={{
          flex: 1,
        }}
        center={clickedMarker ? clickedMarker : undefined}
        onCameraChange={e => {
          // console.log('########## CAMERA MOVED', e);
          if (initRef.current === 1) {
            setCovering(e.coveringRegion);
          }
          if (initRef.current > 1) {
            setReload(true);
          }
          if (
            clickedMarker?.latitude === currentUserLocation?.latitude &&
            clickedMarker?.longitude === currentUserLocation?.longitude
          )
            setClickedMarker(undefined);
          initRef.current += 1;
          setReloadCover(e.coveringRegion);
        }}
        onMapClick={e => {
          bottomSheetRef.current?.close();
          bottomSheetAddr.current?.close();
        }}>
        <Marker
          pinColor="blue"
          zIndex={100}
          coordinate={currentUserLocation}
          image={require('@assets/my_location.png')}
          width={35}
          height={35}
          onClick={() => console.log('onClick! p0')}
        />
        {starMarker && (
          <Marker
            width={32}
            height={65}
            onClick={() => {
              setPick([starMarker]);
              setClickedMarker({
                latitude: Number(starMarker.location?.lat),
                longitude: Number(starMarker.location?.lon),
                zoom: 16,
              });
              bottomSheetRef.current?.present();
            }}
            caption={{
              text:
                starMarker.chargers.length > 9
                  ? '9+'
                  : String(starMarker.chargers.length),
              align: Align.Center,
              haloColor: 'A6A6A6',
              textSize: 15,
              color: 'ffffff',
            }}
            image={_getMarkerImg(starMarker)}
            coordinate={{
              latitude: Number(starMarker.location.lat),
              longitude: Number(starMarker.location.lon),
            }}
          />
        )}

        {aroundKeyData?.location?.lat && (
          <Marker
            width={35}
            height={47}
            onClick={() => {
              setPick([aroundKeyData]);
              setClickedMarker({
                latitude: Number(aroundKeyData.location?.lon),
                longitude: Number(aroundKeyData.location?.lat),
                zoom: 16,
              });
              bottomSheetAddr.current?.present();
            }}
            // caption={{
            //   text:
            //     aroundKeyData.chargers.length > 9
            //       ? '9+'
            //       : String(aroundKeyData.chargers.length),
            //   align: Align.Center,
            //   haloColor: 'A6A6A6',
            //   textSize: 15,
            //   color: 'ffffff',
            // }}
            image={_getMarkerImg(aroundKeyData)}
            coordinate={{
              latitude: Number(aroundKeyData.location.lon),
              longitude: Number(aroundKeyData.location.lat),
            }}
          />
        )}
        {stationList?.map((item: any, index) => (
          <Marker
            key={index}
            width={32}
            height={65}
            zIndex={100}
            onClick={() => {
              console.log('## station info ::', item);
              setPick([item]);
              setClickedMarker({
                latitude: Number(item.location.lat),
                longitude: Number(item.location.lon),
                zoom: 16,
              });
              bottomSheetRef.current?.present();
            }}
            caption={{
              text:
                item.chargers.length > 9 ? '9+' : String(item.chargers.length),
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
          showsVerticalScrollIndicator={false}
          data={pick ? pick : stationList}
          keyExtractor={(item, idx) => String(idx) + String(item)}
          renderItem={item => renderItem(item)}
          style={{marginBottom: pick ? undefined : 60}}
        />
        {!pick && <BottomNav />}
      </BottomSheetModal>

      {/* 즐겨찾기 바텀 시트 */}
      <BottomSheetModal
        index={0}
        style={sheetStyle}
        ref={bottomSheetStarRef}
        snapPoints={snapPointsStar}
        onChange={handleSheetChanges}>
        <BottomSheetFlatList
          data={userStar}
          ListEmptyComponent={
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: 44,
                  fontSize: 16,
                  fontFamily: FontList.PretendardRegular,
                  color: '#959595',
                  lineHeight: 24.7,
                }}>
                아직 즐겨찾기한 충전소가 없네요 ;-){'\n'} 자주 가는 충전소를
                즐겨찾기 해 보아요!
              </Text>
            </View>
          }
          keyExtractor={(item, idx) => String(idx)}
          numColumns={3}
          columnWrapperStyle={{
            marginHorizontal: 6,
            marginBottom: 12,
          }}
          ListHeaderComponentStyle={{zIndex: 200}}
          ListHeaderComponent={() => (
            <>
              {userStar?.length > 0 && (
                <>
                  <Pressable
                    onPress={() => {
                      setShowStarFilter(!showStarFilter);
                    }}
                    style={{
                      alignSelf: 'flex-end',
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 12,
                    }}>
                    <Text
                      style={{
                        fontFamily: FontList.PretendardRegular,
                        color: 'black',
                      }}>
                      {starFilter === '1'
                        ? '즐겨찾기 한 순'
                        : starFilter === '2'
                        ? '거리순'
                        : '이름순'}
                    </Text>
                    <Image
                      source={require('@assets/arrow_bottom.png')}
                      style={{
                        width: 9,
                        height: 5,
                        marginRight: 9,
                        marginLeft: 6,
                      }}
                      resizeMode="contain"
                    />
                  </Pressable>
                  {showStarFilter && (
                    <View
                      style={{
                        position: 'absolute',
                        backgroundColor: 'white',
                        right: 8,
                        width: 110,
                        borderWidth: 1,
                        borderRadius: 8,
                        borderColor: '#E6E6E6',
                      }}>
                      <Pressable
                        onPress={() => {
                          setStarFilter('1');
                          setShowStarFilter(false);
                        }}
                        style={{
                          backgroundColor:
                            starFilter === '1' ? '#F6F6F6' : 'white',
                          height: 40,
                          justifyContent: 'center',
                          paddingLeft: 3,
                        }}>
                        <Text>즐겨찾기 한 순</Text>
                      </Pressable>
                      <Pressable
                        onPress={() => {
                          setStarFilter('2');
                          setShowStarFilter(false);
                        }}
                        style={{
                          justifyContent: 'center',
                          paddingLeft: 3,
                          backgroundColor:
                            starFilter === '2' ? '#F6F6F6' : 'white',
                          height: 40,
                        }}>
                        <Text>거리순</Text>
                      </Pressable>
                      <Pressable
                        onPress={() => {
                          setStarFilter('3');
                          setShowStarFilter(false);
                        }}
                        style={{
                          justifyContent: 'center',
                          paddingLeft: 3,
                          backgroundColor:
                            starFilter === '3' ? '#F6F6F6' : 'white',
                          height: 40,
                        }}>
                        <Text>이름순</Text>
                      </Pressable>
                    </View>
                  )}
                </>
              )}
            </>
          )}
          renderItem={item => renderItemStar(item)}
        />
      </BottomSheetModal>

      {/* 일반 주소지 바텀 시트 */}
      <BottomSheetModal
        style={sheetStyle}
        ref={bottomSheetAddr}
        index={0}
        snapPoints={snapPointAddr}
        onChange={handleSheetChanges}>
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 16,
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('@assets/icon_addr.png')}
                style={{width: 16, height: 16, marginRight: 5}}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontFamily: FontList.PretendardMedium,
                  fontSize: 16,
                  color: '#333333',
                }}>
                {aroundKeyData?.name
                  ? aroundKeyData?.name
                  : aroundKeyData?.statNm}
              </Text>
            </View>
            <Pressable
              onPress={() => {
                bottomSheetAddr.current?.close();
              }}>
              <Image
                source={require('@assets/close_star.png')}
                style={{width: 17, height: 17}}
                resizeMode="contain"
              />
            </Pressable>
          </View>
          <View style={{marginHorizontal: 16, marginTop: 12}}>
            <Text
              style={{
                fontFamily: FontList.PretendardRegular,
                color: '#959595',
              }}>
              {aroundKeyData?.address
                ? aroundKeyData?.address
                : aroundKeyData?.addr}
            </Text>
          </View>
          <View
            style={{
              marginHorizontal: 16,
              height: 54,
              marginTop: 'auto',
              marginBottom: 22,
            }}>
            <Pressable
              onPress={() => {
                setVisible(true);
              }}
              style={{
                flex: 1,
                borderRadius: 8,
                backgroundColor: '#00239C',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontFamily: FontList.PretendardBold,
                  fontSize: 16,
                  color: 'white',
                }}>
                길안내 받기
              </Text>
            </Pressable>
          </View>
        </View>
      </BottomSheetModal>

      {/* 우측 즐겨찾기, 내위치 버튼 */}
      <Shadow
        distance={3}
        containerStyle={{
          position: 'absolute',
          zIndex: 500,
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
          hitSlop={10}
          style={{alignItems: 'center', justifyContent: 'center'}}
          onPress={async () => {
            await _getUserStars();
            bottomSheetStarRef.current?.present();
            // nav.navigate('FavStationMain');
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
        goalCoor={clickedMarker}
        statId={pick ? pick[0]?.statId : undefined}
      />

      {/* 빠른 필터 모달 */}
      <MyModal
        title="준비중인 기능입니다"
        positive
        positiveTitle="확인"
        visible={repair}
        setVisible={setRepair}
      />

      {/* 로그인 필요 안내 모달 */}
      <MyModal
        title="로그인이 필요한 기능입니다."
        positive
        positiveTitle="확인"
        visible={needLogin}
        setVisible={setNeedLogin}
      />

      <Loading visible={loading} />

      <BottomNav
        style={{position: 'relative'}}
        shadowStyle={{position: 'relative'}}
        sheetRef={bottomSheetRef}
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
