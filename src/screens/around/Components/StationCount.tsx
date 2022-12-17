import {View, Text, Pressable} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import {Shadow} from 'react-native-shadow-2';
import {_getHeight, _getWidth} from 'constants/utils';
import FontList from 'constants/FontList';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {SafeAreaView} from 'react-native-safe-area-context';
interface props {
  bottomSheetRef: React.RefObject<BottomSheetModalMethods>;
  stationList: any[];
  setPick: Dispatch<SetStateAction<any>>;
}

const StationCount = ({bottomSheetRef, stationList, setPick}: props) => {
  const _getListCount = () => {
    return stationList?.length;
  };

  return (
    <SafeAreaView
      style={{
        alignSelf: 'center',
        position: 'absolute',
        bottom: 70,
        // backgroundColor: 'gray',
      }}>
      <Shadow
        distance={4}
        stretch={true}
        style={{
          width: 149,
          height: 40,
        }}
        containerStyle={{
          flex: 1,
        }}>
        <Pressable
          onPress={() => {
            setPick(null);
            bottomSheetRef.current?.present();
          }}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 149,
            height: 40,
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
            주변 충전소{' '}
            <Text
              style={{
                includeFontPadding: false,
                fontFamily: FontList.PretendardBold,
                fontSize: 16,
                color: 'black',
              }}>
              {_getListCount()}
            </Text>
            개
          </Text>
        </Pressable>
      </Shadow>
    </SafeAreaView>
  );
};

export default StationCount;
