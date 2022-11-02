import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ListRenderItem,
  useWindowDimensions,
  Image,
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
import NaverMapView, {MapType, Marker} from 'react-native-nmap';
import {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {
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
  const height = Dimensions.get('window');

  console.log('res route', res);
  console.log('currentUserLocation', currentUserLocation);

  const P0 = {latitude: 37.564362, longitude: 126.977011};
  const P1 = {latitude: 37.565051, longitude: 126.978567};
  const P2 = {latitude: 37.565383, longitude: 126.976292};

  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [data2, setData2] = useState([1]);

  const [visible, setVisible] = useState(false);

  // ref
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [pick, setPick] = useState(false);
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
    ['linen'],
  );

  const renderItem: ListRenderItem<any> = item => {
    return (
      <StationListItem
        item={item}
        setPick={setPick}
        pick={pick}
        style={{borderBottomWidth: pick ? 0 : 1}}
      />
    );
  };

  useEffect(() => {
    if (isFocused) {
      dispatch(setBottomIdx(1));
    }
  }, [isFocused]);

  const arrFliter = ['충전속도', '충전소 유무료', '주차요금', '현재이용가능'];

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
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
                      <View
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
                      </View>
                    </Shadow>
                  ))}
                </View>
              </ScrollView>
            </View>
          </View>
          <NaverMapView
            showsMyLocationButton
            style={{
              width: '100%',
              height: height.height - _getHeight(60),
            }}
            scaleBar={false}
            // showsMyLocationButton={true}
            center={{
              latitude: currentUserLocation.latitude ?? 0,
              longitude: currentUserLocation.longitude ?? 0,
              zoom: 16,
            }}
            onTouch={(e: any) => console.log(e.navtiveEvent)}
            onCameraChange={e =>
              console.log('onCameraChange', JSON.stringify(e))
            }
            useTextureView={true}
            onMapClick={e => console.log('onMapClick', JSON.stringify(e))}>
            <Marker
              coordinate={{
                latitude: currentUserLocation.latitude ?? 0,
                longitude: currentUserLocation.longitude ?? 0,
              }}
              onClick={() => console.log('onClick! p0')}
            />
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
              data={pick ? data2 : data}
              keyExtractor={(item, idx) => String(idx) + String(item)}
              renderItem={item => renderItem(item)}
              style={{marginBottom: pick ? undefined : 60}}
            />
            {!pick && <BottomNav />}
          </BottomSheetModal>
          <StationCount bottomSheetRef={bottomSheetRef} />
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
