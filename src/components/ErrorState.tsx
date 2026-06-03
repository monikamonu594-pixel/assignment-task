import React, {memo} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import AppText from './AppText';
import {colors, radius, spacing} from '../theme';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({message, onRetry}) => {
  return (
    <View style={styles.wrap}>
      <AppText variant="h2" align="center">
        Something went wrong
      </AppText>
      <AppText
        variant="body"
        color={colors.textSecondary}
        align="center"
        style={styles.msg}>
        {message}
      </AppText>
      {onRetry ? (
        <Pressable onPress={onRetry} style={styles.btn} accessibilityRole="button">
          <AppText variant="title" color="#FFFFFF">
            Retry
          </AppText>
        </Pressable>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    paddingVertical: spacing.xxxl,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
  msg: {marginTop: spacing.sm},
  btn: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
  },
});

export default memo(ErrorState);
