import React, { useCallback } from 'react';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppText from '../components/AppText';
import { colors, radius, spacing } from '../theme';
import type { SplashScreenProps } from '../navigation/types';
import { useAppDispatch } from '../redux/hooks';
import { setHasSeenIntro } from '../redux/slices/uiSlice';
import { moderateScale } from '../theme/responsive';

const SPLASH_IMAGE = require('../assets/images/splashscreen.png');

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const onStart = useCallback(() => {
    dispatch(setHasSeenIntro(true));
    navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
  }, [dispatch, navigation]);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <ImageBackground
        source={SPLASH_IMAGE}
        style={styles.bg}
        imageStyle={styles.bgImage}>
        <SafeAreaView edges={['top', 'bottom']} style={styles.safe}>
          <View style={styles.content}>
            <AppText variant="display" style={styles.headline}>
              Feel your personal expression by choosing the latest design of furniture
            </AppText>
          </View>
          <Pressable
            onPress={onStart}
            style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
            accessibilityRole="button"
            accessibilityLabel="Get started">
            <AppText variant="title" color={colors.black}>
              Get Started
            </AppText>
          </Pressable>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  bg: { flex: 1 },
  bgImage: { resizeMode: 'cover' },
  safe: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    justifyContent: 'space-between',
  },
  content: {
    marginTop: spacing.xxl,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xs,
    maxWidth: '90%',
  },
  headline: { color: colors.textPrimary, lineHeight: 34 },
  cta: {
    alignSelf: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    marginBottom: moderateScale(70),
    minWidth: moderateScale(200),
    alignItems: 'center',
  },
  ctaPressed: { opacity: 0.85 },
});

export default SplashScreen;
