import React, {memo} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {colors, spacing} from '../theme';
import {CategoryIcon, FilterIcon} from './icons/TabIcons';
import {ViewMode} from '../redux/slices/uiSlice';
import { moderateScale } from '../theme/responsive';

interface ViewToggleProps {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

const ACTIVE = colors.primary;
const INACTIVE = '#000000';
const ICON_SIZE = 25;

const ViewToggle: React.FC<ViewToggleProps> = ({mode, onChange}) => {
  return (
    <View style={styles.row}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="List view"
        onPress={() => onChange('list')}
        style={styles.btn}
        hitSlop={8}>
        <FilterIcon
          size={ICON_SIZE}
          color={mode === 'list' ? ACTIVE : INACTIVE}
        />
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Grid view"
        onPress={() => onChange('grid')}
        style={styles.btn}
        hitSlop={8}>
        <CategoryIcon
          size={ICON_SIZE}
          color={mode === 'grid' ? ACTIVE : INACTIVE}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'center',
    alignSelf:'flex-end',
    marginRight: moderateScale(20),
    marginTop: spacing.sm,
  },
  btn: {
    width:moderateScale(34),
    height: moderateScale(34),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default memo(ViewToggle);
