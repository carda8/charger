import ModelList from 'constants/ModelList';

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
    let close = false;
    close = item.chargers.find(
      (item, index) =>
        item.statInfo === '충전대기' || item.statInfo === '충전중',
    );
    if (close) return true;
    else return false;
  },
};
