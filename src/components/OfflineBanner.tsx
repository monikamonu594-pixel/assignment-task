import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AppText from './AppText';
import {colors, spacing} from '../theme';

interface OfflineBannerProps {
  visible: boolean;
}

const OfflineBanner: React.FC<OfflineBannerProps> = ({visible}) => {
  const insets = useSafeAreaInsets();
  if (!visible) return null;
  return (
    <View
      pointerEvents="none"
      style={[
        styles.bar,
        {
          paddingTop: Math.max(insets.top, spacing.sm),
          paddingBottom: spacing.sm,
        },
      ]}>
      <AppText variant="caption" color="#FFFFFF" weight="600">
        You are offline
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    paddingHorizontal: spacing.base,
    backgroundColor: colors.offline,
    alignItems: 'center',
  },
});

export default memo(OfflineBanner);
