import React, {useCallback, useState} from 'react';
import {Alert, Pressable, ScrollView, StyleSheet, Switch, View} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import AppText from '../components/AppText';
import {ChevronRightIcon} from '../components/icons/Icons';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {setSearchQuery, setViewMode} from '../redux/slices/uiSlice';
import {colors, radius, spacing} from '../theme';
import {showToast} from '../utils/toast';
import { moderateScale } from '../theme/responsive';

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({title, children}) => (
  <View style={styles.section}>
    <AppText variant="caption" color={colors.textSecondary} style={styles.sectionTitle}>
      {title.toUpperCase()}
    </AppText>
    <View style={styles.group}>{children}</View>
  </View>
);

const SettingsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const viewMode = useAppSelector(s => s.ui.viewMode);
  const isOnline = useAppSelector(s => s.ui.isOnline);
  const [notifications, setNotifications] = useState(true);
  const [analytics, setAnalytics] = useState(false);

  const onReset = useCallback(() => {
    Alert.alert('Reset preferences', 'Reset search and view mode?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Reset',
        style: 'destructive',
        onPress: () => {
          dispatch(setViewMode('grid'));
          dispatch(setSearchQuery(''));
          showToast('Preferences reset');
        },
      },
    ]);
  }, [dispatch]);

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          {paddingBottom:moderateScale(100) + insets.bottom},
        ]}
        showsVerticalScrollIndicator={false}>
        <AppText variant="h1" style={styles.heading}>
          Settings
        </AppText>

        <Section title="Preferences">
          <View style={styles.row}>
            <AppText variant="title">Default view</AppText>
            <View style={styles.viewToggle}>
              <Pressable
                onPress={() => dispatch(setViewMode('grid'))}
                style={[
                  styles.chip,
                  viewMode === 'grid' && styles.chipActive,
                ]}>
                <AppText
                  variant="caption"
                  color={viewMode === 'grid' ? '#FFF' : colors.textPrimary}>
                  Grid
                </AppText>
              </Pressable>
              <Pressable
                onPress={() => dispatch(setViewMode('list'))}
                style={[
                  styles.chip,
                  viewMode === 'list' && styles.chipActive,
                ]}>
                <AppText
                  variant="caption"
                  color={viewMode === 'list' ? '#FFF' : colors.textPrimary}>
                  List
                </AppText>
              </Pressable>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <AppText variant="title">Notifications</AppText>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{true: colors.primary, false: colors.starInactive}}
              thumbColor="#FFFFFF"
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <AppText variant="title">Share analytics</AppText>
            <Switch
              value={analytics}
              onValueChange={setAnalytics}
              trackColor={{true: colors.primary, false: colors.starInactive}}
              thumbColor="#FFFFFF"
            />
          </View>
        </Section>

        <Section title="Connection">
          <View style={styles.row}>
            <AppText variant="title">Network</AppText>
            <View style={styles.badgeRow}>
              <View
                style={[
                  styles.dot,
                  {backgroundColor: isOnline ? colors.success : colors.danger},
                ]}
              />
              <AppText
                variant="body"
                color={isOnline ? colors.success : colors.danger}>
                {isOnline ? 'Online' : 'Offline'}
              </AppText>
            </View>
          </View>
        </Section>

        <Section title="About">
          <Pressable
            style={({pressed}) => [styles.row, pressed && {opacity: 0.7}]}
            onPress={() => showToast('AssignmentTask v0.0.1')}>
            <AppText variant="title">App version</AppText>
            <View style={styles.badgeRow}>
              <AppText variant="body" color={colors.textSecondary}>
                0.0.1
              </AppText>
              <ChevronRightIcon size={18} color={colors.textSecondary} />
            </View>
          </Pressable>
          <View style={styles.divider} />
          <Pressable
            style={({pressed}) => [styles.row, pressed && {opacity: 0.7}]}
            onPress={() => showToast('Built with React Native + Redux')}>
            <AppText variant="title">Open source</AppText>
            <ChevronRightIcon size={18} color={colors.textSecondary} />
          </Pressable>
        </Section>

        <Pressable
          onPress={onReset}
          style={({pressed}) => [styles.resetBtn, pressed && {opacity: 0.85}]}>
          <AppText variant="title" color={colors.danger} weight="700">
            Reset preferences
          </AppText>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: colors.screenBg},
  content: {paddingHorizontal: spacing.lg, paddingTop: spacing.sm},
  heading: {marginBottom: spacing.lg},
  section: {marginBottom: spacing.lg},
  sectionTitle: {marginBottom: spacing.sm, letterSpacing: 1},
  group: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.base,
  },
  viewToggle: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginLeft: spacing.base,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  dot: {width:moderateScale(8), height: moderateScale(8), borderRadius: moderateScale(4)},
  resetBtn: {
    alignSelf: 'center',
    paddingVertical: spacing.md,
    marginTop: spacing.lg,
  },
});

export default SettingsScreen;
