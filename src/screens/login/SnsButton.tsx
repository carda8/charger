import {View, Text, Pressable, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import SnsList from 'constants/SnsList';
import {commonTypes} from '@types';
import {_getHeight, _getWidth} from 'constants/utils';
import NaverLogin, {
  NaverLoginResponse,
  GetProfileResponse,
} from '@react-native-seoul/naver-login';
import {
  login,
  KakaoOAuthToken,
  getProfile,
  KakaoProfile,
} from '@react-native-seoul/kakao-login';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'redux/store';
import {setUserInfo} from 'redux/reducers/authReducer';
import commonAPI from 'api/modules/commonAPI';

interface props {
  text: string;
  snsType: string;
  navigation: commonTypes.navi;
  idx: number;
}

const SnsButton = ({text, snsType, navigation, idx}: props) => {
  const {userInfo} = useSelector((state: RootState) => state.authReducer);
  const dispatch = useDispatch();

  const _getColor = (type: string) => {
    if (type === SnsList.apple || type === SnsList.naver) return 'white';
    if (type === SnsList.kakao) return '#392020';
    return '#040404';
  };
  const _getBGcolor = (type: string) => {
    if (type === SnsList.naver) return '#5AC466';
    if (type === SnsList.kakao) return '#FAE64C';
    if (type === SnsList.google) return '#F0F0F0';
    if (type === SnsList.apple) return '#040404';
  };
  const logo = [
    require('@assets/naver.png'),
    require('@assets/kakao.png'),
    require('@assets/google.png'),
    require('@assets/apple.png'),
  ];

  const _checkUser = async (profileInfo: any, userEmail: string) => {
    const data = {
      user_id: userEmail,
    };

    await commonAPI
      ._getUserInfo(data)
      .then(res => {
        if (res) {
          const resData = res.data;
          dispatch(
            setUserInfo({
              // ...userInfo,
              id: resData.id,
              name: resData.name,
              car_brand: resData.car_brand,
              car_model: resData.car_model,
              chgerType: resData.chgerType[0],
            }),
          );
          navigation.navigate('Home');
        } else navigation.navigate('AccountFinish');
        console.log('check user res', res);
      })
      .catch(err => {
        console.log('check user err', err);
      });
    return;
  };

  // ########## naver start ##########
  // const [success, setSuccessResponse] =
  //   useState<NaverLoginResponse['successResponse']>();
  // const [failure, setFailureResponse] =
  //   useState<NaverLoginResponse['failureResponse']>();
  const [getProfileRes, setGetProfileRes] = useState<GetProfileResponse>();

  const consumerKey = 'PuyVQenslddH8uGlDgQk';
  const consumerSecret = 'bGFcedprkH';
  const appName = 'mycharger';
  const serviceUrlScheme = 'mycharger';

  const loginNaver = async () => {
    const {failureResponse, successResponse} = await NaverLogin.login({
      consumerKey,
      consumerSecret,
      appName,
      serviceUrlScheme,
    });
    console.log('naver res::', failureResponse, successResponse);
    if (successResponse?.accessToken) {
      getNaverProfile(successResponse?.accessToken);
    }
  };

  // get user info
  const getNaverProfile = async (accessToken: any) => {
    try {
      const profileResult = await NaverLogin.getProfile(accessToken);
      console.log('profileResult', profileResult);
      if (profileResult?.message === 'success') {
        const id = profileResult.response.id;
        const name = profileResult.response.name;
        dispatch(setUserInfo({...userInfo, name: name}));
        navigation.navigate('AccountFinish');
      }
      setGetProfileRes(profileResult);
    } catch (e) {
      setGetProfileRes(undefined);
    }
  };
  //########## naver end ##########

  // ########## kakao start ##########
  const getKakaoProfile = async (token: string): Promise<void> => {
    const profile: KakaoProfile = await getProfile(token);
    console.log('profile', profile);
    if (profile) {
      _checkUser(profile, profile.email);
    }
  };

  const signInWithKakao = async () => {
    await login()
      .then((res: KakaoOAuthToken) => {
        getKakaoProfile(res.accessToken);
        console.log('res', res);
      })
      .catch(err => console.log(err));
  };
  // ########## kakao end ##########

  const _onPressLogin = (snsType: string) => {
    switch (snsType) {
      case SnsList.naver:
        return loginNaver();
      case SnsList.kakao:
        return signInWithKakao();
      case SnsList.google:
        return;
      case SnsList.apple:
        return;
      default:
        return navigation.navigate('AccountFinish');
    }
  };

  return (
    <>
      <Pressable
        onPress={() => _onPressLogin(snsType)}
        style={{
          height: 46,
          marginHorizontal: 24,
          marginBottom: snsType !== SnsList.apple ? 16 : 0,
          borderRadius: 61,
          backgroundColor: _getBGcolor(snsType),
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <Image
          source={logo[idx]}
          style={{
            width: _getWidth(24),
            height: _getHeight(24),
            marginRight: 10,
          }}
          resizeMode="contain"
        />
        <Text
          style={{
            fontWeight: '400',
            fontSize: 16,
            color: _getColor(snsType),
          }}>
          {text}
        </Text>
      </Pressable>
    </>
  );
};

export default SnsButton;
