import {
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
  useWindowDimensions,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import GlobalStyles from 'styles/GlobalStyles';
import Header from '@components/Header';
import ServiceString from '@components/ServiceString';
import FontList from 'constants/FontList';
import FastImage from 'react-native-fast-image';
import BottomButton from '@components/BottomButton';
import routertype from '@router/routertype';
import {_getHeight, _getWidth} from 'constants/utils';
import HeaderCenter from '@components/HeaderCenter';
import ModelList from 'constants/ModelList';

interface props {
  text: string;
}

const MyPageMyCharger = () => {
  const [showModel, setShowModel] = useState(false);
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<number>();
  const [type, setType] = useState<number>();
  const arrTest = [
    'bmw',
    'bmw',
    'bmw',
    'bmw',
    'bmw',
    'bmw',
    'kia',
    'kia',
    'kia',
    'kia',
    'kia',
    'kia',
    'kia',
    'kia',
  ];
  const arrType = [
    'DC콤보',
    'DC차데모',
    'AC3상',
    'DC콤보',
    'DC차데모',
    'AC3상',
    'DC콤보',
    'DC차데모',
    'AC3상',
  ];

  const modelList = [
    'GM대우',
    'GM대우',
    'GM대우',
    'GM대우',
    'GM대우',
    'GM대우',
    'GM대우',
    'GM대우',
    'GM대우',
    'GM대우',
    'GM대우',
    'GM대우',
    'GM대우',
    'GM대우',
    'GM대우',
    'GM대우',
    'GM대우',
    'GM대우',
    'GM대우',
  ];

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

  const layout = useWindowDimensions();
  return (
    <SafeAreaView style={{...GlobalStyles.safeAreaStyle}}>
      {/* <Header title="차량정보를 들록해주세요" goBack backTitle="취소" /> */}
      <HeaderCenter title="마이차저 설정" leftBack />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal: 16}}>
          <View style={{marginTop: 12, marginBottom: 10}}>
            <Title text="차량 브랜드" />
          </View>

          <View
            style={{
              marginTop: 2,
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            {ModelList.modelLogo.map((item, idx) => (
              <View
                style={{
                  marginBottom: 15,
                  marginLeft:
                    idx % 5 !== 0
                      ? layout.width - _getWidth(59) * 6 + _getWidth(16 / 6)
                      : undefined,
                }}
                key={idx}>
                <Pressable
                  onPress={() => {
                    setSelectedBrand(idx);
                  }}
                  style={{
                    width: _getWidth(59),
                    height: _getHeight(59),
                    borderRadius: 4,
                    borderWidth: 1,
                    borderColor: selectedBrand === idx ? '#333333' : '#DBDBDB',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={item}
                    style={{
                      width:
                        idx === ModelList.modelLogo.length - 1
                          ? _getWidth(45) * 0.6
                          : _getWidth(45),
                      height: _getHeight(45),
                    }}
                    resizeMode={'contain'}
                  />
                </Pressable>
                <View style={{alignSelf: 'center'}}>
                  <Text>{ModelList.modelName[idx]}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={{marginTop: 17}}>
            <Title text="차량 모델" />
            <Pressable
              onPress={() => setShowModel(!showModel)}
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
                {selectedModel ? selectedModel : '차량모델명을 선택하세요    '}
              </Text>
              <Image
                source={require('@assets/bottom_arrow.png')}
                style={{width: 10, height: 6}}
              />
            </Pressable>
          </View>
          {showModel && (
            <View
              style={{
                width: '100%',
                height: _getHeight(216),
                borderWidth: 1,
                borderColor: '#EEEEEE',
                top: -5,
                zIndex: 100,
                backgroundColor: 'white',
                borderBottomRightRadius: 5,
                borderBottomLeftRadius: 5,
              }}>
              <ScrollView nestedScrollEnabled={true}>
                {modelList.map((item, idx) => (
                  <Pressable
                    onPress={() => {
                      setShowModel(false);
                      setSelectedModel(item + idx);
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
                      {idx}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          )}

          <View style={{marginTop: 30}}>
            <Title text="충전기 타입" />
            {/* <Text>hi</Text> */}
            <View
              style={{
                marginTop: 2,
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {arrType.map((item, idx) => (
                <View style={{marginBottom: 15}} key={idx}>
                  <Pressable
                    onPress={() => {
                      setType(idx);
                    }}
                    style={{
                      width: _getWidth(72),
                      height: _getHeight(72),
                      borderRadius: 4,
                      borderWidth: 1,
                      borderColor: type === idx ? '#333333' : '#DBDBDB',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={require('@assets/dc_combo.png')}
                      style={{width: '85%', height: '85%'}}
                      resizeMode={'contain'}
                    />
                  </Pressable>
                  <View style={{alignSelf: 'center'}}>
                    <Text>DC콤보</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={{marginHorizontal: 16}}>
        <BottomButton
          screen={routertype.AccountCarInfoFinish}
          text="저장하기"
        />
      </View>
    </SafeAreaView>
  );
};

export default MyPageMyCharger;
