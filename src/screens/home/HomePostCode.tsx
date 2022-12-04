import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import GlobalStyles from 'styles/GlobalStyles';
import Postcode from '@actbase/react-daum-postcode';
import {useNavigation} from '@react-navigation/native';
import {commonTypes} from '@types';
import commonAPI from 'api/modules/commonAPI';
import Loading from '@components/Loading';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'redux/store';
import modules from 'constants/utils/modules';

const HomePostCode = () => {
  const nav = useNavigation<commonTypes.navi>();
  const dispatch = useDispatch();
  const {userInfo} = useSelector((state: RootState) => state.authReducer);
  const [loading, setLoading] = useState(false);

  const _postUserAddr = async (params: any) => {
    const data = {
      user_id: userInfo?.id,
      address_name: '집',
      address_detail: params.address_name,
      address_lat: params.y,
      address_lon: params.x,
    };

    await commonAPI
      ._postUserAddr(data)
      .then(res => {
        modules
          ._updateUserInfo(dispatch, userInfo)
          .then(() => nav.navigate('HomeMain'));
        console.log('res post', res);
      })
      .catch(err => console.log('err', err))
      .finally(() => {
        setLoading(false);
      });
  };

  const _convert = async (postRes: any) => {
    setLoading(true);
    const data = {query: postRes};
    await commonAPI
      ._getSearchAddr(data)
      .then(res => {
        _postUserAddr(res.data.documents[0]);
        console.log('res', res.data);
      })
      .catch(err => {
        setLoading(false);
        console.log('err', err);
      });
  };

  return (
    <SafeAreaView style={{...GlobalStyles.safeAreaStyle}}>
      <Postcode
        style={{flex: 1}}
        jsOptions={{animation: true}}
        onSelected={data => {
          console.log('data', data);
          _convert(data.address);
          // nav.navigate('HomeSearch', {
          //   addr: data.roadAddress ? data.roadAddress : data.autoRoadAddress,
          // });
        }}
        onError={err => console.warn(err)}
      />
      <Loading visible={loading} />
    </SafeAreaView>
  );
};

export default HomePostCode;
