import {View, Text, Pressable, StyleProp, ViewStyle, Image} from 'react-native';
import React, {Dispatch, SetStateAction, useState, useEffect} from 'react';
import {_getHeight, _getWidth} from 'constants/utils';
import FontList from 'constants/FontList';
import ChargerType from 'constants/ChargerType';
import commonAPI from 'api/modules/commonAPI';
import modules from 'constants/utils/modules';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'redux/store';
import {setUserInfo} from 'redux/reducers/authReducer';

interface props {
  style?: StyleProp<ViewStyle>;
  visible?: boolean;
  renderData?: any;
  userInfo?: any;
  setVisible?: Dispatch<SetStateAction<boolean>>;
  dispatch?: any;
  setCoor: Dispatch<SetStateAction<any>>;
  setStartCoor: Dispatch<SetStateAction<any>>;
}

const HomeSearchItem = ({
  setVisible,
  visible,
  renderData,
  setCoor,
  setStartCoor,
}: props) => {
  const [favorite, setFavorite] = useState(false);
  const {userInfo} = useSelector((state: RootState) => state.authReducer);

  const _sortChgerBySpeed = (item: any) => {
    let normal = 0;
    let fast = 0;
    if (item) {
      item?.chargers.map((item: any, index: any) => {
        if (item.chgerTypeInfo === 'AC완속' || item.chgerTypeInfo === 'AC3상')
          normal++;
        else fast++;
      });
    }
    const res = {
      normal,
      fast,
    };
    return res;
  };

  const _getChgerImg = (item: any) => {
    let chgerImg = {
      dcCombo: false,
      dcDemo: false,
      ac3: false,
      ac5: false,
    };
    if (item) {
      item.chargers.map((item: any, index: any) => {
        if (item.chgerTypeInfo === 'DC차데모+AC3상+DC콤보') {
          chgerImg.ac3 = true;
          chgerImg.dcCombo = true;
          chgerImg.dcDemo = true;
        }
        if (item.chgerTypeInfo === 'AC완속') {
          chgerImg.ac5 = true;
        }
        if (item.chgerTypeInfo === 'DC콤보') {
          chgerImg.dcCombo = true;
        }
        if (item.chgerTypeInfo === 'DC차데모+DC콤보') {
          chgerImg.dcCombo = true;
          chgerImg.dcDemo = true;
        }
        if (item.chgerTypeInfo === 'DC차데모+AC3상') {
          chgerImg.dcDemo = true;
          chgerImg.ac3 = true;
        }
        if (item.chgerTypeInfo === 'AC3상') {
          chgerImg.ac3 = true;
        }
        if (item.chgerTypeInfo === 'DC차데모') {
          chgerImg.dcDemo = true;
        }
      });
    }
    return chgerImg;
  };

  const _onPressStar = async () => {
    console.log('favorite', favorite);
    console.log('userInfo', userInfo);
    const data = {
      user_id: userInfo?.id,
      stat_id: renderData.statId,
    };
    await commonAPI
      ._postUserStar(data)
      .then(res => {
        console.log('res ###', res);
      })
      .catch(err => console.log('err', err));
  };

  useEffect(() => {
    userInfo?.favorites.map(item => {
      if (item.statId === renderData.statId) setFavorite(true);
    });
  }, []);

  return (
    <Pressable
      onPress={() => {
        if (setVisible) setVisible(!visible);
        setCoor({
          latitude: renderData.location.lat,
          longitude: renderData.location.lon,
        });
      }}
      style={({pressed}) => [
        {
          width: '100%',
          paddingVertical: 18,
          borderBottomWidth: 1,
          paddingHorizontal: 16,
          backgroundColor: 'white',
          borderBottomColor: '#F5F5F5',
        },
      ]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          source={require('@assets/main_bt_union2.png')}
          style={{width: 20, height: 20}}
          resizeMode="contain"
        />
        <View style={{marginLeft: 4, marginRight: 6}}>
          <Text
            style={{
              fontFamily: FontList.PretendardMedium,
              fontSize: 16,
              color: '#333333',
            }}>
            {renderData?.statNm}
          </Text>
        </View>
        <Text>{''}</Text>
        <Pressable
          style={{
            marginLeft: 'auto',
            alignItems: 'center',
          }}
          hitSlop={10}
          onPress={() => {
            setFavorite(!favorite);
            _onPressStar();
          }}>
          <Image
            source={
              favorite
                ? require('@assets/star_on.png')
                : require('@assets/star_off.png')
            }
            style={{
              width: 20,
              height: 20,
              tintColor: favorite ? undefined : '#959595',
            }}
            resizeMode="contain"
          />
        </Pressable>
      </View>
      <View style={{marginTop: 10}}>
        <Text
          style={{
            includeFontPadding: false,
            fontFamily: FontList.PretendardRegular,
            color: '#959595',
          }}>
          {renderData?.addr}
        </Text>
      </View>

      <View
        style={{
          marginTop: 10,
          paddingVertical: 12,
          paddingLeft: 16,
          paddingRight: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            alignItems: 'center',
            alignSelf: 'flex-start',
            marginRight: _getWidth(36),
          }}>
          <View style={{marginBottom: 2}}>
            <Text
              style={{
                fontFamily: FontList.PretendardMedium,
                fontSize: 16,
                color: '#6FCF24',
              }}>
              충전가능
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontFamily: FontList.PretendardRegular,
                color: '#333333',
              }}>
              급속 {_sortChgerBySpeed(renderData).fast}
            </Text>
            <Text
              style={{
                fontFamily: FontList.PretendardRegular,
                color: '#333333',
              }}>
              {' | '}
            </Text>
            <Text
              style={{
                fontFamily: FontList.PretendardRegular,
                color: '#333333',
              }}>
              완속 {_sortChgerBySpeed(renderData).normal}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1,
          }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: _getWidth(40) / 2,
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: _getChgerImg(renderData).dcCombo
                ? '#6FCF24'
                : '#C6C6C6',
              opacity: _getChgerImg(renderData).dcCombo ? 1 : 0.3,
            }}>
            <Image
              source={ChargerType.chargerLogo[0]}
              style={{width: 35, height: 35}}
              resizeMode="contain"
            />
          </View>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: _getWidth(40) / 2,
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: _getChgerImg(renderData).dcDemo
                ? '#6FCF24'
                : '#C6C6C6',
              opacity: _getChgerImg(renderData).dcDemo ? 1 : 0.3,
            }}>
            <Image
              source={ChargerType.chargerLogo[1]}
              style={{width: 30, height: 30}}
              resizeMode="contain"
            />
          </View>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: _getWidth(40) / 2,
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: _getChgerImg(renderData).ac3 ? '#6FCF24' : '#C6C6C6',
              opacity: _getChgerImg(renderData).ac3 ? 1 : 0.3,
            }}>
            <Image
              source={ChargerType.chargerLogo[2]}
              style={{width: 30, height: 30}}
              resizeMode="contain"
            />
          </View>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: _getWidth(40) / 2,
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: _getChgerImg(renderData).ac5 ? '#6FCF24' : '#C6C6C6',
              opacity: _getChgerImg(renderData).ac5 ? 1 : 0.3,
            }}>
            <Image
              source={ChargerType.chargerLogo[3]}
              style={{width: 33, height: 33}}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default HomeSearchItem;
