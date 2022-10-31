import {
  View,
  Text,
  useWindowDimensions,
  StyleSheet,
  ListRenderItem,
  Pressable,
  Image,
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
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import FontList from 'constants/FontList';

const FavStationMain = () => {
  const layout = useWindowDimensions();
  const P0 = {latitude: 37.564362, longitude: 126.977011};
  const [pick, setPick] = useState(false);
  const snapPoints = useMemo(() => ['82%'], []);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
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
            판교 테크노 밸리 주차장
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
    bottomSheetRef.current?.present();
    return () => {
      // bottomSheetRef.current?.close();
    };
  }, [isFocused]);

  useEffect(() => {
    bottomSheetRef.current?.present();
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <SafeAreaView style={{...GlobalStyles.safeAreaStyle}}>
          <View style={{position: 'absolute', zIndex: 100, width: '100%'}}>
            <HeaderCenter
              title="즐겨찾는 충전소"
              leftBack
              rightBack
              backTitle="닫기"
              backTitleStyle={{
                fontSize: 16,
                fontFamily: FontList.PretendardRegular,
              }}
            />
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
            onTouch={(e: any) => console.log(e.nativeEvent)}
            onCameraChange={e =>
              console.log('onCameraChange', JSON.stringify(e))
            }
            useTextureView={true}
            mapType={MapType.Basic}
            onMapClick={e => console.log('onMapClick', JSON.stringify(e))}>
            <Marker
              coordinate={P0}
              onClick={() => console.log('onClick! p0')}
            />
            {/* <Marker
              coordinate={P1}
              pinColor="blue"
              onClick={() => console.log('onClick! p1')}
            />
            <Marker
              coordinate={P2}
              pinColor="red"
              onClick={() => console.log('onClick! p2')}
            /> */}
          </NaverMapView>
          <BottomSheetModal
            style={sheetStyle}
            ref={bottomSheetRef}
            animateOnMount={true}
            index={0}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}>
            {/* <View style={{...styles.contentContainer}}> */}
            <BottomSheetFlatList
              data={data}
              keyExtractor={(item, idx) => String(idx) + String(item)}
              numColumns={3}
              columnWrapperStyle={{marginHorizontal: 6, marginBottom: 12}}
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

            {/* </View> */}
          </BottomSheetModal>
          <BottomNav />
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
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
