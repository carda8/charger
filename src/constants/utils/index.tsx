import {Dimensions} from 'react-native';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';

const FIGMA_WIDTH = 360;
const FIGMA_HEIGHT = 800;

const portrait =
  Dimensions.get('window').width < Dimensions.get('window').height;

export const _getWidth = (width: number) => {
  const percentage = portrait
    ? (width / FIGMA_WIDTH) * 100
    : (width / FIGMA_HEIGHT) * 100;
  return responsiveScreenWidth(percentage);
};

export const _getHeight = (height: number) => {
  const percentage = portrait
    ? (height / FIGMA_HEIGHT) * 100
    : (height / FIGMA_WIDTH) * 100;
  return responsiveScreenHeight(percentage);
};
