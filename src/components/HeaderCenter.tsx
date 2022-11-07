import {View, Text, Pressable, Image, StyleProp, TextStyle} from 'react-native';
import React from 'react';
import FontList from 'constants/FontList';
import {commonTypes} from '@types';
import {useNavigation} from '@react-navigation/native';
import {_getHeight, _getWidth} from 'constants/utils';

interface props {
  title?: string;
  backTitle?: string;
  backTitleStyle?: StyleProp<TextStyle>;
  // navi?: commonTypes.navi;
  leftBack?: boolean;
  rightBack?: boolean;
}

const HeaderCenter = ({
  title,
  backTitle,
  backTitleStyle,
  leftBack,
  rightBack,
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
        <View style={{flex: 1}}>
          {leftBack && (
            <Pressable onPress={() => navi?.goBack()} hitSlop={10}>
              <Image
                source={require('@assets/button_back.png')}
                style={{width: _getWidth(6), height: _getHeight(13)}}
                resizeMode="contain"
              />
            </Pressable>
          )}
        </View>
        <View
          style={{
            flex: 4,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontFamily: FontList.PretendardSemiBold, fontSize: 18}}>
            {title}
          </Text>
        </View>

        {/* Sub Title */}
        <Pressable
          disabled={!rightBack}
          onPress={() => navi?.goBack()}
          hitSlop={10}
          style={{
            flex: 1,
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}>
          <Text
            style={[
              {
                fontFamily: FontList.PretendardSemiBold,
              },
              backTitleStyle,
            ]}>
            {backTitle}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default HeaderCenter;
