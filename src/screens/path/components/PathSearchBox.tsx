import React, {useState, Dispatch, SetStateAction} from 'react';
import {_getHeight, _getWidth} from 'constants/utils';
import {commonTypes} from '@types';
import {useNavigation} from '@react-navigation/native';
import {
  Image,
  Keyboard,
  Pressable,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import FontList from 'constants/FontList';
import {useDispatch, useSelector} from 'react-redux';
import {setGoal, setPath, setStart} from 'redux/reducers/pathReducer';
import {RootState} from 'redux/store';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';

interface props {
  editable?: boolean;
  showOnlyMap?: boolean;
  setShowOnlyMap?: Dispatch<SetStateAction<boolean>>;
  sheetRef?: React.RefObject<BottomSheetModalMethods>;
}

const PathSearchBox = ({
  editable,
  showOnlyMap,
  setShowOnlyMap,
  sheetRef,
}: props) => {
  const nav = useNavigation<commonTypes.navi>();
  const dispatch = useDispatch();
  const {goal, start} = useSelector((state: RootState) => state.pathReducer);
  const [home, setHome] = useState(false);

  const userInfo = {
    addr: '부산광역시 금정구 225',
  };

  const _switchLocation = () => {
    const copyStart = JSON.parse(JSON.stringify(start));
    const copyGoal = JSON.parse(JSON.stringify(goal));
    console.log('hi');
    dispatch(setStart(copyGoal));
    dispatch(setGoal(copyStart));
  };

  const _resetLocation = () => {
    dispatch(setStart(''));
    dispatch(setGoal(''));
  };

  const _putHome = () => {
    if (!home) {
      setHome(true);
      dispatch(setGoal(userInfo.addr));
    } else {
      setHome(false);
    }
  };

  return (
    <View style={{width: '100%', backgroundColor: 'white'}}>
      {/* 검색창 및 좌, 우 버튼 */}
      <View style={{flexDirection: 'row', marginHorizontal: 16, marginTop: 16}}>
        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
          <Pressable
            hitSlop={10}
            onPress={() => {
              _switchLocation();
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
                onPress={() =>
                  editable ? undefined : nav.navigate('PathSearchMain')
                }
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
                  value={start}
                  onChangeText={str => dispatch(setStart(str))}
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
                onPress={() =>
                  editable ? undefined : nav.navigate('PathSearchMain')
                }
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
                  editable={editable ? true : false}
                  autoCapitalize="none"
                  value={goal}
                  onChangeText={str => dispatch(setGoal(str))}
                  onSubmitEditing={() => {
                    Keyboard.dismiss();
                    // dispatch(setPath({start: start, goal: goal}));
                    nav.navigate('PathMain');
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
          onPress={() => {
            if (setShowOnlyMap) {
              setShowOnlyMap(!showOnlyMap);
              sheetRef?.current?.close();
              _resetLocation();
            } else {
              _resetLocation();
            }
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

        <Pressable
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
        </Pressable>
      </View>
    </View>
  );
};

export default PathSearchBox;
