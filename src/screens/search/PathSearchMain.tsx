import {
  View,
  Text,
  Pressable,
  TextInput,
  Keyboard,
  Image,
  ListRenderItem,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import GlobalStyles from 'styles/GlobalStyles';
import BottomNav from '@components/BottomNav';
import {useNavigation} from '@react-navigation/native';
import {commonTypes} from '@types';
import {_getHeight} from 'constants/utils';
import FontList from 'constants/FontList';
import PathSearchBox from '@screens/path/components/PathSearchBox';
import {FlatList} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '@components/Loading';
import {RootState} from 'redux/store';
import {
  setGoalData,
  setIsGoalFinish,
  setIsStartFinish,
  setKeywordList,
  setStartData,
} from 'redux/reducers/pathReducer';
import bottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet';

const PathSearchMain = () => {
  const nav = useNavigation<commonTypes.navi>();
  const {userInfo} = useSelector((state: RootState) => state.authReducer);
  const {keywordList, lastRef, goalData, startData} = useSelector(
    (state: RootState) => state.pathReducer,
  );
  const dispatch = useDispatch();
  console.log('keywordk', keywordList);

  const _onPress = (item: any) => {
    console.log('item1', item);
    console.log('last index', lastRef);
    // return;
    if (!lastRef || lastRef === 'goal') {
      dispatch(setGoalData(item));
      dispatch(setKeywordList([]));
      dispatch(setIsGoalFinish(false));
    }
    if (lastRef === 'start') {
      dispatch(setStartData(item));
      dispatch(setKeywordList([]));
      dispatch(setIsStartFinish(false));
    }

    nav.navigate('PathMain');
    // nav.navigate('PathMain');
  };

  const _delelteItem = (target: any[], setTarget: any, index: any) => {
    let temp = [...target];
    console.log('index', index);
    temp = target.filter((item, idx) => idx !== index);
    setTarget(temp);
  };

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
              {item.item.addr}
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
        // onEndReached={() => {}}
        ListEmptyComponent={
          <>
            <View style={{margin: 16}}>
              <Text
                style={{
                  lineHeight: 24,
                  color: '#7A7A7A',
                  marginHorizontal: 16,
                  // marginTop: 17.6,
                  fontSize: 13,
                }}>
                최근 검색지가 없습니다
              </Text>
            </View>
          </>
        }
        data={[]}
        keyExtractor={(item, idx) => String(idx) + String(item)}
        ListHeaderComponent={
          <>
            {keywordList.map(
              (item, idx) =>
                idx < 3 && (
                  <Pressable
                    onPress={() => {
                      _onPress(item);
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
                          {/* {console.log('item', item)} */}
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
