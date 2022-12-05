import {View, Text, Pressable, Image} from 'react-native';
import React, {Dispatch, SetStateAction, useState} from 'react';
import FontList from 'constants/FontList';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'redux/store';
import commonAPI from 'api/modules/commonAPI';
import {
  setGoalData,
  setInputGoal,
  setLastRef,
} from 'redux/reducers/pathReducer';
import modules from 'constants/utils/modules';
interface props {
  list: any[];
  item: any;
  setCenter: Dispatch<SetStateAction<any>>;
  setUserStar: Dispatch<SetStateAction<any>>;
  setStarMarker?: Dispatch<SetStateAction<any>>;
  bottomSheetRef: React.RefObject<BottomSheetModalMethods>;
  bottomGoalRef: React.RefObject<BottomSheetModalMethods>;
}

const PathStarRenderItem = ({
  list,
  item,
  bottomSheetRef,
  setUserStar,
  setCenter,
  bottomGoalRef,
}: props) => {
  const {userInfo} = useSelector((state: RootState) => state.authReducer);
  const [star, setStart] = useState(true);
  const dispatch = useDispatch();
  const data = item.item;
  const isClosed = modules._isClosed(data);

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
  //   address
  //   :
  //   "제주특별자치도 제주시 연동 312-1"
  //   location
  //   :
  //   {lat: 33.4889944, lon: 126.4982701}
  //   name
  //   :
  //   "제주특별자치도청"
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
  return (
    <>
      <Pressable
        onPress={() => {
          console.log('data', data);
          dispatch(setInputGoal(data.addr));
          const temp = {
            address: data.addr,
            location: {
              lat: Number(data.location.lat),
              lon: Number(data.location.lon),
            },
            name: data.statNm,
          };
          console.log('## star temp', temp);
          // dispatch(setLastRef('goal'));
          dispatch(setGoalData(temp));
          setCenter({
            latitude: data.location.lat,
            longitude: data.location.lon,
            zoom: 16,
          });
          bottomSheetRef.current?.dismiss();
          bottomGoalRef.current?.present();
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
            {data.distance}km
          </Text>
        </View>
        <View style={{marginTop: 17}}>
          <Text
            style={{
              fontFamily: FontList.PretendardMedium,
              color: '#6FCF24',
              lineHeight: 24,
            }}>
            {isClosed ? '충전가능' : '충전불가'}
          </Text>
        </View>
        <Text
          style={{
            fontFamily: FontList.PretendardRegular,
            fontSize: 12,
            color: 'black',
          }}>
          급속 {_sortChgerBySpeed(data).fast} | 완속{' '}
          {_sortChgerBySpeed(data).normal}
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

export default PathStarRenderItem;
