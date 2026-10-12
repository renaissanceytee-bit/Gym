const base = require("./app.json").expo;
const androidAppId = process.env.ADMOB_ANDROID_APP_ID;
const iosAppId = process.env.ADMOB_IOS_APP_ID;
const plugins = [...(base.plugins || [])];
if (!plugins.some(plugin => (Array.isArray(plugin) ? plugin[0] : plugin) === "expo-notifications")) plugins.push("expo-notifications");

if (androidAppId && iosAppId) {
  plugins.push(["react-native-google-mobile-ads", {
    androidAppId,
    iosAppId,
    delayAppMeasurementInit: true,
    userTrackingUsageDescription: "ASCEND uses this permission to measure ad performance when you allow tracking."
  }]);
}

module.exports = { ...base, plugins };
