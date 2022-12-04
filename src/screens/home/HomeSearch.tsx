import {View, Text, Pressable, Image, ListRenderItem} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import GlobalStyles from 'styles/GlobalStyles';
import Header from '@components/Header';
import FontList from 'constants/FontList';
import {FlatList} from 'react-native-gesture-handler';
import BottomButton from '@components/BottomButton';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {commonTypes} from '@types';
import {_getHeight, _getWidth} from 'constants/utils';
import HomeSearchItem from './components/HomeSearchItem';
import MyModal from '@components/MyModal';
import {useSelector} from 'react-redux';
import {RootState} from 'redux/store';

const HomeSearch = () => {
  const nav = useNavigation<commonTypes.navi>();
  const [visible, setVisible] = useState(false);
  const {userInfo} = useSelector((state: RootState) => state.authReducer);
  const data = [1, 1, 1, 1, 1];

  const renderItem: ListRenderItem<any> = item => {
    return <HomeSearchItem />;
  };

  return (
    <SafeAreaView style={{...GlobalStyles.safeAreaStyle}}>
      <Header
        title="집을 설정해주세요"
        titleStyle={{
          fontFamily: FontList.PretendardRegular,
          fontSize: 18,
          color: '#333333',
        }}
        backTitle={'취소'}
        backTitleStyle={{
          fontFamily: FontList.PretendardBold,
          fontSize: 16,
          color: '#333333',
        }}
        goBack
      />
      <View
        style={
          userInfo?.addressInfo
            ? {
                borderBottomWidth: 4,
                borderColor: '#F8F4F4',
                paddingBottom: 16,
              }
            : {}
        }>
        <View style={{marginHorizontal: 16}}>
          <Text
            style={{
              fontFamily: FontList.PretendardMedium,
              color: '#959595',
              lineHeight: 20,
            }}>
            {
              '집을 설정하시면 해당 주소 1km반경의 충전소를\n모아볼 수 있습니다.'
            }
          </Text>
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
            {userInfo?.addressInfo ? (
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
                    {userInfo?.addressInfo.address}
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
            ) : (
              <Pressable
                onPress={() => {
                  nav.navigate('HomePostCode');
                }}
                style={{
                  borderWidth: 1,
                  borderColor: '#C6C6C6',
                  borderRadius: 3,
                  alignItems: 'center',
                  paddingLeft: 8,
                  flexDirection: 'row',
                  height: 42,
                }}>
                <Text
                  style={{
                    flex: 1,

                    fontFamily: FontList.PretendardRegular,
                    color: '#5B5B5B',
                  }}>
                  {'주소를 검색하세요'}
                </Text>
                <Image
                  source={require('@assets/search.png')}
                  style={{width: 14, height: 14, marginRight: 13}}
                  resizeMode="contain"
                />
              </Pressable>
            )}
          </View>
        </View>
      </View>
      {userInfo?.addressInfo ? (
        <FlatList
          data={data}
          keyExtractor={(item, index) => String(index)}
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
      <MyModal
        title="등록완료"
        text={
          '집이 성공적으로 등록되었습니다.\n이어서 마이홈 충전소 안내를 받을까요?'
        }
        positive
        positiveTitle="네"
        positivePress={() => nav.navigate('HomeMain')}
        visible={visible}
        setVisible={setVisible}
        negative
        negativeTitle="아니요"
      />
      <BottomButton
        style={{marginHorizontal: 18}}
        text="완료"
        disable={userInfo?.addressInfo ? false : true}
        setVisible={setVisible}
      />
    </SafeAreaView>
  );
};

export default HomeSearch;
