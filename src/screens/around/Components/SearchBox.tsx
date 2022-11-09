import {
  View,
  Text,
  useWindowDimensions,
  TextInput,
  Pressable,
  Image,
  Keyboard,
} from 'react-native';
import React from 'react';
import {_getHeight, _getWidth} from 'constants/utils';
import {useNavigation} from '@react-navigation/native';
import {commonTypes} from '@types';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';

interface props {
  bottomSheetRef: React.RefObject<BottomSheetModalMethods>;
}

const SearchBox = ({bottomSheetRef}: props) => {
  const layout = useWindowDimensions();
  const nav = useNavigation<commonTypes.navi>();
  return (
    <Pressable
      onPress={() => {
        bottomSheetRef.current?.close();
        nav.navigate('SearchMain');
      }}
      style={{
        flexDirection: 'row',
        height: 42,
        marginTop: 7.8,
        backgroundColor: 'white',
        // position: 'absolute',
        // zIndex: 100,
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 3,
      }}>
      <TextInput
        editable={false}
        onSubmitEditing={() => Keyboard.dismiss()}
        autoCapitalize="none"
        placeholder="목적지를 검색하세요"
        style={{
          flex: 1,
          paddingHorizontal: 10,
        }}></TextInput>
      <Pressable
        hitSlop={10}
        style={{marginRight: 13}}
        // onPress={() => Keyboard.dismiss()}
      >
        <Image
          source={require('@assets/search.png')}
          style={{width: 14, height: 14}}
          resizeMode="contain"
        />
      </Pressable>
    </Pressable>
  );
};

export default SearchBox;
