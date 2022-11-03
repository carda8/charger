import {View, Text, Modal, ActivityIndicator} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';

interface props {
  visible?: boolean;
  setVisible?: Dispatch<SetStateAction<boolean>>;
}

const Loading = ({setVisible, visible}: props) => {
  return (
    <Modal
      transparent
      statusBarTranslucent={true}
      onRequestClose={() => {
        // setModal(!modal);
      }}
      visible={visible}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.3)',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator size="large" />
      </View>
    </Modal>
  );
};

export default Loading;
