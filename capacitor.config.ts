import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'smartHome',
  webDir: 'www',
  plugins: {
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#488AFF",
      sound: "beep.wav",
    },
  },
  server: {
    androidScheme: 'http',
    "cleartext": true
  },
  /*android: {
    allowMixedContent:true,
  }*/
};

export default config;
