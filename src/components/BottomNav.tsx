import {
  View,
  Text,
  Pressable,
  Image,
  StyleProp,
  ViewProps,
  ViewStyle,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {_getHeight, _getWidth} from 'constants/utils';
import {useNavigation} from '@react-navigation/native';
import {commonTypes} from '@types';
import FontList from 'constants/FontList';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'redux/store';
import {setBottomIdx} from 'redux/reducers/navReducer';
import {Shadow} from 'react-native-shadow-2';
import {SafeAreaView} from 'react-native-safe-area-context';
import MyModal from './MyModal';

interface props {
  style?: StyleProp<ViewStyle>;
  shadowStyle?: StyleProp<ViewStyle>;
  sheetRef?: any;
}

const BottomNav = ({style, shadowStyle, sheetRef}: props) => {
  const nav = useNavigation<commonTypes.navi>();
  const {bottomIdx} = useSelector((state: RootState) => state.navReducer);
  const dispatch = useDispatch();
  const {userInfo} = useSelector((state: RootState) => state.authReducer);
  const [visible, setVisible] = useState(false);
  const [modalLogin, setModalLogin] = useState(false);

  useEffect(() => {
    if (sheetRef?.current) sheetRef.current?.dismiss();
  }, [bottomIdx]);
  return (
    <>
      {/* <SafeAreaView edges={['bottom']}> */}
      <KeyboardAvoidingView
        style={[
          {
            // position: 'absolute',
            bottom: 0,
            width: '100%',
            backgroundColor: 'white',
            height: 60,
            flexDirection: 'row',
            borderTopWidth: 1,
            borderColor: '#E7E7E7',
          },
          style,
        ]}>
        <Pressable
          onPress={() => {
            // setIndex(0);
            dispatch(setBottomIdx(0));
            nav.navigate('Home');
          }}
          style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={
              bottomIdx === 0
                ? require('@assets/main_bt_home2.png')
                : require('@assets/main_bt_home.png')
            }
            style={{
              marginBottom: 5,
              width: _getWidth(24),
              height: _getHeight(24.6),
            }}
            resizeMode="contain"
          />
          <Text style={{fontFamily: FontList.PretendardMedium, fontSize: 12}}>
            홈
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            dispatch(setBottomIdx(1));
            nav.navigate('AroundMain');
          }}
          style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={
              bottomIdx === 1
                ? require('@assets/main_bt_near2.png')
                : require('@assets/main_bt_near.png')
            }
            style={{
              marginBottom: 5,
              width: _getWidth(24),
              height: _getHeight(24),
              // tintColor: bottomIdx === 1 ? '#0C34C1' : undefined,
            }}
            resizeMode="contain"
          />
          <Text style={{fontFamily: FontList.PretendardMedium, fontSize: 12}}>
            내 주변
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            dispatch(setBottomIdx(2));
            nav.navigate('PathMain');
          }}
          style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={
              bottomIdx === 2
                ? require('@assets/main_bt_onroad2.png')
                : require('@assets/main_bt_onroad.png')
            }
            style={{
              marginBottom: 5,
              width: _getWidth(24),
              height: _getHeight(24),
              // tintColor: bottomIdx === 2 ? '#0C34C1' : undefined,
            }}
            resizeMode="contain"
          />
          <Text style={{fontFamily: FontList.PretendardMedium, fontSize: 12}}>
            경로
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            if (userInfo?.addressInfo) {
              dispatch(setBottomIdx(3));
              return nav.navigate('HomeMain', {addr: userInfo?.addressInfo});
            }
            if (!userInfo?.id) return setModalLogin(true);
            else return setVisible(!visible);
            // nav.navigate('RecentMain');
          }}
          style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={
              bottomIdx === 3
                ? require('@assets/main_bt_union2.png')
                : require('@assets/main_bt_union.png')
            }
            style={{
              marginBottom: 5,
              width: _getWidth(24.3),
              height: _getHeight(24.5),
              // tintColor: bottomIdx === 3 ? '#0C34C1' : undefined,
            }}
            resizeMode="contain"
          />
          <Text style={{fontFamily: FontList.PretendardMedium, fontSize: 12}}>
            {/* 즐겨찾기 */}
            마이홈
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            dispatch(setBottomIdx(4));
            nav.navigate('MyPageMain');
          }}
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={
              bottomIdx === 4
                ? require('@assets/main_bt_mypage2.png')
                : require('@assets/main_bt_mypage.png')
            }
            style={{
              marginBottom: 5,
              width: _getWidth(24),
              height: _getHeight(24),
              // tintColor: bottomIdx === 4 ? '#0C34C1' : undefined,
            }}
            resizeMode="contain"
          />
          <Text style={{fontFamily: FontList.PretendardMedium, fontSize: 12}}>
            마이페이지
          </Text>
        </Pressable>
        <MyModal
          title="집 등록하기"
          text={'로그인이 필요한 기능입니다.'}
          visible={modalLogin}
          setVisible={setModalLogin}
          positive={true}
          positiveTitle="확인"
          // positivePress={() => nav.navigate('HomeSearch')}
          // negative={true}
          // negativeTitle="아니요"
        />
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
      </KeyboardAvoidingView>
      {/* </Shadow> */}
      {/* </SafeAreaView> */}
    </>
  );
};

export default BottomNav;
