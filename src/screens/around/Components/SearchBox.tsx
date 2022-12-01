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
import {useSelector} from 'react-redux';
import {RootState} from 'redux/store';

interface props {
  bottomSheetRef: React.RefObject<BottomSheetModalMethods>;
}

const SearchBox = ({bottomSheetRef}: props) => {
  const {aroundKeyData} = useSelector(
    (state: RootState) => state.aroundReducer,
  );
  console.log('SearchBox aroundKeyData', aroundKeyData);
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
        value={aroundKeyData?.addr ? aroundKeyData?.addr : ''}
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

export default React.memo(SearchBox);
