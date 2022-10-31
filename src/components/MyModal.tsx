import {View, Text, Modal, Pressable, StatusBar} from 'react-native';
import React from 'react';
import FontList from 'constants/FontList';
interface props {
  visible: boolean;
  text?: string;
  title: string;
  //버튼이 하나인 경우 positive 사용
  positive: boolean;
  positiveTitle: string;
  negative?: boolean;
  negativeTitle?: string;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  positivePress?: () => void;
}

const MyModal = ({
  visible,
  text,
  title,
  setVisible,
  positive,
  negative,
  positiveTitle,
  negativeTitle,
  positivePress,
}: props) => {
  const _onPressPositive = () => {
    if (positivePress) positivePress();
    setVisible(false);
  };

  const _onPressNegative = () => {
    setVisible(false);
  };

  return (
    <Modal
      statusBarTranslucent
      visible={visible}
      transparent
      onRequestClose={() => {
        setVisible(!visible);
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          justifyContent: 'center',
        }}>
        <View
          style={{
            marginHorizontal: 23,
            borderRadius: 8,
            backgroundColor: 'white',
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 36.5,
            }}>
            <View style={{marginTop: 36, marginBottom: text ? undefined : 36}}>
              <Text
                style={{
                  fontFamily: FontList.PretendardBold,
                  fontSize: 18,
                  color: 'black',
                }}>
                {title}
              </Text>
            </View>
            {text && (
              <View style={{marginTop: 26, marginBottom: 26}}>
                <Text
                  style={{
                    fontFamily: FontList.PretendardRegular,
                    fontSize: 18,
                    color: 'black',
                    textAlign: 'center',
                  }}>
                  {text}
                </Text>
              </View>
            )}
          </View>
          <View style={{flexDirection: 'row', height: 66}}>
            {/* Negative Button */}
            {negative && (
              <Pressable
                onPress={() => {
                  _onPressNegative();
                }}
                style={{
                  flex: 1,
                  borderBottomLeftRadius: 8,

                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#E2E2E2',
                }}>
                <Text
                  style={{
                    fontFamily: FontList.PretendardBold,
                    fontSize: 16,
                    color: '#3C3C3C',
                  }}>
                  {negativeTitle}
                </Text>
              </Pressable>
            )}
            {/* Positive Button */}

            {positive && (
              <Pressable
                onPress={() => {
                  _onPressPositive();
                }}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#00239C',
                  borderBottomRightRadius: 8,
                  borderBottomLeftRadius: !negative ? 8 : undefined,
                }}>
                <Text
                  style={{
                    fontFamily: FontList.PretendardBold,
                    fontSize: 16,
                    color: 'white',
                  }}>
                  {positiveTitle}
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default MyModal;
