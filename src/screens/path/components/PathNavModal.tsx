import {
  View,
  Text,
  Modal,
  Pressable,
  Image,
  Linking,
  Platform,
} from 'react-native';
import React, {useCallback} from 'react';
import FontList from 'constants/FontList';
import {_getHeight, _getWidth} from 'constants/utils';
import {useSelector} from 'react-redux';
import {RootState} from 'redux/store';
interface props {
  visible: boolean;
  text?: string;
  title: string;
  goalCoor?: any;
  item?: any;
  isPath?: any;
  //버튼이 하나인 경우 positive 사용
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  startCoor?: any;
  // positivePress?: () => void;
}

const PathNavModal = ({
  visible,
  text,
  title,
  setVisible,
  goalCoor,
  item,
  isPath,
  startCoor,
}: props) => {
  //   const GOOGLE_PLAY_STORE_LINK = 'market://details?id=io.github.Antodo';
  //route?y=${“도착”}&x=${“도착”}&sX=${“출발”}&sY=${“출발”}
  const {currentUserLocation} = useSelector(
    (state: RootState) => state.locationReducer,
  );
  const path = useSelector((state: RootState) => state.pathReducer);

  //dummy
  const USER_Lat = startCoor
    ? startCoor?.latitude
    : currentUserLocation?.latitude
    ? currentUserLocation.latitude
    : 37.5246544;
  const USER_Lon = startCoor
    ? startCoor?.longitude
    : currentUserLocation?.longitude
    ? currentUserLocation.longitude
    : 126.8881368;

  const _getCoor = (target: any) => {
    console.log('coooooooooooooooor', goalCoor);
    let res;
    if (target === 'kakao') {
      res = goalCoor?.latitude
        ? `kakaomap://route?sp=${USER_Lat},${USER_Lon}&ep=${goalCoor.latitude},${goalCoor.longitude}&by=CAR`
        : 'kakaomap://route?sp=37.537229,127.005515&ep=37.4979502,127.0276368&by=CAR';
      return res;
    }
    if (target === 'tmap') {
      res = goalCoor?.latitude
        ? `tmap://route?startx=${USER_Lon}&starty=${USER_Lat}&goalx=${goalCoor.longitude}&goaly=${goalCoor.latitude}`
        : 'tmap://route?startx=129.0756416&starty=35.1795543&goalx=127.005515&goaly=37.537229';
      return res;
    }
  };

  // 카카오맵 스킴
  const KAKAO_MAP_SCHEMA = _getCoor('kakao');

  //티앱 스킴
  const T_MAP_SCHEMA = _getCoor('tmap');

  const GOOGLE_STORE_KAKAO_MAP = 'market://details?id=net.daum.android.map';
  const GOOGLE_STORE_T_MAP = 'market://details?id=com.skt.tmap.ku';
  const APPLE_STORE_KAKAO_MAP =
    'itms-apps://itunes.apple.com/us/app/id304608425?mt=8';
  const APPLE_STORE_T_MAP =
    'itms-apps://itunes.apple.com/us/app/id431589174?mt=8';

  //   const GOOGLE_PLAY_STORE_LINK =
  //     'tmap://route?rGoX=127.005515&rGoY=37.537229&rGoName=스벅';

  const onPress = (index: number) => {
    if (index === 1) {
      handlePress(KAKAO_MAP_SCHEMA, index);
    }
    if (index === 2) {
      handlePress(T_MAP_SCHEMA, index);
    }
  };

  const _routeMarket = async (url: any, index: number) => {
    if (Platform.OS === 'android') {
      if (index === 1) await Linking.openURL(GOOGLE_STORE_KAKAO_MAP);
      if (index === 2) await Linking.openURL(GOOGLE_STORE_T_MAP);
    } else {
      if (index === 1) await Linking.openURL(APPLE_STORE_KAKAO_MAP);
      if (index === 2) await Linking.openURL(APPLE_STORE_T_MAP);
    }
  };

  const handlePress = useCallback(async (url: string, index: number) => {
    // 만약 어플이 설치되어 있으면 true, 없으면 false
    const supported = await Linking.canOpenURL(url);
    console.log('KAKAO_MAP_SCHEMA', KAKAO_MAP_SCHEMA);
    console.log('supported', supported);

    await Linking.openURL(url)
      .then(res => {
        if (!res) _routeMarket(url, index);
        console.log('true res', res);
      })
      .catch(err => {
        _routeMarket(url, index);
        console.log('linking err', err);
      });
  }, []);

  return (
    <Modal
      statusBarTranslucent
      visible={visible}
      transparent
      onRequestClose={() => {
        setVisible(!visible);
      }}>
      <Pressable
        onPress={() => setVisible(!visible)}
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          justifyContent: 'center',
        }}>
        <View
          style={{
            marginHorizontal: 23,
            borderRadius: 8,
            backgroundColor: 'white',
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: _getWidth(42),
              marginBottom: 36.5,
            }}>
            <View style={{marginVertical: 22}}>
              <Text
                style={{
                  fontFamily: FontList.PretendardBold,
                  fontSize: 18,
                  color: 'black',
                }}>
                {title}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
              }}>
              <Pressable onPress={() => onPress(1)}>
                <Image
                  source={require('@assets/kakao_navi.png')}
                  style={{width: _getWidth(100), height: _getHeight(100)}}
                  resizeMode="contain"
                />
              </Pressable>

              <Pressable
                onPress={() => {
                  onPress(2);
                }}>
                <Image
                  source={require('@assets/t_navi.png')}
                  style={{width: _getWidth(100), height: _getHeight(100)}}
                  resizeMode="contain"
                />
              </Pressable>
            </View>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

export default React.memo(PathNavModal);
