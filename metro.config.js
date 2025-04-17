// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add this to handle Reanimated
config.resolver.sourceExts = ['jsx', 'js', 'ts', 'tsx', 'json', 'cjs'];

// Ajout de la configuration pour NativeWind
config.resolver.sourceExts.push('mjs');

module.exports = config; 