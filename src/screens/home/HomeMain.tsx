import {View, Text, Pressable, FlatList, ListRenderItem} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import GlobalStyles from 'styles/GlobalStyles';
import HeaderCenter from '@components/HeaderCenter';
import BottomNav from '@components/BottomNav';
import FontList from 'constants/FontList';
import {useNavigation} from '@react-navigation/native';
import {commonTypes} from '@types';
import HomeSearchItem from './components/HomeSearchItem';
import NavModal from '@components/NavModal';
import {useSelector} from 'react-redux';
import {RootState} from 'redux/store';

const HomeMain = () => {
  const nav = useNavigation<commonTypes.navi>();
  const data = [1, 1, 1, 1, 1];
  const [visible, setVisible] = useState(false);
  const {userInfo} = useSelector((state: RootState) => state.authReducer);
  // const addr =
  //   useRoute<RouteProp<commonTypes.RootStackParamList, 'HomeMain'>>().params
  //     ?.addr;
  console.log('User Addr', userInfo?.addressInfo);
  const renderItem: ListRenderItem<any> = item => {
    return <HomeSearchItem setVisible={setVisible} visible={visible} />;
  };

  return (
    <SafeAreaView style={{...GlobalStyles.safeAreaStyle}}>
      <HeaderCenter
        title="집으로 안내"
        leftBack
        rightBack
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
          data={data}
          keyExtractor={(item, index) => String(index)}
          style={{marginBottom: 60}}
          renderItem={item => renderItem(item)}
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

      <NavModal visible={visible} setVisible={setVisible} title="길안내 연결" />
      <BottomNav />
    </SafeAreaView>
  );
};

export default HomeMain;
