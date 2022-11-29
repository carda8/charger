import {View, Text, Pressable, FlatList, ListRenderItem} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import GlobalStyles from 'styles/GlobalStyles';
import HeaderCenter from '@components/HeaderCenter';
import BottomNav from '@components/BottomNav';
import FontList from 'constants/FontList';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {commonTypes} from '@types';
import HomeSearchItem from './components/HomeSearchItem';
import NavModal from '@components/NavModal';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'redux/store';
import commonAPI from 'api/modules/commonAPI';
import modules from 'constants/utils/modules';
import Loading from '@components/Loading';
import {setUserInfo} from 'redux/reducers/authReducer';

const HomeMain = () => {
  const nav = useNavigation<commonTypes.navi>();
  const [visible, setVisible] = useState(false);
  const {userInfo} = useSelector((state: RootState) => state.authReducer);
  const [coor, setCoor] = useState({});
  const [startCorr, setStartCoor] = useState({});
  const [myHomeList, setMyHomeList] = useState([]);

  const renderItem: ListRenderItem<any> = item => {
    const renderData = item.item;
    return (
      <HomeSearchItem
        setVisible={setVisible}
        visible={visible}
        renderData={renderData}
        setCoor={setCoor}
        setStartCoor={setStartCoor}
      />
    );
  };

  const _getMyStation = async () => {
    const data = {
      location: `${userInfo?.addressInfo?.location.lon},${userInfo?.addressInfo?.location.lat}`,
      distance: '1',
    };
    await commonAPI
      ._getMyHome(data)
      .then(res => {
        if (res.data.data.length > 0) {
          console.log('getMyHome res', res.data.data);
          setMyHomeList(res.data.data);
        }
      })
      .catch(err => console.log('getMyHome err', err));
  };

  useEffect(() => {
    if (userInfo?.addressInfo?.location) {
      _getMyStation();
    }
  }, []);

  return (
    <SafeAreaView style={{...GlobalStyles.safeAreaStyle}}>
      <HeaderCenter
        title="마이홈 충전소"
        leftBack
        rightBack
        isMyHome={true}
        backTitle="닫기"
        backTitleStyle={{fontSize: 16, fontFamily: FontList.PretendardRegular}}
      />
      <View
        style={{
          borderBottomWidth: 4,
          borderColor: '#F8F4F4',
          paddingBottom: 16,
        }}>
        <View style={{marginHorizontal: 16}}>
          <View style={{marginTop: 18}}>
            <Text
              style={{
                fontFamily: FontList.PretendardSemiBold,
                fontSize: 16,
                color: '#333333',
                lineHeight: 28,
              }}>
              집
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    fontFamily: FontList.PretendardRegular,
                    fontSize: 15,
                    color: '#333333',
                  }}>
                  {userInfo?.addressInfo?.address}
                </Text>
              </View>
              <Pressable
                onPress={() => {
                  nav.navigate('HomePostCode');
                }}
                style={{
                  width: 46,
                  height: 23,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderRadius: 29,
                  borderColor: '#C6C6C6',
                }}>
                <Text
                  style={{
                    fontFamily: FontList.PretendardRegular,
                    color: '#959595',
                  }}>
                  수정
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
      {userInfo?.addressInfo ? (
        <FlatList
          data={myHomeList}
          keyExtractor={(item, index) => String(index)}
          style={{marginBottom: 60}}
          renderItem={item => renderItem(item)}
          ListEmptyComponent={
            <View style={{margin: 16}}>
              <Text>집 근처 충전소가 없습니다</Text>
            </View>
          }
          ListHeaderComponent={
            <View style={{paddingHorizontal: 16, marginTop: 12}}>
              <Text
                style={{
                  fontFamily: FontList.PretendardRegular,
                  fontSize: 16,
                  color: '#333333',
                }}>
                집 근처 충전소
              </Text>
            </View>
          }
        />
      ) : (
        <></>
      )}

      <NavModal
        visible={visible}
        setVisible={setVisible}
        title="길안내 연결"
        goalCoor={coor}
        startCoor={{
          latitude: userInfo?.addressInfo?.location.lat,
          longitude: userInfo?.addressInfo?.location.lon,
        }}
      />
      <BottomNav />
    </SafeAreaView>
  );
};

export default HomeMain;
