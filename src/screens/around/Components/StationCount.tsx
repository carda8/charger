import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {Shadow} from 'react-native-shadow-2';
import {_getHeight, _getWidth} from 'constants/utils';
import FontList from 'constants/FontList';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
interface props {
  bottomSheetRef: React.RefObject<BottomSheetModalMethods>;
}
const StationCount = ({bottomSheetRef}: props) => {
  return (
    <View
      style={{
        alignSelf: 'center',
        position: 'absolute',
        bottom: _getHeight(70),
        // backgroundColor: 'gray',
      }}>
      <Shadow
        distance={4}
        stretch={true}
        style={{
          width: _getWidth(149),
          height: _getHeight(40),
        }}
        containerStyle={{
          flex: 1,
        }}>
        <Pressable
          onPress={() => {
            bottomSheetRef.current?.present();
          }}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: _getWidth(149),
            height: _getHeight(40),
            borderRadius: 46,
            backgroundColor: 'white',
            zIndex: 1000,
          }}>
          <Text
            style={{
              includeFontPadding: false,
              fontFamily: FontList.PretendardRegular,
              fontSize: 16,
              color: 'black',
            }}>
            주변 충전소00개
          </Text>
        </Pressable>
      </Shadow>
    </View>
  );
};

export default StationCount;
