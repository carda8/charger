import {View, Text, ScrollView, Pressable} from 'react-native';
import React, {Dispatch, SetStateAction, useState} from 'react';
import BottomButton from '@components/BottomButton';
import {Shadow} from 'react-native-shadow-2';
import FontList from 'constants/FontList';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'redux/store';
import {setGoalData, setRecomendStationData} from 'redux/reducers/pathReducer';

interface coor {
  latitude: number;
  longitude: number;
  zoom: number;
}

interface props {
  recomandList: any;
  setCenter?: Dispatch<SetStateAction<coor | undefined>>;
}

const PathRecommendList = ({recomandList, setCenter}: props) => {
  const {keywordList} = useSelector((state: RootState) => state.pathReducer);
  const dispatch = useDispatch();
  console.log('IN RECO LIST', recomandList);
  const [pick, setPick] = useState<any>();
  const _sortChgerBySpeed = (item: any) => {
    let normal = 0;
    let fast = 0;
    console.log('sort', item);
    if (item) {
      item?.chargers.map((item, index) => {
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
    <View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: 196,
          zIndex: 100,
          // backgroundColor: 'pink',
        }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          style={{flex: 1}}>
          <View style={{flexDirection: 'row', paddingTop: 4}}>
            {recomandList.length > 0 &&
              recomandList.map((item, index) => (
                <Shadow
                  key={item?.statId}
                  offset={[0, 1]}
                  distance={3}
                  style={{
                    width: 169,
                    height: 100,
                  }}
                  containerStyle={{
                    marginHorizontal: 8,
                  }}>
                  <Pressable
                    onPress={() => {
                      setPick(index);
                      dispatch(setRecomendStationData(item));
                      // dispatch(setGoalData(item));
                      // setCenter({
                      //   latitude: item.location.lat,
                      //   longitude: item.location.lon,
                      //   zoom: 16,
                      // });
                    }}
                    style={{
                      flex: 1,
                      backgroundColor: 'white',
                      borderRadius: 3,
                      borderWidth: 2,
                      borderColor: index === pick ? '#00C2FF' : 'white',
                      paddingLeft: 6,
                      paddingVertical: 6.68,
                    }}>
                    <Text
                      style={{
                        fontFamily: FontList.PretendardBold,
                        color: 'black',
                      }}>
                      추천 충전기
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Text
                        numberOfLines={1}
                        style={{
                          flex: 1,
                          fontFamily: FontList.PretendardRegular,
                          color: 'black',
                          lineHeight: 24,
                        }}>
                        {item?.statNm}
                      </Text>
                      <Text
                        style={{
                          fontFamily: FontList.PretendardRegular,
                          fontSize: 12,
                          color: '#666666',
                        }}>
                        117.8km{' '}
                      </Text>
                    </View>
                    <Text
                      numberOfLines={1}
                      style={{
                        fontFamily: FontList.PretendardRegular,
                        fontSize: 12,
                        color: '#666666',
                        lineHeight: 24,
                      }}>
                      {item?.addr}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                      }}>
                      <Text
                        style={{
                          fontFamily: FontList.PretendardRegular,
                          fontSize: 12,
                          color: '#C6C6C6',
                          lineHeight: 24,
                        }}>
                        {'급속 '}
                        {_sortChgerBySpeed(item).fast}
                        {' |'}
                      </Text>
                      <Text
                        style={{
                          fontFamily: FontList.PretendardRegular,
                          fontSize: 12,
                          color: '#666666',
                          lineHeight: 24,
                        }}>
                        {' 완속 '}
                        {_sortChgerBySpeed(item).normal}{' '}
                      </Text>
                    </View>
                  </Pressable>
                </Shadow>
              ))}
          </View>
        </ScrollView>
        <View
          style={{
            backgroundColor: 'white',
          }}>
          <BottomButton
            text="경로 설정"
            style={{marginHorizontal: 16, marginTop: 8}}
          />
        </View>
      </View>
    </View>
  );
};

export default PathRecommendList;
