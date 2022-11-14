import {View, Text, Pressable, Image} from 'react-native';
import React, {Dispatch, SetStateAction, useState} from 'react';
import FontList from 'constants/FontList';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {useSelector} from 'react-redux';
import {RootState} from 'redux/store';
import commonAPI from 'api/modules/commonAPI';
interface props {
  list: any[];
  item: any;
  setCenter: Dispatch<SetStateAction<any>>;
  setUserStar: Dispatch<SetStateAction<any>>;
  bottomSheetRef: React.RefObject<BottomSheetModalMethods>;
}

const RenderItem = ({
  list,
  item,
  setCenter,
  bottomSheetRef,
  setUserStar,
}: props) => {
  const {userInfo} = useSelector((state: RootState) => state.authReducer);
  const [star, setStart] = useState(true);
  const data = item.item;

  const _delUserStar = async (item: any) => {
    if (userInfo?.id) {
      const params = {
        user_id: userInfo.id,
        stat_id: data.statId,
      };
      await commonAPI
        ._deleteUserStar(params)
        .then(res => console.log('User Star RES', res.data))
        .catch(err => console.log('err', err));

      console.log('data', params);
    }
  };

  const _onPressed = () => {
    _delItem();
    _delUserStar(item);
  };

  const _delItem = () => {
    const copy = [...list];
    const temp = copy.filter((ele, index) => index !== item.index);
    setUserStar(temp);
  };

  return (
    <>
      <Pressable
        onPress={() => {
          setCenter({
            latitude: item.item.latitude,
            longitude: item.item.longitude,
            zoom: 13,
          });
          bottomSheetRef.current?.close();
        }}
        key={item.index}
        style={{
          flex: 1 / 3,
          height: 154,
          borderWidth: 1,
          borderColor: '#E6E6E6',
          borderRadius: 8,
          paddingHorizontal: 8,
          paddingTop: 8,
          paddingBottom: 12,
          marginHorizontal: 2,
        }}>
        <Pressable
          onPress={() => {
            _onPressed();
          }}
          hitSlop={10}
          style={{alignSelf: 'flex-start'}}>
          <Image
            source={
              star
                ? require('@assets/star_on.png')
                : require('@assets/star_off.png')
            }
            style={{width: 14.6, height: 14, marginBottom: 10}}
            resizeMode="contain"
          />
        </Pressable>
        <Text
          style={{fontFamily: FontList.PretendardMedium, color: '#333333'}}
          numberOfLines={2}>
          {data.statNm}
        </Text>
        <View style={{marginTop: 5}}>
          <Text
            style={{
              fontFamily: FontList.PretendardRegular,
              color: '#4B4B4B',
              fontSize: 13,
            }}>
            1.5km
          </Text>
        </View>
        <View style={{marginTop: 17}}>
          <Text
            style={{
              fontFamily: FontList.PretendardMedium,
              color: '#6FCF24',
              lineHeight: 24,
            }}>
            충전가능
          </Text>
        </View>
        <Text
          style={{
            fontFamily: FontList.PretendardRegular,
            fontSize: 12,
            color: 'black',
          }}>
          급속 1 | 완속 3
        </Text>
      </Pressable>
      {list.length - 1 === item.index && list.length % 3 !== 0 && (
        <View
          style={{
            flex: list.length % 3 === 2 ? 1 / 3 : 2 / 3,
            paddingHorizontal: 8,
            marginHorizontal: list.length % 3 === 2 ? 2 : 12,
          }}
        />
      )}
    </>
  );
};

export default RenderItem;
