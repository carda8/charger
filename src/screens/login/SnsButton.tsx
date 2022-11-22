import {View, Text, Pressable, Image, Alert} from 'react-native';
import React, {useEffect, useState, Dispatch, SetStateAction} from 'react';
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
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

interface props {
  text: string;
  snsType: string;
  navigation: commonTypes.navi;
  idx: number;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const SnsButton = ({text, snsType, navigation, idx, setLoading}: props) => {
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

  const _checkUser = async (
    profileInfo: any,
    userEmail: string,
    userName: string,
  ) => {
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
              chgerType: resData.chgerType,
              favorites: resData.favorites,
              histories: resData.histories,
              addressInfo: resData?.addressInfo,
            }),
          );
        }
        navigation.navigate('Home');
        console.log('check user res', res);
      })
      .catch(err => {
        dispatch(setUserInfo({...userInfo, id: userEmail, name: userName}));
        navigation.navigate('AccountPolicy');
        console.log('check user err', err);
      })
      .finally(() => setLoading(false));
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
        const email = profileResult.response.email;
        const name = profileResult.response.name;
        _checkUser(profileResult.response, email, name);
        // dispatch(setUserInfo({...userInfo, id: id, name: name}));
        // navigation.navigate('AccountFinish');
      }
      setGetProfileRes(profileResult);
    } catch (e) {
      setGetProfileRes(undefined);
      setLoading(false);
    }
  };
  //########## naver end ##########

  // ########## kakao start ##########
  const getKakaoProfile = async (token: string): Promise<void> => {
    const profile: KakaoProfile = await getProfile(token);
    console.log('profile', profile);
    if (profile.email) {
      _checkUser(profile, profile.email, profile.nickname);
    } else {
      setLoading(false);
    }
  };

  const signInWithKakao = async () => {
    await login()
      .then((res: KakaoOAuthToken) => {
        getKakaoProfile(res.accessToken);
        console.log('res', res);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  };
  // ########## kakao end ##########

  // ########## google start ##########

  const _googleLogin = () => {
    GoogleSignin.configure({
      // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '290449804815-1egeomuk2a1sftefjng8nfjsd0t0jdcc.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      // offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      // hostedDomain: '', // specifies a hosted domain restriction
      // forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      // accountName: '', // [Android] specifies an account name on the device that should be used
      // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
      // googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
      // openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
      // profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
    });
    _googleSignIn();
  };

  const _googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const user = userInfo.user;
      const userName = user.familyName + user.givenName;
      setLoading(true);
      _checkUser(userInfo, user.email, userName);
      console.log('userinfo', user, userName);
    } catch (error: any) {
      setLoading(false);
      console.log('err', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('알림', '스토어와 통신 할 수 없습니다.');
      } else {
        Alert.alert('알림', '현재 해당 기능을 사용 할 수 없습니다.');
      }
    }
  };
  // ########## google end ##########

  const _onPressLogin = (snsType: string) => {
    setLoading(true);
    switch (snsType) {
      case SnsList.naver:
        return loginNaver();
      case SnsList.kakao:
        return signInWithKakao();
      case SnsList.google:
        return _googleLogin();
      case SnsList.apple:
        setLoading(false);
        return;
      default:
        setLoading(false);
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
