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
  resetPath,
  setGoalData,
  setIsGoalFinish,
  setIsHoem,
  setKeywordList,
  setLastRef,
  setStartData,
  switchPosition,
} from 'redux/reducers/pathReducer';

interface props {
  editable?: boolean;
  // showOnlyMap?: boolean;
  // setShowOnlyMap?: Dispatch<SetStateAction<boolean>>;
  // sheetRef?: React.RefObject<BottomSheetModalMethods>;
  // setRec?: Dispatch<SetStateAction<boolean>>;
  // setRecomandList?: Dispatch<SetStateAction<any>>;
  // sheetStarRef?: React.RefObject<BottomSheetModalMethods>;
  // setModalLogin?: Dispatch<SetStateAction<boolean>>;
}

const PathSearchBox = ({editable}: props) => {
  // _postSearchBase 키워드에 대한 검색 api

  // const _onPressClose = () => {
  //   setInputStart('');
  //   setInputGoal('');
  //   if (setRecomandList) setRecomandList([]);
  //   sheetRef?.current?.close();
  //   if (setRec) setRec(false);
  //   // dispatch(setGoalData(null));
  //   // dispatch(setStartData(null));
  //   // dispatch(setKeywordList([]));
  //   dispatch(resetPath({}));
  // };

  // const _onPressSwitch = () => {
  //   sheetRef?.current?.close();
  //   const copyStart = inputStart;
  //   const copyGoal = inputGoal;
  //   dispatch(switchPosition({}));
  //   setInputStart(copyGoal);
  //   setInputGoal(copyStart);
  // };
  const [inputStart, setInputStart] = useState('');
  const [inputGoal, setInputGoal] = useState('');
  const [isHome, setIsHome] = useState(false);

  return (
    <View style={{width: '100%', backgroundColor: 'white'}}>
      {/* 검색창 및 좌, 우 버튼 */}
      <View style={{flexDirection: 'row', marginHorizontal: 16, marginTop: 16}}>
        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
          <Pressable hitSlop={10} onPress={() => {}}>
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
                onPress={() => {}}
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
                  onSubmitEditing={() => {
                    Keyboard.dismiss();
                  }}
                  onFocus={() => {}}
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
                onPress={() => {}}
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
                  onFocus={() => {}}
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
        <Pressable hitSlop={5} onPress={() => {}} style={{top: 15}}>
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
          hitSlop={7}
          onPress={() => {}}
          style={{
            marginRight: 12,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 23,
              height: 23,
              backgroundColor: isHome ? '#0788FF' : 'white',
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
                tintColor: isHome ? 'white' : '#C6C6C6',
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

        <Pressable
          onPress={() => {}}
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
        </Pressable>
      </View>
    </View>
  );
};

export default PathSearchBox;
