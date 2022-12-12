import {
  View,
  Text,
  Pressable,
  TextInput,
  Keyboard,
  Image,
  ListRenderItem,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import GlobalStyles from 'styles/GlobalStyles';
import BottomNav from '@components/BottomNav';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {commonTypes} from '@types';
import {_getHeight} from 'constants/utils';
import FontList from 'constants/FontList';
import PathSearchBox from '@screens/path/components/PathSearchBox';
import {FlatList} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'redux/store';
import {
  setGoalData,
  setInputGoal,
  setInputStart,
  setIsGoalFinish,
  setIsStartFinish,
  setStartData,
} from 'redux/reducers/pathReducer';
import commonAPI from 'api/modules/commonAPI';
import modules from 'constants/utils/modules';

interface coor {
  latitude: number;
  longitude: number;
  zoom: number;
}

interface props {
  setCenter: any;
}

const PathSearchMain = () => {
  const nav = useNavigation<commonTypes.navi>();
  const routeProps =
    useRoute<RouteProp<commonTypes.RootStackParamList, 'PathSearchMain'>>()
      .params;
  const {keywordList, lastRef, goalData, startData} = useSelector(
    (state: RootState) => state.pathReducer,
  );
  const {userInfo} = useSelector((state: RootState) => state.authReducer);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    console.log('LIST', keywordList);
  }, [keywordList]);

  const dispatch = useDispatch();

  const _getUserHsty = async () => {
    const data = {
      user_id: userInfo?.id,
    };
    await commonAPI
      ._getUserHistory(data)
      .then(res => {
        console.log('res', res.data.histories);
        let temp = [];
        temp = res.data.histories.filter(
          (item: any) => item.searchType === 'station',
        );
        console.log('temp', temp);
        setHistory(temp);
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  const _delelteHistory = async (statId: any) => {
    const data = {
      user_id: userInfo?.id,
      stat_id: history[statId].statId,
    };
    await commonAPI
      ._deleteUserHistory(data)
      .then(res => {
        console.log('res', res.data);
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  useEffect(() => {
    if (userInfo?.id) _getUserHsty();
  }, []);

  // const _onPress = (item: any) => {
  //   // console.log('item1', item);
  //   console.log('## last index', lastRef);
  //   // return;
  //   if (!lastRef || lastRef === 'goal') {
  //     dispatch(setGoalData(item));
  //     dispatch(setKeywordList([]));
  //     dispatch(setIsGoalFinish(false));
  //   }
  //   if (lastRef === 'start') {
  //     dispatch(setStartData(item));
  //     dispatch(setKeywordList([]));
  //     dispatch(setIsStartFinish(false));
  //   }

  //   nav.navigate('PathMain');
  //   // nav.navigate('PathMain');
  // };

  const _delelteItem = (target: any[], setTarget: any, index: any) => {
    let temp = [...target];
    console.log('index', index);
    temp = target.filter((item, idx) => idx !== index);
    setTarget(temp);
    _delelteHistory(index);
  };

  const _onPressItem = (item: any) => {
    console.log('item', item);
    if (keywordList.focus) {
      dispatch(setStartData(item));
      dispatch(setInputStart(item.address));
      dispatch(setIsStartFinish(false));
      routeProps?.startBottomRef.current?.present();
    } else if (!keywordList.focus) {
      dispatch(setGoalData(item));
      dispatch(setInputGoal(item.address));
      dispatch(setIsGoalFinish(false));
      routeProps?.goalBottomRef.current?.present();
    }
    routeProps?.setCenter({
      latitude: item.location.lat,
      longitude: item.location.lon,
      zoom: 16,
    });
    Keyboard.dismiss();
    nav.navigate('PathMain');
  };

  const _onPressHistory = (item: any) => {
    const data = {
      address: item.addr,
      location: {lat: item.location.lat, lon: item.location.lon},
      name: item.statNm,
    };
    dispatch(setGoalData(data));
    dispatch(setInputGoal(data.address));
    dispatch(setIsGoalFinish(false));
    routeProps?.goalBottomRef.current?.present();
    routeProps?.setCenter({
      latitude: data.location.lat,
      longitude: data.location.lon,
      zoom: 16,
    });
    Keyboard.dismiss();
    nav.navigate('PathMain');
  };

  useEffect(() => {
    console.log('##############################');
    console.log('start data :: ', startData);
    console.log('goal data :: ', goalData);
  }, [startData, goalData]);

  const renderItem: ListRenderItem<any> = item => {
    return (
      <>
        {item.index === 0 && (
          <View
            style={{
              paddingHorizontal: 18,
              paddingTop: 16,
            }}>
            <Text
              style={{
                lineHeight: 28,
                fontFamily: FontList.PretendardRegular,
                fontSize: 16,
                color: '#333333',
              }}>
              최근 기록
            </Text>
          </View>
        )}
        <Pressable
          onPress={() => {}}
          style={{
            width: '100%',
            height: _getHeight(78),
            paddingHorizontal: 18,
            borderBottomWidth: 1,
            borderColor: '#F6F6F6',
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
                style={{width: 16, height: 16, marginRight: 6}}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontFamily: FontList.PretendardMedium,
                  fontSize: 16,
                  color: '#333333',
                }}>
                {item.item.statNm}
              </Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  fontFamily: FontList.PretendardRegular,
                  color: '#C6C6C6',
                }}>
                10.01
              </Text>
              <Pressable hitSlop={15} onPress={() => {}}>
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
          </View>
          <View style={{marginTop: 12}}>
            <Text
              style={{
                fontFamily: FontList.PretendardRegular,
                color: '#959595',
              }}>
              {/* {item.item.addr} */}
            </Text>
          </View>
        </Pressable>
      </>
    );
  };

  return (
    <SafeAreaView style={{...GlobalStyles.safeAreaStyle}}>
      <View
        style={{
          width: '100%',
          borderBottomWidth: 4,
          borderColor: '#F6F6F6',
        }}>
        <PathSearchBox
          editable={true}
          setCenter={routeProps?.setCenter}
          goalBottomRef={routeProps?.goalBottomRef}
          startBottomRef={routeProps?.startBottomRef}
          userStarRef={routeProps?.userStarRef}
        />
      </View>
      <FlatList
        keyboardShouldPersistTaps="always"
        renderItem={item => renderItem(item)}
        style={{paddingBottom: 60, marginBottom: 60}}
        ListEmptyComponent={
          <>
            {history.length > 0 ? (
              history.map((item, index) => (
                <Pressable
                  hitSlop={10}
                  onPress={() => {
                    _onPressHistory(item);
                  }}
                  key={index}
                  style={{
                    justifyContent: 'center',
                    borderColor: '#F6F6F6',
                    borderBottomWidth: 1,
                  }}>
                  <View
                    style={{
                      marginHorizontal: 16,
                      paddingVertical: 18,
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
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
                          _delelteItem(history, setHistory, index, item.statId);
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
              ))
            ) : (
              <View style={{margin: 16}}>
                <Text
                  style={{
                    lineHeight: 24,
                    color: '#7A7A7A',
                    marginHorizontal: 16,
                    fontSize: 13,
                  }}>
                  최근 검색지가 없습니다
                </Text>
              </View>
            )}
          </>
        }
        data={[]}
        keyExtractor={(item, idx) => String(idx) + String(item)}
        ListHeaderComponent={
          <>
            {keywordList?.data?.map(
              (item, idx) =>
                idx < 3 && (
                  <Pressable
                    onPress={() => {
                      _onPressItem(item);
                    }}
                    key={idx}
                    style={{
                      width: '100%',
                      height: _getHeight(48),
                      paddingHorizontal: 18,
                      borderBottomWidth: idx === 2 ? 4 : 1,
                      borderColor: '#F6F6F6',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image
                          source={require('@assets/search_history.png')}
                          style={{width: 16, height: 16, marginRight: 6}}
                          resizeMode="contain"
                        />
                        <Text
                          style={{
                            fontFamily: FontList.PretendardMedium,
                            fontSize: 16,
                            color: '#333333',
                          }}>
                          {item.name}
                        </Text>
                      </View>
                    </View>
                  </Pressable>
                ),
            )}
          </>
        }
      />
      <BottomNav />
    </SafeAreaView>
  );
};

export default PathSearchMain;
