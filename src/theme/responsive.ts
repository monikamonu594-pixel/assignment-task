import {Dimensions, PixelRatio} from 'react-native';

const {width, height} = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

export const scale = (size: number): number =>
  (width / guidelineBaseWidth) * size;

export const verticalScale = (size: number): number =>
  (height / guidelineBaseHeight) * size;

export const moderateScale = (
  size: number,
  factor = 0.5,
): number => size + (scale(size) - size) * factor;

export const RF = (size: number): number =>
  Math.round(
    PixelRatio.roundToNearestPixel(
      moderateScale(size),
    ),
  );

export const wp = (percentage: number): number =>
  (width * percentage) / 100;

export const hp = (percentage: number): number =>
  (height * percentage) / 100;

export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;

export const isSmallDevice = width < 360;
export const isTablet = width >= 768;