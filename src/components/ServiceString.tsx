import {View, Text} from 'react-native';
import React from 'react';
import FontList from 'constants/FontList';

const ServiceString = () => {
  return (
    <View>
      <Text style={{fontFamily: FontList.PretendardMedium, color: '#999999'}}>
        서비스를 제공하기위해 꼭 필요합니다
      </Text>
    </View>
  );
};

export default ServiceString;
