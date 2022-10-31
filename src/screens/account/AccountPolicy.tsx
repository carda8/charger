import {View, Text, Image, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import GlobalStyles from 'styles/GlobalStyles';
import Header from '@components/Header';
import {useNavigation} from '@react-navigation/native';
import {commonTypes} from '@types';
import ServiceString from '@components/ServiceString';
import FontList from 'constants/FontList';
import BottomButton from '@components/BottomButton';
import routertype from '@router/routertype';
import MyModal from '@components/MyModal';

interface check {
  [key: string]: boolean;
  personal: boolean;
  service: boolean;
  all: boolean;
}

interface props {
  target: string;
}

const AccountPolicy = () => {
  const navi = useNavigation<commonTypes.navi>();
  // const [modal, setModal] = useState(false);
  const [check, setCheck] = useState<check>({
    personal: false,
    service: false,
    all: false,
  });

  const Divider = () => {
    return (
      <View
        style={{
          width: '100%',
          height: 1,
          backgroundColor: '#C6C6C6',
          marginVertical: 17,
        }}
      />
    );
  };

  const _onPressPolicy = (target: string) => {
    switch (target) {
      case Object.keys(check)[0]:
        return setCheck({
          personal: !check.personal,
          service: check.service,
          all: false,
        });
      case Object.keys(check)[1]:
        return setCheck({
          personal: check.personal,
          service: !check.service,
          all: false,
        });
      case Object.keys(check)[2]:
        return setCheck({
          personal: !check.all,
          service: !check.all,
          all: !check.all,
        });
      default:
        return;
    }
  };

  useEffect(() => {
    if (!check.all) {
      if (check.personal && check.service)
        setCheck({personal: true, service: true, all: true});
    }
  }, [check]);

  const _getTitle = (target: string) => {
    switch (target) {
      case Object.keys(check)[0]:
        return '(필수)개인정보 수집 및 이용 안내';
      case Object.keys(check)[1]:
        return '(필수)서비스 이용약관 동의';
      case Object.keys(check)[2]:
        return '(전체)이용약관 전체동의';
      default:
        return '';
    }
  };

  const CheckPolicy = ({target}: props) => {
    return (
      <Pressable
        onPress={() => _onPressPolicy(target)}
        hitSlop={17}
        style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={require('@assets/check.png')}
          style={{
            width: 20,
            height: 20,
            tintColor: check[target] ? '#00239C' : undefined,
          }}
        />
        <View style={{marginLeft: 10}}>
          <Text
            style={{
              fontFamily: FontList.PretendardRegular,
              fontSize: 16,
              includeFontPadding: false,
            }}>
            {_getTitle(target)}
          </Text>
        </View>
        {target !== Object.keys(check)[2] && (
          <Pressable
            hitSlop={17}
            onPress={() => {
              navi.navigate('AccountPolicyDetail', {target: target});
            }}
            style={{marginLeft: 'auto'}}>
            <Text
              style={{
                fontFamily: FontList.PretendardRegular,
                color: '#868E96',
                includeFontPadding: false,
              }}>
              보기
            </Text>
          </Pressable>
        )}
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={{...GlobalStyles.safeAreaStyle}}>
      <Header title="약관동의" goBack backTitle="취소" />
      <View style={{flex: 1, paddingHorizontal: 16}}>
        <ServiceString />
        <View style={{marginTop: 52}}>
          <CheckPolicy target={Object.keys(check)[0]} />
          <Divider />
          <CheckPolicy target={Object.keys(check)[1]} />
          <Divider />
          <CheckPolicy target={Object.keys(check)[2]} />
        </View>
        <BottomButton
          style={{backgroundColor: check.all ? '#00239C' : '#C4C4C4'}}
          text={'동의하고 시작하기'}
          loading={check.all ? false : true}
          screen={routertype.AccountFinish}
        />
      </View>
      {/* <MyModal
        visible={modal}
        setVisible={setModal}
        title={'약관 동의가 필요합니다'}
        text={'서비스를 제공하기위해 약관 동의가 꼭 필요합니다.'}
        positive
        positiveTitle={'확인'}
        negative
        negativeTitle="취소"
      /> */}
    </SafeAreaView>
  );
};

export default AccountPolicy;
