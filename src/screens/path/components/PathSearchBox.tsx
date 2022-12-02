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
  setInputGoal,
  setInputStart,
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
  const dispatch = useDispatch();
  const nav = useNavigation<commonTypes.navi>();
  const {currentUserLocation} = useSelector(
    (state: RootState) => state.locationReducer,
  );
  const {userInfo} = useSelector((state: RootState) => state.authReducer);
  const {isHome, inputStart, inputGoal} = useSelector(
    (state: RootState) => state.pathReducer,
  );

  // const [inputStart, setInputStart] = useState('');
  // const [inputGoal, setInputGoal] = useState('');

  const startRef = useRef<TextInput>(null);

  const _onPressBox = () => {
    if (!editable) {
      nav.navigate('PathSearchMain');
    }
  };

  const _getKeywordRes = async () => {
    const data = {
      searchKeyword: startRef.current?.isFocused() ? inputStart : inputGoal,
      currentXY: [
        currentUserLocation?.latitude,
        currentUserLocation?.longitude,
      ],
    };
    await commonAPI
      ._postSearchBase(data)
      .then(res => {
        let temp = JSON.parse(JSON.stringify(res.data.data));
        temp.map((item: any, index: number) => {
          item.location.lat = Number(res.data.data[index].location.lon);
          item.location.lon = Number(res.data.data[index].location.lat);
        });
        console.log('temp', temp);
        dispatch(
          setKeywordList({data: temp, focus: startRef.current?.isFocused()}),
        );
      })
      .catch(err => {});
  };

  const _onPressClose = () => {
    dispatch(resetPath());
  };

  const _onPressHome = () => {
    if (userInfo?.addressInfo) {
      dispatch(setGoalData(userInfo?.addressInfo));
      dispatch(setInputGoal(userInfo.addressInfo.address));
    }
  };

  const _onPressSwitch = () => {
    startRef.current?.blur();
    dispatch(switchPosition());
  };

  // 목적지가 집일시
  useEffect(() => {
    if (inputGoal === userInfo?.addressInfo?.address) {
      dispatch(setIsHoem(true));
    } else dispatch(setIsHoem(false));
  }, [inputGoal]);

  // 도착, 목적지 입력시 결과 호출
  useEffect(() => {
    if (editable) {
      if (startRef.current?.isFocused() && inputStart?.length > 1) {
        _getKeywordRes();
      }
      if (!startRef.current?.isFocused() && inputGoal?.length > 1) {
        _getKeywordRes();
      }
    }
  }, [inputStart, inputGoal]);

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
                  _onPressBox();
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
                  onFocus={() => {}}
                  value={inputStart}
                  onChangeText={e => dispatch(setInputStart(e))}
                  editable={editable ? true : false}
                  style={{
                    flex: 1,
                    height: 39,
                    borderBottomWidth: 1,
                    marginHorizontal: 10,
                    borderColor: '#C6C6C6',
                  }}
                  placeholder={'목적지를 검색하세요'}
                />
              </Pressable>

              <Pressable
                onPress={() => {
                  _onPressBox();
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
                  onFocus={() => {}}
                  editable={editable ? true : false}
                  autoCapitalize="none"
                  value={inputGoal}
                  onChangeText={e => dispatch(setInputGoal(e))}
                  onSubmitEditing={() => {
                    Keyboard.dismiss();
                  }}
                  style={{
                    flex: 1,
                    height: 39,
                    marginHorizontal: 10,
                  }}
                  placeholder={'목적지를 검색하세요'}
                />
              </Pressable>
            </View>
          </Pressable>
        </View>
        <Pressable
          hitSlop={5}
          onPress={() => {
            _onPressClose();
          }}
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
          hitSlop={7}
          onPress={() => {
            _onPressHome();
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
