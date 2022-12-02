import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ImageSourcePropType,
  ToastAndroid,
  BackHandler,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {_getHeight, _getWidth} from 'constants/utils';
import {SafeAreaView} from 'react-native-safe-area-context';
import GlobalStyles from 'styles/GlobalStyles';
import HomeHeader from './components/HomeHeader';
import FontList from 'constants/FontList';
import BottomNav from '@components/BottomNav';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'redux/store';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {setBottomIdx} from 'redux/reducers/navReducer';
import {commonTypes} from '@types';
import MyModal from '@components/MyModal';

interface path {
  [key: string]: ImageSourcePropType;
  main1: ImageSourcePropType;
  main2: ImageSourcePropType;
  main3: ImageSourcePropType;
  main4: ImageSourcePropType;
}

const Home = () => {
  const nav = useNavigation<commonTypes.navi>();
  const dispatch = useDispatch();
  const {bottomIdx} = useSelector((state: RootState) => state.navReducer);
  const isFocused = useIsFocused();
  const [visible, setVisible] = useState(false);
  // const ref = useRef(false);

  const imgPath: path = {
    main1: require('@assets/main_near.png'),
    main2: require('@assets/main_onroad.png'),
    main3: require('@assets/main_home.png'),
    main4: require('@assets/main_like.png'),
  };

  const btnKeys = Object.keys(imgPath);

  const btnStr = [
    '내 주변\n충전소 찾기',
    '경로상\n충전소 찾기',
    '집으로\n안내받기',
    '즐겨찾는\n충전소',
  ];

  const _route = (index: number) => {
    console.log(index);
    // return;
    switch (index) {
      case 0:
        return nav.navigate('AroundMain');
      case 1:
        return nav.navigate('PathMain');
      case 2:
        return setVisible(!visible);
      case 3:
        return nav.navigate('FavStationMain');
      default:
        return;
    }
  };

  // useEffect(() => {
  //   const backAction = () => {
  //     let timeout;
  //     if (!ref.current && bottomIdx === 0) {
  //       ToastAndroid.show(
  //         '한번 더 뒤로가면 앱이 종료됩니다.',
  //         ToastAndroid.SHORT,
  //       );
  //       ref.current = true;

  //       timeout = setTimeout(() => {
  //         ref.current = false;
  //       }, 2000);
  //     } else {
  //       clearTimeout(timeout);
  //       BackHandler.exitApp();
  //     }

  //     return true;
  //   };
  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //   );

  //   return () => backHandler.remove();
  // }, []);

  useEffect(() => {
    if (isFocused) {
      // ref.current = false;
      dispatch(setBottomIdx(0));
    } else {
      // ref.current = true;
    }
    return () => {};
  }, [isFocused]);

  return (
    <SafeAreaView style={{...GlobalStyles.safeAreaStyle}}>
      <HomeHeader />
      <View style={{...styles.mainButtonCtn}}>
        {btnKeys.map((item, idx) => (
          <Pressable
            key={idx}
            onPress={() => {
              _route(idx);
            }}
            style={{
              ...styles.mainButton,
              marginBottom: idx < 2 ? 20 : undefined,
            }}>
            <View style={{...styles.mainImgCtn}}>
              <Image
                source={imgPath[btnKeys[idx]]}
                style={{width: _getWidth(24), height: _getHeight(21)}}
                resizeMode="contain"
              />
            </View>
            <Text
              style={{
                fontFamily: FontList.PretendardSemiBold,
                fontSize: 18,
                color: '#333333',
              }}>
              {btnStr[idx]}
            </Text>
          </Pressable>
        ))}
      </View>
      <MyModal
        title="집 등록하기"
        text={
          '설정된 집이 없네요.\n장소를 등록하면 충전소찾기를\n보다 편리하게 이용할수 있습니다.\n등록하시겠습니까?'
        }
        visible={visible}
        setVisible={setVisible}
        positive={true}
        positiveTitle="네"
        positivePress={() => nav.navigate('HomeSearch')}
        negative={true}
        negativeTitle="아니요"
      />
      <BottomNav />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainButtonCtn: {
    flex: 1,
    paddingTop: 30,
    // paddingBottom: 85,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5',
    flexWrap: 'wrap',
  },
  mainButton: {
    width: _getWidth(156),
    height: _getHeight(163),
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 19,
    paddingTop: 47,
  },
  mainImgCtn: {
    width: _getWidth(36),
    height: _getHeight(36),
    borderRadius: _getWidth(36) / 2,
    backgroundColor: '#00239C',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 9,
  },
});

export default Home;