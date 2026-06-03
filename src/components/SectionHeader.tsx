import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import AppText from './AppText';
import { colors, spacing } from '../theme';

interface SectionHeaderProps {
  label: string;
  count: number;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ label, count }) => {
  return (
    <View style={styles.row}>
      <AppText variant="h2">{label}</AppText>

    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    marginTop: spacing.sm,
  },
});

export default memo(SectionHeader);
