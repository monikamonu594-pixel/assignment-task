import React, { memo, useCallback } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { colors, radius, spacing } from '../theme';
import { MinusIcon, PlusIcon } from './icons/Icons';
import AppText from './AppText';
import { clampQuantity } from '../utils/formatters';
import { moderateScale, RF } from '../theme/responsive';

interface QuantitySelectorProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  value,
  min = 1,
  max = 99,
  onChange,
}) => {
  const dec = useCallback(
    () => onChange(clampQuantity(value - 1, min, max)),
    [onChange, value, min, max],
  );
  const inc = useCallback(
    () => onChange(clampQuantity(value + 1, min, max)),
    [onChange, value, min, max],
  );
  return (
    <View style={styles.row}>
      <Pressable
        accessibilityLabel="Decrease quantity"
        onPress={dec}
        style={({ pressed }) => [styles.btnMinus, pressed && styles.pressed]}
        hitSlop={6}>
        <MinusIcon size={moderateScale(16)} color={colors.textPrimary} />
      </Pressable>
      <View style={styles.valueWrap}>
        <AppText style={{
          fontSize: RF(20),
          lineHeight: RF(22),
        }} weight="700">
          {value}
        </AppText>
      </View>
      <Pressable
        accessibilityLabel="Increase quantity"
        onPress={inc}
        style={({ pressed }) => [styles.btnPlus, pressed && styles.pressed]}
        hitSlop={6}>
        <PlusIcon size={moderateScale(16)} color="#FFFFFF" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  btnMinus: {
    width: moderateScale(35),
    height: moderateScale(35),
    borderRadius: radius.sm,
    borderWidth: moderateScale(2),
    borderColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  btnPlus: {
    width: moderateScale(36),
    height: moderateScale(36),
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5E5A5A',
  },
  pressed: { opacity: 0.75 },
  valueWrap: {
    minWidth: moderateScale(40),
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
});

export default memo(QuantitySelector);
