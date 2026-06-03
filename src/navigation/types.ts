import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import type {CompositeScreenProps} from '@react-navigation/native';

export type HomeStackParamList = {
  ProductList: undefined;
  ProductDetail: {productId: number};
};

export type MainTabParamList = {
  Home: undefined;
  Likes: undefined;
  Bag: undefined;
  Profile: undefined;
  Setting: undefined;
};

export type RootStackParamList = {
  Splash: undefined;
  Main: undefined;
  ProductDetail: {productId: number};
};

export type SplashScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Splash'
>;

export type ProductListScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

export type ProductDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ProductDetail'
>;
