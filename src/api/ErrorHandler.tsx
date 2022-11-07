import {Alert} from 'react-native';

const ErrorHandler = (errData: any) => {
  return Alert.alert('관리자에게 문의 바랍니다. ERR : ', errData.url);
};

export {ErrorHandler};
