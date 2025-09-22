export default {
  name: "My-DayBook",
  slug: "My-DayBook",

  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff"
  },
  assetBundlePatterns: ["**/*"],

  android: {
    package: "com.kavindulakshan.mydaybook" // 👈 oyage unique package name
  },

  extra: {
    mockApi: process.env.EXPO_BASE_API_URL,
    eas: {
      projectId: "9d96796c-fee4-441f-8f4d-f820b754e205"
    }
  }
};
