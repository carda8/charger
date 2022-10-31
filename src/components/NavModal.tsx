import {View, Text, Modal, Pressable, Image, Linking} from 'react-native';
import React, {useCallback} from 'react';
import FontList from 'constants/FontList';
import {_getHeight, _getWidth} from 'constants/utils';
import MyModal from './MyModal';
interface props {
  visible: boolean;
  text?: string;
  title: string;
  //버튼이 하나인 경우 positive 사용
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  // positivePress?: () => void;
}

const NavModal = ({visible, text, title, setVisible}: props) => {
  //   const GOOGLE_PLAY_STORE_LINK = 'market://details?id=io.github.Antodo';
  //route?y=${“도착”}&x=${“도착”}&sX=${“출발”}&sY=${“출발”}

  // 카카오맵 스킴
  const KAKAO_MAP_SCHEMA =
    'kakaomap://route?sp=37.537229,127.005515&ep=37.4979502,127.0276368&by=CAR';

  //티앱 스킴
  const T_MAP_SCHEMA =
    'tmap://route?startx=129.0756416&starty=35.1795543&goalx=127.005515&goaly=37.537229';

  //   const GOOGLE_PLAY_STORE_LINK =
  //     'tmap://route?rGoX=127.005515&rGoY=37.537229&rGoName=스벅';

  const onPress = useCallback((index: number) => {
    if (index === 1) {
      handlePress(KAKAO_MAP_SCHEMA);
    }
    if (index === 2) {
      handlePress(T_MAP_SCHEMA);
    }
  }, []);

  const handlePress = useCallback(async (url: string) => {
    // 만약 어플이 설치되어 있으면 true, 없으면 false
    const supported = await Linking.canOpenURL(url);

    const res = await Linking.openURL(url);
    console.log(url, supported, res);
    if (supported) {
      await Linking.openURL(url);
    }
  }, []);

  return (
    <Modal
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

export default NavModal;
