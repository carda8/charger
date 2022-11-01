import {View, Text, Pressable, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import GlobalStyles from 'styles/GlobalStyles';
import HeaderCenter from '@components/HeaderCenter';
import {ScrollView} from 'react-native-gesture-handler';
import FontList from 'constants/FontList';
import {_getHeight} from 'constants/utils';
import {API} from 'api/API';

interface busiType {
  key: string;
  value: number;
}

interface optionView {
  title: any;
  data: any;
}

const AroundFilter = () => {
  const [showAvailable, setShowAvailable] = useState(false);
  const [pickAll, setPickAll] = useState(false);
  const [pickedBusi, setPickedBusi] = useState<string[]>([]);
  const [busiList, setBusiList] = useState<busiType[]>();

  const [speed, setSpeed] = useState<string[]>();
  const [fee, setFee] = useState<string>();
  const [parking, setParking] = useState<string>();
  const [area, setArea] = useState<string>();
  const [road, setRoad] = useState<string>();
  const [chargerType, setChargerType] = useState<string>();

  const dumSpeed = ['완속', '급속', '초고속'];
  const dumFee = ['유료 충전소', '무료 충전소'];
  const dumPark = ['무료주차', '입주민 전용'];
  const dumArea = ['실내충전소', '실외충전소', '캐노피'];
  const dumRoad = ['일반도로', '고속도로'];
  const dumType = ['DC콤보', 'AC3상', '완속', 'DC콤보', 'AC3상', '완속'];

  const _getInfo = async () => {
    await API.get('filters')
      .then(res => {
        if (res.data) {
          console.log('api res', res.data);
          setBusiList(res.data.busiNm);
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

  const _setOption = (key: any) => {};

  // 충전속도, 충전소 유무료, 충전기 설치 장소, 도로, 충전기 타입, 주차여부,
  // 충전기 사업자,
  useEffect(() => {
    console.log('speed', speed);
  }, [speed]);

  useEffect(() => {
    if (!busiList) {
      _getInfo();
    }
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
        }}>
        <Pressable
          onPress={() => {
            setShowAvailable(!showAvailable);
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
              borderWidth: showAvailable ? undefined : 1,
              borderColor: '#C6C6C6',
              backgroundColor: showAvailable ? '#07B3FD' : undefined,
              borderRadius: 2,
              marginLeft: 6,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {showAvailable && (
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
                onPress={() => {}}
                style={{
                  alignSelf: 'flex-start',
                  paddingHorizontal: 13,
                  paddingVertical: 6.5,
                  borderWidth: 1,
                  borderRadius: 24,
                  marginRight: 6,
                  marginBottom: 10,
                }}>
                <Text
                  style={{
                    fontFamily: FontList.PretendardRegular,
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
                onPress={() => {}}
                style={{
                  alignSelf: 'flex-start',
                  paddingHorizontal: 13,
                  paddingVertical: 6.5,
                  borderWidth: 1,
                  borderRadius: 24,
                  marginRight: 6,
                  marginBottom: 10,
                }}>
                <Text
                  style={{
                    fontFamily: FontList.PretendardRegular,
                    fontSize: 16,
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
            {dumPark.map((item, index) => (
              <Pressable
                onPress={() => {}}
                style={{
                  alignSelf: 'flex-start',
                  paddingHorizontal: 13,
                  paddingVertical: 6.5,
                  borderWidth: 1,
                  borderRadius: 24,
                  marginRight: 6,
                  marginBottom: 10,
                }}>
                <Text
                  style={{
                    fontFamily: FontList.PretendardRegular,
                    fontSize: 16,
                  }}>
                  {item}
                </Text>
              </Pressable>
            ))}
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
                onPress={() => {}}
                style={{
                  alignSelf: 'flex-start',
                  paddingHorizontal: 13,
                  paddingVertical: 6.5,
                  borderWidth: 1,
                  borderRadius: 24,
                  marginRight: 6,
                  marginBottom: 10,
                }}>
                <Text
                  style={{
                    fontFamily: FontList.PretendardRegular,
                    fontSize: 16,
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
                onPress={() => {}}
                style={{
                  alignSelf: 'flex-start',
                  paddingHorizontal: 13,
                  paddingVertical: 6.5,
                  borderWidth: 1,
                  borderRadius: 24,
                  marginRight: 6,
                  marginBottom: 10,
                }}>
                <Text
                  style={{
                    fontFamily: FontList.PretendardRegular,
                    fontSize: 16,
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
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {dumType.map((item, index) => (
              <Pressable
                onPress={() => {}}
                style={{
                  alignSelf: 'flex-start',
                  paddingHorizontal: 13,
                  paddingVertical: 6.5,
                  borderWidth: 1,
                  borderRadius: 24,
                  marginRight: 6,
                  marginBottom: 10,
                }}>
                <Text
                  style={{
                    fontFamily: FontList.PretendardRegular,
                    fontSize: 16,
                  }}>
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View
          style={{
            // height: _getHeight(106),
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
              onPress={() => _pickAll()}
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
                    console.warn(idx);
                    _onPressBusi(item.key);
                    // _pickBusi(idx);
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
                      borderWidth: _isPicked(item.key) ? undefined : 1,
                      backgroundColor: _isPicked(item.key)
                        ? '#07B3FD'
                        : undefined,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 8,
                    }}>
                    {_isPicked(item?.key) && (
                      <Image
                        source={require('@assets/check_filter.png')}
                        style={{width: 8, height: 8}}
                        resizeMode="contain"
                      />
                    )}
                  </View>
                  <View style={{flex: 1}}>
                    <Text>{item?.key}</Text>
                  </View>
                </Pressable>
              ))}
          </View>
        </View>
      </ScrollView>
      <View style={{paddingHorizontal: 16}}></View>
    </SafeAreaView>
  );
};

export default AroundFilter;
