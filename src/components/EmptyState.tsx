import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import AppText from './AppText';
import {colors, spacing} from '../theme';
import { moderateScale } from '../theme/responsive';

interface EmptyStateProps {
  title: string;
  message?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({title, message}) => {
  return (
    <View style={styles.wrap}>
      <AppText variant="h2" align="center">
        {title}
      </AppText>
      {message ? (
        <AppText
          variant="body"
          align="center"
          color={colors.textSecondary}
          style={styles.msg}>
          {message}
        </AppText>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    paddingVertical: moderateScale(spacing.xxxl),
    paddingHorizontal: moderateScale(spacing.lg),
    alignItems: 'center',
    flex:1
  },
  msg: {marginTop: moderateScale(spacing.sm)},
});

export default memo(EmptyState);
