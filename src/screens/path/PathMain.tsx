import {
  View,
  StyleSheet,
  useWindowDimensions,
  Pressable,
  Text,
  Image,
  ListRenderItem,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import GlobalStyles from 'styles/GlobalStyles';
import BottomNav from '@components/BottomNav';
import {useDispatch, useSelector} from 'react-redux';
import NaverMapView, {Align, Marker, Path} from 'react-native-nmap';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {_getHeight, _getWidth} from 'constants/utils';
import PathSearchBox from './components/PathSearchBox';
import {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {RootState} from 'redux/store';
import {Shadow} from 'react-native-shadow-2';
import FontList from 'constants/FontList';
import commonAPI from 'api/modules/commonAPI';
import Loading from '@components/Loading';
import modules from 'constants/utils/modules';
import {setBottomIdx} from 'redux/reducers/navReducer';
import {useNavigation} from '@react-navigation/native';
import {commonTypes} from '@types';
import PathBottomSheetItem from './components/PathBottomSheetItem';
import {
  resetPath,
  setIsGoalFinish,
  setIsStartFinish,
  setRecoIndex,
} from 'redux/reducers/pathReducer';
import MyModal from '@components/MyModal';
import PathRecommendList from './components/PathRecommendList';
import PathBottomSheetReco from './components/PathBottomSheetReco';
import PathStarRenderItem from './components/PathStarRenderItem';
import NavModal from '@components/NavModal';

interface coor {
  latitude: number;
  longitude: number;
  zoom: number;
}

const PathMain = () => {
  const dispatch = useDispatch();
  const layout = useWindowDimensions();
  const nav = useNavigation<commonTypes.navi>();
  const {userInfo} = useSelector((state: RootState) => state.authReducer);
  const {startData, goalData} = useSelector(
    (state: RootState) => state.pathReducer,
  );

  useEffect(() => {
    console.log('Main start: data ##', startData);
    console.log('Main goal Data', goalData);
  }, [startData, goalData]);

  const {currentUserLocation} = useSelector(
    (state: RootState) => state.locationReducer,
  );

  const [modalLogin, setModalLogin] = useState(false);

  // 로딩 모달
  const [modal, setModal] = useState(false);

  // 지도 포커스
  const [center, setCenter] = useState<coor>();

  // 추천 표시 여부
  const [showRec, setShowRec] = useState(false);
  // 선택된 추전 아이템 바텀 시트 표시

  // const [convertedCoor, setConvertedCoor] = useState([]);
  const [recomandList, setRecomandList] = useState([]);

  // 길안내모달
  const [modalNav, setModalNav] = useState(false);

  // map ref
  const mapRef = useRef<NaverMapView>(null);

  // ########## 바텀 시트 ##########
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  // 현위치 바텀시트
  const bottomSheetStartRef = useRef<BottomSheetModal>(null);
  // 도착지 바텀시트
  const bottomSheetGoalRef = useRef<BottomSheetModal>(null);
  // 추천 충전기 바텀시트
  const bottomSheetRecoRef = useRef<BottomSheetModal>(null);
  // 즐겨찾기 바텀시트
  const bottomSheetUserStarRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => [250], []);
  const snapPointsReco = useMemo(() => [290], []);
  const snapPointsStar = useMemo(() => ['64%'], []);

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
  // ########## END 바텀시트 ##########

  // 경로간 추천 목록
  // 추천 목록 가져오기
  // _postPathRecommend
  // data = {
  //   route: routes,
  //   distance: 1,
  // };

  // 좌표를 주소로 변환 필요여부?
  // const _convertCoor = (routes: any) => {
  //   let temp: any[] = [];
  //   routes.map((item: any, index: any) => {
  //     temp.push([item[1], item[0]]);
  //   });
  //   // setConvertedCoor(temp);
  //   if (!showRec && recomandList.length === 0) _getRecomand(temp);
  //   // console.log('converted temp', temp);
  // };

  // 경로 표시
  // _getPathLine 경로 표시
  // data = {
  //   start: `${startData.location.lon},${startData.location.lat}`,
  //   end: `${goalData.location.lon},${goalData.location.lat}`,
  // };
  // 경로 표시 이후

  // 좌표에서 주소 도출 기능?
  // const _getAddrByCoor = async () => {
  //   const param = {
  //     x: currentUserLocation.longitude,
  //     y: currentUserLocation.latitude,
  //   };
  //   await commonAPI
  //     ._getAddrByCoor(param)
  //     .then(res => {
  //       if (res?.data?.documents?.length > 0) {
  //         // dispatch(setStart(res.data.documents[0].address_name));
  //       }
  //       console.log('add res', res.data.documents);
  //     })
  //     .catch(err => console.log('add err', err));
  // };

  const _getMarkerImg = (item: any) => {
    let isAc = false;
    let isDc = false;
    let close = modules._isClosed(item);
    // console.log('is CLOSED? ::', close);
    item.chargers.map((item: any, index: any) => {
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

  // 본인의 실제 현위치로 포커스
  const _onPressMyLocation = () => {
    const temp = JSON.parse(JSON.stringify(currentUserLocation));
    setCenter({...temp});
  };

  // 카메라 설정
  // useEffect(() => {
  //   if (lineData?.length > 0) {
  //     setTimeout(() => {
  //       mapRef?.current?.animateToCoordinates(lineData, {
  //         top: 550,
  //         bottom: 700,
  //         left: 275,
  //         right: 275,
  //       });
  //       setModal(false);
  //     }, 200);
  //   }
  // }, [lineData]);

  // 추천 선택시 패스 함수 별도 생서 필요
  // useEffect(() => {
  //   if (recomendStationData) {
  //     _getPathReco();
  //   }
  // }, [recomendStationData]);

  // 즐겨찾기 관련
  // const [userStar, setUserStar] = useState([]);
  // const [starFilter, setStarFilter] = useState('1');
  // const [showStarFilter, setShowStarFilter] = useState(false);
  // const _UserStar = async () => {
  //   if (userInfo?.id) {
  //     const data = {
  //       user_id: userInfo.id,
  //       currentXY: `${currentUserLocation.latitude},${currentUserLocation.longitude}`,
  //       order_by:
  //         starFilter === '1' ? '' : starFilter === '2' ? 'distance' : 'name',
  //     };
  //     console.log('userId', data);

  //     await commonAPI
  //       ._getUserStar(data)
  //       .then(res => {
  //         console.log('_getUserStar ## ', res);
  //         setUserStar(res.data);
  //       })
  //       .catch(err => console.log('err', err));
  //   }
  // };

  // const renderItemStar: ListRenderItem<any> = item => {
  //   return (
  //     <PathStarRenderItem
  //       item={item}
  //       list={userStar}
  //       bottomSheetRef={bottomSheetUserStarRef}
  //       setUserStar={setUserStar}
  //     />
  //   );
  // };
  // useEffect(() => {
  //   _UserStar();
  // }, [userInfo, starFilter]);

  // useEffect(() => {
  //   return () => {
  //     dispatch(resetPath({}));
  //   };
  // }, []);

  // 초기 유저 현위치로 세팅
  useEffect(() => {
    console.log('currentUserLocation', currentUserLocation);
    if (currentUserLocation) {
      setCenter({
        latitude: currentUserLocation.latitude,
        longitude: currentUserLocation.longitude,
        zoom: 16,
      });
    }
  }, []);

  useEffect(() => {
    dispatch(setBottomIdx(2));
  }, []);

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
            ref={mapRef}
            compass={false}
            rotateGesturesEnabled={false}
            onMapClick={e => {
              bottomSheetRecoRef.current?.close();
              bottomSheetRef.current?.close();
            }}
            zoomControl={false}
            useTextureView={true}
            style={{
              height: layout.height - 60,
            }}
            onCameraChange={e => {
              if (center) setCenter(undefined);
            }}
            scaleBar={false}
            showsMyLocationButton={false}
            tiltGesturesEnabled={false}
            center={center}>
            {/* 현재 위치 마커 */}
            {currentUserLocation && (
              <Marker
                width={35}
                height={35}
                zIndex={100}
                image={require('@assets/my_location.png')}
                coordinate={currentUserLocation}
              />
            )}

            {/* 출발지 마커 */}
            {/* <Marker
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
              onClick={() => {}}
              coordinate={}
            /> */}

            {/* 도착지 마커 */}
            {/* <Marker
              width={32}
              height={65}
              onClick={() => {}}
              caption={{
                text: '도착',
                align: Align.Center,
                haloColor: '166DF0',
                textSize: 13,
                color: 'ffffff',
              }}
              image={require('@assets/marker_fast.png')}
              coordinate={}
            /> */}

            {/* 도착지 목적지 라인 */}
            {/* <Path
              coordinates={lineData}
              width={7}
              color={'#093BBC'}
              outlineColor={'#093BBC'}
              pattern={require('@assets/top_ic_history_w3.png')}
              patternInterval={25}
            /> */}

            {/* 추천 중전기 마커들 */}
            {/* <Marker
              key={index}
              width={32}
              height={65}
              onClick={() => {}}
              caption={
                {
                  // text:
                  //   item.chargers.length > 9
                  //     ? '9+'
                  //     : String(item.chargers.length),
                  // align: Align.Center,
                  // haloColor: 'A6A6A6',
                  // textSize: 15,
                  // color: 'ffffff',
                }
              }
              image={_getMarkerImg(item)}
              coordinate={{}}
            /> */}
          </NaverMapView>

          {/* 추천 목록 */}
          {showRec && (
            <PathRecommendList
              recomandList={recomandList}
              setCenter={setCenter}
              setModalNav={setModalNav}
            />
          )}

          {/* 도착지 현위치 바텀시트 */}
          {/* 분리 할 것 */}
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
                  }}></Text>
              </Pressable>
            )}
            index={0}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}>
            <View>
              {/* <PathBottomSheetItem
                item={goalData}
                bottomSheetRef={bottomSheetRef}
              /> */}
            </View>
          </BottomSheetModal>

          {/* 추천 충전기 바텀시트 */}
          {/* {pickReco && (
            <BottomSheetModal
              style={sheetStyle}
              ref={bottomSheetRecoRef}
              footerComponent={() => <></>}
              index={0}
              snapPoints={snapPointsReco}
              onChange={handleSheetChanges}>
              <PathBottomSheetReco
                pickReco={pickReco}
                recoRef={bottomSheetRecoRef}
              />
            </BottomSheetModal>
          )} */}

          {/* 즐겨찾기 바텀 시트 */}
          {/* 
          <BottomSheetModal
            index={0}
            style={sheetStyle}
            ref={bottomSheetUserStarRef}
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
              ListHeaderComponentStyle={{zIndex: 2000}}
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
          </BottomSheetModal> */}

          <Shadow
            distance={3}
            containerStyle={{
              position: 'absolute',
              zIndex: 500,
              top: showRec ? 150 : undefined,
              bottom: showRec ? undefined : 131,
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
                if (currentUserLocation) _onPressMyLocation();
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
          {/* 
          <MyModal
            positive
            positiveTitle="확인"
            setVisible={setFinishPosition}
            visible={finishPosition}
            title={
              pickMark === 'start' || lastRef === 'start'
                ? '현위치 설정 완료'
                : '도착지 설정 완료'
            }
          /> */}

          <BottomNav />

          <MyModal
            positive
            positiveTitle="확인"
            setVisible={setModalLogin}
            visible={modalLogin}
            title="집 설정"
            text="로그인이 필요한 기능입니다."
          />
          {/* 
          {startData && goalData && (
            <NavModal
              title="길안내 연결"
              setVisible={setModalNav}
              visible={modalNav}
              startCoor={{}}
            />
          )} */}

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
