import {
  View,
  Text,
  useWindowDimensions,
  StyleSheet,
  ListRenderItem,
  Pressable,
  Image,
  ImageBackground,
} from 'react-native';
import React, {useMemo, useEffect, useCallback, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import GlobalStyles from 'styles/GlobalStyles';
import HeaderCenter from '@components/HeaderCenter';
import BottomNav from '@components/BottomNav';
import NaverMapView, {Align, MapType, Marker} from 'react-native-nmap';
import {_getHeight} from 'constants/utils';
import {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import BottomButton from '@components/BottomButton';
import {useIsFocused} from '@react-navigation/native';
import {
  FlatList,
  GestureHandlerRootView,
  ScrollView,
} from 'react-native-gesture-handler';
import FontList from 'constants/FontList';
import modules from 'constants/utils/modules';
import RenderItem from './components/RenderItem';
import {useSelector} from 'react-redux';
import {RootState} from 'redux/store';
import commonAPI from 'api/modules/commonAPI';

const FavStationMain = () => {
  const layout = useWindowDimensions();
  const {userInfo} = useSelector((state: RootState) => state.authReducer);
  const P0 = {latitude: 37.564362, longitude: 126.977011};
  const {currentUserLocation} = useSelector(
    (state: RootState) => state.locationReducer,
  );
  const snapPoints = useMemo(() => ['82%'], []);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [userStar, setUserStar] = useState([]);

  const [center, setCenter] = useState({
    latitude: 37.564362,
    longitude: 126.977011,
    zoom: 13,
  });

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    // console.log('handleSheetChanges', index);
  }, []);
  const isFocused = useIsFocused();
  const sheetStyle = useMemo(
    () => ({
      ...styles.sheetContainer,
      shadowColor: 'black',
    }),
    ['linen'],
  );

  const _getUserStar = async () => {
    if (userInfo?.id) {
      const data = {
        user_id: userInfo.id,
      };

      await commonAPI
        ._getUserStar(data)
        .then(res => {
          console.log(res.data);
          setUserStar(res.data.favorites);
        })
        .catch(err => console.log('err', err));
    }
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

  useEffect(() => {
    if (isFocused) bottomSheetRef.current?.present();
    else bottomSheetRef.current?.close();
    return () => {
      bottomSheetRef.current?.close();
    };
  }, [isFocused]);

  useEffect(() => {
    _getUserStar();
  }, []);

  const renderItem: ListRenderItem<any> = item => {
    return (
      <RenderItem
        item={item}
        list={userStar}
        bottomSheetRef={bottomSheetRef}
        setCenter={setCenter}
      />
    );
  };

  return (
    <SafeAreaView style={{...GlobalStyles.safeAreaStyle}}>
      <View style={{position: 'absolute', zIndex: 100, width: '100%'}}>
        <HeaderCenter
          title="즐겨찾는 충전소"
          leftBack
          rightBack
          backTitle="닫기"
          backTitleStyle={{
            fontSize: 15,
            fontFamily: FontList.PretendardRegular,
          }}
        />
      </View>
      <NaverMapView
        // center={center}
        scaleBar={false}
        zoomControl={false}
        rotateGesturesEnabled={false}
        tiltGesturesEnabled={false}
        showsMyLocationButton={false}
        useTextureView={true}
        onMapClick={e => {
          bottomSheetRef.current?.present();
        }}
        style={{
          width: '100%',
          height: layout.height - 60,
        }}>
        <Marker
          width={20}
          height={20}
          zIndex={100}
          pinColor="blue"
          image={require('@assets/my_location.png')}
          onClick={() => console.log('onClick! p0')}
          coordinate={{
            latitude: Number(currentUserLocation.latitude),
            longitude: Number(currentUserLocation.longitude),
          }}
        />

        {userStar?.length > 0 &&
          userStar?.map((item, index) => (
            <Marker
              key={index}
              width={32}
              height={65}
              onClick={() => {
                console.log('item', item);
                // setCenter({
                //   latitude: item.location.lat,
                //   longitude: item.location.lon,
                //   zoom: 14,
                // });
              }}
              caption={{
                text: '9+',
                // text:
                //   item.chargers.length > 9 ? '9+' : String(item.chargers.length),
                align: Align.Center,
                haloColor: 'A6A6A6',
                textSize: 15,
                color: 'ffffff',
              }}
              // image={_getMarkerImg(item)}
              image={require('@assets/marker_normal.png')}
              coordinate={{
                latitude: item.location.lat,
                longitude: item.location.lon,
              }}
            />
          ))}
      </NaverMapView>
      <BottomSheetModal
        style={sheetStyle}
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
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
          ListHeaderComponent={
            userStar.length > 0 && (
              <Pressable
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
                  즐겨찾기 한 순
                </Text>
                <Image
                  source={require('@assets/arrow_bottom.png')}
                  style={{width: 9, height: 5, marginRight: 8, marginLeft: 6}}
                  resizeMode="contain"
                />
              </Pressable>
            )
          }
          renderItem={item => renderItem(item)}
        />
      </BottomSheetModal>
      <BottomNav />
    </SafeAreaView>
  );
};

export default FavStationMain;

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
