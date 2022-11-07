import {
  View,
  Text,
  Pressable,
  TextInput,
  Keyboard,
  Image,
  ListRenderItem,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import GlobalStyles from 'styles/GlobalStyles';
import BottomNav from '@components/BottomNav';
import {useNavigation} from '@react-navigation/native';
import {commonTypes} from '@types';
import {_getHeight} from 'constants/utils';
import FontList from 'constants/FontList';
import PathSearchBox from '@screens/path/components/PathSearchBox';
import {FlatList} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {setGoal} from 'redux/reducers/pathReducer';
import Loading from '@components/Loading';

const PathSearchMain = () => {
  const nav = useNavigation<commonTypes.navi>();
  const [history, setHistory] = useState([
    '선릉역',
    '이마트 트레이더스',
    '코스트코',
  ]);
  const [historyRecent, setHistoryRecent] = useState([
    '서문여자고등학교',
    '이마트 트레이더스',
    '홈플러스',
    '스타벅스',
    '서울시청',
    '부산시청',
    '코스트코',
    '인천국제공항',
    '서문여자고등학교',
    '이마트 트레이더스',
    '홈플러스',
    '스타벅스',
    '서울시청',
    '부산시청',
    '코스트코',
    '인천국제공항',
    '서문여자고등학교',
    '이마트 트레이더스',
    '홈플러스',
    '스타벅스',
    '서울시청',
    '부산시청',
    '코스트코',
    '인천국제공항',
  ]);
  const dispatch = useDispatch();

  const _onPress = (item: any) => {
    console.log('item', item);
    const data: commonTypes.item = {
      addr: '강남구 서초동 방배로 33-3',
      statNm: item,
      parkingFree: true,
    };
    dispatch(setGoal('강남구 서초동 방배로 33-3'));
    nav.navigate('PathMain', {item: data});
  };

  const _delelteItem = (target: any[], setTarget: any, index: any) => {
    console.log('index', index);
    let temp = [...target];
    temp = target.filter((item, idx) => idx !== index);
    setTarget(temp);
  };

  const _onEndReached = () => {
    const data = [
      '서문여자고등학교',
      '이마트 트레이더스',
      '홈플러스',
      '스타벅스',
      '서울시청',
      '부산시청',
      '코스트코',
      '인천국제공항',
      '서문여자고등학교',
      '이마트 트레이더스',
      '홈플러스',
      '스타벅스',
      '서울시청',
      '부산시청',
      '코스트코',
      '인천국제공항',
      '서문여자고등학교',
      '이마트 트레이더스',
      '홈플러스',
      '스타벅스',
      '서울시청',
      '부산시청',
      '코스트코',
      '인천국제공항',
    ];
    let temp = [...historyRecent];
    temp.push(...data);
    console.log('temp', temp);
    setHistoryRecent(temp);
  };

  const renderItem: ListRenderItem<any> = item => {
    return (
      <>
        {item.index === 0 && (
          <View
            style={{
              paddingHorizontal: 18,
              paddingTop: history.length > 0 ? 15 : 0,
            }}>
            <Text
              style={{
                lineHeight: 28,
                fontFamily: FontList.PretendardRegular,
                fontSize: 16,
                color: '#333333',
              }}>
              최근 도착지
            </Text>
          </View>
        )}
        <Pressable
          onPress={() => _onPress(item.item)}
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
                {item.item}
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
              <Pressable
                hitSlop={15}
                onPress={() => {
                  _delelteItem(historyRecent, setHistoryRecent, item.index);
                }}>
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
              강남구 서초동 방배로 33-3
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
        <PathSearchBox editable={true} />
      </View>
      <FlatList
        renderItem={item => renderItem(item)}
        style={{paddingBottom: 60, marginBottom: 60}}
        onEndReached={() => {
          _onEndReached();
        }}
        ListHeaderComponent={() => (
          <>
            <View style={{paddingHorizontal: 18, paddingTop: 15}}>
              {history.length > 0 && (
                <Text
                  style={{
                    lineHeight: 28,
                    fontFamily: FontList.PretendardRegular,
                    fontSize: 16,
                    color: '#333333',
                  }}>
                  최근 검색지
                </Text>
              )}
            </View>
            {history.map((item, idx) => (
              <Pressable
                onPress={() => _onPress(item)}
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
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                      {item}
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
                    <Pressable
                      onPress={() => _delelteItem(history, setHistory, idx)}>
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
              </Pressable>
            ))}
          </>
        )}
        data={historyRecent}
        keyExtractor={(item, idx) => String(idx) + String(item)}
      />
      <BottomNav />
    </SafeAreaView>
  );
};

export default PathSearchMain;
