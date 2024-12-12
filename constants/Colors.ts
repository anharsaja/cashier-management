/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#D17842';
const tintColorDark = '#fff';

export const Colors = {
  primary: {
    base: '#D17842',
    textSecond: '#A2A2A2',
    textPrimary: '#fff',
    bgBanner: '#E8E8E8',
    bgInput: '#2A2A2A',
    bgDark: '#2A2A2A',
  },
  light: {
    text: '#252A32',
    background: '#fff',
    tint: tintColorLight,
    icon: '#252A32',
    tabIconDefault: '#252A32',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
