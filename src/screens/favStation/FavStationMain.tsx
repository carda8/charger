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
import NaverMapView, {MapType, Marker} from 'react-native-nmap';
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

const FavStationMain = () => {
  const layout = useWindowDimensions();
  const P0 = {latitude: 37.564362, longitude: 126.977011};
  const [pick, setPick] = useState(false);
  const snapPoints = useMemo(() => ['82%'], []);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  const dumCoor = [
    {latitude: 37.3598560266063, longitude: 126.866019306938},
    {latitude: 37.4498560266063, longitude: 126.926019306938},
    {latitude: 37.5398560266063, longitude: 127.166019306938},
    {latitude: 37.4298560266063, longitude: 126.966019306938},
    {latitude: 37.5198560266063, longitude: 126.966019306938},
    {latitude: 37.8598560266063, longitude: 126.426019306938},
    {latitude: 37.5598560266063, longitude: 126.916019306938},
    {latitude: 37.5598560266063, longitude: 126.926019306938},
    {latitude: 37.5198560266063, longitude: 126.546019306938},
    {latitude: 37.5598560266063, longitude: 126.966019306938},
    {latitude: 37.7398560266063, longitude: 126.566019306938},
    {latitude: 37.1098560266063, longitude: 126.762019306938},
  ];

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

  const renderItem: ListRenderItem<any> = item => {
    return (
      <>
        <Pressable
          onPress={() => {
            setCenter({
              latitude: item.item.latitude,
              longitude: item.item.longitude,
              zoom: 13,
            });
            bottomSheetRef.current?.close();
          }}
          key={item.index}
          style={{
            flex: 1,
            height: _getHeight(154),
            borderWidth: 1,
            borderColor: '#E6E6E6',
            borderRadius: 8,
            marginHorizontal: 2,
            paddingHorizontal: 8,
            paddingTop: 8,
            paddingBottom: 12,
          }}>
          <Image
            source={require('@assets/star_on.png')}
            style={{width: 14.6, height: 14, marginBottom: 10}}
            resizeMode="contain"
          />
          <Text
            style={{fontFamily: FontList.PretendardMedium, color: '#333333'}}>
            판교 테크노 밸리 주차장 {item.index}
          </Text>
          <View style={{marginTop: 5}}>
            <Text
              style={{
                fontFamily: FontList.PretendardRegular,
                color: '#4B4B4B',
                fontSize: 13,
              }}>
              1.5km
            </Text>
          </View>
          <View style={{marginTop: 17}}>
            <Text
              style={{
                fontFamily: FontList.PretendardMedium,
                color: '#6FCF24',
                lineHeight: 24,
              }}>
              충전가능
            </Text>
          </View>
          <Text
            style={{
              fontFamily: FontList.PretendardRegular,
              fontSize: 12,
              color: 'black',
            }}>
            급속 1 | 완속 3
          </Text>
        </Pressable>
        {console.log('data', data.length % 3)}
        {item.index === data?.length - 1 && data?.length % 3 !== 0 && (
          <View
            style={{
              // padding: 7,
              flex: 3 - (data?.length % 3),
              // borderWidth: 1,
              borderColor: '#DBDBDB',
              borderRadius: 5,
              alignItems: 'center',
              marginHorizontal: data.length % 3 === 1 ? 12 : 2,
              paddingHorizontal: 8,
              justifyContent: 'center',
              // marginLeft: _getWidth(9) * (5 - (data?.length % 3)),
            }}></View>
        )}
        <View></View>
      </>
    );
  };

  useEffect(() => {
    if (isFocused) bottomSheetRef.current?.present();
    else bottomSheetRef.current?.close();
    return () => {
      bottomSheetRef.current?.close();
    };
  }, [isFocused]);

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
        zoomControl={false}
        rotateGesturesEnabled={false}
        tiltGesturesEnabled={false}
        style={{
          zIndex: -1,
          width: '100%',
          height: layout.height - 60,
        }}
        scaleBar={false}
        showsMyLocationButton={false}
        center={center}
        onTouch={(e: any) => console.log(e.nativeEvent)}
        useTextureView={true}
        mapType={MapType.Basic}
        onMapClick={e => {
          // console.log('onMapClick', e);
          bottomSheetRef.current?.present();
        }}>
        <Marker
          pinColor="blue"
          zIndex={100}
          coordinate={{...P0}}
          image={require('@assets/my_location.png')}
          width={20}
          height={20}
          onClick={() => console.log('onClick! p0')}></Marker>

        {dumCoor.map((item, index) => (
          <Marker
            key={index}
            width={32}
            height={37.7}
            coordinate={item}
            onClick={() => {
              setCenter({
                latitude: item.latitude,
                longitude: item.longitude,
                zoom: 16,
              });
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
              resizeMode="contain"></ImageBackground>
          </Marker>
        ))}
      </NaverMapView>
      {/*      <Marker
            coordinate={item}
            onClick={() => {
              setCenter({
                latitude: item.latitude,
                longitude: item.longitude,
                zoom: 16,
              });
            }}
          /> */}
      <BottomSheetModal
        style={sheetStyle}
        ref={bottomSheetRef}
        animateOnMount={true}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <BottomSheetFlatList
          data={dumCoor}
          initialNumToRender={3}
          keyExtractor={(item, idx) => String(idx)}
          numColumns={3}
          scrollEnabled={true}
          columnWrapperStyle={{
            flex: 1,
            marginHorizontal: 6,
            marginBottom: 12,
          }}
          ListHeaderComponent={
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
          }
          // ListFooterComponent={<BottomNav />}
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
