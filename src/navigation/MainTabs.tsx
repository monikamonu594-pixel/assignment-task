import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import type {MainTabParamList} from './types';
import ProductListScreen from '../screens/ProductListScreen';
import LikesScreen from '../screens/LikesScreen';
import BagScreen from '../screens/BagScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import BottomTabBar from '../components/BottomTabBar';
import type {BottomTabBarProps} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator<MainTabParamList>();

const renderTabBar = (props: BottomTabBarProps) => <BottomTabBar {...props} />;

const MainTabs: React.FC = () => {
  return (
    <Tab.Navigator
      tabBar={renderTabBar}
      screenOptions={{
        headerShown: false,
        lazy: true,
      }}>
      <Tab.Screen name="Home" component={ProductListScreen} />
      <Tab.Screen name="Likes" component={LikesScreen} />
      <Tab.Screen name="Bag" component={BagScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Setting" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default MainTabs;
