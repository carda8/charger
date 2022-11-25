import {View, Text, StyleProp, ViewStyle, Pressable} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import FontList from 'constants/FontList';
import {commonTypes} from '@types';
import {useNavigation} from '@react-navigation/native';
import routertype from '@router/routertype';
import {string} from 'yup';

interface props {
  text?: string;
  style?: StyleProp<ViewStyle>;
  navi?: commonTypes.navi;
  loading?: boolean;
  screen?: any;
  setVisible?: Dispatch<SetStateAction<boolean>>;
  recomend?: boolean;
  setRecomend?: Dispatch<SetStateAction<boolean>>;
  disable?: boolean;
  coor?: any;
}

// export type Nav = {
//   navigate: (value: string) => void;
//   reset: (value: object) => void;
//   params: object;
// };

const BottomButton = ({
  style,
  text,
  screen,
  loading,
  setVisible,
  recomend,
  setRecomend,
  disable,
  coor,
}: props) => {
  const navi = useNavigation<commonTypes.navi>();

  // 길안내 연결 모달 상태 값
  const _onPress = () => {
    if (disable) {
      return;
    }
    if (setRecomend) {
      return setRecomend(true);
    }
    if (setVisible) {
      return setVisible(true);
    } else
      switch (screen) {
        // case routertype.AccountCarInfo:
        // return navi.reset({
        // index: 1,
        // routes: [{name: routertype.Login}, {name: routertype.AccountCarInfo}],
        // });
        default:
          return navi.navigate(screen);
      }
  };
  return (
    <Pressable
      onPress={() => {
        if (!loading) {
          _onPress();
        }
      }}
      style={[
        {
          height: 54,
          backgroundColor: loading ? '#C4C4C4 ' : '#00239C',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 8,
          marginTop: 'auto',
          marginBottom: 22,
        },
        style,
      ]}>
      <Text
        style={{
          fontFamily: FontList.PretendardBold,
          fontSize: 16,
          color: 'white',
        }}>
        {text}
      </Text>
    </Pressable>
  );
};

export default BottomButton;
