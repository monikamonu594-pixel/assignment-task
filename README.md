# Furniture Ecom — React Native Take-home

A React Native (RN 0.85) furniture e-commerce app built for the Round-2
technical assessment. The app implements an intro splash, a product list
with grid/list views, date-wise grouping, quick search, a product detail
screen with a custom rating bar, deep linking, offline support and Redux
Persist.

## Highlights

- **Clean architecture** under `src/` separating `api`, `redux`,
  `navigation`, `screens`, `components`, `hooks`, `utils`, `theme`, and
  `types`.
- **Redux Toolkit** for predictable state; **redux-persist** with
  AsyncStorage so the product catalog survives app restarts and is usable
  offline.
- **Offline aware**: a global `OfflineBanner` shows when connectivity is
  lost (via `@react-native-community/netinfo`). The list and detail screens
  always read from the persisted Redux cache first.
- **Quick search** with a debounced input (250 ms) over title, brand,
  category, and tags.
- **Grid / List toggle** with the chosen mode persisted across launches.
- **Date-wise grouping** of products into `Today`, `Yesterday`, and
  historical dates for improved browsing and sectioned product discovery.
- **Custom rating bar** under `src/components/RatingBar.tsx` — no
  third-party star library; the stars are constructed from rotated rounded
  `<View>` arms and support fractional fills.
- **No loader on detail screen**: the screen renders immediately from the
  Redux cache (no flicker / fluctuation) and a silent background refresh
  keeps it fresh.
- **Deep linking** via React Navigation `linking` config + Android
  `intent-filter` (https + custom scheme). The application is configured
  to handle:

  - https://io.pixelsoftwares.com/test.txt
  - furnitureapp://

  Verified-app metadata is served at:
  https://io.pixelsoftwares.com/.well-known/assetlinks.json

  Note: App Link verification depends on the package name and SHA256
  signing fingerprint being registered in the hosted `assetlinks.json`
  file. The application includes the required Android intent filters,
  React Navigation linking configuration, and deep-link handling logic
  for both HTTPS App Links and custom scheme URLs.

## Folder structure

```
src/
  api/                Axios client + product endpoints
  components/         Reusable UI primitives (RatingBar, SearchBar, cards, …)
    icons/            Tiny SVG icon set used across screens
  hooks/              useDebounce, useNetworkStatus
  navigation/         Stack navigator, deep-linking config, route types
  redux/              Store, hooks, slices (products + ui)
  screens/            SplashScreen, ProductListScreen, ProductDetailScreen
  theme/              Colors, spacing, typography tokens
  types/              Shared TypeScript types (Product, responses)
  utils/              Date grouping + formatters
```

## APIs

Configured in `src/api/apiClient.ts` with a shared `apikey: pixel` header
and 20s timeout. Errors are normalized into `ApiError` so the UI can
distinguish offline / 4xx / 5xx cases.

| Purpose | Method | URL | Header | Body |
| --- | --- | --- | --- | --- |
| All products | `GET` | `https://www.io.pixelsoftwares.com/task_api.php` | `apikey: pixel` | — |
| Product by id | `POST` | `https://www.io.pixelsoftwares.com/task_api.php` | `apikey: pixel` | `product_id=<id>` (x-www-form-urlencoded) |

## Deep linking

Android intent-filter is registered in
`android/app/src/main/AndroidManifest.xml` and React Navigation linking
is configured for both HTTPS App Links and custom scheme URLs.

Supported deep links:

- https://io.pixelsoftwares.com/test.txt
- furnitureapp://

### Testing

Android

```bash
adb shell am start -a android.intent.action.VIEW -d "furnitureapp://"
```

iOS Simulator

```bash
xcrun simctl openurl booted "furnitureapp://"
```

> Note: `assetlinks.json` is hosted by the assignment and currently lists a
> set of pre-approved package names. HTTPS App Link verification will only
> succeed if the package name and signing fingerprint are registered in
> that file. The application includes the required Android intent filters,
> React Navigation linking configuration, and deep-link handling logic for
> both HTTPS App Links and custom scheme URLs.

## Setup

```bash
# 1. Install JavaScript dependencies
npm install

# 2. Install iOS pods (macOS only)
cd ios && bundle install && bundle exec pod install && cd ..

# 3. Start Metro
npm start

# 4a. Run Android
npm run android

# 4b. Run iOS
npm run ios
```

Requires Node ≥ 22.11 (per `engines` in `package.json`), JDK 17, and the
React Native CLI prerequisites (Android Studio / Xcode).

## Build APK

```bash
cd android
./gradlew assembleRelease
# APK is created at: android/app/build/outputs/apk/release/app-release.apk
```

For debug APK to share quickly:

```bash
cd android
./gradlew assembleDebug
# APK: android/app/build/outputs/apk/debug/app-debug.apk
```

## Scripts

| Script | What it does |
| --- | --- |
| `npm start` | Starts Metro bundler |
| `npm run android` | Builds & launches the Android app |
| `npm run ios` | Builds & launches the iOS app |
| `npm run lint` | ESLint over the source |
| `npm test` | Jest unit tests (utilities) |

## Design decisions

- **No loader on the detail screen** — the navigation parameter is the
  product id; we always have a cached `Product` in Redux (since you can
  only reach detail by tapping a card from the list). The screen renders
  that instantly and silently dispatches `loadProductDetail` to refresh in
  the background. If the refresh fails the user still sees the cached
  data; if the cache is somehow missing and the refresh fails we render an
  `ErrorState` with a retry.
- **Rating bar without third-party libs** — see
  `src/components/RatingBar.tsx`. Each star is five rounded `<View>` arms
  rotated around the center; a clipped second copy on top renders the
  fractional fill.
- **Avoiding re-renders** — list/grid cards are wrapped in `React.memo`,
  callbacks are stabilised with `useCallback`, derived data is computed
  with `useMemo`, and the `SectionList` is tuned with
  `initialNumToRender`, `maxToRenderPerBatch`, `windowSize`, and
  `removeClippedSubviews`.
- **Offline + persistence** — the entire Redux state (products + UI prefs)
  is persisted through redux-persist. NetInfo updates `ui.isOnline` and we
  only re-fetch when we come back online.

## Testing

```bash
npm test
```

Runs Jest against pure utility code (date grouping, formatters) — fast
and free of native dependencies. A full snapshot test of `<App />` is
intentionally omitted because the app depends on native modules
(AsyncStorage, NetInfo, react-native-screens, react-native-svg).

## Submission checklist

- [x] GitHub repository with full source
- [x] APK build via `./gradlew assembleDebug` (or `assembleRelease`)
- [x] This README with setup / run / deep-link instructions
- [x] Redux + redux-persist
- [x] Offline data handling
- [x] Custom rating bar (no third-party library)
- [x] Date-wise grouping with total product count
- [x] Grid & List view toggle
- [x] Quick search
- [x] Deep linking from `https://io.pixelsoftwares.com/*`
