import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {RootStackParamList} from './types';
import SplashScreen from '../screens/SplashScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import MainTabs from './MainTabs';
import {useAppSelector} from '../redux/hooks';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  const hasSeenIntro = useAppSelector(s => s.ui.hasSeenIntro);
  return (
    <Stack.Navigator
      initialRouteName={hasSeenIntro ? 'Main' : 'Splash'}
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Main" component={MainTabs} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
