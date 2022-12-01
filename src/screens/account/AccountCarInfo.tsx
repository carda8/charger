import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import GlobalStyles from 'styles/GlobalStyles';
import Header from '@components/Header';
import ServiceString from '@components/ServiceString';
import FontList from 'constants/FontList';
import FastImage from 'react-native-fast-image';
import BottomButton from '@components/BottomButton';
import routertype from '@router/routertype';
import {_getHeight, _getWidth} from 'constants/utils';
import {
  FlatList,
  Image,
  ListRenderItem,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
  StyleSheet,
} from 'react-native';
import ModelList from 'constants/ModelList';
import ChargerType from 'constants/ChargerType';
import MyModal from '@components/MyModal';
import {useNavigation} from '@react-navigation/native';
import {commonTypes} from '@types';
import {useDispatch, useSelector} from 'react-redux';
import {setUserInfo} from 'redux/reducers/authReducer';
import {RootState} from 'redux/store';
import {API} from 'api/API';
import commonAPI from 'api/modules/commonAPI';
import Loading from '@components/Loading';
import {cos} from 'react-native-reanimated';
import modules from 'constants/utils/modules';

interface props {
  text: string;
  lineHeight?: number;
}

const AccountCarInfo = () => {
  const {userInfo} = useSelector((state: RootState) => state.authReducer);
  console.log('userInfo', userInfo);

  const [modal, setModal] = useState(false);
  const [showModel, setShowModel] = useState(false);

  const [selectedModel, setSelectedModel] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [type, setType] = useState<any[]>([]);
  const [isReady, setIsReady] = useState(false);

  const layout = useWindowDimensions();
  const WIDTH = (layout.width - 32 - 48) / 4;
  const nav = useNavigation<commonTypes.navi>();

  const dispatch = useDispatch();

  const [carList, setCarList] = useState([]);
  const [carListEtc, setCarListEtc] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);
  const [etcOrigin, setEtcOrigin] = useState<any[]>([]);

  const [trim, setTrim] = useState('');

  const Title = ({text, lineHeight}: props) => {
    return (
      <Text
        style={{
          fontFamily: FontList.PretendardSemiBold,
          fontSize: 16,
          color: '#4A4A4A',
          includeFontPadding: false,
          lineHeight: lineHeight,
        }}>
        {text}
      </Text>
    );
  };

  // const _filterList = (brand: string) => {
  //   let temp = [...carList];
  //   let modelList: any[] = [];
  //   temp = temp.filter((item, index) => item.car_brand === brand);
  //   temp.map((item, index) => modelList.push(item.car_model));
  //   if (modelList.length > 0) return modelList;
  //   else return [];
  // };
  const _filterList = (brand: string) => {
    let temp = [...carList];
    let modelList: any[] = [];
    temp = temp.filter((item: any, index: number) => item.car_brand === brand);
    temp.map((item: any, index) => {
      if (item.car_model + item.car_detail !== selectedModel + trim)
        modelList.push({model: item.car_model, trim: item.car_detail});
    });
    if (modelList.length > 0) return modelList;
    else return [];
  };

  const _filterEtcList = () => {
    const mainCarList = [
      '현대자동차',
      '기아자동차',
      'BENZ',
      'AUDI',
      'Genesis',
      'TESLA',
      'GM',
      'BMW',
    ];

    // const res = carList.filter(item => !mainCarList.includes(item.car_brand));
    // let temp: any[] = [];
    // res.map((item, index) => {
    //   temp.push(item.car_brand);
    //   temp.push(item.car_model);
    // });
    // const set = new Set(temp);
    // const uniqueArr = [...set];
    // setCarListEtc(uniqueArr);
    // setEtcOrigin(res);
    // console.log('set', set);
    // console.log('filter res', res);
    const res = carList.filter(
      (item: any) => !mainCarList.includes(item.car_brand),
    );
    let temp: any[] = [];
    res.map((item: any, index) => {
      temp.push(item.car_brand);
      temp.push({model: item.car_model, trim: item.car_detail});
    });
    const set = new Set(temp);
    const uniqueArr = [...set];
    console.log('uniqueArr', uniqueArr);
    setCarListEtc(uniqueArr);
    setEtcOrigin(res);
  };

  const _onPressEtcModel = (item: string) => {
    const res = etcOrigin.find(item2 => item2.car_brand === item);
    if (res) return true;
    else return false;
  };

  const _getCarModel = () => {
    let res;
    switch (selectedBrand) {
      case '현대':
        res = _filterList('현대자동차');
        return res;
      case '기아':
        res = _filterList('기아자동차');
        return res;
      case '벤츠':
        res = _filterList('BENZ');
        return res;
      case '아우디':
        res = _filterList('AUDI');
        return res;
      case '제네시스':
        res = _filterList('Genesis');
        return res;
      case '테슬라':
        res = _filterList('TESLA');
        return res;
      case '쉐보레':
        res = _filterList('GM');
        return res;
      case 'BMW':
        res = _filterList('BMW');
        return res;
      case '기타':
        return carListEtc;
      default:
        return [];
    }
  };

  const _onPress = () => {
    const res = etcOrigin?.find(item => item.car_model === selectedModel);

    if (!isReady) {
      setModal(!modal);
    } else {
      dispatch(
        setUserInfo({
          ...userInfo,
          car_brand: res ? res.car_brand : selectedBrand,
          car_model: selectedModel,
          chgerType: type,
        }),
      );
      _postUserDB();
    }
  };
  useEffect(() => {
    console.log('USERINFOOFOO', userInfo);
  }, [userInfo]);
  const _postUserDB = () => {
    const res = etcOrigin?.find(item => item.car_model === selectedModel);

    const data: commonTypes.saveUserDB = {
      car_brand: res ? res.car_brand : selectedBrand,
      car_model: selectedModel,
      chgerType: type,
      name: userInfo?.name,
      user_id: userInfo?.id,
    };
    console.log('data', data);
    // return;
    if (data.user_id) {
      commonAPI
        ._putEditUserInfo(data)
        .then(res => {
          console.log('_postSaveUserInfo :: res', res);
          nav.navigate('AccountCarInfoFinish');
          // modules
          //   ._updateUserInfo(dispatch, userInfo)
          //   .then(() => {
          //     nav.navigate('AccountCarInfoFinish');
          //   })
          //   .catch(err => console.log('carinfo err', err));
        })
        .catch(err => console.log('err', err));
    } else {
      nav.navigate('Home');
    }
  };

  const _getCarList = async () => {
    setLoading(true);
    await commonAPI
      ._getCarInfoList({})
      .then(res => {
        const data = res.data;
        console.log('res', data);
        if (data.length > 0) {
          let temp: any[] = [];
          data.map((item, index) => {
            temp.push(item.car_brand);
          });
          const set = new Set(temp);
          const uniqueArr = [...set];
          console.log('temp', uniqueArr);
          setCarList(data);
        }
      })
      .catch(err => console.log('err', err))
      .finally(() => setLoading(false));
  };

  const _onPressType = (item: string) => {
    let temp: any[] = [...type];
    const isSelected = temp.find(item2 => item === item2);
    if (isSelected) {
      temp = temp.filter(item2 => item !== item2);
      setType(temp);
    } else {
      temp.push(item);
      setType(temp);
    }
  };

  const _getStyle = (item: string) => {
    let temp: any[] = [...type];
    const isSelected = temp.find(item2 => item === item2);
    return isSelected;
  };

  const _autoSetType = () => {
    const res = carList.find(item => item.car_model === selectedModel);
    if (res) {
      let temp: any[] = [];
      res.chagers.map(item => {
        temp.push(item.name);
      });
      console.log('temp', temp);
      setType(temp);
    }
    console.log('res', res);
  };

  useEffect(() => {
    _getCarList();
  }, []);

  useEffect(() => {
    if (carList.length > 0) {
      _filterEtcList();
    }
  }, [carList]);

  useEffect(() => {
    // setSelectedModel('');
    // setType([]);
  }, [selectedBrand]);

  useEffect(() => {
    if (selectedModel) _autoSetType();
  }, [selectedModel]);

  useEffect(() => {
    if (selectedBrand == '기타') {
      const res = etcOrigin.find(item => item.car_model === selectedModel);
      console.log('기타 res', res);
    }
    console.log('picked', selectedBrand, selectedModel, type);
    if (selectedBrand !== '' && selectedModel !== '' && type.length > 0) {
      setIsReady(true);
    } else setIsReady(false);
  }, [selectedBrand, selectedModel, type]);

  return (
    <SafeAreaView style={{...GlobalStyles.safeAreaStyle}}>
      <Header title="차량정보를 등록해주세요" goBack backTitle="취소" />

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
                      setSelectedModel('');
                      setType([]);
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
                if (_getCarModel().length === 0) {
                  return;
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
                {/* {selectedModel
                  ? selectedModel
                  : _getCarModel().length === 0
                  ? '차량모델 정보가 없습니다'
                  : '차량모델명을 선택하세요'} */}
                {selectedModel
                  ? selectedModel + ' ' + trim
                  : _getCarModel().length === 0
                  ? '차량모델 정보가 없습니다'
                  : '차량모델명을 선택하세요'}
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
                    disabled={_onPressEtcModel(item)}
                    key={idx}
                    onPress={() => {
                      setShowModel(false);
                      // setSelectedModel(item);
                      setSelectedModel(item.model);
                      setTrim(item.trim);
                      console.log('item', item);
                    }}
                    style={{
                      paddingHorizontal: 16,
                      paddingVertical: 9,
                      borderBottomWidth: 1,
                      borderBottomColor: '#F6F6F6',
                    }}>
                    <Text
                      style={{
                        // fontFamily: _onPressEtcModel(item)
                        //   ? FontList.PretendardBold
                        //   : FontList.PretendardMedium,
                        // color: _onPressEtcModel(item) ? '#333333' : '#959595',
                        // fontSize: 13,
                        fontFamily: _onPressEtcModel(item.model)
                          ? FontList.PretendardBold
                          : FontList.PretendardMedium,
                        color: _onPressEtcModel(item.model)
                          ? '#333333'
                          : '#959595',
                        fontSize: 13,
                      }}>
                      {item.model ? item.model + ' ' + item.trim : item}
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
                marginTop: 10,
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
                            _onPressType(ChargerType.chargerType[index]);
                            // setType(ChargerType.chargerType[index]);
                          }}
                          style={{
                            ...styles.innerView,
                            borderWidth: 1,
                            opacity: _getStyle(ChargerType.chargerType[index])
                              ? 1
                              : 0.3,
                            borderColor: _getStyle(
                              ChargerType.chargerType[index],
                            )
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
                            _onPressType(ChargerType.chargerType[index]);
                          }}
                          style={{
                            // ...styles.innerView,
                            flex: 1 / 4,
                            borderWidth: 1,
                            opacity: _getStyle(ChargerType.chargerType[index])
                              ? 1
                              : 0.3,
                            borderColor: _getStyle(
                              ChargerType.chargerType[index],
                            )
                              ? '#333333'
                              : '#DBDBDB',
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
        </View>
      </ScrollView>
      <View style={{marginHorizontal: 16}}>
        <Pressable
          onPress={() => {
            _onPress();
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
      <Loading visible={loading} />
    </SafeAreaView>
  );
};

export default AccountCarInfo;
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
