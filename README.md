# expo-symbols: Android glyph scales with system font size and overflows its frame

Minimal repro for `expo-symbols@57.0.3`.

## Run

```sh
npm install
npx expo start   # open in Expo Go (SDK 57), or press a / i
```

Then raise the system font size (Android: Settings → Display → Font size, max) and reopen the app.

## Issue draft

**Summary**

On Android, `SymbolView` renders the Material Symbol as a `<Text fontSize={size}>` inside a `size × size` `View`, without `allowFontScaling={false}`. The glyph therefore follows the system font scale while its frame does not, so at large font scales the icon overflows (or is clipped by) its own box and overlaps neighbouring content. On iOS the native symbol view ignores font scale, so the two platforms render the same `size` differently.

**What platform(s) does this occur on?**

Android

**Steps to reproduce**

1. Render `<SymbolView name={{ ios: 'pause.circle', android: 'pause_circle' }} size={24} />`.
2. Set the Android system font size to the maximum.
3. The glyph grows by the font scale (e.g. ~2× at max) while the `SymbolView` frame stays `size × size`.

**Expected**

The symbol renders at `size`, matching iOS, regardless of system font scale. (Or, if scaling is intended, the frame scales with it.)

**Actual**

The glyph scales, the frame doesn't; the icon overflows its frame on Android.

**Suggested fix**

`packages/expo-symbols/src/SymbolView.tsx`:

```diff
       <Text
+        allowFontScaling={false}
         style={{
           fontFamily: font.name,
```

**Environment**

<!-- paste output of `npx expo-env-info` -->

- expo 57.0.27, expo-symbols 57.0.3, react-native 0.86.3
- Device: <!-- model, Android version -->

**Minimal reproducible example**

<!-- link to this repo -->
