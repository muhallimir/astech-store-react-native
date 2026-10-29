import '@testing-library/jest-native/extend-expect';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock expo modules
jest.mock('expo-font', () => ({
  loadAsync: jest.fn(),
  isLoaded: true,
}));

jest.mock('expo-splash-screen', () => ({
  preventAutoHideAsync: jest.fn(),
  hideAsync: jest.fn(),
}));

// Mock react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native').View;
  return {
    PanGestureHandler: View,
    TapGestureHandler: View,
    State: {},
    gestureHandlerRootHOC: (c) => c,
  };
});

// Silence console.warn for known warnings
const originalWarn = console.warn;
console.warn = (...args) => {
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('componentWillReceiveProps') ||
      args[0].includes('componentWillMount') ||
      args[0].includes('componentWillUpdate'))
  ) {
    return;
  }
  originalWarn.apply(console, args);
};