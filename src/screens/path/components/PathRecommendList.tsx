import {View, Text, ScrollView, Pressable} from 'react-native';
import React from 'react';
import BottomButton from '@components/BottomButton';
import {Shadow} from 'react-native-shadow-2';
import FontList from 'constants/FontList';

const PathRecommendList = () => {
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
            <Shadow
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
                style={{
                  flex: 1,
                  backgroundColor: 'white',
                  borderRadius: 3,
                  borderWidth: 2,
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
                    {'추천 이름'}
                  </Text>
                  <Text
                    style={{
                      fontFamily: FontList.PretendardRegular,
                      fontSize: 12,
                      color: '#666666',
                    }}>
                    176.8km
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
                  {'추천 주소'}
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
                    {'급속 0  |'}
                  </Text>
                  <Text
                    style={{
                      fontFamily: FontList.PretendardRegular,
                      fontSize: 12,
                      color: '#666666',
                      lineHeight: 24,
                    }}>
                    {'  완속 1'}
                  </Text>
                </View>
              </Pressable>
            </Shadow>
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
