import {View, Text, Pressable} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import {_getHeight} from 'constants/utils';
import FontList from 'constants/FontList';
import {useNavigation} from '@react-navigation/native';
import {commonTypes} from '@types';

interface props {
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
}

const ReportButton = ({modal, setModal}: props) => {
  const nav = useNavigation<commonTypes.navi>();
  return (
    <View>
      <View
        style={{
          height: _getHeight(48),
          flexDirection: 'row',
          marginVertical: _getHeight(20),
        }}>
        <Pressable
          onPress={() => {
            nav.navigate('StationReportPage');
          }}
          style={{
            flex: 1,
            borderWidth: 1,
            marginRight: 14,
            borderRadius: 8,
            borderColor: '#0431A6',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontFamily: FontList.PretendardRegular,
              color: 'black',
              fontSize: 16,
            }}>
            고장제보
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setModal(!modal);
          }}
          style={{
            flex: 1,
            borderWidth: 1,
            borderRadius: 8,
            backgroundColor: '#0431A6',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontFamily: FontList.PretendardRegular,
              color: 'white',
              fontSize: 16,
            }}>
            도착지 설정
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ReportButton;
