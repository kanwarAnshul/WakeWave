/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

// Define primary blue colors
const primaryBlueLight = '#4A90E2';
const secondaryBlueLight = '#50BFE6';
const primaryBlueDark = '#3B5998';
const secondaryBlueDark = '#2C3E50';

// Define default tint colors for light and dark mode
const tintColorLight = primaryBlueLight;
const tintColorDark = primaryBlueDark;

export const Colors = {
  light: {
    text: '#11181C', // Default text color for light mode
    background: '#E6F7FF', // Background color for light mode
    tint: tintColorLight, // Accent color for light mode
    icon: '#687076', // Default icon color for light mode
    tabIconDefault: '#687076', // Default tab icon color for light mode
    tabIconSelected: tintColorLight, // Selected tab icon color for light mode
  },
  dark: {
    text: '#ECEDEE', // Default text color for dark mode
    background: '#151718', // Background color for dark mode
    tint: tintColorDark, // Accent color for dark mode
    icon: '#9BA1A6', // Default icon color for dark mode
    tabIconDefault: '#9BA1A6', // Default tab icon color for dark mode
    tabIconSelected: tintColorDark, // Selected tab icon color for dark mode
  },
};
