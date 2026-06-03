import type {LinkingOptions} from '@react-navigation/native';
import {Linking} from 'react-native';
import type {RootStackParamList} from './types';

const DEEP_LINK_PREFIXES = [
  'https://io.pixelsoftwares.com',
  'https://www.io.pixelsoftwares.com',
  'furnitureapp://',
];

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: DEEP_LINK_PREFIXES,
  config: {
    screens: {
      Splash: 'splash',
      Main: {
        screens: {
          Home: '*',
          Likes: 'likes',
          Bag: 'bag',
          Profile: 'profile',
          Setting: 'settings',
        },
      },
      ProductDetail: 'product/:productId',
    },
  },
  async getInitialURL() {
    const url = await Linking.getInitialURL();
    return url ?? null;
  },
  subscribe(listener) {
    const sub = Linking.addEventListener('url', ({url}) => listener(url));
    return () => sub.remove();
  },
};
