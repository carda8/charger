import React, {
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
} from 'react';
import {_getHeight, _getWidth} from 'constants/utils';
import {commonTypes} from '@types';
import {useNavigation} from '@react-navigation/native';
import {Image, Keyboard, Pressable, Text, TextInput, View} from 'react-native';
import FontList from 'constants/FontList';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'redux/store';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import commonAPI from 'api/modules/commonAPI';
import {
  setGoalData,
  setIsGoalFinish,
  setKeywordList,
  setLastRef,
  setStartData,
  switchPosition,
} from 'redux/reducers/pathReducer';

interface props {
  editable?: boolean;
  showOnlyMap?: boolean;
  setShowOnlyMap?: Dispatch<SetStateAction<boolean>>;
  sheetRef?: React.RefObject<BottomSheetModalMethods>;
  setRec?: Dispatch<SetStateAction<boolean>>;
}

const PathSearchBox = ({
  editable,
  showOnlyMap,
  setShowOnlyMap,
  sheetRef,
  setRec,
}: props) => {
  const nav = useNavigation<commonTypes.navi>();
  const dispatch = useDispatch();
  const {goalData, startData} = useSelector(
    (state: RootState) => state.pathReducer,
  );
  const [home, setHome] = useState(false);
  const [inputStart, setInputStart] = useState('');
  const [inputGoal, setInputGoal] = useState('');

  const startRef = useRef<TextInput>(null);
  const goalRef = useRef<TextInput>(null);

  const _resetLocation = () => {};

  const _putHome = () => {
    if (!home) {
      setHome(true);
    } else {
      setHome(false);
    }
  };

  const _getResult = async () => {
    const data = {
      keywords: startRef.current?.isFocused() ? inputStart : inputGoal,
      offset: 0,
      limit: 3,
    };
    await commonAPI
      ._postAruondStation(data)
      .then(res => {
        if (res.data.data) dispatch(setKeywordList(res.data.data));
      })
      .catch(err => console.log('err', err));
  };

  const lastFocus = useRef('');
  useEffect(() => {
    if (startRef.current?.isFocused() && inputStart?.length > 1) {
      if (lastFocus.current === 'goal') {
        lastFocus.current = 'start';
        dispatch(setLastRef(lastFocus.current));
      }
      _getResult();
    }
    if (!startRef.current?.isFocused() && inputGoal?.length > 1) {
      if (lastFocus.current === 'start') {
        lastFocus.current = 'goal';
        dispatch(setLastRef(lastFocus.current));
      }
      _getResult();
    }
  }, [inputGoal, inputStart]);

  const _onPressClose = () => {
    setInputStart('');
    setInputGoal('');
    sheetRef?.current?.close();
    if (setRec) setRec(false);
    dispatch(setGoalData(null));
    dispatch(setStartData(null));
    dispatch(setKeywordList([]));
  };

  const _onPressSwitch = () => {
    sheetRef?.current?.close();
    const copyStart = inputStart;
    const copyGoal = inputGoal;
    dispatch(switchPosition({}));
    setInputStart(copyGoal);
    setInputGoal(copyStart);
  };

  // 현위치
  useEffect(() => {
    setInputStart(startData?.statNm);
  }, [startData]);
  //도착지
  useEffect(() => {
    setInputGoal(goalData?.statNm);
  }, [goalData]);

  return (
    <View style={{width: '100%', backgroundColor: 'white'}}>
      {/* 검색창 및 좌, 우 버튼 */}
      <View style={{flexDirection: 'row', marginHorizontal: 16, marginTop: 16}}>
        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
          <Pressable
            hitSlop={10}
            onPress={() => {
              _onPressSwitch();
            }}>
            <Image
              source={require('@assets/switch_position.png')}
              style={{width: 16, height: 17}}
              resizeMode="contain"
            />
          </Pressable>

          <Pressable
            style={{
              flex: 1,
              marginHorizontal: 5,
            }}>
            <View style={{backgroundColor: '#F4F2F2', borderRadius: 3}}>
              <Pressable
                onPress={() => {
                  editable ? undefined : nav.navigate('PathSearchMain');
                  dispatch(setLastRef('start'));
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginHorizontal: 8,
                }}>
                <Text
                  style={{
                    fontFamily: FontList.PretendardRegular,
                    color: '#959595',
                  }}>
                  현위치
                </Text>
                <TextInput
                  ref={startRef}
                  onSubmitEditing={() => {
                    Keyboard.dismiss();
                  }}
                  onFocus={() => dispatch(setLastRef('start'))}
                  value={inputStart}
                  onChangeText={setInputStart}
                  editable={editable ? true : false}
                  style={{
                    flex: 1,
                    height: 39,
                    borderBottomWidth: 1,
                    marginHorizontal: 10,
                    borderColor: '#C6C6C6',
                  }}
                  placeholder="목적지를 검색하세요"
                />
              </Pressable>

              <Pressable
                onPress={() => {
                  editable ? undefined : nav.navigate('PathSearchMain');
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginHorizontal: 8,
                }}>
                <Text
                  style={{
                    fontFamily: FontList.PretendardRegular,
                    color: '#959595',
                  }}>
                  도착지
                </Text>
                <TextInput
                  onFocus={() => dispatch(setLastRef('goal'))}
                  ref={goalRef}
                  editable={editable ? true : false}
                  autoCapitalize="none"
                  value={inputGoal}
                  onChangeText={setInputGoal}
                  onSubmitEditing={() => {
                    Keyboard.dismiss();
                  }}
                  style={{
                    flex: 1,
                    height: 39,
                    marginHorizontal: 10,
                  }}
                  placeholder="목적지를 검색하세요"
                />
              </Pressable>
            </View>
          </Pressable>
        </View>
        <Pressable
          hitSlop={5}
          onPress={() => _onPressClose()}
          style={{top: 15}}>
          <Image
            source={require('@assets/close_star.png')}
            style={{width: 14, height: 14}}
            resizeMode="contain"
          />
        </Pressable>
      </View>
      {/* 하단 버튼 */}
      <View
        style={{
          flexDirection: 'row',
          marginTop: 6,
          marginBottom: 16,
          marginHorizontal: 36,
        }}>
        <Pressable
          onPress={() => {
            _putHome();
          }}
          style={{
            marginRight: 12,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 23,
              height: 23,
              backgroundColor: home ? '#0788FF' : 'white',
              borderWidth: 1,
              borderColor: '#EEEEEE',
              borderRadius: 23 / 2,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 4,
            }}>
            <Image
              source={require('@assets/main_home.png')}
              style={{
                width: 12,
                height: 12,
                tintColor: home ? 'white' : '#C6C6C6',
              }}
              resizeMode="contain"
            />
          </View>
          <Text
            style={{
              fontFamily: FontList.PretendardRegular,
              fontSize: 12,
              color: '#333333',
            }}>
            집
          </Text>
        </Pressable>

        {/* <Pressable
          onPress={() => {
            nav.navigate('FavStationMain');
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 23,
              height: 23,
              backgroundColor: 'white',
              borderRadius: 23 / 2,
              borderWidth: 1,
              borderColor: '#EEEEEE',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 4,
            }}>
            <Image
              source={require('@assets/star_favorite.png')}
              style={{width: 12, height: 12}}
              resizeMode="contain"
            />
          </View>
          <Text
            style={{
              fontFamily: FontList.PretendardRegular,
              fontSize: 12,
              color: '#333333',
            }}>
            즐겨찾기
          </Text>
        </Pressable> */}
      </View>
    </View>
  );
};

export default PathSearchBox;
