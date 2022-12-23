import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  Platform,
  Alert,
  BackHandler,
  ToastAndroid,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import GlobalStyles from '../../styles/GlobalStyles';
import SnsButton from './SnsButton';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {commonTypes} from '@types';
import SnsList from 'constants/SnsList';
import {_getHeight} from 'constants/utils';
import MyModal from '@components/MyModal';
import Loading from '@components/Loading';

const Login = () => {
  const navigation = useNavigation<commonTypes.navi>();
  const [modal, setModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const ref = useRef(false);

  useEffect(() => {
    const backAction = () => {
      let timeout;
      if (!ref.current) {
        ToastAndroid.show(
          '한번 더 뒤로가면 앱이 종료됩니다.',
          ToastAndroid.SHORT,
        );
        ref.current = true;

        timeout = setTimeout(() => {
          ref.current = false;
        }, 2000);
      } else {
        clearTimeout(timeout);
        BackHandler.exitApp();
      }

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  const layout = useWindowDimensions();
  return (
    <SafeAreaView style={{...GlobalStyles.safeAreaStyle}}>
      {modalLoading && (
        <View
          style={{
            width: '100%',
            height: layout.height,
            position: 'absolute',
            zIndex: 100,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.3)',
          }}
        >
          <ActivityIndicator size={'large'} />
        </View>
      )}
      <ScrollView>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: _getHeight(165),
            marginBottom: _getHeight(74),
          }}
        >
          <Image source={require('~/assets/logo.png')} resizeMode={'contain'} />
        </View>
        {SnsList.snsList.map((item, idx) => (
          <View key={idx}>
            {Platform.OS === 'android' && idx !== 3 && (
              <SnsButton
                setLoading={setModalLoading}
                text={SnsList.snsListText[idx]}
                snsType={item}
                navigation={navigation}
                idx={idx}
              />
            )}
            {Platform.OS === 'ios' && (
              <SnsButton
                setLoading={setModalLoading}
                text={SnsList.snsListText[idx]}
                snsType={item}
                navigation={navigation}
                idx={idx}
              />
            )}
          </View>
        ))}
        <Pressable
          hitSlop={20}
          onPress={() => {
            navigation.navigate('Home');
          }}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 14,
          }}
        >
          <Text style={{fontWeight: '400'}}>먼저 둘러보기</Text>
        </Pressable>
      </ScrollView>
      <MyModal
        visible={modal}
        setVisible={setModal}
        positive
        positiveTitle="확인"
        title="로그인 실패"
        text="현재 해당 기능을 사용 할 수 없습니다"
      />
      {/* <Loading visible={modalLoading} /> */}
    </SafeAreaView>
  );
};

export default Login;
