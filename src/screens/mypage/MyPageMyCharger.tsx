import {
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  useWindowDimensions,
  StyleSheet,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import GlobalStyles from 'styles/GlobalStyles';
import ServiceString from '@components/ServiceString';
import FontList from 'constants/FontList';
import {_getHeight, _getWidth} from 'constants/utils';
import HeaderCenter from '@components/HeaderCenter';
import ModelList from 'constants/ModelList';
import ChargerType from 'constants/ChargerType';
import {useDispatch} from 'react-redux';
import {setUserInfo} from 'redux/reducers/authReducer';
import {useNavigation} from '@react-navigation/native';
import {commonTypes} from '@types';
import MyModal from '@components/MyModal';

interface props {
  text: string;
}

const MyPageMyCharger = () => {
  const [modal, setModal] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const dispatch = useDispatch();

  const layout = useWindowDimensions();
  const WIDTH = (layout.width - 32 - 48) / 4;

  const [showModel, setShowModel] = useState(false);
  // const [showModelList, setShowModelList] = useState<string[]>();
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [type, setType] = useState('');

  const Title = ({text}: props) => {
    return (
      <Text
        style={{
          fontFamily: FontList.PretendardSemiBold,
          fontSize: 16,
          color: '#4A4A4A',
          includeFontPadding: false,
        }}>
        {text}
      </Text>
    );
  };

  const _getCarModel = () => {
    switch (selectedBrand) {
      case '현대':
        return ModelList.현대;
      case '기아':
        return ModelList.기아;
      case '벤츠':
        return ModelList.벤츠;
      case '아우디':
        return ModelList.아우디;
      case '제네시스':
        return ModelList.제네시스;
      case '테슬라':
        return ModelList.테슬라;
      case '쉐보레':
        return ModelList.쉐보레;
      case 'BMW':
        return ModelList.BMW;
      default:
        return [];
    }
  };

  const _setOption = (state: any, data: string, setState: any) => {
    console.log(state, data);
    let temp = [...state];
    const res = temp.filter((item, index) => item === data);
    if (res.length > 0) {
      const res = temp.filter((item, index) => item !== data);
      setState(res);
    } else {
      let temp2: string[] = [...state];
      temp2.push(data);
      setState(temp2);
    }
  };

  const _getColor = (state: string[], data: any) => {
    const temp = state.filter((item, index) => item === data);
    if (temp.length > 0) {
      return '#07B3FD';
    } else return '#333333';
  };

  const _getOpasity = (state: string[], data: any) => {
    const temp = state.filter((item, index) => item === data);
    if (temp.length > 0) {
      return 1;
    } else return 0.3;
  };

  useEffect(() => {
    setSelectedModel('');
  }, [selectedBrand]);

  useEffect(() => {
    console.log('model');
    if (selectedBrand !== '' && selectedModel !== '' && type) {
      setIsReady(true);
    } else setIsReady(false);
  }, [selectedBrand, selectedModel, type]);

  const nav = useNavigation<commonTypes.navi>();
  return (
    <SafeAreaView style={{...GlobalStyles.safeAreaStyle}}>
      {/* <Header title="차량정보를 들록해주세요" goBack backTitle="취소" /> */}
      <HeaderCenter title="마이차저 설정" leftBack />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal: 16, marginBottom: 20}}>
          <ServiceString />
          <View style={{marginTop: 30, marginBottom: 10}}>
            <Title text="차량 브랜드" />
          </View>
          <View
            style={{
              marginTop: 2,
              alignItems: 'center',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            {ModelList.modelLogo.map((item, idx) => (
              <View key={idx}>
                <View
                  style={{
                    marginBottom: 15,
                    marginRight:
                      idx % 4 !== 0 || idx == 0
                        ? (layout.width - (32 + 56 * 5)) / 4
                        : undefined,
                  }}
                  key={idx}>
                  <Pressable
                    onPress={() => {
                      setSelectedBrand(ModelList.modelName[idx]);
                    }}
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 4,
                      borderWidth: 1,
                      borderColor:
                        ModelList.modelName[idx] === selectedBrand
                          ? '#333333'
                          : '#DBDBDB',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={item}
                      style={{
                        width:
                          ModelList.modelName[idx] === '기타' ? '60%' : '85%',
                        height:
                          ModelList.modelName[idx] === '기타' ? '60%' : '85%',
                      }}
                      resizeMode={'contain'}
                    />
                  </Pressable>
                  <View style={{alignSelf: 'center'}}>
                    <Text>{ModelList.modelName[idx]}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>

          <View style={{marginTop: 17}}>
            <Title text="차량 모델" />
            <Pressable
              onPress={() => {
                if (!selectedBrand) {
                  return setModal(!modal);
                }
                setShowModel(!showModel);
              }}
              style={{
                width: '100%',
                height: 51,
                borderWidth: 1,
                borderRadius: 4,
                borderColor: showModel ? '#EEEEEE' : '#DBDBDB',
                marginTop: 10,
                paddingHorizontal: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontFamily: FontList.PretendardRegular,
                  fontSize: 16,
                  color: '#838383',
                }}>
                {selectedModel ? selectedModel : '차량모델명을 선택하세요'}
              </Text>
              <Image
                source={require('@assets/bottom_arrow.png')}
                style={{width: 10, height: 6}}
              />
            </Pressable>
          </View>
          {showModel && selectedBrand && _getCarModel()?.length > 0 && (
            <View
              style={{
                width: '100%',
                maxHeight: _getHeight(216),
                borderWidth: 1,
                borderColor: '#EEEEEE',
                top: -5,
                zIndex: 100,
                backgroundColor: 'white',
                borderBottomRightRadius: 5,
                borderBottomLeftRadius: 5,
              }}>
              <ScrollView
                nestedScrollEnabled={true}
                // scrollToOverflowEnabled={false}
                // overScrollMode={'never'}
              >
                {_getCarModel()?.map((item, idx) => (
                  <Pressable
                    key={idx}
                    onPress={() => {
                      setShowModel(false);
                      setSelectedModel(item);
                    }}
                    style={{
                      paddingHorizontal: 16,
                      paddingVertical: 9,
                      borderBottomWidth: 1,
                      borderBottomColor: '#F6F6F6',
                    }}>
                    <Text
                      style={{
                        fontFamily: FontList.PretendardMedium,
                        color: '#959595',
                        fontSize: 13,
                      }}>
                      {item}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          )}

          <View style={{marginTop: 30}}>
            <Title text="충전기 타입" />
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
                            onPress={() => {
                              setType(ChargerType.chargerType[index]);
                            }}
                            style={{
                              ...styles.innerView,
                              borderWidth: 1,
                              opacity:
                                type === ChargerType.chargerType[index]
                                  ? 1
                                  : 0.3,
                              borderColor:
                                type === ChargerType.chargerType[index]
                                  ? '#333333'
                                  : '#DBDBDB',
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
                            onPress={() => {
                              setType(ChargerType.chargerType[index]);
                            }}
                            style={{
                              // ...styles.innerView,
                              flex: 1 / 4,
                              borderWidth: 1,
                              opacity:
                                type === ChargerType.chargerType[index]
                                  ? 1
                                  : 0.3,
                              borderColor:
                                type === ChargerType.chargerType[index]
                                  ? '#333333'
                                  : '#DBDBDB',
                              borderRadius: 4,
                              marginRight:
                                index > 3 ? (index > 4 ? 32 : 16) : 0,
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
                            style={{
                              ...styles.innerView,
                              marginRight:
                                index > 3 ? (index > 4 ? 32 : 16) : 0,
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
            {/* <View
              style={{
                marginTop: 2,
                alignItems: 'center',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {ChargerType.chargerLogo.map((item, idx) => (
                <View key={idx}>
                  <View
                    style={{
                      marginBottom: 15,
                      marginRight:
                        idx % 3 !== 0 || idx == 0
                          ? (layout.width - (32 + 72 * 4)) / 3
                          : undefined,
                    }}
                    key={idx}>
                    <Pressable
                      onPress={() => {
                        setType(ChargerType.chargerType[idx]);
                      }}
                      style={{
                        width: 72,
                        height: 72,
                        borderRadius: 4,
                        borderWidth: 1,
                        borderColor:
                          type === ChargerType.chargerType[idx]
                            ? '#333333'
                            : '#DBDBDB',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        source={item}
                        style={{width: '85%', height: '85%'}}
                        resizeMode={'contain'}
                      />
                    </Pressable>
                    <View style={{alignSelf: 'center'}}>
                      <Text>{ChargerType.chargerType[idx]}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View> */}
          </View>
        </View>
      </ScrollView>
      <View style={{marginHorizontal: 16}}>
        <Pressable
          onPress={() => {
            if (!isReady) {
              setModal(!modal);
            } else {
              dispatch(
                setUserInfo({
                  car_brand: selectedBrand,
                  car_model: selectedModel,
                  chgerType: [type],
                }),
              );
              nav.navigate('Home');
            }
          }}
          style={{
            height: 54,
            backgroundColor: !isReady ? '#C4C4C4' : '#00239C',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8,
            marginTop: 'auto',
            marginBottom: 22,
          }}>
          <Text
            style={{
              fontFamily: FontList.PretendardBold,
              fontSize: 16,
              color: 'white',
            }}>
            저장하기
          </Text>
        </Pressable>
      </View>
      <MyModal
        title="차량정보를 선택해주세요"
        positive
        positiveTitle="확인"
        setVisible={setModal}
        visible={modal}
      />
    </SafeAreaView>
  );
};

export default MyPageMyCharger;

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
