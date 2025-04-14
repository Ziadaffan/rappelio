/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#11181C';
const tintColorDark = '#fff';

export const Colors = {
  primary: {
    main: '#007AFF',
    light: '#4DA3FF',
    dark: '#0055B3',
  },
  error: {
    main: '#FF3B30',
    light: '#FF6B6B',
    dark: '#CC2E26',
  },
  text: {
    primary: '#000000',
    secondary: '#666666',
    disabled: '#999999',
  },
  background: {
    default: '#FFFFFF',
    paper: '#F5F5F5',
  },
  border: {
    light: '#DDDDDD',
    main: '#CCCCCC',
  },
  success: {
    main: '#34C759',
    light: '#5CDB7D',
    dark: '#2A9F47',
  },
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    webViewLoader: "#11181C",
    loader: "#11181C",
    border: '#11181C'
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    webViewLoader: "#11181C",
    loader: "#E8EAE6",
    border: '#ECEDEE'
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
} as const;

export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 9999,
} as const;

export const FontSize = {
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  title: 45,
} as const;