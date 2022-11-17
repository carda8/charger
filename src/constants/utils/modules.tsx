import commonAPI from 'api/modules/commonAPI';
import ModelList from 'constants/ModelList';
import dayjs from 'dayjs';
import {useDispatch, useSelector} from 'react-redux';
import {setUserInfo} from 'redux/reducers/authReducer';
import {RootState} from 'redux/store';

export default {
  _getCarModel: (selectedBrand: any) => {
    switch (selectedBrand) {
      case '현대':
        return ModelList.현대;
      case '기아':
        return ModelList.기아;
      case '벤츠':
        return ModelList.벤츠;
      case '아우디':
        return ModelList.아우디;
      case '제네시스':
        return ModelList.제네시스;
      case '테슬라':
        return ModelList.테슬라;
      case '쉐보레':
        return ModelList.쉐보레;
      case 'BMW':
        return ModelList.BMW;
      default:
        return [];
    }
  },

  _isClosed: (item: any) => {
    if (item?.chargers?.length > 0) {
      let close = false;
      close = item.chargers.find(
        (item, index) =>
          item.statInfo === '충전대기' || item.statInfo === '충전중',
      );
      if (close) return true;
      else return false;
    }
    return;
  },

  _convertDate: (day: any) => {
    return dayjs(day).format('MM.DD');
  },

  _updateUserInfo: async (dispatch: any, userInfo: any) => {
    // const {userInfo} = useSelector((state: RootState) => state.authReducer);
    // const dispatch = useDispatch();
    if (userInfo?.id) {
      const id = {user_id: userInfo?.id};
      await commonAPI
        ._getUserInfo(id)
        .then(res => {
          if (res.data) dispatch(setUserInfo(res.data));
        })
        .catch(err => {
          console.log('err', err);
        });
    }
  },
};
