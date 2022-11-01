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
import modules from 'constants/utils/modules';
import ChargerType from 'constants/ChargerType';

interface props {
  text: string;
}

const MyPageMyCharger = () => {
  const [showModel, setShowModel] = useState(false);
  // const [showModelList, setShowModelList] = useState<string[]>();
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [type, setType] = useState<number>();

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
              <>
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
              </>
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
                {selectedModel ? selectedModel : '차량모델명을 선택하세요'}
              </Text>
              <Image
                source={require('@assets/bottom_arrow.png')}
                style={{width: 10, height: 6}}
              />
            </Pressable>
          </View>
          {showModel &&
            selectedBrand &&
            modules._getCarModel(selectedBrand)?.length > 0 && (
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
                <ScrollView nestedScrollEnabled={true}>
                  {modules._getCarModel(selectedBrand)?.map((item, idx) => (
                    <Pressable
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
                marginTop: 2,
                alignItems: 'center',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {ChargerType.chargerLogo.map((item, idx) => (
                <>
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
                        setType(idx);
                      }}
                      style={{
                        width: 72,
                        height: 72,
                        borderRadius: 4,
                        borderWidth: 1,
                        borderColor: type === idx ? '#333333' : '#DBDBDB',
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
                </>
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
