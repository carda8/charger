import {View, Text, Pressable, Image} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import GlobalStyles from 'styles/GlobalStyles';
import BottomNav from '@components/BottomNav';
import HeaderCenter from '@components/HeaderCenter';
import FontList from 'constants/FontList';
import {_getHeight, _getWidth} from 'constants/utils';
import {Switch} from 'react-native-switch';
import {Shadow} from 'react-native-shadow-2';
import {useNavigation} from '@react-navigation/native';
import {commonTypes} from '@types';
import MyModal from '@components/MyModal';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'redux/store';
import {resetUserInfo, setUserInfo} from 'redux/reducers/authReducer';
import commonAPI from 'api/modules/commonAPI';
import Loading from '@components/Loading';

const MyPageConfigPage = () => {
  const nav = useNavigation<commonTypes.navi>();
  const {userInfo} = useSelector((state: RootState) => state.authReducer);
  const dispatch = useDispatch();
  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const [isEnabled3, setIsEnabled3] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalLogin, setModalLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  const switchTitle = [
    '기본 알림',
    '충전소 상태변경 알림',
    '마케팅 알림 수신 동의',
  ];

  const switchDesc = [
    '차량등록, 공지사항 등의 앱의 기본 알림에 대한 설정이에요',
    '즐겨찾기한 충전소의 상태가 변경에 대한 알림 설정이에요',
    '이벤트, 포인트 등에 대한 알림 설정이에요!',
  ];

  const toggleSwitch = (idx: number) => {
    switch (idx) {
      case 0:
        return setIsEnabled(previousState => !previousState);
      case 1:
        return setIsEnabled2(previousState => !previousState);
      case 2:
        return setIsEnabled3(previousState => !previousState);
    }
  };

  const _getState = (idx: number) => {
    switch (idx) {
      case 0:
        return isEnabled;
      case 1:
        return isEnabled2;
      case 2:
        return isEnabled3;
    }
  };

  const _onPressLogout = () => {
    nav.reset({routes: [{name: 'Login'}]});
    dispatch(resetUserInfo());
  };

  const _onPressRetire = async () => {
    setLoading(true);
    const data = {
      user_id: userInfo?.id,
    };

    await commonAPI
      ._delUserRetire(data)
      .then(res => {
        console.log('retire res', res);
        dispatch(resetUserInfo());
        nav.reset({routes: [{name: 'Login'}, {name: 'MyPageRetire'}]});
      })
      .catch(err => {
        console.log('retire err', err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <SafeAreaView style={{...GlobalStyles.safeAreaStyle}}>
      <HeaderCenter title="앱설정" leftBack />
      <View style={{paddingHorizontal: 16, marginTop: 11}}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: FontList.PretendardRegular,
            color: '#333333',
          }}>
          로그인 정보
        </Text>
        {userInfo?.id ? (
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontFamily: FontList.PretendardSemiBold,
                fontSize: 16,
                color: '#333333',
              }}>
              {userInfo.name}님
            </Text>
            <Pressable onPress={() => setModalLogin(true)}>
              <Text
                style={{
                  fontFamily: FontList.PretendardMedium,
                  color: '#959595',
                  textDecorationLine: 'underline',
                }}>
                로그아웃
              </Text>
            </Pressable>
          </View>
        ) : (
          <>
            <Pressable
              onPress={() => {
                nav.navigate('Login');
              }}
              style={{
                width: '100%',
                height: _getHeight(43),
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  fontFamily: FontList.PretendardSemiBold,
                  fontSize: 17,
                  color: '#333333',
                }}>
                로그인 하세요
              </Text>
              <Image
                source={require('@assets/mypage_arrow.png')}
                style={{width: _getWidth(8), height: _getHeight(16)}}
                resizeMode="contain"
              />
            </Pressable>
            <Text
              style={{
                fontFamily: FontList.PretendardRegular,
                color: '#333333',
              }}>
              {
                '기록해놓은 내역들이 사라지지 않도록 5초만에\n내 계정에 저장하세요.'
              }
            </Text>
          </>
        )}

        <View style={{marginTop: _getHeight(45)}}>
          <Text
            style={{
              fontFamily: FontList.PretendardRegular,
              fontSize: 16,
              color: '#333333',
            }}>
            수신 설정
          </Text>
        </View>
      </View>

      {switchTitle.map((item, idx) => (
        <View
          key={idx}
          style={{
            height: _getHeight(93),
            justifyContent: 'center',
            borderBottomWidth: idx < 2 ? 1 : undefined,
            borderColor: '#F6F6F6',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 16,
            }}>
            <Text
              style={{
                fontFamily: FontList.PretendardMedium,
                fontSize: 16,
                color: '#333333',
              }}>
              {switchTitle[idx]}
            </Text>
            <Switch
              value={_getState(idx)}
              onValueChange={() => toggleSwitch(idx)}
              disabled={false}
              activeText={'On'}
              inActiveText={'Off'}
              circleSize={19}
              barHeight={25}
              // circleBorderWidth={3}
              backgroundActive={'#00239C'}
              backgroundInactive={'#EAEAEA'}
              circleActiveColor={'#30a566'}
              circleInActiveColor={'white'}
              renderInsideCircle={() => (
                <>
                  <Shadow distance={1} offset={[1.2, 1.2]}>
                    <View
                      style={{
                        width: 19,
                        height: 19,
                        backgroundColor: 'white',
                        borderRadius: 19 / 2,
                      }}
                    />
                  </Shadow>
                </>
              )}
              changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
              innerCircleStyle={{
                alignItems: 'center',
                justifyContent: 'center',
              }} // style for inner animated circle for what you (may) be rendering inside the circle
              outerCircleStyle={{}} // style for outer animated circle
              renderActiveText={false}
              renderInActiveText={false}
              switchLeftPx={1.5} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
              switchRightPx={1.5} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
              switchWidthMultiplier={2.7} // multiplied by the `circleSize` prop to calculate total width of the Switch
              switchBorderRadius={29} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
            />
          </View>
          <View style={{marginTop: _getHeight(16), paddingHorizontal: 16}}>
            <Text
              style={{
                fontFamily: FontList.PretendardRegular,
                fontSize: 13,
                color: '#959595',
              }}>
              {switchDesc[idx]}
            </Text>
          </View>
        </View>
      ))}
      {userInfo?.id && (
        <Pressable
          onPress={() => {
            setModal(true);
          }}
          hitSlop={10}
          style={{paddingHorizontal: 16, marginTop: _getHeight(40)}}>
          <Text
            style={{
              fontFamily: FontList.PretendardRegular,
              fontSize: 13,
              color: '#959595',
            }}>
            회원탈퇴
          </Text>
        </Pressable>
      )}

      <MyModal
        title="정말 로그아웃 하시겠어요?"
        positive
        positiveTitle="네"
        negative
        negativeTitle="아니요"
        visible={modalLogin}
        setVisible={setModalLogin}
        positivePress={() => _onPressLogout()}
      />
      <MyModal
        title="정말 탈퇴 하시겠어요?"
        positive
        positiveTitle="네"
        negative
        negativeTitle="아니요"
        visible={modal}
        setVisible={setModal}
        positivePress={() => _onPressRetire()}
      />

      <Loading visible={loading} />
      <BottomNav />
    </SafeAreaView>
  );
};

export default MyPageConfigPage;
