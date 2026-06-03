/**
 * React Native CLI config — registers custom asset folders so that
 * `npx react-native-asset` (or future native linking) can pick up
 * the Inter fonts.
 *
 * Android: fonts already copied to `android/app/src/main/assets/fonts/`.
 * iOS: fonts referenced via `UIAppFonts` in `ios/AssignmentTask/Info.plist`.
 *      Add the same files to the Xcode project's "Copy Bundle Resources"
 *      build phase (or run `npx react-native-asset` from this folder).
 */
module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./src/assets/fonts'],
};
