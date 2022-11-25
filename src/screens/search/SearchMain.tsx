import {
  View,
  Text,
  Pressable,
  TextInput,
  Keyboard,
  Image,
  Modal,
  ActivityIndicator,
  useWindowDimensions,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import GlobalStyles from 'styles/GlobalStyles';
import BottomNav from '@components/BottomNav';
import {useNavigation} from '@react-navigation/native';
import {commonTypes} from '@types';
import {_getHeight} from 'constants/utils';
import FontList from 'constants/FontList';
import commonAPI from 'api/modules/commonAPI';
import MyModal from '@components/MyModal';
import {ScrollView} from 'react-native-gesture-handler';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'redux/store';
import {setAroundKeyData} from 'redux/reducers/aroundReducer';
import Loading from '@components/Loading';
import modules from 'constants/utils/modules';

interface keywordParam {
  keywords: string;
  offset: number;
  limit: number;
}

const SearchMain = () => {
  const nav = useNavigation<commonTypes.navi>();
  const [input, setInput] = useState('');

  const [recent, setRecent] = useState([]);

  const [visible, setVisible] = useState(false);

  const [res, setRest] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalNoRes, setModalNoRes] = useState(false);
  const [showNoRes, setShowNoRes] = useState(false);
  const {userInfo} = useSelector((state: RootState) => state.authReducer);
  const {currentUserLocation} = useSelector(
    (state: RootState) => state.locationReducer,
  );

  const dispatch = useDispatch();

  const _getUserHistory = async () => {
    const data = {
      user_id: userInfo?.id,
    };
    await commonAPI
      ._getUserHistory(data)
      .then(res => {
        console.log('User History RES::', res.data.histories);
        setRecent(res.data.histories);
      })
      .catch(err => console.log('ERR', err))
      .finally(() => {
        setVisible(false);
      });
  };

  const _postUserHistory = async (item: any) => {
    const data = {
      user_id: userInfo?.id,
      stat_id: item.statId,
    };
    if (data.user_id) {
      await commonAPI
        ._postUserHistory(data)
        .then(res => {
          // dispatch(setAroundKey({aroundKey: item.addr}));
          if (res.data) {
            dispatch(setAroundKeyData(item));
            modules._updateUserInfo(dispatch, userInfo);
            nav.navigate('AroundMain');
          }
        })
        .catch(err => console.log('err', err));
    } else {
      dispatch(setAroundKeyData(item));
      nav.navigate('AroundMain');
    }
  };

  const _delUserHistory = async (stat_id: string) => {
    const data = {
      user_id: userInfo?.id,
      stat_id: stat_id,
    };

    await commonAPI
      ._deleteUserHistory(data)
      .then(res => modules._updateUserInfo(dispatch, userInfo))
      .catch(err => console.log('err', err));
  };

  const _getKeyword = async () => {
    // setModal(true);
    if (!(input.length > 1)) return;
    if (input) {
      // const data: keywordParam = {
      //   keywords: input,
      //   offset: 0,
      //   limit: 3,
      // };
      const data = {
        searchKeyword: '야구장',
        currentXY: [cur, 126.8881368],
      };
      await commonAPI._postSearchBase();
      // await commonAPI
      //   ._postAruondStation(data)
      //   .then(res => {
      //     console.log('res', res?.data.data);
      //     if (res?.data.data.length > 0) {
      //       setRest(res?.data.data);
      //       setShowNoRes(false);
      //     } else {
      //       setShowNoRes(true);
      //       // setModalNoRes(!modalNoRes);
      //     }
      //   })
      //   .catch(err => console.log('## ERROR', err))
      //   .finally(() => {});
    }
  };

  const _delelteItem = (
    target: any[],
    setTarget: any,
    index: any,
    stat_id: string,
  ) => {
    let temp = [...target];
    temp = target.filter((item, idx) => idx !== index);
    _delUserHistory(stat_id);
    setTarget(temp);
  };

  useEffect(() => {
    if (input) {
      _getKeyword();
    }
  }, [input]);

  useEffect(() => {
    if (userInfo?.id) {
      setVisible(true);
      _getUserHistory();
    }
  }, []);

  return (
    <SafeAreaView style={{...GlobalStyles.safeAreaStyle}}>
      <View
        style={{
          marginTop: 15,
          paddingBottom: 17,
          borderBottomWidth: 4,
          borderColor: '#F6F6F6',
        }}>
        <View style={{marginHorizontal: 18}}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
            }}>
            <TextInput
              onSubmitEditing={() => {
                _getKeyword();
                Keyboard.dismiss();
              }}
              onChangeText={setInput}
              value={input}
              autoCapitalize="none"
              placeholder="목적지를 검색하세요"
              style={{
                flex: 1,
                height: 39,
                backgroundColor: '#F4F2F2',
                borderRadius: 3,
                paddingHorizontal: 10,
                marginRight: 6.5,
              }}
            />
            <Pressable
              hitSlop={10}
              onPress={() => {
                setInput('');
              }}>
              <Image
                source={require('@assets/search_close.png')}
                style={{width: 12, height: 12}}
                resizeMode="contain"
              />
            </Pressable>
          </View>
        </View>
      </View>

      {/* input res 없을 시 */}
      {res.length === 0 && showNoRes && input.length > 1 && (
        <View style={{margin: 16}}>
          <Text
            style={{
              fontFamily: FontList.PretendardRegular,
              color: '#333333',
            }}>
            검색결과가 없습니다
          </Text>
        </View>
      )}

      <ScrollView style={{marginBottom: 60}}>
        {/* input 존재 시 리스트업 */}
        {input && res.length > 0 && (
          <>
            {res.map((item, index) => (
              <Pressable
                onPress={() => {
                  console.log('item', item);
                  _postUserHistory(item);
                }}
                key={index}
                style={{
                  paddingVertical: 3,
                  justifyContent: 'center',
                  borderColor: '#F6F6F6',
                  borderBottomWidth: res.length - 1 === index ? 4 : 1,
                }}>
                <View
                  style={{
                    height: 48,
                    marginHorizontal: 18,
                    // borderBottomWidth: 1,
                    borderColor: '#F6F6F6',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={require('@assets/search.png')}
                      style={{width: 14, height: 14, marginRight: 6}}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        fontFamily: FontList.PretendardMedium,
                        fontSize: 16,
                        color: '#333333',
                      }}>
                      {item?.statNm}
                    </Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </>
        )}
        <Text
          style={{
            lineHeight: 24,
            color: '#333333',
            marginHorizontal: 16,
            marginTop: 17.6,
            fontSize: 16,
          }}>
          최근 기록
        </Text>
        {recent.length === 0 && (
          <Text
            style={{
              lineHeight: 24,
              color: '#7A7A7A',
              marginHorizontal: 16,
              marginTop: 17.6,
              fontSize: 13,
            }}>
            최근 검색지가 없습니다
          </Text>
        )}
        {recent.map((item, index) => (
          <Pressable
            hitSlop={10}
            onPress={() => {
              console.log('recent item', item);
              dispatch(setAroundKeyData(item));
              nav.navigate('AroundMain');
            }}
            key={index}
            style={{
              justifyContent: 'center',
              borderColor: '#F6F6F6',
              borderBottomWidth: 1,
              // borderBottomWidth: index === history.length - 1 ? 5 : undefined,
            }}>
            <View
              style={{
                marginHorizontal: 16,
                // minHeight: 38,
                paddingVertical: 18,
                justifyContent: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={require('@assets/search_goal.png')}
                    style={{width: 12, height: 12, marginRight: 6}}
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      fontFamily: FontList.PretendardMedium,
                      fontSize: 16,
                      color: '#333333',
                    }}>
                    {item.statNm}
                  </Text>
                </View>
                <Pressable
                  hitSlop={10}
                  onPress={() => {
                    _delelteItem(recent, setRecent, index, item.statId);
                  }}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontFamily: FontList.PretendardRegular,
                      color: '#C6C6C6',
                    }}>
                    {modules._convertDate(item.updated_at)}
                  </Text>
                  <Image
                    source={require('@assets/search_close.png')}
                    style={{
                      width: 12,
                      height: 12,
                      marginLeft: 10,
                      tintColor: '#959595',
                    }}
                    resizeMode="contain"
                  />
                </Pressable>
              </View>

              <Text
                style={{
                  lineHeight: 24,
                  fontFamily: FontList.PretendardRegular,
                  color: '#7A7A7A',
                }}>
                {item.addr}
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      <BottomNav />
      <Modal
        transparent
        statusBarTranslucent={true}
        onRequestClose={() => {
          // setModal(!modal);
        }}
        visible={modal}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.3)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" />
        </View>
      </Modal>

      <MyModal
        visible={modalNoRes}
        setVisible={setModalNoRes}
        positive
        positiveTitle="확인"
        title="검색결과가 없습니다"
      />
      <Loading visible={visible} />
    </SafeAreaView>
  );
};

export default SearchMain;
