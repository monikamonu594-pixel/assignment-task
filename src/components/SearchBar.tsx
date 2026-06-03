import React, {memo} from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import {colors, fonts, radius, spacing} from '../theme';
import {SearchIcon} from './icons/Icons';
import { moderateScale, RF } from '../theme/responsive';

interface SearchBarProps extends Omit<TextInputProps, 'style'> {
  containerStyle?: ViewStyle;
}

const SearchBar: React.FC<SearchBarProps> = ({
  containerStyle,
  placeholder = 'Search products',
  ...rest
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        {...rest}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        style={styles.input}
        returnKeyType="search"
        autoCorrect={false}
        autoCapitalize="none"
      />
      <View style={styles.iconWrap} pointerEvents="none">
        <SearchIcon size={moderateScale(25)} color={colors.textSecondary} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: moderateScale(44),
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: moderateScale(1),
    borderColor: colors.border,
    paddingHorizontal: spacing.base,
    justifyContent: 'center',
  },
  input: {
    fontFamily: fonts.regular,
    fontSize: RF(14),
    color: colors.textPrimary,
    paddingVertical: 0,
    paddingRight: spacing.xl,
  },
  iconWrap: {
    position: 'absolute',
    right: spacing.md,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
});

export default memo(SearchBar);
