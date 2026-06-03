import React, {useMemo} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import AppText from '../components/AppText';
import {
  BagIcon,
  ChevronRightIcon,
  HeartIcon,
  ProfileIcon,
  SettingsIcon,
} from '../components/icons/Icons';
import {useAppSelector} from '../redux/hooks';
import {colors, radius, spacing} from '../theme';
import { moderateScale } from '../theme/responsive';

interface RowProps {
  icon: React.ReactNode;
  label: string;
  value?: string;
}

const Row: React.FC<RowProps> = ({icon, label, value}) => (
  <View style={styles.row}>
    <View style={styles.rowIcon}>{icon}</View>
    <AppText variant="title" style={styles.rowLabel}>
      {label}
    </AppText>
    {value ? (
      <AppText variant="body" color={colors.textSecondary} style={styles.rowValue}>
        {value}
      </AppText>
    ) : null}
    <ChevronRightIcon size={18} color={colors.textSecondary} />
  </View>
);

const ProfileScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const favorites = useAppSelector(s => s.ui.favorites ?? []);
  const cart = useAppSelector(s => s.ui.cart ?? {});

  const bagCount = useMemo(
    () => Object.values(cart).reduce<number>((sum, n) => sum + Number(n), 0),
    [cart],
  );

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          {paddingBottom:moderateScale(100) + insets.bottom},
        ]}
        showsVerticalScrollIndicator={false}>
        <AppText variant="h1" style={styles.heading}>
          Profile
        </AppText>

        <View style={styles.card}>
          <View style={styles.avatar}>
            <ProfileIcon size={42} color={colors.primary} />
          </View>
          <View style={styles.userMeta}>
            <AppText variant="h2" weight="700">
              Monika Singh
            </AppText>
            <AppText variant="body" color={colors.textSecondary}>
              monika@yopmail.com
            </AppText>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <AppText variant="h1" weight="700" color={colors.primary}>
              {favorites.length}
            </AppText>
            <AppText variant="caption" color={colors.textSecondary}>
              Likes
            </AppText>
          </View>
          <View style={styles.statCard}>
            <AppText variant="h1" weight="700" color={colors.primary}>
              {bagCount}
            </AppText>
            <AppText variant="caption" color={colors.textSecondary}>
              In Bag
            </AppText>
          </View>
          <View style={styles.statCard}>
            <AppText variant="h1" weight="700" color={colors.primary}>
              0
            </AppText>
            <AppText variant="caption" color={colors.textSecondary}>
              Orders
            </AppText>
          </View>
        </View>

        <AppText variant="h2" style={styles.section}>
          Account
        </AppText>
        <View style={styles.list}>
          <Row
            icon={<HeartIcon size={18} color={colors.textPrimary} />}
            label="My Favourites"
            value={`${favorites.length}`}
          />
          <View style={styles.divider} />
          <Row
            icon={<BagIcon size={18} color={colors.textPrimary} />}
            label="My Bag"
            value={`${bagCount}`}
          />
          <View style={styles.divider} />
          <Row
            icon={<SettingsIcon size={18} color={colors.textPrimary} />}
            label="Settings"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: colors.screenBg},
  content: {paddingHorizontal: spacing.lg, paddingTop: spacing.sm},
  heading: {marginBottom: spacing.lg},
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: moderateScale(20),
    padding: spacing.lg,
  },
  avatar: {
    width: moderateScale(64),
    height: moderateScale(64),
    borderRadius: moderateScale(32),
    backgroundColor: colors.bagCircle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userMeta: {marginLeft: spacing.base, flex: 1},
  statsRow: {
    flexDirection: 'row',
    marginTop: spacing.base,
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: moderateScale(radius.md),
    paddingVertical: spacing.base,
    alignItems: 'center',
  },
  section: {marginTop: spacing.xl, marginBottom: spacing.sm},
  list: {
    backgroundColor: colors.surface,
    borderRadius: moderateScale(radius.md),
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.base,
  },
  rowIcon: {
    width: moderateScale(32),
    alignItems: 'center',
  },
  rowLabel: {flex: 1, marginLeft: spacing.sm},
  rowValue: {marginRight: spacing.sm},
  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginLeft: moderateScale(spacing.lg + 32),
  },
});

export default ProfileScreen;
