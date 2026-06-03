import React, { memo, useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import AppText from './AppText';
import { ProfileIcon } from './icons/Icons';
import {
  TabBagIcon,
  TabHeartIcon,
  TabHomeIcon,
  TabSettingIcon,
} from './icons/TabIcons';
import { colors, spacing } from '../theme';
import { useAppSelector } from '../redux/hooks';
import { moderateScale, RF } from '../theme/responsive';

type IconComponent = React.FC<{ size?: number; color?: string }>;

const TAB_META: Record<
  string,
  { label: string; Icon: IconComponent }
> = {
  Home: { label: 'Home', Icon: TabHomeIcon },
  Likes: { label: 'Likes', Icon: TabHeartIcon },
  Bag: { label: 'Bag', Icon: TabBagIcon },
  Profile: { label: 'Profile', Icon: ProfileIcon },
  Setting: { label: 'Setting', Icon: TabSettingIcon },
};

const BottomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const cart = useAppSelector(s => s.ui.cart ?? {});
  const favorites = useAppSelector(s => s.ui.favorites ?? []);

  const bagCount = useMemo(
    () => Object.values(cart).reduce<number>((sum, n) => sum + Number(n), 0),
    [cart],
  );

  return (
    <View
      style={[
        styles.wrap,
        { paddingBottom: Math.max(insets.bottom, spacing.sm) },
      ]}>
      {state.routes.map((route, index) => {
        const meta = TAB_META[route.name];
        if (!meta) return null;
        const isActive = state.index === index;
        const tint = isActive ? colors.primary : colors.black;
        const { Icon, label } = meta;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isActive && !event.defaultPrevented) {
            navigation.navigate(route.name as never);
          }
        };

        const badge =
          route.name === 'Bag' && bagCount > 0
            ? bagCount > 9
              ? '9+'
              : String(bagCount)
            : route.name === 'Likes' && favorites.length > 0
              ? favorites.length > 9
                ? '9+'
                : String(favorites.length)
              : null;

        return (
          <Pressable
            key={route.key}
            style={styles.tab}
            accessibilityRole="button"
            accessibilityLabel={label}
            onPress={onPress}>
            <View>
              <Icon size={moderateScale(26)} color={tint} />
              {badge ? (
                <View style={styles.badge}>
                  <AppText variant="small" color="#FFF" style={styles.badgeText}>
                    {badge}
                  </AppText>
                </View>
              ) : null}
            </View>
            <AppText variant="small" color={tint} style={styles.label}>
              {label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    backgroundColor: colors.surface,

    paddingTop: spacing.md,
    paddingHorizontal: spacing.sm,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -4 },
    elevation: 12,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xs,
  },
  label: { marginTop:moderateScale(4) },
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    minWidth: moderateScale(16),
    height:moderateScale(16),
    borderRadius: moderateScale(8),
    backgroundColor: colors.heart,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: moderateScale(3),
  },
  badgeText: { fontSize: RF(9) , fontWeight: '700' },
});

export default memo(BottomTabBar);
