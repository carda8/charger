import {View, Text, Pressable, StyleProp, TextStyle} from 'react-native';
import React from 'react';
import FontList from 'constants/FontList';
import {commonTypes} from '@types';
import {useNavigation} from '@react-navigation/native';

interface props {
  title?: string;
  subTitle?: string;
  // navi?: commonTypes.navi;
  goBack?: boolean;
  backTitle?: string;
  titleStyle?: StyleProp<TextStyle>;
  backTitleStyle?: StyleProp<TextStyle>;
}

const Header = ({
  title,
  subTitle,
  goBack,
  backTitle,
  titleStyle,
  backTitleStyle,
}: props) => {
  const navi = useNavigation<commonTypes.navi>();
  return (
    <View style={{backgroundColor: 'white'}}>
      <View
        style={{
          flexDirection: 'row',
          padding: 16,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        {/* Main Title */}
        <Text
          style={[
            {fontFamily: FontList.PretendardSemiBold, fontSize: 18},
            titleStyle,
          ]}>
          {title}
        </Text>

        {/* Sub Title */}
        <Text
          style={{
            fontFamily: FontList.PretendardSemiBold,
          }}>
          {subTitle}
        </Text>

        {goBack && (
          <Pressable onPress={() => navi?.goBack()} hitSlop={10}>
            <Text
              style={[
                {
                  fontSize: 16,
                  fontFamily: FontList.PretendardRegular,
                },
                backTitleStyle,
              ]}>
              {backTitle}
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default Header;
