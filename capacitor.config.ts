import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.superbear.app',
  appName: 'Gran Facu Aventura',
  webDir: 'out',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
    },
  },
  // "cordova": {} was here previously, but typically isn't needed unless specific plugins use it.
};

export default config;
