import {
  View,
  Text,
  Pressable,
  Image,
  useWindowDimensions,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import GlobalStyles from 'styles/GlobalStyles';
import HeaderCenter from '@components/HeaderCenter';
import {ScrollView} from 'react-native-gesture-handler';
import FontList from 'constants/FontList';
import {_getHeight} from 'constants/utils';
import {API} from 'api/API';
import ChargerType from 'constants/ChargerType';
import {useDispatch, useSelector} from 'react-redux';
import {
  setArea,
  setCanUse,
  setChgerFree,
  setChgerType,
  setCompany,
  setFilter,
  setFreePark,
  setIsSaved,
  setPickall,
  setReset,
  setRoad,
  setSpeed,
} from 'redux/reducers/aroundReducer';
import {RootState} from 'redux/store';
import MyModal from '@components/MyModal';

interface busiType {
  key: string;
  value: number;
}

interface optionView {
  title: any;
  data: any;
}

const AroundFilter = () => {
  const dispatch = useDispatch();
  const {filter, isFilterSaved} = useSelector(
    (state: RootState) => state.aroundReducer,
  );
  const savedRef = useRef(false);

  const [prevFilter, setPrevFilter] = useState({...filter});
  const [modalSave, setModalSave] = useState(false);
  const [showAvailable, setShowAvailable] = useState(false);
  const [pickAll, setPickAll] = useState(false);
  const [pickedBusi, setPickedBusi] = useState<string[]>([]);
  // const [busiList, setBusiList] = useState<busiType[]>();
  const [busiList, setBusiList] = useState<any[]>();
  const layout = useWindowDimensions();
  const WIDTH = (layout.width - 32 - 48) / 4;
  const [saved, setSaved] = useState(false);

  const dumSpeed = ['완속', '급속', '초고속'];
  const dumFee = ['유료 충전소', '무료 충전소'];
  const dumPark = ['무료주차', '입주민 전용'];
  const dumArea = ['실내충전소', '실외충전소', '캐노피'];
  const dumRoad = ['일반도로', '고속도로'];
  const dumType = ['DC콤보', 'AC3상', '완속', 'DC콤보', 'AC3상', '완속'];
  const companyList = [
    '테슬라',
    '환경부',
    '한국전력',
    '기아자동차',
    '한국GM',
    '대영채비',
    '지엔텔',
    'BMW',
    '에스트래픽',
    '차지비',
    '시그넷',
    '현대자동차',
    '한국전기차충전서비스',
    '르노삼성자동차',
    '에버온',
    '파워큐브',
    '기타',
  ];
  const _getInfo = async () => {
    await API.get('filters')
      .then(res => {
        if (res.data) {
          console.log('api res', res.data);
          let temp: any[] = [];
          // temp = res.data.busiNm.filter((item: any) =>
          //   companyList.includes(item.key),
          // );
          console.log('temp :: ', temp);
          setBusiList(companyList);
        }
      })
      .catch(err => console.log(err));
  };

  const _isPicked = (key: string) => {
    let copyPicked: string[] = [...pickedBusi];
    const res = copyPicked.find((item, idx2) => item === key);
    if (res !== undefined) {
      return true;
    } else return false;
  };

  const _pickBusi = (key: string) => {
    let copyPicked: string[] = [...pickedBusi];
    console.log('push key', key);
    copyPicked.push(key);
    setPickedBusi(copyPicked);
  };

  const _removePick = (key: string) => {
    let copyPicked: string[] = [...pickedBusi];
    const res = copyPicked.filter((item, idx2) => item !== key);
    setPickedBusi(res);
  };

  const _onPressBusi = (key: string) => {
    if (_isPicked(key)) _removePick(key);
    else _pickBusi(key);
  };

  const _onPressSave = () => {
    // setSaved(true);
    savedRef.current = true;
    console.log('prevFilter', prevFilter);
    console.log('filterOrigin', filter);
    dispatch(setIsSaved(true));
    setModalSave(!modalSave);
  };

  const _pickAll = () => {
    let temp: string[] = [];
    if (pickAll) {
      setPickedBusi([]);
      setPickAll(!pickAll);
    } else {
      busiList?.map(item => {
        temp.push(item.key);
      });
      setPickedBusi(temp);
      setPickAll(!pickAll);
    }
  };

  useEffect(() => {
    if (!filter.pickAll) {
      setPickAll(false);
    }
  }, [filter.pickAll]);

  useEffect(() => {
    if (!busiList) {
      _getInfo();
    }
  }, []);

  useEffect(() => {
    return () => {
      if (!savedRef.current) {
        console.log('prvFIlter', prevFilter, isFilterSaved, saved);
        dispatch(setFilter(prevFilter));
      } else {
        console.log('return eff', isFilterSaved, saved);
      }
    };
  }, []);

  return (
    <SafeAreaView style={{...GlobalStyles.safeAreaStyle}}>
      <HeaderCenter
        title="상세필터"
        leftBack
        rightBack
        backTitle="닫기"
        backTitleStyle={{fontSize: 16, fontFamily: FontList.PretendardRegular}}
      />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 25,
          paddingBottom: 60,
        }}>
        <Pressable
          onPress={() => {
            dispatch(setCanUse());
            // setShowAvailable(!showAvailable);
          }}
          hitSlop={10}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,
          }}>
          <Text
            style={{
              fontFamily: FontList.PretendardRegular,
              fontSize: 16,
              color: '#333333',
            }}>
            현재 이용가능한 충전소만 보기
          </Text>
          <View
            style={{
              width: 16,
              height: 16,
              borderWidth: filter.canUse ? undefined : 1,
              borderColor: '#C6C6C6',
              backgroundColor: filter.canUse ? '#07B3FD' : undefined,
              borderRadius: 2,
              marginLeft: 6,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {filter.canUse && (
              <Image
                source={require('@assets/check_filter.png')}
                style={{width: 8, height: 8}}
                resizeMode="contain"
              />
            )}
          </View>
        </Pressable>

        {/* 충전속도 */}
        <View
          style={{
            justifyContent: 'center',
            marginTop: 23,
          }}>
          <View style={{marginBottom: 14.5}}>
            <Text
              style={{
                fontFamily: FontList.PretendardRegular,
                fontSize: 16,
                color: '#333333',
              }}>
              충전속도
            </Text>
          </View>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {dumSpeed.map((item, index) => (
              <Pressable
                key={index}
                onPress={() => {
                  dispatch(setSpeed(item));
                  // _setOption(speed, item, setSpeed);
                }}
                style={{
                  alignSelf: 'flex-start',
                  paddingHorizontal: 13,
                  paddingVertical: 6.5,
                  borderWidth: 1,
                  borderRadius: 24,
                  marginRight: 6,
                  marginBottom: 10,
                  borderColor: filter.speed?.includes(item)
                    ? '#07B3FD'
                    : '#333333',
                }}>
                <Text
                  style={{
                    fontFamily: FontList.PretendardRegular,
                    color: filter.speed?.includes(item) ? '#07B3FD' : '#333333',
                    fontSize: 16,
                  }}>
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* 충전소 유무료 */}
        <View
          style={{
            justifyContent: 'center',
            marginTop: 23,
          }}>
          <View style={{marginBottom: 14.5}}>
            <Text
              style={{
                fontFamily: FontList.PretendardRegular,
                fontSize: 16,
                color: '#333333',
              }}>
              충전소 유무료
            </Text>
          </View>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {dumFee.map((item, index) => (
              <Pressable
                key={index}
                onPress={() => {
                  dispatch(setChgerFree(item));
                  // _setOption(fee, item, setFee);
                }}
                style={{
                  alignSelf: 'flex-start',
                  paddingHorizontal: 13,
                  paddingVertical: 6.5,
                  borderWidth: 1,
                  borderRadius: 24,
                  marginRight: 6,
                  marginBottom: 10,
                  borderColor: filter.chgerFree?.includes(item)
                    ? '#07B3FD'
                    : '#333333',
                }}>
                <Text
                  style={{
                    fontFamily: FontList.PretendardRegular,
                    fontSize: 16,
                    color: filter.chgerFree?.includes(item)
                      ? '#07B3FD'
                      : '#333333',
                  }}>
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* 주차여부 */}
        <View
          style={{
            justifyContent: 'center',
            marginTop: 23,
          }}>
          <View style={{marginBottom: 14.5}}>
            <Text
              style={{
                fontFamily: FontList.PretendardRegular,
                fontSize: 16,
                color: '#333333',
              }}>
              주차여부
            </Text>
          </View>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <Pressable
              onPress={() => {
                dispatch(setFreePark('무료주차'));
              }}
              style={{
                alignSelf: 'flex-start',
                paddingHorizontal: 13,
                paddingVertical: 6.5,
                borderWidth: 1,
                borderRadius: 24,
                marginRight: 6,
                marginBottom: 10,
                borderColor: filter.freePark?.includes('무료주차')
                  ? '#07B3FD'
                  : '#333333',
              }}>
              <Text
                style={{
                  fontFamily: FontList.PretendardRegular,
                  fontSize: 16,
                  color: filter.freePark?.includes('무료주차')
                    ? '#07B3FD'
                    : '#333333',
                }}>
                무료주차
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                dispatch(setFreePark('입주민 전용'));
              }}
              style={{
                alignSelf: 'flex-start',
                paddingHorizontal: 13,
                paddingVertical: 6.5,
                borderWidth: 1,
                borderRadius: 24,
                marginRight: 6,
                marginBottom: 10,
                borderColor: filter.freePark?.includes('입주민 전용')
                  ? '#07B3FD'
                  : '#333333',
              }}>
              <Text
                style={{
                  fontFamily: FontList.PretendardRegular,
                  fontSize: 16,
                  color: filter.freePark?.includes('입주민 전용')
                    ? '#07B3FD'
                    : '#333333',
                }}>
                입주민 전용
              </Text>
            </Pressable>
          </View>
        </View>

        {/* 충전기 설치장소 */}
        <View
          style={{
            justifyContent: 'center',
            marginTop: 23,
          }}>
          <View style={{marginBottom: 14.5}}>
            <Text
              style={{
                fontFamily: FontList.PretendardRegular,
                fontSize: 16,
                color: '#333333',
              }}>
              충전기 설치장소
            </Text>
          </View>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {dumArea.map((item, index) => (
              <Pressable
                key={index}
                onPress={() => {
                  dispatch(setArea(item));
                  // _setOption(area, item, setArea);
                }}
                style={{
                  alignSelf: 'flex-start',
                  paddingHorizontal: 13,
                  paddingVertical: 6.5,
                  borderWidth: 1,
                  borderRadius: 24,
                  marginRight: 6,
                  marginBottom: 10,
                  borderColor: filter.area?.includes(item)
                    ? '#07B3FD'
                    : '#333333',
                }}>
                <Text
                  style={{
                    fontFamily: FontList.PretendardRegular,
                    fontSize: 16,
                    color: filter.area?.includes(item) ? '#07B3FD' : '#333333',
                  }}>
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* 도로 */}
        <View
          style={{
            justifyContent: 'center',
            marginTop: 23,
          }}>
          <View style={{marginBottom: 14.5}}>
            <Text
              style={{
                fontFamily: FontList.PretendardRegular,
                fontSize: 16,
                color: '#333333',
              }}>
              도로
            </Text>
          </View>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {dumRoad.map((item, index) => (
              <Pressable
                key={index}
                onPress={() => {
                  dispatch(setRoad(item));
                  // _setOption(road, item, setRoad);
                }}
                style={{
                  alignSelf: 'flex-start',
                  paddingHorizontal: 13,
                  paddingVertical: 6.5,
                  borderWidth: 1,
                  borderRadius: 24,
                  marginRight: 6,
                  marginBottom: 10,
                  borderColor: filter.road?.includes(item)
                    ? '#07B3FD'
                    : '#333333',
                }}>
                <Text
                  style={{
                    fontFamily: FontList.PretendardRegular,
                    fontSize: 16,
                    color: filter.road?.includes(item) ? '#07B3FD' : '#333333',
                  }}>
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* 충전기 타입 */}
        <View
          style={{
            justifyContent: 'center',
            marginTop: 23,
          }}>
          <View style={{marginBottom: 14.5}}>
            <Text
              style={{
                fontFamily: FontList.PretendardRegular,
                fontSize: 16,
                color: '#333333',
              }}>
              충전기 타입
            </Text>
          </View>
          <View
            style={{
              marginTop: 2,
              alignItems: 'center',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            <View style={{flex: 1}}>
              <View
                style={{
                  height: WIDTH,
                  ...styles.warpper,
                }}>
                {ChargerType.chargerLogo.map(
                  (item, index) =>
                    index < 4 && (
                      <Pressable
                        key={index}
                        onPress={() => {
                          console.log('item,', ChargerType.chargerType[index]);
                          dispatch(
                            setChgerType(ChargerType.chargerType[index]),
                          );
                          // dispatch(setChgerType(item))
                          // _setOption(chargerType, item, setChargerType);
                        }}
                        style={{
                          ...styles.innerView,
                          borderWidth: 1,
                          opacity: filter.chgerType?.includes(
                            ChargerType.chargerType[index],
                          )
                            ? 1
                            : 0.3,
                          borderColor: filter.chgerType?.includes(
                            ChargerType.chargerType[index],
                          )
                            ? '#07B3FD'
                            : '#333333',
                          borderRadius: 4,
                          marginRight: index < 3 ? 16 : 0,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Image
                          source={item}
                          resizeMode={'contain'}
                          style={{width: '80%', height: '80%'}}
                        />
                      </Pressable>
                    ),
                )}
              </View>

              <View
                style={{
                  ...styles.warpper,
                }}>
                {ChargerType.chargerType.map(
                  (item, index) =>
                    index < 4 && (
                      <View
                        key={index}
                        style={{
                          ...styles.innerView,
                          marginRight: index < 3 ? 16 : 0,
                        }}>
                        <Text
                          style={{
                            fontFamily: FontList.PretendardRegular,
                            fontSize: 12,
                            color: '#333333',
                          }}>
                          {item}
                        </Text>
                      </View>
                    ),
                )}
              </View>
              {/* 두 번째 라인 */}
              <View
                style={{
                  height: WIDTH,
                  ...styles.warpper,
                  marginTop: 15,
                }}>
                {ChargerType.chargerLogo.map(
                  (item, index) =>
                    index > 3 && (
                      <Pressable
                        key={index}
                        onPress={() => {
                          console.log('item,', ChargerType.chargerType[index]);
                          dispatch(
                            setChgerType(ChargerType.chargerType[index]),
                          );
                          // _setOption(chargerType, item, setChargerType);
                        }}
                        style={{
                          ...styles.innerView,
                          borderWidth: 1,
                          opacity: filter.chgerType?.includes(
                            ChargerType.chargerType[index],
                          )
                            ? 1
                            : 0.3,
                          borderColor: filter.chgerType?.includes(
                            ChargerType.chargerType[index],
                          )
                            ? '#07B3FD'
                            : '#333333',
                          borderRadius: 4,
                          marginRight: index > 3 ? (index > 4 ? 32 : 16) : 0,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Image
                          source={item}
                          resizeMode={'contain'}
                          style={{width: '80%', height: '80%'}}
                        />
                      </Pressable>
                    ),
                )}
              </View>

              <View
                style={{
                  ...styles.warpper,
                }}>
                {ChargerType.chargerType.map(
                  (item, index) =>
                    index > 3 && (
                      <View
                        key={index}
                        style={{
                          ...styles.innerView,
                          marginRight: index > 3 ? (index > 4 ? 32 : 16) : 0,
                        }}>
                        <Text
                          style={{
                            fontFamily: FontList.PretendardRegular,
                            fontSize: 12,
                            color: '#333333',
                          }}>
                          {item}
                        </Text>
                      </View>
                    ),
                )}
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            justifyContent: 'center',
            marginVertical: 23,
          }}>
          <View style={{marginBottom: 14.5}}>
            <Text
              style={{
                fontFamily: FontList.PretendardRegular,
                fontSize: 16,
                color: '#333333',
              }}>
              충전기 사업자
            </Text>
          </View>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <Pressable
              onPress={() => {
                dispatch(setPickall());
                _pickAll();
              }}
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                width: '100%',
                marginBottom: 17,
              }}>
              <View
                style={{
                  width: 16,
                  height: 16,
                  borderWidth: pickAll ? 0 : 1,
                  backgroundColor: pickAll ? '#07B3FD' : undefined,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 8,
                }}>
                <Image
                  source={require('@assets/check_filter.png')}
                  style={{width: 8, height: 8}}
                  resizeMode="contain"
                />
              </View>
              <View style={{flex: 1}}>
                <Text>전체</Text>
              </View>
            </Pressable>
            {busiList &&
              busiList?.map((item, idx) => (
                <Pressable
                  key={idx}
                  onPress={() => {
                    // dispatch(setCompany(item.key));
                    dispatch(setCompany(item));
                  }}
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    width: '50%',
                    marginBottom: 17,
                  }}>
                  <View
                    style={{
                      width: 16,
                      height: 16,
                      borderWidth:
                        filter.company?.includes(item) || pickAll
                          ? undefined
                          : 1,
                      // filter.company?.includes(item.key) || pickAll
                      //   ? undefined
                      //   : 1,
                      backgroundColor:
                        filter.company?.includes(item) || pickAll
                          ? '#07B3FD'
                          : undefined,
                      // filter.company?.includes(item.key) || pickAll
                      //   ? '#07B3FD'
                      //   : undefined,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 8,
                    }}>
                    {/* {(filter.company?.includes(item.key) || pickAll) && (
                      <Image
                        source={require('@assets/check_filter.png')}
                        style={{width: 8, height: 8}}
                        resizeMode="contain"
                      />
                    )} */}
                    {(filter.company?.includes(item) || pickAll) && (
                      <Image
                        source={require('@assets/check_filter.png')}
                        style={{width: 8, height: 8}}
                        resizeMode="contain"
                      />
                    )}
                  </View>
                  <View style={{flex: 1}}>
                    {/* <Text>{item?.key}</Text> */}
                    <Text>{item}</Text>
                  </View>
                </Pressable>
              ))}
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          flexDirection: 'row',
          paddingBottom: 15,
          paddingTop: 15,
          elevation: 8,
          borderTopWidth: 1,
          borderColor: '#F8F4F4',
          backgroundColor: 'white',
        }}>
        <Pressable
          onPress={() => {
            dispatch(setReset());
          }}
          style={{
            marginLeft: 20,
            marginRight: 6,
            borderRadius: 8,
            width: 48,
            height: 48,
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: '#DBDBDB',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('@assets/coolicon.png')}
            style={{width: 17.4, height: 16}}
            resizeMode="contain"
          />
          <Text
            style={{
              fontFamily: FontList.PretendardRegular,
              fontSize: 12,
              color: '#333333',
            }}>
            초기화
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            _onPressSave();
          }}
          style={{
            flex: 1,
            height: 48,
            marginRight: 20,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#00239C',
          }}>
          <Text
            style={{
              fontFamily: FontList.PretendardBold,
              fontSize: 16,
              color: 'white',
            }}>
            설정 저장
          </Text>
        </Pressable>
      </View>

      <MyModal
        title="저장되었습니다"
        positive
        positiveTitle="확인"
        visible={modalSave}
        setVisible={setModalSave}
      />
    </SafeAreaView>
  );
};

export default AroundFilter;

const styles = StyleSheet.create({
  warpper: {
    flexDirection: 'row',
    // marginHorizontal: 16,
  },
  innerView: {
    flex: 1 / 4,
    // backgroundColor: 'gray',
    alignItems: 'center',
  },
});
